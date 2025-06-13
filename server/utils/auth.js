const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');

const secret = 'highly secret';
const expiration = '2hr';

module.exports =  {
AuthenticationError: new GraphQLError('couldnt authenticate user.', {
    extensions: {
        code: 'UNAUTHENTICATED',
    },
}),

authMiddleware: function ({req}) {
    
}
}