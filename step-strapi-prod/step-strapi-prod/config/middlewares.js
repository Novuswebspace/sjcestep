module.exports = [
  "strapi::logger",
  "strapi::errors",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  {
    name: "strapi::body",
    config: {
      jsonLimit: "100mb",
      formLimit: "100mb",
      textLimit: "100mb",
      formidable: {
        maxFileSize: 100 * 1024 * 1024, // 100 MB in bytes
      },
    },
  },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
  "strapi::security",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "https//minio-ui.sjcestep.in:9000",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "https://minio-ui.sjcestep.in:9000",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
];
