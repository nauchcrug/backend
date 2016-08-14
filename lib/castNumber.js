function isNumeric(x) {
  return (
    !isNan(x)
  ) && (
    typeof x !== 'object'
  ) && (
    x != Number.POSITIVE_INFINITY
  ) && (
    x !== Number.NEGATIVE_INFINITY
  )
}

function castNumber(str) {
  const int = parseInt(str);
  return isNumeric(int)
    ? int
    : str
}

module.exports = {
  isNumeric, castNumber
};
