<template>
  <div>
    <AppModelsCreate
        v-if="splitRoute($route.name) === 'create'"
    />
    <AppModelsUpdate
        v-if="splitRoute($route.name) === 'update'"
    />
  </div>
</template>

<script>
import AppModelsCreate from "@/components/models/AppModelsCreate";
import AppModelsUpdate from "@/components/models/AppModelsUpdate";


export default {
  name: "AppModelsCrud",
  components: {
    AppModelsUpdate,
    AppModelsCreate,
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
