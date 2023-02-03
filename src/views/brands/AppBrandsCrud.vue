<template>
  <div>
    <AppBrandsCreate
        v-if="splitRoute($route.name) === 'create'"
    />
    <AppBrandsUpdate
        v-if="splitRoute($route.name) === 'update'"
    />
  </div>
</template>

<script>
import AppBrandsCreate from "@/components/brands/AppBrandsCreate";
import AppBrandsUpdate from "@/components/brands/AppBrandsUpdate";


export default {
  name: "AppBrandsCrud",
  components: {
    AppBrandsUpdate,
    AppBrandsCreate,

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
