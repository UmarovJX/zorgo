<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <b-link class="brand-logo">
        <h2 class="brand-text text-primary ml-1">
          ZORGO
        </h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
        lg="8"
        class="d-none d-lg-flex align-items-center p-5"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
            fluid
            :src="imgUrl"
            alt="Login V2"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >

          <!-- form -->
          <validation-observer
            ref="loginForm"
            #default="{invalid}"
          >
            <b-form
              class="auth-login-form mt-2"
              @submit.prevent="login"
            >
              <!-- email -->
              <b-form-group
                label="Логин"
                label-for="login-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="text"
                >
                  <b-form-input
                    id="login-email"
                    v-model="username"
                    :state="errors.length > 0 ? false:null"
                    name="login-email"
                    placeholder="Логин"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">Пароль</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false:null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="Пароль"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- submit modals -->
              <b-button
                type="submit"
                variant="primary"
                block
                :disabled="invalid"
              >
                Sign in
              </b-button>
            </b-form>
          </validation-observer>

        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BButton,
  BAlert,
  VBTooltip,
} from 'bootstrap-vue'
import store from '@/store/index'
import api from '@/services/api'
import {setLocalVar} from '@/util/localstorage-helper'

export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BAlert,
    ValidationProvider,
    ValidationObserver,
    ToastificationContent
  },
  data() {
    return {
      username: '',
      password: '',
      sideImg: require('@/assets/images/pages/login-v2.svg'),
      // validation rules
      passwordFieldType: 'password',
    }
  },
  // created() {
  //   localStorage.getItem('accessToken') && this.CheckLogin()
  // },

  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
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

    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password"
    },

    login() {
      this.$refs.loginForm.validate()
        .then(success => {
          if (success) {
            const data = {
              username: this.username,
              password: this.password
            }
            api.auth.login(data)
              .then(({data}) => {
                setLocalVar('accessToken', `Bearer ${data['access_token']}`)
                api.auth.fetchUserDetails().then(response => setLocalVar('userData', JSON.stringify(response.data)))
                setLocalVar('registration_time', (new Date()).getTime())
                // const {refresh_token} = await api.auth.updateToken()
                // await this.$router.push({name: 'services'})
                window.location.replace('/insurance/services')
              })
              .catch((error) => {
                if (!error.response) {
                  this.dismissCountDown = 4
                } else {
                  const status = error.response.status
                  const message = error.response.data.message
                  this.errorMessage = error.response.data.errorMessage
                  this.errorMessage = 'Неверный логин или пароль!'
                  this.showDismissibleAlert = true

                  /* CLIENT AND SERVER ERROR */
                  if (status && status >= 400 && status <= 511) {
                    this.dismissCountDown = 4
                    this.showToast('danger', 'Неверный логин или пароль!', 'XIcon')
                  }
                }

              })
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@core/scss/vue/pages/page-auth.scss';


</style>
