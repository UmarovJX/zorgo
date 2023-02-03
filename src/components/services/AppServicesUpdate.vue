<template>
  <div>

    <!--  ROLE NAME  -->
    <b-card>
      <ValidationObserver ref="validation-observer">

        <div class="col-12 d-flex flex-wrap p-0">

          <!--   NAME [RU]   -->
          <b-col cols="6" class="px-1">
            <ValidationProvider name="Название [RU]" rules="required" v-slot="{errors}">
              <b-form-group
                  label="Название [RU]"
                  label-for="name-ru"
              >
                <b-form-input
                    v-model="name.ru"
                    id="name-ru"
                    size="md"
                    placeholder="Введите"
                />
              </b-form-group>
              <p v-if="errors" class="validation__red">{{ errors[0] }}</p>
            </ValidationProvider>
          </b-col>

          <!--   NAME [UZ]   -->
          <b-col cols="6" class="px-1">
            <ValidationProvider name="Название [UZ]" rules="required" v-slot="{errors}">
              <b-form-group
                  label="Название [UZ]"
                  label-for="name-uz"
              >
                <b-form-input
                    v-model="name.uz"
                    id="name-uz"
                    size="md"
                    placeholder="Введите"
                />
              </b-form-group>
              <p v-if="errors" class="validation__red">{{ errors[0] }}</p>
            </ValidationProvider>
          </b-col>

          <!--   DESCRIPTION [RU]   -->
          <b-col cols="6" class="px-1">
            <ValidationProvider name="Описание [RU]" rules="required" v-slot="{errors}">
              <b-form-group
                  label="Описание [RU]"
                  label-for="description-ru"
              >
                <b-form-input
                    v-model="description.ru"
                    id="description-ru"
                    size="md"
                    placeholder="Введите"
                />
              </b-form-group>
              <p v-if="errors" class="validation__red">{{ errors[0] }}</p>
            </ValidationProvider>
          </b-col>

          <!--   DESCRIPTION [UZ]   -->
          <b-col cols="6" class="px-1">
            <ValidationProvider name="Описание [UZ]" rules="required" v-slot="{errors}">
              <b-form-group
                  label="Описание [UZ]"
                  label-for="description-uz"
              >
                <b-form-input
                    v-model="description.uz"
                    id="description-uz"
                    size="md"
                    placeholder="Введите"
                />
              </b-form-group>
              <p v-if="errors" class="validation__red">{{ errors[0] }}</p>
            </ValidationProvider>
          </b-col>
          <!--   Service id [UZ]   -->
          <b-col cols="12" class="px-1">
            <ValidationProvider name="Услуга" v-slot="{errors}">
              <b-form-group
                  label="Услуга"
                  label-for="service-id"
              >
                <b-form-select
                    v-model="serviceId"
                    id="service-id"
                    placeholder="Выберите"
                    :options="services"
                    value-field="id"
                    text-field="name.ru"
                >
                </b-form-select>
              </b-form-group>
              <p v-if="errors" class="validation__red">{{ errors[0] }}</p>
            </ValidationProvider>
          </b-col>
        </div>

        <!--   FILE INPUT   -->
        <b-col cols="12" class="px-1">
          <ValidationProvider name="image" rules="required" v-slot="{errors}">
            <b-form-group label="Изображение">
              <VueFileAgent
                  ref="vueFileAgent"
                  v-model="fileRecords"
                  :deletable="true"
                  :meta="true"
                  :accept="'image/*,.zip'"
                  :maxSize="'5MB'"
                  :maxFiles="1"
                  :helpText="'Выберите изображение'"
                  :errorText="{type: 'Неверный тип файла. Разрешены только изображения или zip', size: 'Размер файла не должен превышать 10 МБ.',}"
                  @select="filesSelected($event)"
                  @beforedelete="onBeforeDelete($event)"
                  @delete="fileDeleted($event)"
              />
            </b-form-group>
            <p v-if="errors" class="validation__red">{{ errors[0] }}</p>
          </ValidationProvider>
        </b-col>

      </ValidationObserver>

      <b-button
          class="btn-success float-right mt-2 mr-1"
          @click="updateService()"
      >
        Сохранить
      </b-button>
    </b-card>

  </div>
</template>

<script>
import api from '@/services/api'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
  BFormGroup,
  BFormInput,
  BButton,
  BCard,
  BCol,
  BTable,
  BFormCheckbox,
  BFormCheckboxGroup,
  BFormSelect
} from 'bootstrap-vue'

export default {
  name: "AppServicesCreate",
  components: {
    BFormGroup,
    BFormInput,
    BButton,
    BCard,
    BCol,
    BTable,
    BFormCheckbox,
    BFormCheckboxGroup,
    BFormSelect,
    ToastificationContent,
  },
  directives: {
    Ripple
  },
  data() {
    return {
      name: {
        ru: '',
        uz: ''
      },
      description: {
        ru: '',
        uz: ''
      },
      serviceId: null,
      services: [],
      image: [],
      fileRecords: [],
      uploadUrl: '',
      uploadHeaders: {'X-Test-Header': 'vue-file-agent'},
      fileRecordsForUpload: [], // maintain an upload queue
      isBusy: false,
    }
  },

  async mounted() {
    await this.getOneService()
    await this.getServices()
  },

  methods: {

    async getOneService() {
      const {id} = this.$route.params
      api.services.fetchOneService(id)
          .then(res => {
            this.name = res.data.name
            this.description = res.data.body
            this.serviceId = res.data.service_id
            const image = res.data.image
            this.fileRecords = [{
              name: 'image.jpg',
              size: 0,
              type: 'image/jpg',
              url: image,
              src: image
            }]
          })
          .catch(error => {
            console.error(error)
          })
    },
    async getServices() {
      this.services.push({
        id: null,
        name: {
          ru: 'пусто'
        }
      })
      api.services.fetchServices('&filters[!id]=' + this.$route.params)
          .then(res => {
            this.services = this.services.concat(res.data)
          })
    },

    updateService() {
      const isValid = this.$refs['validation-observer'].validate()
      if (isValid) {
        const {id} = this.$route.params
        const formData = new FormData()

        formData.append('name[ru]', this.name.ru)
        formData.append('name[uz]', this.name.uz)
        formData.append('body[ru]', this.description.ru)
        formData.append('body[uz]', this.description.uz)
        formData.append('service_id', this.serviceId)
        formData.append('image', this.fileRecords[0].file)
        api.services.updateService(id, formData)
            .then(() => {
              this.$router.push({name: 'services'})
              this.showToast('success', 'Успешно изменено!', 'CheckIcon')
            })
            .catch(error => {
              console.error(error)
              this.showToast('danger', 'Что-то пошло не так!', 'XIcon')
            })
      }
    },

    showToast(variant, text, icon) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: text,
          icon: icon,
          variant,
        },
      })
    },

    deleteUploadedFile: function (fileRecord) {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.deleteUpload(this.uploadUrl, this.uploadHeaders, fileRecord);
    },
    filesSelected: function (fileRecordsNewlySelected) {
      const validFileRecords = fileRecordsNewlySelected.filter((fileRecord) => !fileRecord.error);
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords);
    },
    onBeforeDelete: function (fileRecord) {
      const i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileRecordsForUpload.splice(i, 1);
        const k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
      } else {
        if (confirm('Are you sure you want to delete?')) {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
        }
      }
    },
    fileDeleted: function (fileRecord) {
      const i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    },
  }
}
</script>
