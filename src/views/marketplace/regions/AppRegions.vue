<template>
    <b-row>
        <h2 class="pl-1">Регионы</h2>

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
            <div
                class="d-flex align-items-center justify-content-center float-right"
            >
                <router-link
                    v-if="isCreateAvailable"
                    class="create__btn btn-primary"
                    :to="{ name: editPageName }"
                    >Создать</router-link
                >
            </div>
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
                @sort-changed="handleSortChange"
            >
                <template #table-busy>
                    <div class="text-center text-primary my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong class="ml-1">Идет загрузка ...</strong>
                    </div>
                </template>
                <template #cell(subtitle)="data">
                    <span v-if="data.item.subtitle">{{
                        data.item.subtitle
                    }}</span>
                    <span v-else>Отсутствует</span>
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

                <template #cell(active)="data">
                    <span v-if="data.item.active">Активен</span>
                    <span v-else>Не активен</span>
                </template>

                <template #cell(crud_row)="data">
                    <div class="d-flex float-right">
                        <!--    EDIT    -->
                        <router-link
                            v-if="isUpdateAvailable"
                            :to="{
                                name: editPageName,
                                params: { id: data.item.id },
                            }"
                        >
                            <b-button
                                variant="outline-success"
                                class="update__btn"
                            >
                                <feather-icon icon="Edit2Icon" size="18" />
                            </b-button>
                        </router-link>

                        <!--  DEACTIVATE  -->
                        <div
                            class="ml-1"
                            v-if="data.item.active && isDeleteAvailable"
                        >
                            <!--  DEACTIVATE  -->
                            <b-button
                                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                v-b-modal="`modal-${data.item.id}`"
                                variant="outline-danger"
                                class="delete__btn"
                            >
                                <feather-icon icon="MinusCircleIcon" size="18" />
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
                                позицию?

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
                                            deactivateEntry(
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
                        <div
                            class="ml-1"
                            v-if="!data.item.active && isDeleteAvailable"
                        >
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
                                Вы действительно хотите активировать эту
                                позицию?

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
                                            deactivateEntry(
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
        <b-col
            cols="12"
            class="mb-3 d-flex justify-content-between align-items-center"
        >
            <b-form-select
                class="float-right col-1"
                v-model="pagination.perPage"
                placeholder="Выберите"
                :options="pagination.perPageOptions"
            >
            </b-form-select>
            <b-pagination
                v-model="pagination.page"
                :total-rows="pagination.total"
                :per-page="pagination.perPage"
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
    BRow,
    BCol,
    BFormGroup,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BSpinner,
    BFormSelect,
} from "bootstrap-vue";
import api from "@/services/api";
import Ripple from "vue-ripple-directive";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
    paginationData,
    paginationWatchers,
    paginationHelperMethods,
} from "@/util/pagination-helper";
import permissionComputeds from "@/util/permissionComputeds";

export default {
    name: "AppRegions",
    components: {
        BTable,
        BRow,
        BCol,
        BFormGroup,
        BPagination,
        BInputGroup,
        BFormInput,
        BInputGroupAppend,
        BButton,
        BSpinner,
        BFormSelect,
        ToastificationContent,
    },
    directives: {
        Ripple,
    },
    data() {
        return {
            apiEntry: "regions",
            name: null,
            isBusy: false,
            filter: null,
            filterOn: [],
            fields: [
                {
                    key: "id",
                    label: "ID",
                    sortable: true,
                },
                {
                    key: "name.ru",
                    label: "Название",
                    sortable: true,
                },
                {
                    key: "name.uz",
                    label: "Название",
                },
                {
                    key: "delivery_price",
                    label: "Цена доставки",
                },
                {
                    key: "active",
                    label: "Статус",
                },
            ],
            items: [],
            pagination: paginationData(),
        };
    },
    watch: paginationWatchers("getData"),

    async mounted() {
        this.setParams();
        await this.getData();
        if (this.isDeleteAvailable || this.isUpdateAvailable)
            this.fields.push({
                key: "crud_row",
                label: " ",
            });
    },

    computed: {
        ...permissionComputeds("region"),
        editPageName() {
            return this.apiEntry.slice(0, -1) + "-edit";
        },
    },

    methods: {
        /////////////
        ...paginationHelperMethods("search[id,name]", {
            id: "id",
            "name.ru": "name",
        }),
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
            this.isBusy = true;
            await api[this.apiEntry]
                .fetchAll(this.getParams())
                .then((res) => {
                    this.items = res.data.data;
                    this.pagination.total = res.data.total;
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    this.isBusy = false;
                });
        },

        deactivateEntry(id, active) {
            api[this.apiEntry]
                .deactivate(id)
                .then(() => {
                    this.getData();
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
