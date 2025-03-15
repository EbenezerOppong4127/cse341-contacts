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
                url: 'https://cse341-contacts-mjay.onrender.com',
                description: 'Production server',
            },
            {
                url: 'http://localhost:3410',
                description: 'Local server',
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
                            description: 'First name of the contact'
                        },
                        lastName: {
                            type: 'string',
                            description: 'Last name of the contact'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email address of the contact'
                        },
                        favoriteColor: {
                            type: 'string',
                            description: 'Favorite color of the contact'
                        },
                        birthday: {
                            type: 'string',
                            format: 'date',
                            description: 'Birthday in YYYY-MM-DD format',
                            example: 'yy-mm-dd'
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
