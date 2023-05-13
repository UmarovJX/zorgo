<template>
    <b-row>
        <b-col cols="12">
            <h2>Позиции Подборок товаров</h2>
        </b-col>
        <b-col class="text-center text-primary my-2" cols="12" v-if="isLoading">
            <b-spinner class="align-middle"></b-spinner>
            <strong class="ml-1">Идет загрузка ...</strong>
        </b-col>
        <b-col v-else>
            <draggable
                animation="200"
                v-model="items"
                group="category"
                @start="drag = true"
                @end="drag = false"
                handle=".handle-category"
            >
                <b-card
                    class="mb-1"
                    body-class="p-1"
                    v-for="(el, i) in items"
                    :key="el.id"
                    cols="12"
                >
                    <b-row>
                        <b-col cols="12">
                            <feather-icon
                                icon="MenuIcon"
                                size="24"
                                class="mr-1 cursor-pointer handle-category"
                            />
                            {{ i + 1 + ". " + el.title }}
                        </b-col>
                    </b-row>
                </b-card>
            </draggable>
        </b-col>
        <b-col cols="12">
            <b-button
                class="btn-success float-right mt-2"
                @click="save"
                :disabled="isSaving"
            >
                Сохранить
            </b-button>
        </b-col>
    </b-row>
</template>

<script>
import draggable from "vuedraggable";
import {
    BCollapse,
    BTable,
    BBadge,
    BRow,
    BCol,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BDropdown,
    BDropdownItem,
    BFormCheckbox,
    BSpinner,
    BCard,
    BOverlay,
    BFormTextarea,
} from "bootstrap-vue";
import { VBToggle } from "bootstrap-vue";

import ModalButton from "@/views/ui/modals/ModalButton";
import api from "@/services/api";
import Ripple from "vue-ripple-directive";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
    name: "AppBannerPositions",
    components: {
        BCollapse,
        draggable,
        BTable,
        BBadge,
        BRow,
        BCol,
        BFormGroup,
        BFormSelect,
        BPagination,
        BInputGroup,
        BFormInput,
        BInputGroupAppend,
        BButton,
        BDropdown,
        BDropdownItem,
        BFormCheckbox,
        BSpinner,
        BCard,
        BFormTextarea,
        BOverlay,
        ModalButton,
        ToastificationContent,
    },
    directives: {
        Ripple,
        "b-toggle": VBToggle,
    },
    data() {
        return {
            apiEntry: "banners",
            isLoading: false,
            isSaving: false,
            items: [],
        };
    },

    async mounted() {
        await this.getData();
    },

    methods: {
        showToast(variant, text, icon) {
            this.$toast({
                component: ToastificationContent,
                props: {
                    title: text,
                    icon: icon,
                    variant,
                },
            });
        },

        async getData() {
            this.isLoading = true;
            await api[this.apiEntry]
                .fetchAllByPosition()
                .then((res) => {
                    this.items = res.data.data;
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },

        async save() {
            this.isSaving = true;
            const newOrder = this.items.map((el) => el.id);

            const data = { banners: newOrder };
            this.items = [];
            api[this.apiEntry]
                .updatePosition(data)
                .then(() => {
                    this.getData();
                    this.showToast(
                        "success",
                        "Успешно cохранено!",
                        "CheckIcon"
                    );
                })
                .catch((error) => {
                    console.error(error);
                    this.showToast("danger", "Что-то пошло не так!", "XIcon");
                })
                .finally(() => {
                    this.isSaving = false;
                });
        },
    },
};
</script>

<style lang="scss" scoped></style>
