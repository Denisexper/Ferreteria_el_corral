import Product from '../models/products.models.js'

class productControll {

    async createProduct (req, res) {
        try {
            const { name, price, description, image, createdAt } = req.body;
            const productReady = await Product.create({name, price, description, image, createdAt});
            res.status(201).send({
                message: 'Product created successfully',
                productReady
            })

        } catch (error) {
            
            res.status(500).send({ message: 'Error creating product' })
        }
    }
    async getAllProducts (req, res) {
        try {
            const products = await Product.find().select("-__v");
            if(products === ""){
                res.status(404).send({ message: 'No products found' })
            }
            res.status(200).send(products)
        } catch (error) {
            res.status(500).send({
                message: 'Error getting all products'
            })
        }
    }
    async getProduct (req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findById(id);
            res.status(200).send(product)
        } catch (error) {
            res.status(500).send({
                message: 'Error getting product',
                error: error
            })
        }
    }
    async updateProduct (req, res) {
        try {
            const { id } = req.params;
            const { name, price, description, image, createdAt } = req.body;
            const product = await Product.findByIdAndUpdate( id, {name, price, description, image, createdAt}, {new: true})
            res.status(200).send(product)
        } catch (error) {
            res.status(500).send({
                message: 'Error updating product'
            })
        }
    }
    async deleteProduct (req, res) {
        try {
            const { id } = req.params;
            const productDelete = await Product.findByIdAndDelete(id);
            res.status(200).send({
                message: 'Product deleted successfully'
            })
        } catch (error) {
            res.status(500).send({
                message: 'Error deleting product'
            })
        }
    }
}

export default productControll;