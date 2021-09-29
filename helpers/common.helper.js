module.exports = {
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

  multipleColumnSetWhere: (object) => {
    if (typeof object !== "object") {
      throw new TypeError("Invalid input")
    }

    const keys = Object.keys(object)
    const values = Object.values(object)

    const columnSet = keys.map((key) => `${key} = ?`).join(" AND ")

    return {
      columnSet,
      values,
    }
  }
}
