import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

interface EnvVars {
  PORT: number;
  API_URL: string;
}

const envSchema = Joi.object({
  PORT: Joi.number().required(),
  API_URL: Joi.string().required(),
}).unknown();

const { error, value: envVars } = envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error:${error.message}`);
}

const envConfig: EnvVars = {
  PORT: envVars.PORT,
  API_URL: envVars.API_URL,
};

export default envConfig;
