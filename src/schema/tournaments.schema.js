import Joi from '@hapi/joi'

const tournamentsSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  date: Joi.string().required(),
  location: Joi.string().required(),
  maxPlayers: Joi.number().required(),
});

export default tournamentsSchema;