import db from '../models'
import data from '../../data/data.json'
import { generateCode} from "../helpers/fn";

export const insertData = () => new Promise(async (resolve, reject) => {
    try {
        const categories = Object.keys(data)
        categories.forEach(async (item) => {
            await db.Category.create({
                code: generateCode(item),
                value: item
            })
        })

        const dataArr = Object.entries(data)
        dataArr.forEach((item) => {
            item[1].forEach(async (product) => {
                await db.Product.create({
                    id: product.pid,
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity,
                    image: product.image,
                    description: product.description,
                    category_code: generateCode(item[0])
                })
            })
        })


        resolve('Ok')
    }
    catch (error){
        reject(error)
    }
})