const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GharSewa Backend API's documentation",
      version: "1.0.0",
      description: "API documentation of GharSewa",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["../Routes/*.js"], // where your route files are
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
