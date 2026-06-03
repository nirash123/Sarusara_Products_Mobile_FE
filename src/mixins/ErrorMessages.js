// export default {
//   methods: {
//     convertAndNotifyError (err) {
//       if (!(err.response && err.response.data)) return
//       let errors = undefined
//       let error_out = '<ul>'
//       if (err.response.data.errors) {
//         errors = err.response.data.errors
//         for (const error in errors) {
//           const element = errors[error]
//           error_out += `<li>${  element[0]  }</li>`
//         }
//       }
//       error_out += '</ul>'
//       this.$vs.notify({
//         title:'Something went wrong',
//         text:`${err.response.data.message}<br><br>${error_out}`,
//         color:'danger',
//         time:6000,
//         position:'top-right'})
//     },
//     notify (variant = null, body = '', title = '') {
//       this.$notify(variant, title, body, {
//         duration: 6000,
//         permanent: false
//       })
//     },
//     showErrorMessage (text) {
//       this.$vs.notify({
//         title: 'Error',
//         text,
//         color:'danger',
//         position:'top-right'})
//     }
//   }
// }
