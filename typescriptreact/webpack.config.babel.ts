import { Configuration, } from "webpack";
import { merge } from "webpack-merge";

import commonConfig from "./webpack.common";
import developmentConfig from "./webpack.dev";
import productionConfig from "./webpack.prod";

export default (env: NodeJS.ProcessEnv, argv: { mode: string; }): Configuration => {
    switch (argv.mode) {
        case "development":
            return merge(commonConfig, developmentConfig);
        case "production":
            return merge(commonConfig, productionConfig);

        default:
            throw new Error("No matching configuration was found!");
    }
};
