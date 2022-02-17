const withPWA = require("next-pwa");

module.exports = withPWA({
  images: {
    domains: ["res.cloudinary.com"],
  },
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
  },
  reactStrictMode: true,
});
