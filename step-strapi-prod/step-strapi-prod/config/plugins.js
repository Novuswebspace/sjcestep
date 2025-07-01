module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "strapi-upload-minio-v4",
      providerOptions: {
        accessKey: env("MINIO_ACCESS_KEY", "6zRQVfOB6jAfZywJmxuw"),
        secretKey: env(
          "MINIO_SECRET_KEY",
          "BycEfRUrKs3ledlcO0jmabfkWnPmMm3T3ZArnmwe"
        ),
        bucket: env("MINIO_BUCKET", "step"),
        endPoint: env("MINIO_ENDPOINT", "minio-ui.sjcestep.in"),
        useSSL: env("MINIO_USE_SSL", true),
        host: env("MINIO_HOST", "https://minio-ui.sjcestep.in"),
        port: 443,
      },
    },
  },
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "smtp.zoho.in"),
        port: env("SMTP_PORT", 465),
        secure: true,
        auth: {
          user: env("SMTP_USER", "info@sjcestep.in"),
          pass: env("SMTP_PASS", "6D9PT63KvZwJ"),
        },
      },
      settings: {
        defaultFrom: "info@sjcestep.in",
        defaultReplyTo: "info@sjcestep.in",
      },
    },
  },
});
