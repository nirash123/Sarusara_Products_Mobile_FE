import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
    methods: {
        showSuccessMessage(text) {
            this.$toast({
                component: ToastificationContent,
                props: {
                    title: 'Success',
                    icon: 'CheckIcon',
                    variant: 'primary',
                    text,
                },
            }, {
                position: "top-center",
                timeout: 8000,
            })
        },
        showSuccessErrorMessage(text) {
            this.$toast({
                component: ToastificationContent,
                props: {
                    title: 'Success',
                    icon: 'AlertTriangleIcon',
                    variant: 'primary',
                    text,
                },
            }, {
                position: "top-center",
                timeout: 8000,
            })
        },
        convertAndNotifyError(err) {
            if (!(err.response && err.response.data)) return
            let errors
            let errorOut = '<ul>'

            if (err.response.data.errors) {
                errors = err.response.data.errors
                Object.keys(errors).forEach(error => {
                    const element = errors[error]
                    errorOut += `<li>${element[0]}</li>`
                })
            }

            if (err.response.data.error) {
                errorOut += `<li>${err.response.data.error}</li>`
            }

            errorOut += '</ul>'
            this.$toast({
                component: ToastificationContent,
                props: {
                    title: err.response.data.message,
                    icon: 'AlertTriangleIcon',
                    variant: 'danger',
                    text: errorOut,
                },
            }, {
                position: "top-center",
                timeout: 8000,
            })
        },
        notify(variant = null, body = '', title = '') {
            this.$notify(variant, title, body, {
                duration: 8000,
                permanent: false,
            })
        },
        showErrorMessage(text) {
            this.$toast({
                component: ToastificationContent,
                props: {
                    title: 'Error',
                    icon: 'AlertTriangleIcon',
                    variant: 'danger',
                    text,
                },
            }, {
                position: "top-center",
                timeout: 8000,
            })
        },
    },
}
