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

function getDocConfig () {
  return new Promise((resolve, reject) => {
    urllib.request('https://iming.work/demo/vitepress-blog/dist/sync-doc-config.json', {
      method: 'GET',
      dataType: 'json'
    }, (err, data) => {
      if (err) {
        fs.readFile(diffConfigPath, 'utf8').then(res => {
          resolve(res)
        }).catch(() => {
          resolve({})
        })
      } else {
        resolve(typeof data === 'string' ? JSON.parse(data) : data)
      }
    })
  })
}

async function genDirsAndMd (result) {
  const diffConfig = await getDocConfig()
  for (const year of Object.keys(result).reverse()) {
    let jsonItem = json.find(x => x.text.startsWith(year))
    if (!jsonItem) {
      jsonItem = { text: `${year}年`, children: [] }
      json.push(jsonItem)
    }

    const value = result[year]
    for (const item of value) {
      const needUpdate = !diffConfig[item.id] || (new Date(item.updatedAt).getTime() > diffConfig[item.id])
      jsonItem.children.push(item)
      item.link = `/${path.join('detail', item.id)}`
      if (needUpdate) {
        console.log(`生成[${item.text}]...`)
        // const pinyin = getPinYin(item.text)
        const { input } = (await getDetail(item.id)).toJSON()
        fs.outputFileSync(path.join(docPath, '../', `${item.link}.md`), `# ${item.text}\n\n${input}`)
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
  console.log('写入配置完成')
}

run()
