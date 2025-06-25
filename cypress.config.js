import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config(); // Assim que realizar a importação, é necessário criar esse "statement" para carregar as variáveis do .env

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_baseUrl || "https://petstore.swagger.io/v2",
    setupNodeEvents(on, config) {
      // Você pode adicionar outros eventos aqui, se necessário
      return config; // Necessário retornar o parametro
    },
    env: {
      // Outras variáveis do .env podem ser adicionadas aqui
      API_KEY: process.env.API_KEY,
      USERNAME: process.env.USERNAME,
      PASSWORD: process.env.PASSWORD,
    },
  }
});
