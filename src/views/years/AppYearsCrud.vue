<template>
  <div>
    <AppYearsCreate
        v-if="splitRoute($route.name) === 'create'"
    />
    <AppYearsUpdate
        v-if="splitRoute($route.name) === 'update'"
    />
  </div>
</template>

<script>
import AppYearsCreate from "@/components/years/AppYearsCreate";
import AppYearsUpdate from "@/components/years/AppYearsUpdate";


export default {
  name: "AppYearsCrud",
  components: {
    AppYearsUpdate,
    AppYearsCreate,
  },

  methods: {
    splitRoute(item) {
      return item.split('-')[1]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
