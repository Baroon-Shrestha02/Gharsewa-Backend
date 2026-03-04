import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GharSewa Backend API",
      version: "1.0.0",
      description: "API documentation for GharSewa - Home services platform",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
          description: "JWT token stored in httpOnly cookie (set via login)",
        },
      },
    },
    security: [],
  },
  apis: [path.join(__dirname, "../Routes/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
