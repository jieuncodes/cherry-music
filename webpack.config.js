import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_JS = "./src/client/js/";

const config = {
  //delete watch when deploy
  watch: true,
  entry: {
    main: BASE_JS + "main.js",
    player: BASE_JS + "player.js",
    playerScreen: BASE_JS + "playerScreen.js",
    addPlaylist: BASE_JS + "addPlaylist.js",
    playerScreenNav: BASE_JS + "playerScreenNav.js",
    loading: BASE_JS + "loading.js",
    slidingSearch: BASE_JS + "slidingSearch.js",
    playlist: BASE_JS + "playlist.js",

    "/util/formatTime": BASE_JS + "util/formatTime.js",
    "/util/checkUserId": BASE_JS + "util/checkUserId.js",
    "/util/marquee": BASE_JS + "util/marquee.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};

export default config;
