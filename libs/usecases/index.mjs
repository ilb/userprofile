import application from '../application.mjs';
import { validateBySchema } from '../utils/schemaValidation.mjs';
import Response from '../utils/Response.mjs';
import { ValidationError, BadRequestError } from '../utils/error.mjs';

/**
 * create scope for usecase processing
 * @param req The HTTP IncomingMessage object
 * @returns
 */
export async function createScope(req) {
  return application.createScope(req);
}

/**
 * process usecase by name (from appication context)
 * @param context contex from getServerSideProps
 * @param useCaseName
 * @returns
 */
export async function processUsecase(context, useCaseName) {
  const scope = createScope(context.req);
  const usecase = scope.resolve(useCaseName);
  return processUsecaseInstance(context, usecase);
}

/**
 * process usecase instance
 * @param context contex from getServerSideProps
 * @param usecase usecase instance
 * @returns
 */
export async function processUsecaseInstance(context, usecase) {
  const request = context.query;
  const schema = await usecase.schema(request);
  let response = null;
  let error = null;

  if (Object.values(request).length) {
    try {
      validateBySchema(request, schema);
      response = await usecase.process(request);
    } catch (err) {
      response = await usecase.process({});
      error = err.message;
    }
  } else {
    response = await usecase.process({});
  }

  return { props: { request, response, schema, error } };
}

export async function processUsecaseApi(req, useCase) {
  const scope = await application.createScope(req);
  const usecase = scope.resolve(useCase);
  const schema = await usecase.schema(req);

  try {
    validateBySchema(req, schema);
    const result = await usecase.process(req);
    if (result) {
      return Response.ok(result);
    } else {
      return Response.noContent();
    }
  } catch (err) {
    console.log(err.toString());
    const errName = err.name;
    if (errName === BadRequestError.name || errName === ValidationError.name) {
      return Response.badRequest(err.message);
    } else {
      return Response.internalError();
    }
  }
}
