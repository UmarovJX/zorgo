<template>
    <b-row>
        <h2 class="pl-1">Услуги</h2>

        <!--  BEFORE TABLE  -->
        <div class="d-flex justify-content-between col-12">
            <b-col md="4" class="my-1 px-0">
                <b-form-group class="mb-0">
                    <b-input-group size="md">
                        <b-form-input
                            id="filterInput"
                            v-model="filter"
                            type="search"
                            placeholder="Искать"
                        />
                        <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter = ''">
                                Очистить
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-col>

            <!--      CREATE     -->
            <!--      <div class="d-flex align-items-center justify-content-center float-right">-->
            <!--        <router-link class="create__btn btn-primary" :to="{name:'role-create'}">Создать</router-link>-->
            <!--      </div>-->
        </div>

        <!--  TABLE  -->
        <b-col cols="12">
            <b-table
                striped
                hover
                responsive
                sort-icon-left
                :busy="isBusy"
                :items="items"
                :fields="fields"
                :filter-included-fields="filterOn"
            >
                <template #table-busy>
                    <div class="text-center text-primary my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong class="ml-1">Идет загрузка ...</strong>
                    </div>
                </template>

                <template #cell(active)="data">
                    <span v-if="data.item.active">Активен</span>
                    <span v-else>Не активен</span>
                </template>
                <template #cell(category.name.ru)="{ item }">
                    <span v-if="item.category">{{
                        item.category.name.ru
                    }}</span>
                    <span v-else>Нет категории</span>
                </template>

                <template #cell(image)="data">
                    <div
                        style="width: 90px; height: 80px"
                        v-if="data.item.image"
                    >
                        <img
                            style="
                                object-fit: contain;
                                width: 100%;
                                height: 100%;
                            "
                            :src="data.item.image"
                        />
                    </div>
                </template>

                <template #cell(crud_row)="data">
                    <div class="d-flex float-right">
                        <!--    EDIT    -->
                        <router-link
                            :to="{ path: `service/update/${data.item.id}` }"
                        >
                            <b-button
                                variant="outline-success"
                                class="update__btn"
                            >
                                <feather-icon icon="Edit2Icon" size="18" />
                            </b-button>
                        </router-link>

                        <!--  DEACTIVATE  -->
                        <div class="ml-1" v-if="data.item.active">
                            <!--  DEACTIVATE  -->
                            <b-button
                                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                v-b-modal="`modal-${data.item.id}`"
                                variant="outline-danger"
                                class="delete__btn"
                            >
                                <feather-icon icon="Trash2Icon" size="18" />
                            </b-button>

                            <!-- DEACTIVATE MODAL -->
                            <b-modal
                                :id="`modal-${data.item.id}`"
                                cancel-title="Отменить"
                                cancel-variant="danger btn-sm"
                                body-class="deactivate-btn_modal"
                                title="Деактивация"
                                hide-header-close
                                centered
                            >
                                Вы действительно хотите деактивировать эту
                                услугу?

                                <template #modal-footer>
                                    <b-button
                                        variant="danger btn-sm"
                                        @click="
                                            $bvModal.hide(
                                                `modal-${data.item.id}`
                                            )
                                        "
                                    >
                                        Отменить
                                    </b-button>

                                    <b-button
                                        variant="success btn-sm"
                                        @click="
                                            deactivateCategory(
                                                data.item.id,
                                                data.item.active
                                            )
                                        "
                                    >
                                        Деактивировать
                                    </b-button>
                                </template>
                            </b-modal>
                        </div>

                        <!--  ACTIVATE  -->
                        <div class="ml-1" v-else>
                            <!--  ACTIVATE  -->
                            <b-button
                                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                v-b-modal="`modal-${data.item.id}`"
                                variant="outline-info"
                                class="delete__btn"
                            >
                                <feather-icon
                                    icon="CornerUpLeftIcon"
                                    size="18"
                                />
                            </b-button>
                            <!-- ACTIVATE MODAL -->
                            <b-modal
                                :id="`modal-${data.item.id}`"
                                cancel-title="Отменить"
                                cancel-variant="danger btn-sm"
                                body-class="deactivate-btn_modal"
                                title="Активация"
                                hide-header-close
                                centered
                            >
                                Вы действительно хотите активировать эту услугу?

                                <template #modal-footer>
                                    <b-button
                                        variant="danger btn-sm"
                                        @click="
                                            $bvModal.hide(
                                                `modal-${data.item.id}`
                                            )
                                        "
                                    >
                                        Отменить
                                    </b-button>

                                    <b-button
                                        variant="success btn-sm"
                                        @click="
                                            deactivateCategory(
                                                data.item.id,
                                                data.item.active
                                            )
                                        "
                                    >
                                        Активировать
                                    </b-button>
                                </template>
                            </b-modal>
                        </div>
                    </div>
                </template>
            </b-table>
        </b-col>

        <!--  PAGINATION  -->
        <b-col cols="12" class="mb-3">
            <b-pagination
                v-if="showPagination"
                v-model="pagination.current"
                :total-rows="pagination.total"
                :per-page="pagination.per_page"
                align="center"
                size="sm"
                class="my-0"
            />
        </b-col>
    </b-row>
</template>

<script>
import {
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
import ModalButton from "@/views/ui/modals/ModalButton";
import api from "@/services/api";
import Ripple from "vue-ripple-directive";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
    paginationData,
    paginationWatchers,
    paginationHelperMethods,
} from "@/util/pagination-helper";

export default {
    name: "AppCategories",
    components: {
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
    },
    data() {
        return {
            name: "",
            isBusy: false,
            filter: null,
            filterOn: [],
            infoModal: {
                id: "info-modal",
                title: "",
                content: "",
            },
            fields: [
                {
                    key: "id",
                    label: "ID",
                },
                {
                    key: "name.ru",
                    label: "Название",
                },

                {
                    key: "image",
                    label: "Изображения",
                },
                {
                    key: "active",
                    label: "Статус",
                },
                {
                    key: "category.name.ru",
                    label: "Категория",
                },
                {
                    key: "crud_row",
                    label: " ",
                },
            ],
            items: [],
            pagination: paginationData(),
            totalRows: 1,
        };
    },
    watch: paginationWatchers("getCategories"),

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
            return this.hasItems && !this.isBusy;
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
            this.isBusy = true;
            await api.categories
                .fetchCategories()
                .then((res) => {
                    this.items = res.data.data;
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    this.isBusy = false;
                });
        },

        deactivateCategory(id, active) {
            api.categories
                .deleteCategory(id)
                .then(() => {
                    this.getCategories();
                    if (active === 1) {
                        this.showToast(
                            "success",
                            "Деактивация прошла успешно!",
                            "CheckIcon"
                        );
                    } else {
                        this.showToast(
                            "success",
                            "Активация прошла успешно!",
                            "CheckIcon"
                        );
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.showToast("danger", "Что-то пошло не так!", "XIcon");
                });
        },
    },
};
</script>

<style lang="scss" scoped>
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
