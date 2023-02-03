<template>
  <div>
    <AppDealersCreate
        v-if="splitRoute($route.name) === 'create'"
    />
    <AppDealersUpdate
        v-if="splitRoute($route.name) === 'update'"
    />
  </div>
</template>

<script>
import AppDealersCreate from "@/components/dealers/AppDealersCreate";
import AppDealersUpdate from "@/components/dealers/AppDealersUpdate";


export default {
  name: "AppDealersCrud",
  components: {
    AppDealersCreate,
    AppDealersUpdate

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
