const path = require('path')
const debug = process.env.NODE_ENV !== 'production'
const finance = require("./static/mock/tableData.json")
const finance01 = require("./static/mock/tableData1.json")
const company = require("./static/mock/company.json")
const Preface = require("./static/mock/Preface.json")
const PrefaceData = require("./static/mock/PrefaceData.json")
const chart = require("./static/mock/chartData.json")
const chart1 = require("./static/mock/chartData.1.json")

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    baseUrl: '/', // 根域上下文目录
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
    lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    runtimeCompiler: true, // 运行时版本是否需要编译
    transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    productionSourceMap: true, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    configureWebpack: config => {
        // webpack配置，值位对象时会合并配置，为方法时会改写配置
        if (debug) {
            // 开发环境配置
            config.devtool = 'cheap-module-eval-source-map'
            // 生产环境配置
        } else {}
        config.resolve = {
            extensions: ['.js', '.vue', '.json', ".css"],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': resolve('src'),
                '@c': resolve('src/components'),
                '@a': resolve('src/assets'), // 配置静态图片引入别名，引用图片时前面加～,在css中引入则加～
                '~api': resolve('src/api'),
                '@v': resolve('src/views'),
                "utils": resolve('src/utils')

            }
        }

        // Object.assign(config, { // 开发生产共同配置
        //     resolve: {
        //         alias: {
        //             '@': path.resolve(__dirname, './src'),
        //             '@c': path.resolve(__dirname, './src/components'),
        //             'vue$': 'vue/dist/vue.esm.js'
        //         }
        //     }
        // })
    },
    chainWebpack: config => { // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
        if (debug) {
            // 本地开发配置
        } else {
            // 生产开发配置
        }
    },
    parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
    pluginOptions: { // 第三方插件配置
    },
    pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    },
    devServer: {
        open: false,
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        // proxy: 'http://localhost:8081/api/', // 配置跨域处理,只有一个代理
        proxy: { // 配置跨域
            '/apis': {
                target: 'http://192.168.2.237:8005',
                // target: 'http://10.22.199.116:8081/',//ip以后会变,不建议用
                // target:'https://www.easy-mock.com/',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/apis': '/'
                }
            }
        },
        // 自定义加载数据
        before: app => {

            // http://localhost:8080/api/qwe
            app.get('/api/qwe', (req, res) => {
                    res.json(company)
                }),
                app.get('/api/10101/201803/0002', (req, res) => {
                    res.json(finance)
                }),
                app.get('/api/10101/201803/0001', (req, res) => {
                    res.json(finance01)
                }),
                app.get('/api/Preface', (req, res) => {
                    res.json(Preface)
                }),
                app.get('/api/PrefaceData', (req, res) => {
                    res.json(PrefaceData)
                }),
                app.get('/api/chart', (req, res) => {
                    res.json(chart)
                }),
                app.get('/api/chart1', (req, res) => {
                    res.json(chart1)
                })


        },

        // vue-cli 解决Invalid Host header,
        // compress: true,
        disableHostCheck: true, // That solved it
    }
}