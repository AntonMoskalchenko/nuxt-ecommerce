
export default {
  filters: {
    round (num) {
      return Math.round((num + Number.EPSILON) * 100) / 100
    }
  }
}
