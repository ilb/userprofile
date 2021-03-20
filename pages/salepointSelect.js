import React, { useState } from 'react';
import { Container, Header, Form } from 'semantic-ui-react';
import { AutoForm } from 'uniforms-semantic';
import { createSchemaBridge, CustomAutoField } from '@ilb/uniformscomponents';
import { withRouter } from 'next/router';
import { useForm } from 'react-hook-form';
// import { processUsecase } from '../libs/usecases';
import { createScope, processUsecaseInstance } from '../libs/usecases';
import { changeSalepoint } from '../client/api/salepointsApi';
import Head from 'next/head';
import { ErrorMessage } from '../client/components/ErrorMessage';
import Link from 'next/link';
import SalepointSelect from '../src/usecases/SalepointSelect';

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
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit } = useForm();

  const salepoints = (response && response.salepoints) || [];
  const currentSalepoint = salepoints.find((sp) => sp.isCurrent);

  async function onSubmit(query) {
    const result = await changeSalepoint(query.salepointCode);
    if (result) {
      setErrorMessage(result);
    } else {
      setErrorMessage('');
    }
    router.replace(router.asPath);
  }

  return (
    <>
      <Head>
        <title>Выбор точки продаж</title>
      </Head>
      <ErrorMessage error={errorMessage} />
      <div style={{ marginBottom: 8 }}>
        <Link href="/salepointsHistory">История</Link>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormSelect
          name="salepointCode"
          label="Точка продаж"
          options={salepoints.map(({ code, name, isCurrent }) => ({
            value: code,
            label: (isCurrent && `> ${name}`) || name
          }))}
          defaultValue={currentSalepoint && currentSalepoint.code}
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
    </>
  );
}
export default withRouter(SalepointSelectPage);

export async function getServerSideProps(context) {
  const scope = await createScope(context);
  const usecase = new SalepointSelect(scope.cradle);
  return processUsecaseInstance(context, usecase);
}
