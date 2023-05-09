const fs = require('fs-extra')
const path = require('path')
const html = path.resolve(__dirname, 'docs/.vitepress/dist/index.html')
const htmlDir = path.resolve(__dirname, 'docs/.vitepress/dist/detail')
const json = require('./docs/.vitepress/sync-doc.json')
const algoliasearch = require('algoliasearch')

const addMeta = (file, id) => {
  const item = id ? find(id) : null
  fs.outputFile(
    file,
    fs.readFileSync(file, 'utf8')
      .replace('</body>', `
    <script>
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?6d281b558aa5550c06d5ab68b17b734f";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
    </script>
  </body>`)
      .replace('</head>', `  <meta name="google-site-verification" content="TbvyCK9sEBOqr5fAbXQ2uLNMgTDgn4wmpBM747LhOwk" />
    <link rel="stylesheet" href="/gitalk/gitalk.css">
    <script src="/gitalk/gitalk.min.js"></script>
  </head>`)
      .replace('</title>', item ? `</title>
    <meta name="keywords" content="${item.tag.split('、').join('，')}" />` : '</title>')
      .replace('jmingzi的个人博客', (item ? (item.tag.split('、').join('，') + '，') : '') + 'jmingzi的个人博客')
  )
}

const find = (id) => {
  for (const it of json) {
    for (const child of it.items) {
      if (child.id === id) {
        return child
      }
    }
  }
}

addMeta(html)
fs.readdirSync(htmlDir).forEach(h => {
  addMeta(path.join(htmlDir, h), h.split('.')[0])
})

const algoliaResult = []
;(async () => {
  const algoliaToken = process.env.ALGOLIA
  if (!algoliaToken) {
    console.log('algolia admin key is empty!')
    return
  }

  const client = algoliasearch('QY2UJ6SVZF', algoliaToken)
  const index = client.initIndex('ym')

  for (const it of json) {
    for (const child of it.items) {
      // 读取文档内容
      const content = await fs.readFile(path.resolve(__dirname, 'docs/detail', `${child.id}.md`), 'utf8')
      algoliaResult.push({
        type: 'lvl1',
        url: `https://iming.work/detail/${child.id}.html`,
        content: content,
        hierarchy: {
          lvl0: it.text,
          lvl1: child.text
        },
      })
    }
  }
  console.log('algolia 更新数据', algoliaResult.length, '条')
  await index.clearObjects()
  await index.saveObjects(algoliaResult, { autoGenerateObjectIDIfNotExist: true })
})()
