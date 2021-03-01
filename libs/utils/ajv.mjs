import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv.default({ allErrors: true });

ajv.addKeyword('options');
addFormats(ajv);

export default ajv;
