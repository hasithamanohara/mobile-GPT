import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
      definition: {
            openapi: '3.0.0',
            info: {
                  title: 'Your API',
                  version: '1.0.0',
                  description: 'API Documentation',
            },
            servers: [{ url: 'http://localhost:3030', description: 'Local server' },
            { url: 'https://production-url.com', description: 'Production server' }
            ],
            components: {
                  securitySchemes: {
                        bearerAuth: {
                              type: 'http',
                              scheme: 'bearer',
                              bearerFormat: 'JWT'
                        }
                  }
            }
      },
      apis: ['../routes/*.js'],
};

export default swaggerJSDoc(swaggerOptions);