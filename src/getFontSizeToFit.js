'use strict'

const getFontSizeToFit = function (doc, text, font, idealSize, width) {
  // If array text lines, do recursion
  if (Array.isArray(text)) {
    return text.reduce((min, i) => {
      return Math.min(min, getFontSizeToFit(doc, i, font, idealSize, width))
    }, idealSize)
  }

  // Else find the biggest font size that will fit
  doc.font(font).fontSize(idealSize)
  const realWidth = doc.widthOfString(text)

  if (realWidth <= width) {
    return idealSize
  }

  return idealSize * width / realWidth
}

module.exports = getFontSizeToFit
