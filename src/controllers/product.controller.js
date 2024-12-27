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
            res.status(200).send(products)
        } catch (error) {
            res.status(500).send({
                message: 'Error getting all products'
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