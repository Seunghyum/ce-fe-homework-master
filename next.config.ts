import type { NextConfig } from "next";

const dotenv = require("dotenv");

const nextConfig: NextConfig = {
  env: dotenv.config().parsed,
};

export default nextConfig;
