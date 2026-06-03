import {imageBaseApiUrl} from '@/constants/config'
import fileUploader from '@/constants/fileUploader'
import practice from '@/apis/modules/Practice'

export default {
  methods: {
    async uploadFile (type = null, file) {
      try {
        fileUploader.store(file, {
          progress: progress => {
            this.uploadProgress = Math.round(progress * 100)
          },
          'visibility': 'public-read',
          baseURL: `${imageBaseApiUrl}`

        }).then(async response => {
          await this.setS3KeyToApi(response.key, file.name, type)
        })

      } catch (error) {
        this.convertAndNotifyError(error)
      }
    },
    async setS3KeyToApi (key, name, type) {
      await practice.saveUploadedFileKey({
        key: key,
        name: name,
        type: type
      })
    }
  }
}
