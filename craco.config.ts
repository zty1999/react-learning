import path from "path";
import fs from "fs";
import CracoLessPlugin from "craco-less";
import HtmlWebpackPlugin from "html-webpack-plugin";
import InlineChunkHtmlPlugin from "react-dev-utils/InlineChunkHtmlPlugin";


const resolve = (pathname: string) => path.resolve(__dirname, pathname);

function configureDevServer(devServerConfig, { env, paths, proxy, allowedHost }) {
  devServerConfig.historyApiFallback = {
    disableDotRule: true, //禁用，否则当访问/xxx.html时服务器会自动去掉.html重写url为/xxx
    index: paths.publicUrlOrPath,
    verbose: true,
  };
  return devServerConfig;
}

function configureWebpack(webpackConfig, { env, paths }) {
  const isEnvDevelopment = env === 'development';
  const isEnvProduction = env === 'production';
  //配置HtmlWebpackPlugin用来产生一个独立的HTML
  function mkHtmlWebpackPlugin(chunks, filename, template) {
    // console.log('paths', paths);
    // console.log('template', template);
    // console.log('filename', filename);
    // console.log('favicon', path.join(paths.appPublic, "favicon.ico"));

    return new HtmlWebpackPlugin({
      inject: true,
      template: template || paths.appHtml,
      chunks,
      filename: filename + '.html',
      // favicon:path.join(paths.appPublic, "favicon.ico"),
      publicPath: './',
      ...isEnvProduction ? {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        }
      } : undefined
    });
  }

  const apps = {};

  //遍历src/apps 为所有子目录创建一个webpack入口，并配置对应的HtmlWebpackPlugin
  const appsDir = path.join(paths.appSrc, 'apps');
  if(!fs.existsSync(appsDir)) return [];
  const fileNames = fs.readdirSync(appsDir);
  const htmlWebpackPlugins: any[] = [];
  fileNames.forEach(fileName => {
    const filePath = path.join(appsDir, fileName);
    const file = fs.statSync(filePath);
    if (file.isDirectory()) {
      apps[fileName] = fs.existsSync(path.join(filePath,'src', "index.tsx"))? path.join(filePath,'src', "index.tsx"):path.join(filePath,'src', "index.js");
      let template: string | undefined = path.join(paths.appPublic, fileName + ".html");
      let indextempl: string | undefined = path.join(paths.appPublic,"index.html");
      if (!fs.existsSync(template)){// public文件夹中没有子项目对应html文件 则根据 index.html 生成
        // template = undefined;
        let templateContent = fs.readFileSync(indextempl);
        // console.log('templateContent',templateContent);
        fs.writeFileSync(template,templateContent)
      } 
      htmlWebpackPlugins.push(mkHtmlWebpackPlugin([fileName] as never[], fileName, template));
    }
  });
  // console.log('htmlWebpackPlugins', htmlWebpackPlugins);


  //main为create-react-app默认创建的入口，保留下来。这样既可以实现原始的单入口，又可以实现多入口
  webpackConfig.entry = {
    main: webpackConfig.entry,
    ...apps
  };
  // console.log('entry', webpackConfig.entry);

  //覆盖默认的plugins配置
  const defaultHtmlWebpackPluginIndex = webpackConfig.plugins.findIndex(plugin => plugin instanceof HtmlWebpackPlugin);
  webpackConfig.plugins.splice(defaultHtmlWebpackPluginIndex, 1, mkHtmlWebpackPlugin(["main"] as never[], "index", undefined),...htmlWebpackPlugins);
  // console.log(...htmlWebpackPlugins);


  //create-react-app默认用的是一个固定文件名，不适合多入口！改为按入口名生成输出文件名
  if (isEnvDevelopment)
    webpackConfig.output.filename = 'static/js/[name].bundle.js';
    webpackConfig.output.clean = true;
    webpackConfig.output.path = path.resolve(__dirname, "build");

  //共用runtime bundle
  webpackConfig.optimization.runtimeChunk = "single";

  // react-scripts默认在生产环境会将runtime chunk内嵌到html中
  // 禁用该行为，使用独立的js
  // 也可以在根目录新建.env文件，设置INLINE_RUNTIME_CHUNK=false来禁用
  // 不过配置入口太多了，不方便管理，直接这里用代码禁用好了
  const inlineChunkHtmlPluginIndex = webpackConfig.plugins.findIndex(plugin => plugin instanceof InlineChunkHtmlPlugin);
  if (inlineChunkHtmlPluginIndex >= 0)
    webpackConfig.plugins.slice(inlineChunkHtmlPluginIndex, 1);
  // console.log('plugins', webpackConfig.plugins);

  return webpackConfig;
}


const cracoConfig = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessloaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1da57a" },
            javascriptEnabled: true,
          },
        },
      },
    },

  ],
  // webpack
  devServer: configureDevServer,
  webpack: {
    alias: {
      "@": resolve("src"),
      "@airbnb": resolve("src/apps/airbnb/src"),
      "@rentHouse": resolve("src/apps/rentHouse/src"),
      components: resolve("src/components"),
      utils: resolve("src/utils"),
      // '@mui/styled-engine': '@mui/styled-engine-sc'
    },
    configure: configureWebpack,
    // configure: {
    //   // https://webpack.js.org/configuration/entry-context/#entry
    //   // entry: "./src/apps/rentHouse/index.js", //入口
    //   mode: "development",
    //   // 多入口 dependOn 允许入口之间共享模块
    //   entry: {
    //     index: path.resolve(__dirname, "./src/index.js"),
    //     rentHouse: {
    //       import: path.resolve(__dirname, "./src/apps/rentHouse/index.js"),
    //       // dependOn: "shared",
    //     },
    //     airbnb: {
    //       import: path.resolve(__dirname, "./src/apps/airbnb/index.js"),
    //       // dependOn: "shared",
    //     },
    //     // shared: "lodash",
    //   },
    //   output: {
    //     filename: "[name].bundle.js", //可重命名当有多个入口文件时，出口文件用name，说明打包的出口文件和入口文件名相同
    //     path: path.resolve(__dirname, "dist"),
    //   },
    //   optimization: {
    //     // https://bundlers.tooling.report/code-splitting/multi-entry/
    //     // 在条目之间共享代码拆分模块时，确保正确的模块实例化
    //     runtimeChunk: "single",
    //     // 拆分依赖 将常见的依赖项提取到现有的入口块或全新的块中
    //     splitChunks: {
    //       chunks: "all",
    //     },
    //   },
    // },
  },
};

export default cracoConfig;



