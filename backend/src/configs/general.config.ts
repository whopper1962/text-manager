export const generalConfig = {
  port: process.env.APP_PORT || 3000,
  cors: {
    credentials: true,
    origin: process.env.VUE_APP_ORIGIN || "",
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "HEAD"],
    allowedHeaders: ["Content-Type"],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  },
};
