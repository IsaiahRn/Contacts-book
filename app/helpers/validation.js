import Joi from '@hapi/joi';

const contactSchema = Joi.object().keys({
  firstname: Joi.string().alphanum().min(3).max(20)
    .required(),
  lastname: Joi.string().alphanum().min(3).max(20),
  email: Joi.string().email().required(),
  telephone: Joi.string(),
  homeAddress: Joi.string().min(2).max(100),
  workAddress: Joi.string().min(2).max(100),
  organisation: Joi.string().min(2).max(100),
});

export default { contactSchema };
