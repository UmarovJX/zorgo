<template>
    <b-row>
        <h2 class="pl-1">Транзакции</h2>

        <!--  BEFORE TABLE  -->
        <!-- <div class="d-flex justify-content-between col-12">
            <b-col md="4" class="my-1 px-0">
                <b-form-group class="mb-0">
                    <b-input-group size="md">
                        <b-form-input id="filterInput" v-model="filter" type="search" placeholder="Искать" />
                        <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter = ''">
                                Очистить
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-col>

            <div class="d-flex align-items-center justify-content-center float-right">
                <router-link v-if="isCreateAvailable" class="create__btn btn-primary"
                    :to="{ name: editPageName }">Создать</router-link>
            </div>
        </div> -->

        <!--  TABLE  -->
        <b-col cols="12">
            <b-table striped hover responsive sort-icon-left :busy="isBusy" :items="items" :fields="fields"
                @sort-changed="handleSortChange">
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

                <template #cell(created_at)="data">
                    <span>{{
                new Date(data.item.created_at).toLocaleDateString("ru")
            }}</span>
                </template>
            </b-table>
        </b-col>

        <!--  PAGINATION  -->
        <b-col cols="12" class="mb-3 d-flex justify-content-between align-items-center">
            <b-form-select class="float-right col-1" v-model="pagination.perPage" placeholder="Выберите"
                :options="pagination.perPageOptions">
            </b-form-select>
            <b-pagination v-model="pagination.page" :total-rows="pagination.total" :per-page="pagination.perPage"
                align="center" size="sm" class="my-0" />
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
import Transactions from "@/services/transactions";
import Ripple from "vue-ripple-directive";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
    paginationData,
    paginationWatchers,
    paginationHelperMethods,
} from "@/util/pagination-helper";
import permissionComputeds from "@/util/permissionComputeds";
const tapi = new Transactions();

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
            apiEntry: "dealers",
            name: null,
            isBusy: false,
            filter: null,
            fields: [
                {
                    key: "id",
                    label: "ID",
                },
                {
                    key: "amount",
                    label: "Сумма",
                },
                {
                    key: "status",
                    label: "Статус",
                },
                {
                    key: "wallet.owner",
                    label: "Статус",
                    formatter: v => v.first_name + ' ' + v.last_name
                },
                {
                    key: "created_at",
                    label: "Дата создания",
                },
            ],
            items: [],
            pagination: paginationData(),
        };
    },
    watch: paginationWatchers("getData"),

    async mounted() {
        tapi.fetchAll().then(res => console.log(res))
        tapi.fetchClients().then(res => console.log(res))
        this.setParams();
        await this.getData();
        if (this.isDeleteAvailable || this.isUpdateAvailable)
            this.fields.push({
                key: "crud_row",
                label: " ",
            });
    },

    computed: {
        ...permissionComputeds("dealer"),
        editPageName() {
            return this.apiEntry.slice(0, -1) + "-edit";
        },
        showPagination() {
            return (
                this.pagination.total > this.pagination.perPage && !this.isBusy
            );
        },
    },

    methods: {
        /////////////
        ...paginationHelperMethods("", {}),
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
            await tapi
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
