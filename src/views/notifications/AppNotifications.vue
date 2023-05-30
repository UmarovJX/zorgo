<template>
    <b-row>
        <h2 class="pl-1">Уведомления</h2>

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
    name: "AppDealers",
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
            apiEntry: "notifications",
            name: null,
            isBusy: false,
            filter: null,
            fields: [
                {
                    key: "id",
                    label: "ID",
                    sortable: true,
                },
                {
                    key: "title",
                    label: "Название",
                },
                {
                    key: "body",
                    label: "Текст",
                },
                {
                    key: "image",
                    label: "изображение",
                },
                {
                    key: "type",
                    label: "Тип",
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
    },

    computed: {
        ...permissionComputeds("notification"),
        editPageName() {
            return this.apiEntry.slice(0, -1) + "-edit";
        },
    },

    methods: {
        /////////////
        ...paginationHelperMethods("search[id,client_id,title,resource_id]", {
            id: "id",
            client_id: "client_id",
            title: "title",
            company: "company",
            resource_id: "resource_id",
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
