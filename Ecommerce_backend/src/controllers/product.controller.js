import Product from '../models/Product'
import { uploadImage } from '../helpers/cloudinary'

export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
}

export const createProduct = async (req, res, next) => {
    try {
        const { name, price, description } = req.body;
        
        const result = await uploadImage(req.files.image.tempFilePath);

        const newProduct = new Product({ name, price, description, image:{url: result.secure_url} });

        await newProduct.save();
        res.json(newProduct);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const getProduct = async (req, res) => {
    res.json('get product')
}

export const updateProduct = async (req, res) => {
    res.json('update product')
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    try {
        const productDeleted = await Product.findByIdAndDelete(id);
        if (productDeleted) return res.sendStatus(204);

        return res.sendStatus(404);
    } catch (error) {
        console.log(error);
        next(error);
    }
}