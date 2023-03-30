<template>
  <b-nav-item-dropdown
    right
    toggle-class="d-flex align-items-center dropdown-user-link"
    class="dropdown-user"
  >
    <template #button-content>
      <div class="d-sm-flex d-none user-nav">
        <p class="user-name font-weight-bolder mb-0">
          {{ roleName }}
        </p>
        <span class="user-status">{{ userName }}</span>
      </div>
      <div>
        <feather-icon
          size="16"
          :icon="'ChevronDownIcon'"
        />
      </div>
    </template>

    <!--  SETTINGS  -->
    <!--    <b-dropdown-item-->
    <!--      :to="{ name: 'settings' }"-->
    <!--      link-class="d-flex align-items-center"-->
    <!--    >-->
    <!--      <feather-icon-->
    <!--        size="16"-->
    <!--        icon="SettingsIcon"-->
    <!--        class="mr-50"-->
    <!--      />-->
    <!--      <span>Настройки</span>-->
    <!--    </b-dropdown-item>-->

    <!--  LOGOUT  -->
    <b-dropdown-item
      link-class="d-flex align-items-center"
      @click="logout"
    >
      <feather-icon
        size="16"
        icon="LogOutIcon"
        class="mr-50"
      />
      <span>Выйти</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BDropdownItem, BAvatar,
} from 'bootstrap-vue'
import {initialAbility} from '@/libs/acl/config'
// import useJwt from '@/auth/jwt/useJwt'
import {avatarText} from '@core/utils/filter'
import {removeLocalVar, setLocalVar} from '@/util/localstorage-helper'
import api from '@/services/api'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BAvatar,
  },
  data() {
    return {
      userName: "",
      roleName: "",
      userData: JSON.parse(localStorage.getItem('userData')),
      avatarText,
    }
  },

  async created() {
    await this.getUserDetails()
  },

  methods: {
    logout() {
      api.auth.logout()
      // Remove userData from localStorage
      // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
      // localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
      // localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)

      // Remove userData from localStorage
      removeLocalVar('accessToken')
      removeLocalVar('userData')

      // Reset ability
      this.$ability.update(initialAbility)

      // Redirect to login page
      this.$router.push({name: 'auth-login'})
    },

    async getUserDetails() {
      await api.auth.fetchUserDetails()
        .then(res => {
          this.userName = res.data.username
          this.roleName = res.data.role.name
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
}
</script>

<style lang="scss" scoped>

::v-deep .dropdown-menu {
  width: auto !important;
}

.dropdown-user .dropdown-menu-right .dropdown-item {
  padding: 0.65rem 1.28rem;
}

</style>
