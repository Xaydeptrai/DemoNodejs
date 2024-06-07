import db from '../models'
import {Op} from 'sequelize'
import {v4 as generateId} from 'uuid'
const cloudinary = require('cloudinary').v2;

export const getProducts = ({page, limit, order, name, quantity, ...query}) => new Promise(async (resolve, reject) => {
    try {
        const queries = {raw: true, nest: true}

        //1 lan lay bao nhieu product
        const offset = (!page || +page <= 1) ? 0 : (+page - 1)
        const fLimit = +limit || +process.env.LIMIT_PRODUCT

        queries.offset = offset * fLimit
        queries.limit = fLimit

        if(order) queries.order = [order]
        if(name) query.name ={[Op.substring]: name}

        if(quantity) query.quantity = {[Op.between]: quantity}

        const response = await db.Product.findAndCountAll({
            where: query,
            ...queries,
            attributes:{
                exclude: ['category_code','createdAt', 'updatedAt']
            },
            include: [
                {
                    model: db.Category,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    as: 'categoryData'
                }
            ]
        })

        resolve({
            err: response ? 0 : 1,
            mes: response ? 'Got' : 'Cannot found products',
            'productData': response
        })
    }
    catch (error){
        reject(error)
    }
})

//CREATE
export const createNewProduct = (body, fileData) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Product.findOrCreate({
            where: { name: body?.name },
            defaults: {
                ...body,
                id: generateId(),
                image: fileData?.path,
                filename: fileData?.filename,
            }
        })

        resolve({
            err: response[1] ? 0 : 1,
            mes: response[1] ? 'Created' : 'Cannot create new products',
        })
        if(fileData && !response[1]) cloudinary.uploader.destroy(fileData.filename)
    }
    catch (error){
        reject(error)
        if(fileData) cloudinary.uploader.destroy(fileData.filename)
    }
})

//UPDATE
export const updateProduct = ({ pid,...body}, fileData) => new Promise(async (resolve, reject) => {
    try {
        if(fileData) body.image = fileData?.path
        const response = await db.Product.update(
            body,
            {where: { id: pid }}
        )
        resolve({
            err: response[0] > 0 ? 0 : 1,
            mes: response[0] > 0 ? 'Product Updated' : 'Cannot update product',
        })
        if(fileData && !response[0] === 0) cloudinary.uploader.destroy(fileData.filename)
    }
    catch (error){
        reject(error)
        if(fileData) cloudinary.uploader.destroy(fileData.filename)
    }
})

//DELETE

export const deleteProducts = (pids, filename) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Product.destroy({
            where: { id: pids }
        })
        resolve({
            err: response > 0 ? 0 : 1,
            mes: `${response}`+' product(s) deleted',
        })
        if(filename) cloudinary.api.delete_resources(filename)
    }
    catch (error){
        reject(error)
    }
})
