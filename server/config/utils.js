
exports.round = (value, places) => {
  return +(Math.round(value + "e+" + places)  + "e-" + places);
}

exports.isNumeric = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
