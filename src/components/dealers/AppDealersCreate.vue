<template>
  <div>

    <!--  ROLE NAME  -->
    <b-card>
      <ValidationObserver ref="validation-observer">

        <div class="col-12 d-flex flex-wrap p-0">

          <!--   USERNAME   -->
          <b-col cols="6" class="p-0 px-1">
            <ValidationProvider name="Юзернейм" rules="required" v-slot="{errors}">
              <b-form-group
                  label="Юзернейм"
                  label-for="username"

              >
                <b-form-input
                    v-model="username"
                    id="username"
                    size="md"
                    placeholder="Введите"
                />
              </b-form-group>
              <p v-if="errors" class="validation__red">{{ errors[0] }}</p>
            </ValidationProvider>
          </b-col>

          <!--   PASSWORD   -->
          <b-col cols="6" class="p-0 px-1">
<!--            <ValidationProvider name="Пароль" rules="required" v-slot="{errors}">-->
              <b-form-group
                  label="Пароль"
                  label-for="password"

              >
                <b-form-input
                    v-model="password"
                    id="password"
                    size="md"
                    placeholder="Введите"
                />
              </b-form-group>
<!--              <span class="validation__red d-block mb-1">{{ errors[0] }}</span>-->
<!--            </ValidationProvider>-->
          </b-col>

          <!--   FULLNAME   -->
          <b-col cols="6" class="p-0 px-1">
            <ValidationProvider name="Ф.И.О" rules="required" v-slot="{errors}">
              <b-form-group
                  label="Ф.И.О"
                  label-for="full_name"
              >
                <b-form-input
                    v-model="full_name"
                    id="full_name"
                    size="md"
                    placeholder="Введите"
                />
              </b-form-group>
              <p v-if="errors" class="validation__red">{{ errors[0] }}</p>
            </ValidationProvider>
          </b-col>

          <!--   COMPANY   -->
          <b-col cols="6" class="p-0 px-1">
            <ValidationProvider name="Название компании" rules="required" v-slot="{errors}">
              <b-form-group
                  label="Название компании"
                  label-for="company"
              >
                <b-form-input
                    v-model="company"
                    id="company"
                    size="md"
                    placeholder="Введите"
                />
              </b-form-group>
              <p v-if="errors" class="validation__red">{{ errors[0] }}</p>
            </ValidationProvider>
          </b-col>

          <!--   PHONE   -->
          <b-col cols="6" class="p-0 px-1">
            <ValidationProvider name="Номер телефона" rules="required" v-slot="{errors}">
              <b-form-group
                  label="Номер телефона"
                  label-for="phone"
              >
                <b-form-input
                    v-model="phone"
                    id="phone"
                    size="md"
                    placeholder="Введите"
                />
              </b-form-group>
              <p v-if="errors" class="validation__red">{{ errors[0] }}</p>
            </ValidationProvider>
          </b-col>

          <!--   ADDRESS   -->
          <b-col cols="6" class="p-0 px-1">
            <ValidationProvider name="Адрес" rules="required" v-slot="{errors}">
              <b-form-group
                  label="Адрес"
                  label-for="address"
              >
                <b-form-input
                    v-model="address"
                    id="address"
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
          @click="createDealer"
      >
        Создать
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
  name: "AppDealersCreate",
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
      username: null,
      password: null,
      full_name: null,
      company: null,
      phone: null,
      address: null,
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
      fields: [
        {
          key: 'type',
          label: 'Разрешение',
        },
        {
          key: 'all',
          label: ' ',
        },
      ],
      items: [],
    }
  },

  methods: {

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

    createDealer() {
      const isValid = this.$refs['validation-observer'].validate()
      if (isValid) {

        const {username, full_name, company, phone, address, password} = this
        const data = {
          username,
          password,
          full_name,
          company,
          phone,
          address
        }
        api.dealers.createDealer(data)
            .then(() => {
              this.$router.push({name: 'dealers'})
              this.showToast('success', 'Успешно создано!', 'CheckIcon')
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
