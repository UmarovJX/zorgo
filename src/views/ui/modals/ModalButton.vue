<template>
  <div>
    <b-button
      v-ripple.400="ripple"
      @click="openModalEmit"
      v-b-modal="`modal-${name}`"
      :variant="variant"
      class="w-100"
      :size="btnSize"
      :class="className"
    >
      <slot name="button"></slot>
    </b-button>

    <b-modal
      :id="`modal-${name}`"
      cancel-variant="danger"
      @hidden="resetFields"
      centered
      :hide-footer="hideFooter"
      :no-close-on-backdrop="backdropClose"
      :size="size"
      :title="modalTitle"
    >
      <slot name="modal-body"></slot>
      <slot name="modal-footer"></slot>
      <template #modal-footer>
        <b-button :variant="variant" :disabled="disableButton" @click="modalEmit">{{ modalButton }}</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { BButton, BModal, VBModal } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  name: 'ModalButton',
  components: {
    BButton,
    BModal
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {
    btnSize: {
      type: String,
      default: 'sm'
    },
    className: {
      type: String,
      default: ''
    },
    id: {
      type: Number,
      default: null
    },
    variant: {
      type: String,
      default: 'outline-success'
    },
    name: {
      type: String,
      default: 'modal',
    },
    ripple: {
      type: String,
      default: 'rgba(113, 102, 240, 0.15)'
    },
    modalTitle: {
      type: String,
      default: 'Title'
    },
    modalButton: {
      type: String,
      default: 'Accept'
    },
    size: {
      type: String,
      default: 'xl'
    },
    disableButton: {
      type: Boolean,
      default: () => false,
    },
    backdropClose: {
      type: Boolean,
      default: () => false,
    },
    hideFooter: {
      type: Boolean,
      default: () => false,
    }
  },

  methods: {
    modalEmit() {
      this.$emit('btn-emit', this.id)
    },
    openModalEmit() {
      this.$emit('open-emit', this.id)
    },
    resetFields() {
      this.$emit('open-emit')
    },
    closeModal() {
      this.$bvModal.hide(`modal-${this.name}`)
    }
  }

}
</script>

<style lang="scss">

.crud__btn {
  margin-left: .5rem;
}

.update__btn,
.delete__btn {
  padding: .5rem .75rem;
}

[dir=ltr] .modal-header .close {
  margin: 0;
}

</style>
