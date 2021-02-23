import React from 'react';
import { Container, Header, Form } from 'semantic-ui-react';
import { AutoForm } from 'uniforms-semantic';
import { createSchemaBridge } from '@ilb/uniformscomponents';
import { withRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { processUsecase } from '../libs/usecases';
import { changeSalepoint } from '../libs/api/salepointsApi';

function FormSelect({ name, id, label, defaultValue, register, required, options, errors }) {
  return (
    <Form.Field required={required || false}>
      <label htmlFor={id || name}>{label}</label>
      <select name={id || name} ref={register} defaultValue={defaultValue}>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {/* {errors[name] && <FieldError error={errors[name].message} />} */}
    </Form.Field>
  );
}

function SalepointSelectPage({ router, request, response, schema }) {
  const { register, handleSubmit } = useForm();

  const salepoints = response.salepoints;
  const currentSalepoint = salepoints.find((sp) => sp.isCurrent);

  async function onSubmit(query) {
    await changeSalepoint(query.salepointCode);
    router.replace(router.asPath);
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormSelect
          name="salepointCode"
          label="Точка продаж"
          options={salepoints.map(({ code, name, isCurrent }) => ({
            value: code,
            label: (isCurrent && `> ${name}`) || name
          }))}
          defaultValue={currentSalepoint.code}
          register={register}
        />
        <Form.Button type="submit">Сменить точку продаж</Form.Button>
      </Form>
      {/* <AutoForm
        schema={createSchemaBridge(schema)}
        model={request}
        autoField={CustomAutoField}
        onSubmit={onSubmit}
        showInlineError={true}
      />
      {response.greeting && <Header as="h1">{response.greeting}</Header>} */}
    </Container>
  );
}
export default withRouter(SalepointSelectPage);

export async function getServerSideProps(context) {
  return processUsecase(context, 'salepointSelect');
}
