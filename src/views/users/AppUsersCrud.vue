<template>
  <div>
    <AppUsersCreate
        v-if="splitRoute($route.name) === 'create'"
    />
    <AppUsersUpdate
        v-if="splitRoute($route.name) === 'update'"
    />
  </div>
</template>

<script>
import AppUsersCreate from "@/components/users/AppUsersCreate";
import AppUsersUpdate from "@/components/users/AppUsersUpdate";

export default {
  name: "AppUsersCrud",
  components: {
    AppUsersCreate,
    AppUsersUpdate
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
