'use strict'

const config = require('config')
const csvStream = require('./csvStream')
const render = require('./render')

const generateLabels = async function () {
  try {
    const addresses = []

    await csvStream(
      config.get('labels.input'),

      (record) => {
        if (!record.exclude) {
          const { exclude, ...theRest } = record
          return Object.values(theRest)
        }
      },

      (data, callback) => {
        addresses.push(data)
        callback(null, data)
      }
    )

    const template = require(`../config/${config.get('labels.template')}`)
    const filename = `${config.get('build_path')}/${config.get('labels.filename')}`
    const stream = render(
      filename,
      template,
      addresses,
      config.get('font_title'),
      config.get('font_address'),
      config.get('labels.ideal_font_size'),
      config.get('labels.align'),
      config.get('labels.show_outline'),
      config.get('labels.offset_col'),
      config.get('labels.offset_row')
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
