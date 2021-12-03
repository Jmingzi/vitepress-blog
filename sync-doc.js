// const urllib = require('urllib')
const path = require('path')
const fs = require('fs-extra')
const rm = require('rimraf')
const pinyin = require('pinyin')
const AV = require('leancloud-storage')

const appId = 'iYzWnL2H72jtQgNQPXUvjFqU-gzGzoHsz'
const appKey = 'OR3zEynwWJ7f8bk95AdiGFzJ'
const serverURLs = 'https://api.iming.work'
AV.init({ appId, appKey, serverURLs })

const docPath = path.resolve(__dirname, 'docs/sync-doc')
const configPath = path.resolve(__dirname, 'docs/.vitepress/sync-doc.json')
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

async function genDirsAndMd (result) {
  for (const year of Object.keys(result).reverse()) {
    let jsonItem = json.find(x => x.text.startsWith(year))
    if (!jsonItem) {
      jsonItem = { text: `${year}年`, children: [] }
      json.push(jsonItem)
    }

    const value = result[year]
    for (const item of value) {
      jsonItem.children.push(item)
      console.log(`生成[${item.text}]...`)
      // const pinyin = getPinYin(item.text)
      const { input } = (await getDetail(item.id)).toJSON()
      item.link = `/${path.join('sync-doc', item.id)}`
      fs.outputFileSync(path.join(docPath, '../', `${item.link}.md`), `# ${item.text}\n\n${input}`)
    }
  }
}

function getPinYin (str) {
  return pinyin(str.replace(/\//g, '_'), {
    style: pinyin.STYLE_NORMAL, // 设置拼音风格
    heteronym: true,
    segment: true // 启用分词
    // group: true
  }).flat().join('').replace(/\s+/g, '')
}

async function run () {
  rm.sync(docPath)
  fs.ensureDirSync(docPath)

  const res = await getAv()
  const result = {}
  res.forEach(j => {
    const x = j.toJSON()
    const year = x.updatedAt.split('T')[0].split('-')[0]
    if (!result[year]) {
      result[year] = []
    }
    if (!x.tag.startsWith('http')) {
      result[year].push({ text: x.title, id: j.id, tag: x.tag, updatedAt: x.updatedAt })
    }
  })
  // 分组
  await genDirsAndMd(result)
  await fs.outputFile(configPath, JSON.stringify(json, null, 2))
  console.log('写入配置完成')
}

run()
// console.log(getPinYin('团队风格 style'))
