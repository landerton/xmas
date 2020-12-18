'use strict'

const config = require('config')
const render = require('./render')

const generateLabels = async function () {
  try {
    const template = require(`../config/${config.get('returns.template')}`)
    const addresses = Array(config.get('returns.labels_needed')).fill(config.get('returns.address'))
    const filename = `${config.get('build_path')}/${config.get('returns.filename')}`
    const stream = render(
      filename,
      template,
      addresses,
      config.get('font_title'),
      config.get('font_address'),
      config.get('returns.ideal_font_size'),
      config.get('returns.align'),
      config.get('returns.show_outline'),
      config.get('returns.offset_col'),
      config.get('returns.offset_row')
    )
    if (stream) {
      stream.addListener('finish', () => {
        process.exit(0)
      })
    }
  }
  catch (error) {
    console.log(error)
    process.exit(1)
  }
}

generateLabels()
