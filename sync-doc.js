const urllib = require('urllib')
const path = require('path')
const fs = require('fs-extra')
const rm = require('rimraf')
const pinyin = require('pinyin')

const docPath = path.resolve(__dirname, 'docs/sync-doc')
const configPath = path.resolve(__dirname, 'docs/.vitepress/sync-doc.json')
const DOC_DIR = 'be8d215717ed9c4eef808242a9039380'
const DOC_DOMAIN = 'https://docshare.uban360.com'
async function httpGet (url) {
  return new Promise((resolve, reject) => {
    urllib.request(url, {
      dataType: 'json'
    }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

async function getDirs () {
  const { data: { share, detail } } = await httpGet(`${DOC_DOMAIN}/docapi/share/detail?shareId=${DOC_DIR}`)
  // 生成新文件到 sync-doc
  rm.sync(docPath)
  fs.ensureDirSync(docPath)
  const result = []
  genDirsAndMd(result, detail.branch.catelogs, { branchId: detail.branch.id, projectId: detail.id })
  return JSON.stringify(result, null, 2)
}

function genDirsAndMd (result, arr, { path: pPath = '/sync-doc/', branchId, projectId }) {
  // const result = []
  arr.forEach(catelog => {
    const item = { text: catelog.name, branchId, projectId }
    const isDoc = !!catelog.catelogId
    const pinyin = getPinYin(catelog.name)
    if (isDoc) {
      item.link = path.join(pPath, pinyin)
      item.shareId = DOC_DIR
      item.docId = catelog.id
      item.url = `https://docs.uban360.com/project-detail/article/${branchId}/${projectId}/${catelog.id}`
      // 生成文章
      fs.outputFileSync(path.join(docPath, '../', item.link + '.md'), `# ${item.text}\n<docshare-wrap />`)
    } else {
      item.path = path.join(pPath, pinyin)
      item.children = []
      // 生成目录
      fs.ensureDirSync(path.join(docPath, pinyin))
      if (catelog.children.length) {
        genDirsAndMd(item.children, catelog.children, item)
      }
    }
    // console.log(item)
    result.push(item)
  })
  // return result
}

function getPinYin (str) {
  return pinyin(str, {
    style: pinyin.STYLE_NORMAL, // 设置拼音风格
    heteronym: true,
    segment: true // 启用分词
    // group: true
  }).flat().join('_')
}

async function run () {
  const json = await getDirs()
  await fs.outputFile(configPath, json)
  console.log('写入配置完成')
}

run()
// console.log(getPinYin('团队风格 style'))
