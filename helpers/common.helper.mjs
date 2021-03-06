export default {
  multipleColumnSet: (object) => {
    if (typeof object !== "object") {
      throw new TypeError("Invalid input")
    }

    const keys = Object.keys(object)
    const values = Object.values(object)

    const columnSet = keys.map((key) => `${key} = ?`).join(", ")

    return {
      columnSet,
      values,
    }
  },

  multipleColumnSetWhere: (object, table = '') => {
    if (typeof object !== "object") {
      throw new TypeError("Invalid input")
    }

    const keys = Object.keys(object)
    const values = Object.values(object)

    const columnSet = keys.map((key) => `${table}${key} = ?`).join(" AND ")

    return {
      columnSet,
      values,
    }
  }
}
