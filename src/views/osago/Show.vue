<template>
  <b-row>
    <b-col md="12" class="d-flex justify-content-between mb-1">
      <h2>Осаго #{{ policy.id }}</h2>

      <b-button
          v-if="policy.policy.contract_url"
          :href="policy.policy.contract_url"
          target="_blank"
          variant="success"
          class="btn-icon d-flex align-items-center"
      >
        <span class="" style="border-right: 1px solid #F3FBF5; padding-right: 4px">Скачать договор</span>
        <feather-icon size="18" icon="DownloadCloudIcon" style="padding-left: 4px"/>
      </b-button>
    </b-col>
    <b-col md="9" sm="12">
      <b-card>
        <div class="row">
          <b-col md="9" sm="12">
            <b-card-title>Полис</b-card-title>
            <table class="row">
              <tbody class="col-md-5 col-sm-12">
              <tr>
                <th class="pr-1">Номер анкеты:</th>
                <td>{{ policy.policy.anketa_id }}</td>
              </tr>
              <tr>
                <th class="pr-1">Серия:</th>
                <td>{{ policySeries }}</td>
              </tr>
              <tr>
                <th class="pr-1">Кол-во водителей:</th>
                <td>{{ driversCount }}</td>
              </tr>
              <tr>
                <th class="pr-1">Стоимость:</th>
                <td>{{ policy.price | formatNumber }}</td>
              </tr>
              <tr>
                <th class="pr-1">Сумма страхования:</th>
                <td>{{ policy.insurance_sum | formatNumber }}</td>
              </tr>
              </tbody>
              <tbody class="col-sm-12 col-md-7">
              <tr>
                <th class="pr-1">Дата начало:</th>
                <td>{{ policy.date_begin }}</td>
              </tr>
              <tr>
                <th class="pr-1">Дата окончание:</th>
                <td>{{ policy.date_end }}</td>
              </tr>
              <tr>
                <th class="pr-1">Дата создания:</th>
                <td>{{ policy.created_at }}</td>
              </tr>
              </tbody>
            </table>
          </b-col>
          <b-col md="3" sm="12" class="d-flex justify-content-center">
            <div class="text-center">
              <img :src="policy.company.image" alt="" width="150">
              <p>{{ policy.company.name }}</p>
            </div>
          </b-col>
        </div>
      </b-card>
    </b-col>
    <b-col md="3" sm="12">
      <b-card>
        <b-card-title>Транспортное средство</b-card-title>
        <table>
          <tbody>
          <tr>
            <th class="pr-1">Гос.номер:</th>
            <td>{{ policy.vehicle.number }}</td>
          </tr>
          <tr>
            <th class="pr-1">Тех.паспорт:</th>
            <td>{{ vehiclePassport }}</td>
          </tr>
          <tr>
            <th class="pr-1">Модель:</th>
            <td>{{ policy.vehicle.model }} ({{ policy.vehicle.year }})</td>
          </tr>
          <tr>
            <th class="pr-1">Регион регистрации:</th>
            <td>{{ policy.vehicle.territory.name.ru }}</td>
          </tr>
          <tr>
            <th class="pr-1">Тип Т.С:</th>
            <td>{{ policy.vehicle.type.name.ru }}</td>
          </tr>
          </tbody>
        </table>
      </b-card>
    </b-col>

    <b-col md="3" sm="12" v-if="!policy.applicant_is_owner">
      <b-card>
        <b-card-title>Заявитель</b-card-title>
        <table>
          <tbody>
          <tr>
            <th class="pr-1">Номер телефона:</th>
            <td>
              <a :href="`tel:${policy.applicant.phone}`">{{ policy.applicant.phone }}</a>
            </td>
          </tr>
          <tr>
            <th class="pr-1">ФИО:</th>
            <td>{{ personFullName(policy.applicant) }}</td>
          </tr>
          <tr>
            <th class="pr-1">Дата рождения:</th>
            <td>{{ policy.applicant.birthdate }}</td>
          </tr>
          <tr>
            <th class="pr-1">Серия и номер паспорта:</th>
            <td>{{ personPassport(policy.applicant) }}</td>
          </tr>
          <tr>
            <th class="pr-1">ПИНФЛ:</th>
            <td>{{ policy.applicant.pinfl }}</td>
          </tr>
          </tbody>
        </table>
      </b-card>
    </b-col>
    <b-col md="3" sm="12">
      <b-card>
        <b-card-title>Владелец</b-card-title>
        <table>
          <tbody>
          <tr>
            <th class="pr-1">Тип:</th>
            <td>{{ ownerType }}</td>
          </tr>
          </tbody>
          <tbody v-if="policy.owner.type">
          <tr>
            <th class="pr-1">Название организации:</th>
            <td>{{ policy.owner.org_name }}</td>
          </tr>
          <tr>
            <th class="pr-1">ИНН:</th>
            <td>{{ policy.owner.inn }}</td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr v-if="policy.applicant_is_owner">
            <th class="pr-1">Номер телефона:</th>
            <td>
              <a :href="`tel:${policy.owner.phone}`">{{ policy.owner.phone }}</a>
            </td>
          </tr>
          <tr>
            <th class="pr-1">ФИО:</th>
            <td>{{ personFullName(policy.owner) }}</td>
          </tr>
          <tr>
            <th class="pr-1">Дата рождения:</th>
            <td>{{ policy.owner.birthdate }}</td>
          </tr>
          <tr>
            <th class="pr-1">Серия и номер паспорта:</th>
            <td>{{ personPassport(policy.owner) }}</td>
          </tr>
          <tr>
            <th class="pr-1">ПИНФЛ:</th>
            <td>{{ policy.owner.pinfl }}</td>
          </tr>
          <tr v-if="policy.owner_is_driver">
            <th class="pr-1">Является ли водителем:</th>
            <td>Является</td>
          </tr>
          </tbody>
        </table>
      </b-card>
    </b-col>
    <b-col
        md="3"
        sm="12"
        v-for="(driver, index) in policy.drivers"
        v-if="!(policy.owner_is_driver && index === 0)"
    >
      <b-card>
        <b-card-title>Водитель #{{ index + 1 }}</b-card-title>
        <table>
          <tbody>
          <tr>
            <th class="pr-1">ФИО:</th>
            <td>{{ personFullName(driver) }}</td>
          </tr>
          <tr>
            <th class="pr-1">Дата рождения:</th>
            <td>{{ driver.birthdate }}</td>
          </tr>
          <tr>
            <th class="pr-1">Серия и номер паспорта:</th>
            <td>{{ personPassport(driver) }}</td>
          </tr>
          <tr>
            <th class="pr-1">ПИНФЛ:</th>
            <td>{{ driver.pinfl }}</td>
          </tr>
          <tr>
            <th class="pr-1">Серия и номер В.У:</th>
            <td>{{ driverLicense(driver) }}</td>
          </tr>
          <tr>
            <th class="pr-1">Дата выпуска В.У:</th>
            <td>{{ driver.license_date }}</td>
          </tr>
          </tbody>
        </table>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import Osago from "@/services/osago";
import {
  BRow, BCol, BCard, BCardTitle, BCardBody, BButton
} from "bootstrap-vue";

const api = new Osago

export default {
  name: "Show",
  components: {
    BRow, BCol, BCard, BCardTitle, BCardBody, BButton
  },
  computed: {
    policySeries() {
      if (!this.policy.policy.series) return ''
      return `${this.policy.policy.series}${this.policy.policy.number}`
    },
    driversCount() {
      return this.policy.driver_limit ? 'До 5 человек' : 'Неограничено'
    },
    ownerType() {
      return this.policy.owner.type ? 'Юр.лицо' : 'Физ.лицо'
    },
    vehiclePassport() {
      return this.policy.vehicle.tech_passport_series + this.policy.vehicle.tech_passport_number
    }
  },
  data() {
    return {
      policy: {}
    }
  },
  async mounted() {
    await this.loadPolicy()
  },
  methods: {
    async loadPolicy() {
      await api.fetchPolicy(this.$route.params.id)
          .then(res => {
            this.policy = res.data
          })
    },

    personFullName(person) {
      if (!person.first_name) return ''
      return `${person.last_name} ${person.first_name} ${person.middle_name}`
    },
    personPassport(person) {
      if (!person.passport_series) return ''
      return person.passport_series + person.passport_number
    },
    driverLicense(driver) {
      return driver.license_series + driver.license_number
    }
  }
}
</script>

<style scoped>

</style>