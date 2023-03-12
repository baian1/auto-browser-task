import config from "../abt.config";
import { ConfigInterface } from "./type";

export const defineConfig = (config: ConfigInterface) => {
  return config;
};

export const getConfig = () => {
  return config;
};
