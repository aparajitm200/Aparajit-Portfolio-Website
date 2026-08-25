const fs = require('fs')
const path = require('path')
const https = require('https')

const dest = path.join(__dirname, 'public', 'images')
const dirs = ['uiux', 'video', 'motion', 'other']

dirs.forEach(d => {
  const p = path.join(dest, d)
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true })
})

const download = (url, dest) => new Promise((resolve, reject) => {
  const file = fs.createWriteStream(dest)
  https.get(url, (response) => {
    if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
      https.get(response.headers.location, (res) => {
        res.pipe(file)
        file.on('finish', () => { file.close(); resolve() })
      }).on('error', reject)
    } else {
      response.pipe(file)
      file.on('finish', () => { file.close(); resolve() })
    }
  }).on('error', (err) => {
    fs.unlink(dest, () => {})
    reject(err)
  })
})

async function run() {
  console.log('Downloading...')
  for (let i = 1; i <= 4; i++) {
    await download(`https://picsum.photos/seed/uiux${i}/1200/800`, path.join(dest, 'uiux', `img-${i}.jpg`))
    await download(`https://picsum.photos/seed/other${i}/1200/800`, path.join(dest, 'other', `img-${i}.jpg`))
  }
  for (let i = 1; i <= 3; i++) {
    await download(`https://picsum.photos/seed/video${i}/1200/800`, path.join(dest, 'video', `img-${i}.jpg`))
    await download(`https://picsum.photos/seed/motion${i}/1200/800`, path.join(dest, 'motion', `img-${i}.jpg`))
  }
  console.log('Done.')
}

run()
