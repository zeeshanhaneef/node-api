const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'My Node.js API', // Title of the API
        version: '1.0.0', // Version of the API
        description: 'This is the documentation of my Node.js API', // Description of the API
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT', // Optional
            },
        },
        schemas: {
            User: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        example: '123',
                    },
                    name: {
                        type: 'string',
                        example: 'Zeeshan',
                    },
                    email: {
                        type: 'string',
                        example: 'zeeshan@mail.com',
                    },
                    age: {
                        type: 'number',
                        example: '1',
                    }
                },
                required: ['name', 'email']
            },
            Users : {
                type : 'array',
                items : {
                    $ref: '#/components/schemas/User',
                  },
            },
            Customer: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        example: '123',
                    },
                    name: {
                        type: 'string',
                        example: 'Zeeshan',
                    }
                }
            },
            Customers : {
                type : 'array',
                items : {
                    $ref: '#/components/schemas/Customer',
                  },
            }
        }
    },
    security: [{
        bearerAuth: [],
    }],
    servers: [
        {
            url: 'http://localhost:3000', // Server URL
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;