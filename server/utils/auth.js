// Imports
const jwt = require('jsonwebtoken');

// Declarations
const secret = 'mysecretsshhhhh';
const expiration = '2h';

// Export for External
module.exports = {
    // Sign Token and Authy
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },

    // Authentication Middleware for context/header
    authMiddleware: function ({ req }) {
        // Allows token to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        // Separate "Bearer" from "<tokenvalue>"
        if (req.headers.authorization) {
            token = token
                .split(' ')
                .pop()
                .trim();
        }

        // If no token, return request object as is
        if (!token) {
            return req;
        }

        try {
            // Decode and attach user data to request object
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        // Return updated request object
        return req;
    }
};