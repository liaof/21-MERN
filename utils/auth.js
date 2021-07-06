const jwt = require('jsonwebtoken');
// this secret is not involved in the encoding process, it simply enables the server to verify if the token is valid or not
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
    // signToken() expects a user object and will add the user's username, email and _id to the token
    signToken: function({ username, email, _id}) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, {expiresIn: expiration });
    }
};