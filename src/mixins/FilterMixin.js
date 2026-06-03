import moment from 'moment'

export default {
  data () {
    return {
      filterQuery: ''
    }
  },
  timer: null,
  watch: {
    'filters': {
      handler (value) {
        clearTimeout(this.timer)
        this.filterQuery = ''
        const queries = []
        for (const filter in value) {
          if (this.filters[filter] && this.filters[filter] !== '') {
            if (this.filters[filter] instanceof Date) {
              queries.push(`filter[${filter}]=${encodeURIComponent(moment(this.filters[filter]).format('YYYY-MM-DD'))}`)
            } else if (typeof this.filters[filter] === 'object') {
              if (this.filters[filter].value)queries.push(`filter[${filter}]=${encodeURIComponent(this.filters[filter].value)}`)
            } else {
              queries.push(`filter[${filter}]=${encodeURIComponent(this.filters[filter])}`)
            }
          }
        }
        if (queries.length > 0) this.filterQuery = queries.join('&')
        const that = this
        this.timer = setTimeout(function () {
          that.filterQueryUpdate()
        }, 500)
      },
      deep: true,
      immediate: true
    }
  }
}
