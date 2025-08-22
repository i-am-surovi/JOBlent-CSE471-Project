import * as Sentry from "@sentry/node";
import mongoose from "mongoose";
import 'dotenv/config';

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
});

// Attach Express request handler (instrumentation)
export const attachSentry = (app) => {
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler()); // optional for performance
};
