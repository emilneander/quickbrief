import withTM from "next-transpile-modules";
export default withTM(["gcp-metadata"])({
  webpack5: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
});
