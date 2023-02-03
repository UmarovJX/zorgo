<template>
  <div>
    <AppRolesCreate
        v-if="splitRoute($route.name) === 'create'"
    />
    <AppRolesUpdate
        v-if="splitRoute($route.name) === 'update'"
    />
  </div>
</template>

<script>
import AppRolesCreate from "@/components/roles/AppRolesCreate";
import AppRolesUpdate from "@/components/roles/AppRolesUpdate";

export default {
  name: "AppRolesCrud",
  components: {
    AppRolesCreate,
    AppRolesUpdate
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
