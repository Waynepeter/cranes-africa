
import CFG from '../config.json';

// Get server base url.
export const serverBaseURL = () => {
  let baseURL;

  if (CFG.environment === "development") {
    baseURL = `${CFG.development.scheme}://${CFG.development.host}:${CFG.development.port}`;
  }

  if (CFG.environment === "production") {
    baseURL = `${CFG.production.scheme}://${CFG.production.host}`;
  }

  return baseURL;
}

