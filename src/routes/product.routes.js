import express from 'express';
import productControll from '../controllers/product.controller.js';

const Productcontroll = new productControll();

const app = express.Router();

app.post("/create-product", Productcontroll.createProduct);
app.get("/getAll-product", Productcontroll.getAllProducts);
app.get("/get-product/:id", Productcontroll.getProduct);
app.put("/update-product/:id", Productcontroll.updateProduct);
app.delete("/delete-product/:id", Productcontroll.deleteProduct);



export default app