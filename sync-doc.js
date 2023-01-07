const urllib = require('urllib')
const path = require('path')
const fs = require('fs-extra')
// const rm = require('rimraf')
// const pinyin = require('pinyin')
const AV = require('leancloud-storage')

const appId = 'iYzWnL2H72jtQgNQPXUvjFqU-gzGzoHsz'
const appKey = 'OR3zEynwWJ7f8bk95AdiGFzJ'
const serverURLs = 'https://api.iming.work'
AV.init({ appId, appKey, serverURLs })

const docPath = path.resolve(__dirname, 'docs/detail')
const configPath = path.resolve(__dirname, 'docs/.vitepress/sync-doc.json')
const diffConfigPath = path.resolve(__dirname, './docs/public/sync-doc-config.json')
const json = []

function getAv () {
  const instance = new AV.Query('Article')
  instance.select(['title', 'tag', 'isOuterLink', 'type'])
  instance.notEqualTo('type', 'record-days')
  instance.descending('createdAt')
  return instance.find()
}

function getDetail (id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(new AV.Query('Article').get(id))
    }, 300)
  })
}

async function getDocConfig () {
  // return new Promise((resolve, reject) => {
  //   // urllib.request('http://localhost:3000/sync-doc-config.json', {
  // })
  const data = await urllib.request('https://iming.work/demo/vitepress-blog/dist/sync-doc-config.json', {
    method: 'GET',
    dataType: 'json'
  }).catch(() => {
    return fs.readFile(diffConfigPath, 'utf8').catch(() => ({}))
  })
  return typeof data === 'string' ? JSON.parse(data) : data
}

async function genDirsAndMd (result) {
  const diffConfig = await getDocConfig()
  for (const year of Object.keys(result).reverse()) {
    let jsonItem = json.find(x => x.text.startsWith(year))
    if (!jsonItem) {
      jsonItem = { text: `${year}年`, items: [] }
      json.push(jsonItem)
    }

    const value = result[year]
    for (const item of value) {
      // const needUpdate = !diffConfig[item.id] || (new Date(item.updatedAt).getTime() > diffConfig[item.id])
      /**
       * 不更新首页的链接不会生成，无法点击
       * @type {boolean}
       */
      const needUpdate = true
      jsonItem.items.push(item)
      item.link = `/${path.join('detail', item.id)}`
      if (needUpdate) {
        console.log(`生成[${item.text}] ${item.createdAt}...`)
        // const pinyin = getPinYin(item.text)
        const { input } = (await getDetail(item.id)).toJSON()
        const targetFile = path.join(docPath, '../', `${item.link}.md`)
        fs.outputFileSync(targetFile, `# ${item.text}\n\n${input}`)
        diffConfig[item.id] = Date.now()
      }
    }
  }

  return diffConfig
}

// function getPinYin (str) {
//   return pinyin(str.replace(/\//g, '_'), {
//     style: pinyin.STYLE_NORMAL, // 设置拼音风格
//     heteronym: true,
//     segment: true // 启用分词
//     // group: true
//   }).flat().join('').replace(/\s+/g, '')
// }

async function run () {
  console.log('开始执行...')
  // rm.sync(docPath)
  fs.ensureDirSync(docPath)

  const res = await getAv()
  const result = {}
  res.forEach(j => {
    const x = j.toJSON()
    const year = x.createdAt.split('T')[0].split('-')[0]
    if (!result[year]) {
      result[year] = []
    }
    if (!x.tag || !x.tag.startsWith('http')) {
      result[year].push({
        text: x.title,
        id: j.id,
        tag: x.tag,
        createdAt: x.createdAt,
        updatedAt: x.updatedAt
      })
    }
  })
  // 分组
  const diffConfig = await genDirsAndMd(result)
  await fs.outputFile(configPath, JSON.stringify(json, null, 2))
  await fs.outputFile(diffConfigPath, JSON.stringify(diffConfig, null, 2))
  /**
   * 重写文件时间
   * 如果文件未修改，通过 github action 自动拉取后的文件时间非文章编辑时间
   * 需要再次修改
   */
  json.reduce((arr, cur) => arr.concat(cur.items), []).forEach(item => {
    const targetFile = path.join(docPath, '../', `${item.link}.md`)
    if (fs.pathExistsSync(targetFile)) {
      fs.utimesSync(targetFile, new Date(item.createdAt), new Date(item.updatedAt))
    }
  })
  console.log('写入配置完成')
}

(async () => {
  try {
    await run()
  } catch (e) {
    console.log(e)
  }
})()
