import { createSchemaBridge, CustomAutoField } from '@ilb/uniformscomponents';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { Container, FormGroup, Menu, Table, TableRow } from 'semantic-ui-react';
import { AutoField, AutoForm, ErrorsField, SubmitField } from 'uniforms-semantic';
import { processUsecase } from '../libs/usecases';

function SalepointsHistoryTable({
  salepointsHistory,
  userName,
  onPaginationItemClick,
  pagesCount,
  currentPage
}) {
  const historyRecordElements = salepointsHistory.map(({ begDate, endDate, salepointName }) => (
    <TableRow key={begDate}>
      <Table.Cell>{new Date(begDate).toLocaleString()}</Table.Cell>
      <Table.Cell>{(endDate && new Date(endDate).toLocaleString()) || '---'}</Table.Cell>
      <Table.Cell collapsing>{userName}</Table.Cell>
      <Table.Cell>{salepointName}</Table.Cell>
    </TableRow>
  ));

  const pageElements = [];

  for (let i = 1; i <= pagesCount; i++) {
    pageElements.push(
      <Menu.Item as="a" key={i} active={i === currentPage} onClick={() => onPaginationItemClick(i)}>
        {i}
      </Menu.Item>
    );
  }

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Дата начала</Table.HeaderCell>
          <Table.HeaderCell>Дата окончания</Table.HeaderCell>
          <Table.HeaderCell>Пользователь</Table.HeaderCell>
          <Table.HeaderCell>Офисa работы</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {(salepointsHistory.length && <>{historyRecordElements}</>) || (
          <Table.Row>
            <Table.Cell colSpan={4} textAlign="center">
              Ничего не найдено
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
      {(pagesCount && (
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={4}>
              <Menu floated="right" pagination>
                {pageElements}
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      )) || <></>}
    </Table>
  );
}

function SalepointsHistoryPage({ router, request, response, schema }) {
  const { salepointsHistory, userName, salepointsHistorySize } = response || {};

  const pagesCount = Math.ceil((salepointsHistorySize || 0) / 10);
  const currentPage = parseInt(router.query.page || 1);

  function onPaginationItemClick(page) {
    if (page !== currentPage) {
      router.replace({
        pathname: router.pathname,
        query: { ...router.query, page }
      });
    }
  }

  function onSubmit(query) {
    query.page = 1;
    router.replace({ pathname: router.pathname, query });
  }

  return (
    <>
      <Head>
        <title>История точек продаж</title>
      </Head>
      <AutoForm
        schema={createSchemaBridge(schema)}
        model={request}
        autoField={CustomAutoField}
        onSubmit={onSubmit}>
        <AutoField name="userCode" />
        <FormGroup>
          <CustomAutoField name="begDate" />
          <CustomAutoField name="endDate" />
        </FormGroup>
        <ErrorsField />
        <SubmitField value="Показать" />
      </AutoForm>
      {salepointsHistory && (
        <SalepointsHistoryTable
          salepointsHistory={salepointsHistory}
          userName={userName}
          onPaginationItemClick={onPaginationItemClick}
          pagesCount={pagesCount}
          currentPage={currentPage}
        />
      )}
    </>
  );
}

export default withRouter(SalepointsHistoryPage);

export async function getServerSideProps(context) {
  return processUsecase(context, 'salepointsHistory');
}
