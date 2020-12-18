const csv = require('csv')
const fs = require('fs')
const path = require('path')

const csvStream = async (csvFile, transform, output) => {
  const file = path.resolve(csvFile)
  const readStream = fs.createReadStream(file)
  const parser = csv.parse({ columns: true, ltrim: true, rtrim: true })
  const transformer = csv.transform(transform, { parallel: 20 })
  const toFile = csv.transform(output, { consume: true, parallel: 20 })

  readStream.pipe(parser).pipe(transformer).pipe(toFile)

  return new Promise((resolve, reject) => {
    toFile.on('end', () => {
      resolve()
    })

    toFile.on('error', (err) => {
      console.log(err)
      reject(err)
    })
  })
}

module.exports = csvStream
