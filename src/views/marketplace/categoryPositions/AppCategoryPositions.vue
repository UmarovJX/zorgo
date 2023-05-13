<template>
    <b-row>
        <b-col cols="12">
            <h2>Позиции Категорий</h2>
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
                <TransitionGroup name="position">
                    <b-card
                        class="mb-1"
                        body-class="p-1"
                        v-for="(cat, i) in items"
                        :key="cat.name.ru + cat.id"
                        cols="12"
                    >
                        <b-row>
                            <b-col cols="12" md="4" sm="6">
                                <feather-icon
                                    icon="MenuIcon"
                                    size="24"
                                    class="mr-1 cursor-pointer handle-category"
                                />
                                {{ i + 1 + ". " + cat.name.ru }}
                            </b-col>
                            <b-col v-if="cat.categories.length > 0">
                                <b-row>
                                    <b-col>
                                        <b-button
                                            size="sm"
                                            v-b-toggle="'collapse' + i"
                                            variant="primary"
                                            >Подкатегории
                                            <feather-icon
                                                icon="ArrowDownIcon"
                                                size="14"
                                            />
                                        </b-button>
                                        <b-collapse :id="'collapse' + i">
                                            <b-card
                                                class="mb-0"
                                                body-class="pb-0 pl-1 pt-0"
                                                ><draggable
                                                    v-model="
                                                        items[i].categories
                                                    "
                                                    :group="'sub' + i"
                                                    @start="drag = true"
                                                    @end="drag = false"
                                                    handle=".handle-sub"
                                                >
                                                    <b-row
                                                        class="pr-1 mt-1"
                                                        v-for="(
                                                            sub, iSub
                                                        ) in cat.categories"
                                                        :key="sub.id"
                                                    >
                                                        <b-col>
                                                            <feather-icon
                                                                icon="MenuIcon"
                                                                size="20"
                                                                class="mr-1 cursor-pointer handle-sub"
                                                            />
                                                            {{
                                                                iSub +
                                                                1 +
                                                                ". " +
                                                                sub.name.ru
                                                            }}
                                                        </b-col>
                                                    </b-row>
                                                </draggable>
                                            </b-card>
                                        </b-collapse>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-card>
                </TransitionGroup>
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
    name: "AppCategories",
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
            isLoading: false,
            isSaving: false,
            items: [],
        };
    },
    watch: {},

    async mounted() {
        await this.getCategories();
    },

    computed: {
        rows() {
            return this.items.length;
        },

        query() {
            return Object.assign({}, this.$route.query);
        },

        showPagination() {
            return this.hasItems && !this.isLoading;
        },

        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter((f) => f.sortable)
                .map((f) => ({ text: f.label, value: f.key }));
        },
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

        replaceRouter(query) {
            this.$router.replace({ query }).catch(() => {});
        },

        async getCategories() {
            this.isLoading = true;
            await api.categories
                .fetchAllCategories()
                .then((res) => {
                    this.items = res.data.filter((el) => el.category == null);
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
            const newOrder = this.items.map((el) => ({
                id: el.id,
                categories: el.categories.map((sub) => sub.id),
            }));

            const data = { categories: newOrder };
            this.items = [];
            api.categories
                .updatePosition(data)
                .then(() => {
                    this.getCategories();
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

<style lang="scss" scoped>
.hidden_header {
    display: none;
}
[dir] .dropdown-item {
    padding: 0;
}

//::v-deep .table thead th[aria-colindex="1"] {
//  width: 70px;
//}

.validation__red {
    color: red;
    font-size: 12px;
    display: block;
    margin-bottom: 1rem;
}

.form-group {
    margin-bottom: 6px;
}
</style>
