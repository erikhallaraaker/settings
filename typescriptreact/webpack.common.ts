import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import path from "path";

const config: Configuration = {
    entry: {
        app: path.resolve(__dirname, "src", "index.tsx"),
    },
    output: {
        filename: "scripts/[name].[contenthash:8].js",
        chunkFilename: "scripts/[name].chunk.[contenthash:8].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                loader: "url-loader",
                options: {
                    limit: 8192,
                    name: "assets/[name].[contenthash:8].[ext]",
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "~": path.resolve(__dirname, "src"),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            title: "title",
        }),
        new ForkTsCheckerWebpackPlugin({
            async: false,
            typescript: {
                memoryLimit: 4096,
            },
        }),
        new FaviconsWebpackPlugin({
            logo: "./src/assets/favicon.ico",
            mode: "light",
        }),
        new ESLintPlugin({
            extensions: ["js", "jsx", "ts", "tsx"],
        }),
    ],
};

export default config;
