<template>
    <b-card>
        <h2 class="pl-1">Клиент </h2>
        <b-row>
            <b-col cols="12" md="6" class="px-1">
                <b-form-group label="Имя" label-for="name-ru">
                    <b-form-input v-model="client.first_name" id="name-ru" size="md" readonly />
                </b-form-group>
            </b-col>
            <b-col cols="12" md="6" class="px-1">
                <b-form-group label="Фамилия" label-for="name-uz">
                    <b-form-input v-model="client.last_name" id="name-uz" size="md" readonly />
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12" md="6" class="px-1">
                <b-form-group label="Телефон" label-for="name-ru">
                    <b-form-input v-model="client.phone" id="name-ru" size="md" readonly />
                </b-form-group>
            </b-col>
            <b-col cols="12" md="6" class="px-1">
                <b-form-group label="Баланс" label-for="name-uz">
                    <b-form-input v-model="client.wallet.balance" id="name-uz" size="md" readonly />
                </b-form-group>
            </b-col>
        </b-row>

        <h2 class="pl-1 mt-3">Транзакции </h2>
        <b-row>
            <b-col cols="12">
                <b-table striped hover responsive sort-icon-left :busy="isBusy" :items="client.wallet.transactions"
                    :fields="fields" @sort-changed="handleSortChange">
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
        </b-row>

    </b-card>
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
    BCard
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
        BCard,
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
                    key: "type",
                    label: "Тип",
                },
                {
                    key: "status",
                    label: "Статус",
                },
                {
                    key: "created_at",
                    label: "Дата создания",
                },
            ],
            client: {
                first_name: '',
                last_name: '',
                phone: '',
                wallet: {
                    balance: 0
                }
            },
            pagination: paginationData(),
        };
    },
    watch: paginationWatchers("getData"),

    async mounted() {
        this.setParams();
        await this.getData();
        tapi.fetchClient(this.$route.params.id).then(res => this.client = res.data)
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
        ...paginationHelperMethods(
            "",
            {

            }
        ),
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
            await tapi.fetchClients(this.getParams())
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
