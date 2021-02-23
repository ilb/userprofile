import application from '../application.mjs';

export async function processUsecase({ query: request, req }, useCase) {
  console.log(req);
  const scope = await application.createScope(req);
  const usecase = scope.resolve(useCase);
  const props = {
    request,
    response: await usecase.process(request),
    schema: await usecase.schema(request)
  };
  return { props };
}

export async function processUsecaseApi(request, useCase) {
  console.log(request);
  const scope = await application.createScope(request);
  const usecase = scope.resolve(useCase);
  const response = usecase.process(request);
  return { request, response };
}
