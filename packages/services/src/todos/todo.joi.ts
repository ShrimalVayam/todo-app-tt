import * as Joi from 'joi';

export const createTodoValidation = Joi.object().keys({
  description: Joi.string().required(),
});
