import config from '@/constants/config'
import moment from 'moment'

export default {
  methods: {
    getUserImage(id, update = false) {
      return `${config.apiUrl}api/profile/user/${id}/image?${
          update ? Date.now() : ''
      }`;
    },
    getWeekDayNumberViaDate (day) {
      let split = day.times[0].start.split(':')
      let weekDay =  moment(moment().startOf('week').add(day.day_number, 'days').set({
        h: split[0],
        m: split[1]
      })).utc().day()
      return weekDay === 0 ? 7 : weekDay
    },
    getUTCConvertedTime (day_number, time) {
      let split = time.split(':')
      return  moment(moment().startOf('week').add(day_number, 'days').set({
        h: split[0],
        m: split[1]
      })).utc().format('HH:mm:ss')
    },
    getDateNumber (time) {
      return (moment(new Date(time)).day())
    }
  }
}
