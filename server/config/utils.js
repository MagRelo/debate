
exports.round = (value, places) => {
  places = places || 4
  return +(Math.round(value + "e+" + places)  + "e-" + places);
}

exports.isNumeric = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
