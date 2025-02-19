import { NextFunction, Request, Response } from "express";

// Función para validar si el email tiene un formato correcto
function isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

export function validateUser(req: Request, res: Response, next: NextFunction) {
    
    const user = req.body
    // Verificar que los campos requeridos estén presentes
    
    if (!user.email || typeof user.email !== 'string' || !isValidEmail(user.email)) {
        return res.status(400).send("email inválido")
    }
    if (!user.name || typeof user.name !== 'string') {
        return res.status(400).send("name inválido")
    }
    if (!user.password || typeof user.password !== 'string') {
        return res.status(400).send("password inválido")
    }
    if (!user.address || typeof user.address !== 'string') {
        return res.status(400).send("address inválido")
    }
    if (!user.phone || typeof user.phone !== 'number') {
        return res.status(400).send("phone inválido")
    }
    if (!user.country || typeof user.country !== 'string') {
        return res.status(400).send("country inválido")
    }
    if (!user.city || typeof user.city !== 'string') {
        return res.status(400).send("city inválida")
    }

    next()
}