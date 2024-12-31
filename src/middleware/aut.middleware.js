// middleware/auth.js

import jwt from 'jsonwebtoken';

const secretKey = 's3cuR3k3y#123!JwT$'; // La misma clave secreta que use en jwt

// Middleware para verificar el token JWT
export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).send({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // Guardamos la información del token en la request
        next();
    } catch (error) {
        res.status(400).send({ message: 'Invalid token.' });
    }
};
