<template>
  <li
    class="nav-item"
    :class="{
      'active': isActive,
      'disabled': item.disabled
    }"
  >

    <b-link
      v-bind="linkProps"
      class="d-flex align-items-center"
      :class="item.class"
    >
      <feather-icon :icon="item.icon || 'CircleIcon'"/>
      <span class="menu-title text-truncate">{{ t(item.title) }}</span>
      <b-badge
        v-if="item.tag"
        pill
        :variant="item.tagVariant || 'primary'"
        class="mr-1 ml-auto"
      >
        {{ item.tag }}
      </b-badge>
    </b-link>
  </li>
</template>

<script>
import { useUtils as useAclUtils } from '@core/libs/acl'
import { BLink, BBadge } from 'bootstrap-vue'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import useVerticalNavMenuLink from './useVerticalNavMenuLink'
import mixinVerticalNavMenuLink from './mixinVerticalNavMenuLink'
import router from "@/router";
import {useRouter} from "@core/utils/utils";

export default {
  components: {
    BLink,
    BBadge,
  },
  mixins: [mixinVerticalNavMenuLink],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    let {
      isActive,
      linkProps,
      updateIsActive
    } = useVerticalNavMenuLink(props.item)
    const { t } = useI18nUtils()
    const { canViewVerticalNavMenuLink } = useAclUtils()


    let isChild = false
    const {route} = useRouter()
    setTimeout(()=>{
      if(route &&route.value){
        if(props.item.route === route.value.meta.parent){
          isActive = true
        }
      }
    },1000)


    return {
      isActive,
      isChild,
      linkProps,
      updateIsActive,

      // ACL
      canViewVerticalNavMenuLink,

      // i18n
      t,
    }
  },

}
</script>

<style lang="scss">
.not_ready {
  background: red;
  border-radius: .5rem;
}
</style>
