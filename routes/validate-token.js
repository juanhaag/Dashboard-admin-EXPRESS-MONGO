const jwt = require('jsonwebtoken')
//Este va a ser un middle ware si se cumple el toquen hace next y hace el llamado a la routa por ejemplo admin.js


// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
    /* const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error: 'Acceso denegado' }) */
    const token = req.query.token
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next() // continuamos
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}

module.exports = verifyToken;