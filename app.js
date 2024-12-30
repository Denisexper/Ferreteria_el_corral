import express from 'express';
import connect from './src/config/connection.js';
import productRoutes from './src/routes/product.routes.js';
import userRoutes from './src/routes/user.routes.js';

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is runing on port ${PORT}`)
})

connect()
app.use('/api', productRoutes)
app.use('/app', userRoutes)
