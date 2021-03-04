import { Message } from 'semantic-ui-react';

export function ErrorMessage({ error }) {
  if (error) {
    return (
      <Message error>
        <span style={{ whiteSpace: 'pre-line' }}>{error}</span>
      </Message>
    );
  }
  return <></>;
}
// <Message error>
//   <span style={{ whiteSpace: 'pre-line' }}>{error}</span>
// </Message>
// return //{error && (
//   <Message error>
//     <span style={{ whiteSpace: 'pre-line' }}>{error}</span>
//   </Message>
// ) ||
//   null};
