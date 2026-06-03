export default {
  methods: {
    onCopy () {
      this.$vs.notify({
        title: 'Success',
        text: 'Text copied successfully',
        color: 'primary',
        iconPack: 'feather',
        position: 'top-center',
        icon: 'icon-check-circle'
      })
    },
    onError () {
      this.$vs.notify({
        title: 'Failed',
        text: 'Error in copying text',
        color: 'danger',
        iconPack: 'feather',
        position: 'top-center',
        icon: 'icon-alert-circle'
      })
    }
  }
}
