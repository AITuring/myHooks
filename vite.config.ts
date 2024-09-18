import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
// import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
import tailwindcss from  'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
    css: {
        postcss: {
            plugins: [tailwindcss(), autoprefixer()] as Plugin[],
        },
    },
    plugins: [
        react(),
        // viteCompression({
        //     verbose: true, // 是否在控制台中输出压缩结果
        //     disable: false,
        //     threshold: 10240, // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
        //     algorithm: "gzip", // 压缩算法，可选['gzip'，' brotliccompress '，'deflate '，'deflateRaw']
        //     ext: ".gz",
        //     deleteOriginFile: true, // 源文件压缩后是否删除(我为了看压缩后的效果，先选择了true)
        // }),
        visualizer({ open: true }),
        ViteImageOptimizer({
            jpg: {
                quality: 50, // jpg 压缩质量
            },
            png: {
                quality: 80, // png 压缩质量
            },
            svg: {
                svgo: {
                    plugins: [
                        {
                            removeViewBox: false, // 不要移除svg的viewbox属性
                        },
                    ],
                },
            },
        })
    ],
    resolve: {
        alias: {
            "@": "/src",
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./src/setupTests.ts"],
        coverage: {
            provider: "v8", // or 'istanbul'
            reporter: ["html"],
        },
    },
    build: {
        // lib: {
        //     entry: "src/main.tsx",
        //     name: "MyHooks", // UMD 模块名称
        //     formats: ["es", "cjs", "umd"], // 输出格式
        //     fileName: (format) => `my-library.${format}.js`, // 输出文件名
        // },
        rollupOptions: {
            // external: ["react", "react-dom"],
            // output: [
            //     {
            //         format: "es",
            //         entryFileNames: "[name].es.js",
            //         chunkFileNames: "chunks/[name]-[hash].js",
            //         dir: "dist/es",
            //         globals: {
            //             react: "React",
            //             "react-dom": "ReactDOM",
            //         },
            //     },
            //     {
            //         format: "cjs",
            //         entryFileNames: "[name].cjs.js",
            //         chunkFileNames: "chunks/[name]-[hash].js",
            //         dir: "dist/cjs",
            //         globals: {
            //             react: "React",
            //             "react-dom": "ReactDOM",
            //         },
            //     },
            //     {
            //         format: "umd",
            //         entryFileNames: "[name].umd.js",
            //         name: "MyHooks",
            //         globals: {
            //             react: "React",
            //             "react-dom": "ReactDOM",
            //         },
            //     },
            // ],

        },
        terserOptions: {
            compress: {
                drop_console: true, // 生产环境自动删除console
                pure_funcs: ["console.log"], // 压缩的时候删除所有的console
            },
        },
    },
});
