const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGOLAB_YELLOW_URI,
  },
  default: {
    SECRET: "SUPERSECRETPASSWORDFORJWT",
    DATABASE: process.env.MONGODB_TEST || "mongodb://localhost:27017/test",
    PORT: 8081,
  },
};

exports.get = function get(env) {
  // console.log(config);
  return config[env] || config.default;
};
