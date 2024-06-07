import joi from 'joi'

export const email = joi.string().email({minDomainSegments: 2, tlds: {allow: ['com','net']}}).required()
export const password = joi.string().min(6).required()
export const name = joi.string().required()
export const price = joi.number().required()
export const quantity = joi.number().required()

export const description = joi.string()
export const category_code = joi.string().uppercase().alphanum().required()
export const image = joi.string().required()

export const pid = joi.string().required()

export const pids = joi.array().required()
export const filename = joi.array().required()

export const refreshToken = joi.string().required()

