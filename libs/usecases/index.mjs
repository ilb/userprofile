import application from '../application.mjs';
import ajv from '../utils/ajv.mjs';
import Response from '../utils/Response.mjs';

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

function validateUsecase(request, schema) {
  const validate = ajv.compile(schema);
  if (validate(request)) {
    return;
  } else {
    for (const err of validate.errors) {
      const errProperty = (function () {
        const endpoints = err.dataPath.split('/');
        return endpoints[endpoints.length - 1];
      })();

      switch (err.keyword) {
        case 'required':
          throw new ValidationError(`В запросе отсутствует ${err.params.missingProperty}`);
        case 'type':
          throw new ValidationError(`Тип ${errProperty} должен быть ${err.params.type}`);
        default:
          throw new ValidationError(`Ошибка при валидации данных`);
      }
    }
  }
}

export async function processUsecase({ query: request, req }, useCase) {
  const scope = await application.createScope(req);
  const usecase = scope.resolve(useCase);
  const schema = await usecase.schema(request);
  let response = null;

  if (Object.values(request).length) {
    try {
      validateUsecase(request, schema);
      response = await usecase.process(request);
    } catch (err) {
      response = await usecase.process({});
    }
  } else {
    response = await usecase.process({});
  }

  return { props: { request, response, schema } };
}

export async function processUsecaseApi(req, useCase) {
  const scope = await application.createScope(req);
  const usecase = scope.resolve(useCase);
  const schema = await usecase.schema(req);

  try {
    validateUsecase(req, schema);
    const result = usecase.process(req);
    if (result) {
      return Response.ok(result);
    } else {
      return Response.noContent();
    }
  } catch (err) {
    if (err instanceof ValidationError) {
      return Response.badRequest(err.message);
    } else {
      return Response.internalError();
    }
  }
}
