import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import path from "path";

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const devConfig: Configuration = {
    mode: "development",
    stats: "normal",
    devServer: {
        historyApiFallback: true,
        hot: true,
        port: 3000,
        static: {
            directory: path.resolve(__dirname, "dist"),
            watch: true,
        },
        client: {
            logging: "warn",
            overlay: {
                errors: true,
                warnings: false,
            },
            progress: true,
        },
        proxy: {
            "/api": "http://localhost:5000",
        },
    },
};

export default devConfig;
