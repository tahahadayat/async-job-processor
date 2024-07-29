import dotenv from "dotenv";
import { Secret } from "./src/utils/types";

dotenv.config();

const validateEnv = (value: string | undefined, name: string): string => {
  if (!value) {
    throw new Error(`Environment variable ${name} is not set`);
  }
  return value;
};

const secrets: Secret = {
  port: validateEnv(process.env.PORT, "PORT"),
  unsplash_access_key: validateEnv(process.env.UNSPLASH_ACCESS_KEY, "UNSPLASH_ACCESS_KEY"),
};

export default secrets;
