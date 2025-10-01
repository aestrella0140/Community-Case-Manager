const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");

const secret = "highly secret";
const expiration = "2hr";

class AuthenticationError extends GraphQLError {
  constructor(message = 'couldnt authenticate User') {
    super(message, {
      extensions: { code: 'UNAUTHENTICATED'},
    });
  }
}

module.exports = {
  
  AuthenticationError,

  authMiddleware: function ({ req }) {
    let token = req.body.token || req.headers.authorization || req.query.token;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("invalid token");
      const decodedToken = jwt.decode(token, { complete: true });
      console.log(decodedToken);
    }

    return req;
  },
  signToken: function ({ firstName, lastName, email, role, _id }) {
    const payload = { firstName, lastName, email, role, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
