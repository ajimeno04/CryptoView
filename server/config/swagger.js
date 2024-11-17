const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CryptoView API",
      version: "1.0.0",
      description: "API documentation for CryptoView project",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local development server",
      },
    ],
  },
  apis: ["./server/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerSpec,
};

