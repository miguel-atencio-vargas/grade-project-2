
const loadAppConfig = () => {

  const env = process.env || {};

  // Prioritize PORT (Cloud Run) over API_PORT (Local)
  const api_port = parseInt(env.PORT || env.API_PORT, 10) || 8001;

  return {
    api_port,
  };
};

export default loadAppConfig;
