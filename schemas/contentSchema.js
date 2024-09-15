const Joi = require('joi');

const contentSchema = Joi.object({
    title: Joi.string()
        .regex(/^[a-zA-Z0-9\s.,!?]+$/)
        .min(8).max(100)
        .required()
        .messages({
            'string.empty': ' O campo de título deve conter um valor',
            'string.min': ' O campo de título deve conter pelo menos 8 caracteres',
            'string.max': ' O campo de título deve conter no máximo 100 caracteres',
            'string.pattern.base': ' O campo de título só pode seguir esse padrão [a-zA-Z0-9\\s.,!?]'
        }),

    route: Joi.string()
        .regex(/^\//)
        .min(5)
        .required()
        .messages({
            'string.empty': ' O campo de rota ou link deve conter um valor',
            'string.min': ' O campo de título deve conter pelo menos 5 caracteres',
            'string.pattern.base': ' O campo de rota ou link deve conter uma "/" no inicio',
            'string.alphanum': ' O campo de título só pode ter alfanuméricos'
        }),

    image: Joi.string()
        .regex(/^https:\/\//)
        .min(10)
        .required()
        .messages({
            'string.empty': ' O campo de imagem deve conter um valor',
            'string.min': ' O campo de título deve conter pelo menos 10 caracteres',
            'string.pattern.base': ' O campo de imagem deve ser um link válido'
        }),
        
    text: Joi.string()
        .min(500)
        .required()
        .messages({
            'string.empty': ' O campo de texto deve conter um valor',
            'string.min': ' O campo de texto deve conter pelo menos 500 caracteres'
        }),
}).options({ abortEarly: false });;

module.exports = contentSchema;