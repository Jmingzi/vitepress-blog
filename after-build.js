const fs = require('fs-extra')
const path = require('path')
const html = path.resolve(__dirname, 'docs/.vitepress/dist/index.html')
const htmlDir = path.resolve(__dirname, 'docs/.vitepress/dist/detail')
const json = require('./docs/.vitepress/sync-doc.json')

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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css">
    <script src="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js"></script>
  </head>`)
      .replace('</title>', item ? `</title>
    <meta name="keywords" content="${item.tag.split('、').join('，')}" />` : '</title>')
      .replace('jmingzi的个人博客', (item ? (item.tag.split('、').join('，') + '，') : '') + 'jmingzi的个人博客')
  )
}

const find = (id) => {
  for (const it of json) {
    for (const child of it.children) {
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

