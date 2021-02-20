import { withRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Container, Form } from 'semantic-ui-react';
import { processUsecase } from '../libs/usecases';

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
  const allSalepoints = [response.currentSalepoint, ...response.salepoints];

  const { register, handleSubmit } = useForm();

  function onSubmit(query) {
    console.log(query);
    // router.push({ query });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormSelect
          name="salepoint"
          label="Точка продаж"
          options={allSalepoints.map(({ code, name }) => ({
            value: code,
            label: name
          }))}
          register={register}
        />
        <Form.Button type="submit">Submit</Form.Button>
      </Form>
    </Container>
  );
}
export default withRouter(SalepointSelectPage);

export async function getServerSideProps(context) {
  return processUsecase(context, 'salepointSelect');
}
