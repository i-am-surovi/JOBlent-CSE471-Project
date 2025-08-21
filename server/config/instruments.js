import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://46b17cc0907e0d8ac7c6dc296e98af91@o4509880528863232.ingest.us.sentry.io/4509880535875584",

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});