import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { AutoForm } from 'uniforms-semantic';
import { createSchemaBridge, CustomAutoField } from '@ilb/uniformscomponents';
import { withRouter } from 'next/router';
import { processUsecase } from '../libs/usecases';

function SalepointSelectPage({ router, request, response, schema }) {
  console.log({ request });

  function onSubmit(query) {
    router.push({ pathname: 'autoform', query });
  }

  return (
    <Container>
      <AutoForm
        schema={createSchemaBridge(schema)}
        model={request}
        autoField={CustomAutoField}
        onSubmit={onSubmit}
        showInlineError={true}
      />
      {response.greeting && <Header as="h1">{response.greeting}</Header>}
    </Container>
  );
}
export default withRouter(SalepointSelectPage);

export async function getServerSideProps(context) {
  return processUsecase(context, 'salepointSelect');
}
