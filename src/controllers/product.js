import * as services from "../services"
import {internalServerError,badRequest} from "../middlewares/handle_errors";
import {name, price, image, quantity, description,category_code, pid, pids, filename} from "../helpers/joi_schema";
import joi from "joi";
const cloudinary = require('cloudinary').v2;
export const getProducts = async (req, res) => {
    try {
        const response = await services.getProducts(req.query)
        return res.status(200).json(response)
    }
    catch (error){
        return internalServerError(res)
    }
}

//CREATE

export const createNewProduct = async (req, res) => {
    try {
        const fileData = req.file
        const {error} = joi.object({name, price, image, quantity, description, category_code}).validate({...req.body, image: fileData?.path })
        if (error){
            if(fileData) cloudinary.uploader.destroy(fileData.filename)
            return badRequest(error.details[0].message, res)
        }

        const response = await services.createNewProduct(req.body, fileData)
        return res.status(200).json(response)
    }
    catch (error){
        internalServerError(res)
        if(fileData) cloudinary.uploader.destroy(fileData.filename)
    }
}

//UPDATE

export const updateProduct = async (req, res) => {
    try {
        const fileData = req.file
        const {error} = joi.object({ pid }).validate({pid: req.body.pid})
        if (error){
            if(fileData) cloudinary.uploader.destroy(fileData.filename)
            return badRequest(error.details[0].message, res)
        }

        const response = await services.updateProduct(req.body, fileData)
        return res.status(200).json(response)
    }
    catch (error){
        internalServerError(res)
        if(fileData) cloudinary.uploader.destroy(fileData.filename)
    }
}

//DELETE
export const deleteProducts = async (req, res) => {
    try {
        const {error} = joi.object({ pids, filename }).validate(req.query)
        if (error){
            return badRequest(error.details[0].message, res)
        }
        const response = await services.deleteProducts(req.query.pids, req.query.filename)
        return res.status(200).json(response)
    }
    catch (error){
        internalServerError(res)
    }
}