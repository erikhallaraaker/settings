import { Configuration, EntryObject, Module } from "webpack";
import { SubresourceIntegrityPlugin } from "webpack-subresource-integrity";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";
import { InjectManifest } from "workbox-webpack-plugin";

const prodConfig: Configuration = {
    mode: "production",
    output: {
        crossOriginLoading: "anonymous",
    },
    performance: {
        maxEntrypointSize: 1_024_000,
        maxAssetSize: 600_000,
    },
    optimization: {
        minimize: true,
        mergeDuplicateChunks: true,
        runtimeChunk: {
            name: (entrypoint: EntryObject): string => `runtime_${entrypoint.name}`,
        },
        moduleIds: "deterministic",
        chunkIds: "deterministic",
        splitChunks: {
            automaticNameDelimiter: "_",
            chunks: "all",
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            minChunks: 1,
            minSize: 20_000,
            cacheGroups: {
                vendor: {
                    test: /[/\\]node_modules[/\\]/,
                    name (module: Module): string {
                        const [, packageName] = module.context?.match(/[/\\]node_modules[/\\](.*?)([/\\]|$)/) as RegExpMatchArray;

                        return `npm.${packageName.replace("@", "")}`;
                    },
                    chunks: "all",
                },
                common: {
                    test: /[/\\]src[/\\]components[/\\]/,
                    chunks: "all",
                    minSize: 0,
                },
            },
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new SubresourceIntegrityPlugin(),
        new WebpackManifestPlugin({}),
        new InjectManifest({
            swSrc: "./src/sw.ts",
            swDest: "./service-worker.js",
        }),

    ],
};

export default prodConfig;
