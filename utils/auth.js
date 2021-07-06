const jwt = require('jsonwebtoken');
// this secret is not involved in the encoding process, it simply enables the server to verify if the token is valid or not
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
    // signToken() expects a user object and will add the user's username, email and _id to the token
    signToken: function({ username, email, _id}) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, {expiresIn: expiration });
    },
    authMiddleware: function({ req }) {
        // allows token to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;
      
        // separate "Bearer" from "<tokenvalue>"
        if (req.headers.authorization) {
          token = token
            .split(' ')
            .pop()
            .trim();
        }
      
        // if no token, return request object as is
        if (!token) {
          return req;
        }
      
        try {
          // decode and attach user data to request object
          const { data } = jwt.verify(token, secret, { maxAge: expiration });// if the secret here doesnt match the secret returned in line 11 by jwt.sign(), the token is invalid and the object will not be decoded
          req.user = data;
        } catch {
          console.log('Invalid token');
        }
      
        // return updated request object
        return req;
    }
};