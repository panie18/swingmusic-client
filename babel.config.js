module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          extensions: [".tsx", ".ts", ".js", ".json"],
          alias: {
            "@api": "./src/api",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@navigation": "./src/navigation",
            "@theme": "./src/theme",
            "@store": "./src/store",
            "@utils": "./src/utils",
            "@hooks": "./src/hooks",
            "@config": "./src/config"
          }
        }
      ]
    ]
  };
};