'use strict'

// https://github.com/GNOME/glabels/blob/master/templates/avery-us-templates.xml
// <Template brand="Avery" part="5160" size="US-Letter" _description="Address Labels">
//   <Meta category="label"/>
//   <Meta category="mail"/>
//   <Label-rectangle id="0" width="2.625in" height="1in" round="0.0625in">
//     <Markup-margin size="0.0625in"/>
//     <Layout nx="3" ny="10" x0="0.15625in" y0="0.5in" dx="2.78125in" dy="1in"/>
//   </Label-rectangle>
// </Template>

module.exports = {
  cols: 3,
  rows: 10,
  left_margin: 0.15625 * 72,
  top_margin: 0.5 * 72,
  label_width: 2.625 * 72,
  label_height: 1 * 72,
  label_padding: 10,
  label_padding_top_adjust: 2,
  x_stride: 2.78125 * 72,
  y_stride: 1 * 72,
  radius: 0.0625 * 72
}
