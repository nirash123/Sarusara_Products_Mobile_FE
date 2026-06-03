export default {
  filters: {
    currency (value, arg) {
      let val = 0
      if (value === 0) return 'Complimentary'
      if ((`${value  }`).includes('.')) {
        val = `${Math.abs(Math.round(value * Math.pow(10, arg)) / Math.pow(10, arg))}`
        for (let index = 0; index < (arg - val.split('.')[1].length); index++) {
          val += '0'
        }
      } else {
        val = `${Math.abs(value)}.`
        for (let index = 0; index < arg; index++) {
          val += '0'
        }
      }
      return `£${val}`
    }
  }
}
