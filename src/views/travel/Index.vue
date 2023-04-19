<template>
  <b-row>
    <h2 class="pl-1">Путешествие</h2>

    <div class="d-flex justify-content-between col-12">

      <b-col
          md="4"
          class="my-1 px-0"
      >
        <b-form-group
            class="mb-0"
        >
          <b-input-group size="md">
            <b-form-input
                id="filterInput"
                v-model="search"
                type="search"
                placeholder="Искать"
                @change="getPolicies"
            />
            <b-input-group-append>
              <b-button
                  :disabled="!search"
                  @click="search = ''"
              >
                Очистить
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

    </div>

    <!--  TABLE  -->
    <b-col cols="12">
      <b-table
          striped
          hover
          responsive
          sort-icon-left
          :busy="loading"
          :items="policies"
          :fields="fields"
      >

        <template #table-busy>
          <div class="text-center text-primary my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong class="ml-1">Идет загрузка ...</strong>
          </div>
        </template>

        <template #cell(status)="data">
          {{ getStatus(data.item) }}
        </template>
        <template #cell(price)="data">
          {{ data.item.price | formatNumber }}
        </template>
        <template #cell(group_id)="data">{{data.item.group_id ? 'Семейный' : 'Индувидуальный'}}</template>

        <template #cell(crud_row)="data">
          <div class="d-flex float-right">
            <b-button
                v-if="data.item.policy.contract_url"
                :href="data.item.policy.contract_url"
                target="_blank"
                variant="success"
                class="btn-sm btn-icon mr-1"
            >
              <feather-icon size="18" icon="DownloadCloudIcon"/>
            </b-button>
            <router-link :to="{path:`/insurance/travel/${data.item.id}`}">
              <b-button variant="info" class="btn-sm btn-icon">
                <feather-icon size="18" icon="EyeIcon"/>
              </b-button>
            </router-link>

          </div>
        </template>

      </b-table>
    </b-col>

    <!--  PAGINATION  -->
    <b-col
        cols="12"
        class="mb-3 d-flex justify-content-between"
    >
      <b-form-select
          v-if="showPagination"
          class="float-right col-1"
          v-model="pagination.perPage"
          placeholder="Выберите"
          :options="pagination.perPageOptions"
      >
      </b-form-select>
      <b-pagination
          v-if="showPagination"
          v-model="pagination.page"
          :total-rows="pagination.total"
          :per-page="pagination.perPage"
          align="center"
          size="sm"
          class="my-0"
      />
    </b-col>
  </b-row>
</template>

<script>
import Travel from "@/services/travel";
import {
  BRow,
  BCol,
  BFormGroup,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
  BTable,
  BPagination,
  BSpinner,
  BFormSelect
} from "bootstrap-vue";

const api = new Travel

export default {
  name: "Index",
  components: {
    BRow,
    BCol,
    BFormGroup,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BTable,
    BPagination,
    BSpinner,
    BFormSelect
  },
  data() {
    return {
      policies: [],
      search: '',
      pagination: {
        page: 1,
        total: 0,
        perPage: 20,
        perPageOptions: [1, 2, 3, 10, 20, 30, 50]
      },
      filter: null,
      filterOn: [],
      loading: false,
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      fields: [
        {
          key: 'id',
          label: 'ID'
        },
        {
          key: 'status',
          label: 'Статус',
        },
        {
          key: 'price',
          label: 'Стоимость',
        },
        {
          key: 'activity',
          label: 'Цель поездки',
        },
        {
          key: 'group_id',
          label: 'Тип',
        },
        // {
        //   key: 'countries',
        //   label: 'Страны',
        // },
        {
          key: 'date_begin',
          label: 'Дата начало',
        },
        {
          key: 'policy.anketa_id',
          label: 'ID анкеты',
        },
        {
          key: 'policy.number',
          label: 'Номер полиса',
        },
        {
          key: 'applicant.name',
          label: 'Имя заявителя',
        },
        {
          key: 'applicant.phone',
          label: 'Номер заявителя',
        },
        {
          key: 'company.name',
          label: 'Компания',
        },
        {
          key: 'created_at',
          label: 'Время создания',
        },
        {
          key: 'crud_row',
          label: ' ',
        },
      ],
    }
  },

  watch: {
    'pagination.page': {
      async handler(val) {
        const params = new URLSearchParams(window.location.search)

        if (val !== params.get('page')) {
          this.generateParams()
          await this.getPolicies()
        }
      }
    },
    'search': {
      async handler() {
        await this.getPolicies()
      }
    },
    'pagination.perPage': {
      async handler(val) {
        const params = new URLSearchParams(window.location.search)

        if (val !== params.get('perPage')) {
          if (val > this.pagination.total) {
            this.pagination.page = 1
          } else {
            this.generateParams()
            await this.getPolicies()
          }
        }
      }
    }
  },

  computed: {
    showPagination() {
      return this.pagination.total > this.pagination.perPage && !this.loading
    },
  },

  async mounted() {
    this.setParams()
    await this.getPolicies()
  },

  methods: {
    async getPolicies() {
      this.loading = true
      api.fetchPolicies(this.getParams())
          .then(res => {
            this.policies = res.data.data
            this.pagination.total = res.data.total
          })
          .finally(
              () => this.loading = false
          )
    },

    generateParams() {
      const params = new URLSearchParams(window.location.search)

      params.set('page', this.pagination.page)
      params.set('perPage', this.pagination.perPage)

      let url = window.location.href.replace(window.location.search, '?') + params.toString()
      window.history.pushState({path: url}, '', url);
    },

    setParams() {
      const searchParams = new URLSearchParams(window.location.search)
      if (searchParams.has('page')) this.pagination.page = searchParams.get('page')
      if (searchParams.has('perPage')) this.pagination.perPage = searchParams.get('perPage')
    },

    getParams() {
      const params = new URLSearchParams
      if (this.search) {
        params.append(
            'search[id,policy.anketa_id,policy.number,' +
            'applicant.name,applicant.phone]',
            this.search
        )
      }

      params.append('page', this.pagination.page)
      params.append('perPage', this.pagination.perPage)

      return params.toString()
    },

    getStatus(data) {
      if (data.status === 2 && data.payment_status) {
        return 'Выдан'
      }
      return 'Отменен'
    }
  }
}
</script>

<style scoped>

</style>