import swaggerJsdoc, { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Talent Bridge Gaza API',
      version: '1.0.0',
      description: 'API documentation for the Talent Bridge Gaza project',
    },
    servers: [
      {
        url: 'http://localhost:5000', //TODO: Replace with prod URL when deployment
      },
    ],
  },
  apis: ['./src/routes/**/*.ts', './src/docs/*.ts'], // Adjust these paths
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
