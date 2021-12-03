const fs = require('fs-extra')
const path = require('path')
const html = path.resolve(__dirname, 'docs/.vitepress/dist/index.html')

fs.outputFile(
  html,
  fs.readFileSync(html, 'utf8')
    .replace('</body>', `
    <script src="https://s19.cnzz.com/z_stat.php?id=1274714892&web_id=1274714892"></script>
  </body>`)
    .replace('</head>', `  <meta name="google-site-verification" content="TbvyCK9sEBOqr5fAbXQ2uLNMgTDgn4wmpBM747LhOwk" />
    <style>
      a[title="站长统计"] {
        display: none!important;
      }
    </style>
  </head>`)
)
