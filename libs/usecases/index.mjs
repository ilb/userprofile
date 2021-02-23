import Ajv from 'ajv';
import application from '../application.mjs';
import Response from '../utils/Response.mjs';

export async function processUsecase({ query: request, req }, useCase) {
  // console.log(req);
  const scope = await application.createScope(req);
  const usecase = scope.resolve(useCase);
  const props = {
    request,
    response: await usecase.process(request),
    schema: await usecase.schema(request)
  };
  return { props };
}

export async function processUsecaseApi(req, useCase) {
  const scope = await application.createScope(req);
  const usecase = scope.resolve(useCase);
  const schema = await usecase.schema(req);

  const ajv = new Ajv.default({ allErrors: true });
  const validate = ajv.compile(schema);

  if (validate(req)) {
    return await usecase.process(req);
  } else {
    for (const err of validate.errors) {
      const errProperty = (function () {
        const endpoints = err.dataPath.split('/');
        return endpoints[endpoints.length - 1];
      })();

      switch (err.keyword) {
        case 'required':
          return Response.badRequest(`В запросе отсутствует ${err.params.missingProperty}`);
        case 'type':
          return Response.badRequest(`Тип ${errProperty} должен быть ${err.params.type}`);
        default:
          return Response.badRequest(`Ошибка при валидации данных`);
      }
    }
  }
}
