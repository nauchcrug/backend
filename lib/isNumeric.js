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

module.exports = isNumeric;
