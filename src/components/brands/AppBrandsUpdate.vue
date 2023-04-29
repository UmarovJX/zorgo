<template>
  <div>

    <!--  ROLE NAME  -->
    <b-card>
      <ValidationObserver ref="validation-observer">

        <div class="col-12 d-flex flex-wrap p-0">

          <!--   NAME   -->
          <b-col cols="12" class="p-0 px-1">
            <ValidationProvider name="Название" rules="required" v-slot="{errors}">
              <b-form-group
                  label="Название"
                  label-for="name"

              >
                <b-form-input
                    v-model="name"
                    id="name"
                    size="md"
                    placeholder="Введите"
                />
              </b-form-group>
              <p v-if="errors" class="validation__red">{{ errors[0] }}</p>
            </ValidationProvider>
          </b-col>

        </div>

      </ValidationObserver>

      <b-button
          class="btn-success float-right mt-2"
          @click="updateBrand"
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
  BFormCheckboxGroup
} from 'bootstrap-vue'

export default {
  name: "AppBrandsUpdate",
  components: {
    BFormGroup,
    BFormInput,
    BButton,
    BCard,
    BCol,
    BTable,
    BFormCheckbox,
    BFormCheckboxGroup,
    ToastificationContent,
  },
  directives: {
    Ripple
  },
  data() {
    return {
      name: null,
      isBusy: false,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      selectMode: 'multi',
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
    }
  },

  async mounted() {
    await this.getOneBrand()
  },

  methods: {

    async getOneBrand() {
      const {id} = this.$route.params
      await api.brands.fetchOneBrand(id)
          .then(res => {
            this.name = res.data.name
          })
          .catch(error => {
            console.log(error)
          })
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

    updateBrand() {
      const isValid = this.$refs['validation-observer'].validate()
      if (isValid) {
        const {id} = this.$route.params
        const {name} = this
        const data = {
          name,
        }
        api.brands.updateBrand(id, data)
            .then(() => {
              this.$router.push({name: 'brands'})
              this.showToast('success', 'Успешно изменено!', 'CheckIcon')
            })
            .catch((error) => {
              console.error(error)
              this.showToast('danger', 'Что-то пошло не так!', 'XIcon')
            })
      }
    },
  }
}
</script>

<style lang="scss" scoped></style>
