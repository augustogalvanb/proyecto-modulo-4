import { NextFunction, Request, Response } from "express";

export function validateProduct(req: Request, res: Response, next: NextFunction) {
    
    const product = req.body
    // Verificar que los campos requeridos estén presentes
    
    if (!product.name || typeof product.name !== 'string') {
        return res.status(400).send("name inválido")
    }
    if (!product.description || typeof product.description !== 'string') {
        return res.status(400).send("descripción inválida")
    }
    if (!product.price || typeof product.price !== 'string') {
        return res.status(400).send("product inválido")
    }
    if (!product.stock || typeof product.stock !== 'number') {
        return res.status(400).send("stock inválido")
    }
    if (!product.imgUrl || typeof product.imgUrl !== 'string') {
        return res.status(400).send("imgUrl inválido")
    }

    next()
}