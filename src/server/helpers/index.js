export const stringToRegexp = (object, props) => {
  props
    .filter(prop => object[prop])
    .forEach(prop => (object[prop] = new RegExp(object[prop], 'i')))
  return object
}

export const parseDateQuery = (query, propName) => {
  if (query.start || query.end) query[propName] = {}

  if (query.start) {
    query[propName].$gte = query.start
    delete query.start
  }

  if (query.end) {
    query[propName].$lte = query.end
    delete query.end
  }
}
