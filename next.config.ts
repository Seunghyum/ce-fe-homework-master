import type { NextConfig } from "next";

import dotenv from "dotenv";

const nextConfig: NextConfig = {
  env: dotenv.config().parsed,
};

export default nextConfig;
