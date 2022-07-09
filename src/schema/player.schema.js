import Joi from '@hapi/joi'

const playerSchema = Joi.object({
  name_register: Joi.string().required(),
  lastname1_register: Joi.string().required(),
  lastname2_register: Joi.string().required(),
  email_register: Joi.string().email({tlds:{allow: false}}).required(),
  password_register: Joi.string().required(),
  image_register: Joi.any(),
  age_register: Joi.number(),
  club_register: Joi.any(),
  genre_register: Joi.string(),
  licenseNumber_register: Joi.number().required()
});

export default playerSchema;