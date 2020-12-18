'use strict'

// https://github.com/GNOME/glabels/blob/master/templates/avery-us-templates.xml
// <Template brand="Avery" part="5167" size="US-Letter" _description="Return Address Labels">
//   <Meta category="label"/>
//   <Meta category="mail"/>
//   <Label-rectangle id="0" width="1.75in" height="0.5in" round="0.0625in">
//     <Markup-margin size="0.0625in"/>
//     <Layout nx="4" ny="20" x0="0.28125in" y0="0.5in" dx="2.0625in" dy="0.5in"/>
//   </Label-rectangle>
// </Template>

module.exports = {
  cols: 4,
  rows: 20,
  left_margin: 0.28125 * 72,
  top_margin: 0.5 * 72,
  label_width: 1.75 * 72,
  label_height: 0.5 * 72,
  label_padding: 5,
  label_padding_top_adjust: -2,
  x_stride: 2.0625 * 72,
  y_stride: 0.5 * 72,
  radius: 0.0625 * 72
}
