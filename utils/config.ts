function requiredEnv(dotEnvKey: string): string {
  const dotEnvValue = process.env[dotEnvKey];

  if (dotEnvValue) {
    return dotEnvValue;
  } else {
    throw new Error(`Missing required environment variable: ${dotEnvKey}`);
  }
}

export const config = {
  baseUrl: requiredEnv("BASE_URL"),

  browser: {
    headless: requiredEnv("HEADLESS") === "true",
    viewport: {
      width: Number(requiredEnv("VIEWPORT_WIDTH")),
      height: Number(requiredEnv("VIEWPORT_HEIGHT")),
    },
  },
  timeout: {
    cucumber: Number(requiredEnv("CUCUMBER_TIMEOUT")),
  },
};
