const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CSE341 Contacts API',
            version: '1.0.0',
            description: 'API documentation for the CSE341 Contacts REST API',
        },
        servers: [
            {
                url: 'http://localhost:3410',
                description: 'Local server',
            },
            {
                url: 'https://cse341-contacts-mjay.onrender.com',
                description: 'Production server',
            }
        ],
        components: {
            schemas: {
                Contact: {
                    type: 'object',
                    required: ['firstName', 'lastName', 'email'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Auto-generated ID (do not include in request)',
                            readOnly: true
                        },
                        firstName: {
                            type: 'string',
                            example: 'Jane'
                        },
                        lastName: {
                            type: 'string',
                            example: 'Smith'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'janesmith@example.com'
                        },
                        favoriteColor: {
                            type: 'string',
                            example: 'Green'
                        },
                        birthday: {
                            type: 'string',
                            format: 'date',
                            example: '1985-07-22'
                        }
                    }
                }
            }
        }

    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
