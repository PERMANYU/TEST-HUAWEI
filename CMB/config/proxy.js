module.exports = {
    '/dev/proxy/api':{
        target:'http://10.145.209.146:8065',
        changeOrigin: true,
        pathRewrite:{
            '^/dev/proxy/api': '/'
        }
    },
    '/release/proxy/api':{
        target:'http://10.145.131.187:8169',
        changeOrigin: true,
        pathRewrite:{
            '^/release/proxy/api': '/'
        }
    },
    '/ue/proxy/api':{
        target:'http://fe.ue.sh.ctc.com',
        changeOrigin: true,
        pathRewrite:{
            '^/ue/proxy/api': '/'
        }
    },
    '/pr/proxy/api':{
        target:'http://fe.pr.sh.ctc.com',
        changeOrigin: true,
        pathRewrite:{
            '^/pr/proxy/api': '/'
        }
    }
}