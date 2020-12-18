'use strict'

const Pdfkit = require('pdfkit')
const fs = require('fs')
const getFontSizeToFit = require('./getFontSizeToFit')

const render = function (
  filename,
  template,
  addresses,
  fontTitle,
  fontAddress,
  idealFontSize = 15,
  align = 'left',
  showOutline = false,
  offsetCol = 1,
  offsetRow = 1
) {
  try {
    const doc = new Pdfkit()
    const pdfStream = fs.createWriteStream(filename)
    doc.pipe(pdfStream)

    for (let i = 0; i < addresses.length; i++) {
      const offset = (template.cols * (offsetRow - 1)) + offsetCol - 1
      const index = i + offset

      if ((index !== 0) && (index % (template.cols * template.rows) === 0)) {
        // Add a new page
        doc.addPage()
      }

      const row = (index / template.cols | 0) % (template.rows)
      const col = index % template.cols
      const lines = addresses[i]

      // You got to have at least two lines
      if (!lines || lines.length < 2) {
        continue
      }

      const title = lines[0]
      const address = lines.slice(1)

      // Draw label rectangle
      if (showOutline) {
        doc.lineWidth(1)
        doc.roundedRect(
          template.left_margin + template.x_stride * col,
          template.top_margin + template.y_stride * row,
          template.label_width,
          template.label_height,
          template.radius
        ).stroke()
      }

      const titleFontSize = getFontSizeToFit(
        doc,
        title,
        fontTitle,
        idealFontSize,
        template.label_width - template.label_padding * 2
      )
      const addressFontSize = getFontSizeToFit(
        doc,
        address,
        fontAddress,
        idealFontSize,
        template.label_width - template.label_padding * 2
      )
      const biggestFontSize = Math.min(titleFontSize, addressFontSize)

      // Write the name / title / first line
      doc.font(fontTitle).fontSize(biggestFontSize).text(
        title,
        template.left_margin + template.label_padding + template.x_stride * col,
        template.top_margin + template.y_stride * row + template.label_padding + template.label_padding_top_adjust,
        {
          align,
          width: template.label_width,
          height: template.label_height / (lines.length || 1)
        }
      )

      const titleHeight = doc.currentLineHeight() + template.label_padding + template.label_padding_top_adjust

      // Write the remaining address lines
      doc.font(fontAddress).fontSize(biggestFontSize)
      for (let j = 0; j < address.length; j++) {
        doc.text(
          address[j],
          template.left_margin + template.label_padding + template.x_stride * col,
          template.top_margin + template.y_stride * row + titleHeight + doc.currentLineHeight() * j,
          {
            align,
            width: template.label_width,
            height: template.label_height / (address.length || 1)
          }
        )
      }
    }

    doc.end()
    return pdfStream
  }
  catch (e) {
    console.log(e)
  }
}

module.exports = render
