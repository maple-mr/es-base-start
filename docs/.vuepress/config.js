module.exports = {
    title: 'ES6入门笔记',
    description: 'es6基础入门笔记',
    base: "/",
    head: [
        [
            'link', {rel: 'icon', href: '/assets/logo.png'}
        ]
    ],
    "themeConfig": {
        "logo": '/assets/logo.png',
        "nav": [
          { "text": "文章", "link": "/words/" },
          {
            "text": "示例代码",
            "items": [
              {"text": "站内示例", "link": "/example/"},
              {"text": "Gitee源码", "link": "https://gitee.com/Feng-ye_BG/es6-base-start?_from=gitee_search"}
            ]
          },
          { "text": "@maple主站", "link": "http://www.maple.ink/" }
        ],
        "sidebar": [
          "/words/intro/",
          "/words/es6intro/",
          "/words/letCommand/",
          "/words/symbol/",
          "/words/operaExpand/",
          "/words/varStructureSplit/",
          "/words/stringExpand/",
          "/words/numberExpand/",
          "/words/arrayExpand/",
          "/words/functionExpand/",
          "/words/objectExpand/",
          "/words/setMap/",
          "/words/proxy/",
          "/words/reflect/",
          "/words/promise/",
          "/words/iterator/",
          "/words/generator/",
          "/words/async/",
          "/words/class/",
          "/words/classExtend/",
          "/words/module/",
          "/words/asyncIterator/",
          "/words/arrayBuffer/",
          "/words/proposals/",
          "/words/conclusion/"
        ]
    },
    plugins: ['@vuepress/back-to-top', '@vuepress/nprogress', 'reading-progress']
}
