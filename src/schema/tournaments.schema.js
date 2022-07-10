const Joi = require('@hapi/joi');

exports.tournamentsSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  date: Joi.string().required(),
  location: Joi.string().required(),
  maxPlayers: Joi.number().required(),
  image: Joi.any(),
});
