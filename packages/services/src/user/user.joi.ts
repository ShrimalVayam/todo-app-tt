import * as Joi from 'joi';
const email = Joi.string().email({ tlds: { allow: false } });
const password = Joi.string();

export const createUserValidation = Joi.object().keys({
  email: email.required(),
  password: password.required(),
});
