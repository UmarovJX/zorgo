<template>
  <b-row>
    <b-col cols="12">
      <h2>Контакты и ссылки</h2>
    </b-col>
    <b-col cols="12">
      <b-card>
        <ValidationObserver rules="required" immediate ref="validation-observer">
          <b-row>
            <b-col md="6">
              <ValidationProvider name="Email" rules="required|email" v-slot="{errors}">
                <b-form-group
                    label="Email"
                    label-for="email"
                >
                  <b-form-input
                      v-model="item.email"
                      id="email"
                      size="md"
                      placeholder="Введите"
                  />
                </b-form-group>
                <p v-if="errors" class="validation__red">{{ errors[0] }}</p>
              </ValidationProvider>
            </b-col>
            <b-col md="6">
              <ValidationProvider name="Номер телефона" rules="required" v-slot="{errors}">
                <b-form-group
                    label="Номер телефона"
                    label-for="phone"
                >
                  <b-form-input
                      v-model="item.phone"
                      id="phone"
                      size="md"
                      placeholder="Введите"
                  />
                </b-form-group>
                <p v-if="errors" class="validation__red">{{ errors[0] }}</p>
              </ValidationProvider>
            </b-col>
            <b-col md="6" v-for="(data, key) in item.address">
              <ValidationProvider :name="`Адрес [${key.toUpperCase()}]`" rules="required" v-slot="{errors}">
                <b-form-group
                    :label="`Адрес [${key.toUpperCase()}]`"
                    :label-for="`address-${key}`"
                >
                  <b-form-input
                      v-model="item.address[key]"
                      :id="`address-${key}`"
                      size="md"
                      placeholder="Введите"
                  />
                </b-form-group>
                <p v-if="errors" class="validation__red">{{ errors[0] }}</p>
              </ValidationProvider>
            </b-col>
            <b-col md="6">
              <ValidationProvider name="Ссылка на Play Market" rules="required" v-slot="{errors}">
                <b-form-group
                    label="Ссылка на Play Market"
                    label-for="links_android"
                >
                  <b-form-input
                      v-model="item.links.android"
                      id="links_android"
                      size="md"
                      placeholder="Введите"
                  />
                </b-form-group>
                <p v-if="errors" class="validation__red">{{ errors[0] }}</p>
              </ValidationProvider>
            </b-col>
            <b-col md="6">
              <ValidationProvider name="Ссылка на AppStore" rules="required" v-slot="{errors}">
                <b-form-group
                    label="Ссылка на AppStore"
                    label-for="links_ios"
                >
                  <b-form-input
                      v-model="item.links.ios"
                      id="links_ios"
                      size="md"
                      placeholder="Введите"
                  />
                </b-form-group>
                <p v-if="errors" class="validation__red">{{ errors[0] }}</p>
              </ValidationProvider>
            </b-col>
            <b-col md="12">
              <ValidationProvider name="Онлайн чат | Служба поддержки" rules="required" v-slot="{errors}">
                <b-form-group
                    label="Онлайн чат | Служба поддержки"
                    label-for="online_chat"
                >
                  <b-form-input
                      v-model="item.online_chat"
                      id="online_chat"
                      size="md"
                      placeholder="Введите"
                  />
                </b-form-group>
                <p v-if="errors" class="validation__red">{{ errors[0] }}</p>
              </ValidationProvider>
            </b-col>
          </b-row>
        </ValidationObserver>
        <b-button
            class="btn-success float-right"
            @click="update()"
        >
          Сохранить
        </b-button>
      </b-card>
    </b-col>

  </b-row>
</template>

<script>
import Settings from "@/services/settings";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
  BRow,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BButton,
  BCard,
  BCardTitle,
  BCol,
  BTable,
  BFormCheckbox,
  BFormCheckboxGroup,
  BFormSelect,
  BCardText
} from 'bootstrap-vue'
import log from "echarts/src/scale/Log";

const api = new Settings

export default {
  name: "Index",
  components: {
    BRow,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BButton,
    BCard,
    BCardTitle,
    BCol,
    BTable,
    BFormCheckbox,
    BFormCheckboxGroup,
    BFormSelect,
    BCardText,
    ToastificationContent
  },
  data() {
    return {
      errors: [],
      item: {
        email: '',
        phone: '',
        address: {ru: '', uz: ''},
        links: {
          ios: '',
          android: ''
        },
        online_chat: ''
      },
    }
  },
  mounted() {
    this.loadItem()
  },
  methods: {
    loadItem() {
      api.fetch().then(res => {
        this.item = res.data
      }).finally(() => window.scrollTo(0, 0))
    },

    update() {
      this.$refs['validation-observer'].validate().then(isValid => {
        if (isValid) {
          api.update(this.item)
              .then(() => {
                this.loadItem()
                this.showToast('success', 'Успешно изменено!', 'CheckIcon')
              })
              .catch(error => {
                console.error(error)
                this.showToast('danger', 'Что-то пошло не так!', 'XIcon')
              }).finally(() => window.scrollTo(0, 0))
        }
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
  }
}
</script>

<style scoped>

</style>