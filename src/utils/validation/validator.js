import { Validator } from "express-json-validator-middleware";

const validator = new Validator({ allErrors: true });

// const ajvInstance = validator.ajv


export { validator }