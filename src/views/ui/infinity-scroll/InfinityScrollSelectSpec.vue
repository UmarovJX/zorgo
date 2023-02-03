<template>
  <div class="position-relative">
    <label v-if="label.length" class="select-label">
      {{ label }}
    </label>
    <v-select
      v-model="selected"
      :options="paginated"
      label="currentName"
      :filterable="false"
      :disabled="disabled"
      :multiple="multiple"
      @open="onOpen"
      @close="onClose"
      @search="filterDebounce"
    >
      <template #option="data">
        <template v-if="data.name">
          {{ checkLocales(data.name) }}
        </template>
        <template v-else>
          {{ data.full_name }}
        </template>

      </template>
      <!--      <template #list-footer>-->
      <!--        <li v-show="hasNextPage" ref="load" class="loader">-->
      <!--          Loading more options...-->
      <!--        </li>-->
      <!--      </template>-->
    </v-select>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import api from '@/services/api'

export default {
  name: 'InfinityScrollSelectSpec',
  components: {
    vSelect
  },
  props: {
    apiUrl: {
      type: String,
      required: true
    },
    apiOption: {
      type: [Array, Object, String, Number],
      default: () => {
      }
    },
    apiId: {
      type: Number,
      default: () => null
    },
    label: {
      type: String,
      default: () => ''
    },
    value: {
      type: [Array, Object, String, Number],
      default: () => {
      }
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    multiple: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      option: [],
      filterOption: [],
      nextItem: 1,
      limit: 1,
      observer: null,
      selectSearch: '',
      timeoutId: null,
      loading: false,
      hasNext: false,
    }
  },
  created() {
    this.fetchSelectlist()
  },
  mounted() {
    // this.observer = new IntersectionObserver(this.infiniteScroll)
  },
  computed: {
    selected: {
      get() {
        let { value } = this

        if (!value) return undefined
        if (Array.isArray(value)) {
          value = value.map((item) => {
            if (item.name) {
              if (item && typeof item.name === 'object') {
                return {
                  ...item,
                  currentName: this.checkLocales(item.name)
                }
              }
              if (item && typeof item.name === 'string') {
                return {
                  ...item,
                  currentName: item.name
                }
              }
            } else if (item.full_name) {
              return {
                ...item,
                currentName: item.full_name
              }
            } else if (item.full_name) {
              return {
                ...item,
                currentName: item.full_name
              }
            }

          })
        } else if (value.name) {
          if (value && typeof value.name === 'object') {
            value = {
              ...value,
              currentName: this.checkLocales(value.name)
            }
          } else if (value && typeof value.name === 'string') {
            value = {
              ...value,
              currentName: value.name
            }
          } else if (value.full_name) {
            value = {
              ...value,
              currentName: value.full_name
            }
          }
        }
        return value
      },
      set(value) {
        return this.$emit('input', value)
      }
    },
    endpoint() {
      return this.apiUrl.split('.')
    },
    paginated() {
      if (this.selectSearch.trim().length > 0) {
        if (this.filterOption.length > 0) {
          return this.filterOption
        }
        return []
      }
      return this.option
    },

    hasNextPage() {
      return this.hasNext !== null

    },
  },
  methods: {
    filterDebounce(query) {
      if (this.timeoutId !== null) {
        clearTimeout(this.timeoutId)
      }
      this.timeoutId = setTimeout((_) => {
        this.searchSelect(query)
      }, 200)
    },
    searchSelect(query) {
      this.selectSearch = query
      this.loading = true
      if (query) {
        const data = {
          filter: { name: this.selectSearch },
          page: 1,
          'page-size': 10,
          ...this.apiOption
        }
        api[this.endpoint[0]][this.endpoint[1]](data)
          .then(res => {
            const result = res.data.data
            this.filterOption = [...result]
            if (this.filterOption[0].name && typeof this.filterOption[0].name === 'object') {
              this.filterOption = this.filterOption.map((item) => {
                return {
                  item,
                  currentName: this.checkLocales(item.name)
                }
              })
            } else if (this.filterOption[0].name && typeof this.filterOption[0].name === 'string') {
              this.option = this.option.map((item) => {
                return {
                  ...item,
                  currentName: item.name
                }
              })
            } else if (this.filterOption[0].full_name && typeof this.filterOption[0].full_name === 'string') {
              this.option = this.option.map((item) => {
                return {
                  ...item,
                  currentName: item.full_name
                }
              })
            }
            // this.hasNext = res.data.links.next
            // this.nextItem = res.datta.meta.current_page
          })
          .catch((error) => {
            console.error(error)
          })
          .finally(() => {
            this.loading = false
          })
      }
    },

    checkLocales(value) {
      if (typeof value === 'object') {
        if (localStorage.lang === 'ru') {
          return value.ru
        }
        return value.uz
      }
      return value
    },

    async onOpen() {
      // if (this.hasNextPage) {
      // await this.$nextTick()
      // this.observer.observe(this.$refs.load)
      // }
    },
    onClose() {
      // this.observer.disconnect()
    },
    async infiniteScroll([{
      isIntersecting,
      target
    }]) {
      if (isIntersecting) {
        const ul = target.offsetParent
        const scrollTop = target.offsetParent.scrollTop
        this.nextItem += 1
        this.fetchSelectlist()
        await this.$nextTick()
        ul.scrollTop = scrollTop
      }
    },

    fetchSelectlist() {
      this.loading = true
      let data = {}
      if (this.apiOption) {
        data = {
          with: {
            0: this.apiOption
          }
        }
      } else {
        data = {}
      }

      if (this.apiId) {
        return api[this.endpoint[0]][this.endpoint[1]](this.apiId, data)
          .then((res) => {
            const result = res.data.options
            this.option = [...this.option, ...result]
            if (this.option[0].name && typeof this.option[0].name === 'object') {
              this.option = this.option.map((item) => {
                return {
                  ...item,
                  currentName: this.checkLocales(item.name)
                }
              })
            } else if (this.option[0].name && typeof this.option[0].name === 'string') {
              this.option = this.option.map((item) => {
                return {
                  ...item,
                  currentName: item.name
                }
              })
            } else if (this.option[0].full_name && typeof this.option[0].full_name === 'string') {
              this.option = this.option.map((item) => {
                return {
                  ...item,
                  currentName: item.full_name
                }
              })
            }

            // this.hasNext = res.data.links.next
            // this.nextItem = res.data.meta.current_page
          })
          .catch((error) => {
            console.error(error)
          })
          .finally(() => {
            this.loading = false
          })
      } else {
        api[this.endpoint[0]][this.endpoint[1]](data)
          .then((res) => {
            const result = res.data.data
            this.option = [...this.option, ...result]
            if (this.option[0].name && typeof this.option[0].name === 'object') {
              this.option = this.option.map((item) => {
                return {
                  ...item,
                  currentName: this.checkLocales(item.name)
                }
              })
            } else if (this.option[0].name && typeof this.option[0].name === 'string') {
              this.option = this.option.map((item) => {
                return {
                  ...item,
                  currentName: item.name
                }
              })
            } else if (this.option[0].full_name && typeof this.option[0].full_name === 'string') {
              this.option = this.option.map((item) => {
                return {
                  ...item,
                  currentName: item.full_name
                }
              })
            }

            this.hasNext = res.data.links.next
            this.nextItem = res.data.meta.current_page
          })
          .catch((error) => {
            console.error(error)
          })
          .finally(() => {
            this.loading = false
          })
      }

    },
  }
}
</script>

<style lang="scss">

@import '@core/scss/vue/libs/vue-select.scss';

.vs__dropdown-toggle {
  height: 45px;
}

.select-label {
  margin-bottom: 3px;
}

.loading {
  text-align: center;
  position: absolute;
  color: #fff;
  z-index: 9;
  background: $purple;
  padding: 8px 18px;
  border-radius: 5px;
  left: calc(50% - 45px);
  top: calc(50% - 18px);
}
</style>
