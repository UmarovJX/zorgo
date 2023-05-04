<template>
    <b-row>
        <h2 class="pl-1">Путешествие</h2>

        <div class="d-flex justify-content-between col-12">
            <b-col md="4" class="my-1 px-0">
                <b-form-group class="mb-0">
                    <b-input-group size="md">
                        <b-form-input
                            id="filterInput"
                            v-model="filter"
                            type="search"
                            placeholder="Искать"
                            @change="getPolicies"
                        />
                        <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter = ''">
                                Очистить
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-col>
            <div
                class="d-flex align-items-center justify-content-center float-right"
            >
                <b-button
                    :disabled="isExporting"
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    v-b-modal="`modal-export`"
                    variant="outline-success"
                    class="delete__btn"
                >
                    <feather-icon
                        icon="DownloadIcon"
                        size="18"
                        v-if="!isExporting"
                    />
                    <b-spinner v-else small></b-spinner>
                </b-button>
                <!-- EXPORT MODAL -->
                <b-modal
                    :id="`modal-export`"
                    cancel-title="Отменить"
                    cancel-variant="danger btn-sm"
                    body-class="deactivate-btn_modal"
                    title="Экспорт полисов"
                    hide-header-close
                    centered
                >
                    <b-row>
                        <b-col md="6" class="mb-2"
                            ><label for="from-datepicker">От:</label>
                            <b-form-datepicker
                                hide-header
                                id="from-datepicker"
                                v-model="dateFrom"
                                locale="ru"
                            ></b-form-datepicker
                        ></b-col>
                        <b-col md="6"
                            ><label for="date-to-datepicker">До:</label>
                            <b-form-datepicker
                                :disabled="!dateFrom"
                                :min="minDate"
                                hide-header
                                id="date-to-datepicker"
                                v-model="dateTo"
                                locale="ru"
                            ></b-form-datepicker
                        ></b-col>
                    </b-row>

                    <b-row>
                        <b-col md="6">
                            <b-form-select
                                v-model="companyId"
                                :options="companyOptions"
                            ></b-form-select>
                        </b-col>
                    </b-row>

                    <template #modal-footer>
                        <b-button
                            variant="danger btn-sm"
                            @click="$bvModal.hide(`modal-export`)"
                        >
                            Отменить
                        </b-button>

                        <b-button variant="success btn-sm" @click="exportData">
                            Экспорт
                        </b-button>
                    </template>
                </b-modal>
            </div>
        </div>

        <!--  TABLE  -->
        <b-col cols="12">
            <b-table
                striped
                hover
                responsive
                sort-icon-left
                :busy="loading"
                :items="policies"
                :fields="fields"
                @sort-changed="handleSortChange"
            >
                <template #table-busy>
                    <div class="text-center text-primary my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong class="ml-1">Идет загрузка ...</strong>
                    </div>
                </template>

                <template #cell(platform)="{ item }">
                    <template v-if="item.platform === 'browser'">Сайт</template>
                    <template v-if="item.platform === 'mobile'"
                        >Мобильное приложение</template
                    >
                </template>

                <template #cell(status)="data">
                    <p
                        v-if="data.item.status === 3 || data.item.status === 7"
                        class="text-danger"
                    >
                        Отменен
                    </p>
                    <p v-else class="text-success">Выдан</p>
                </template>
                <template #cell(price)="data">
                    {{ data.item.price | formatNumber }}
                </template>
                <template #cell(group_id)="data">{{
                    data.item.group_id ? "Семейный" : "Индувидуальный"
                }}</template>

                <template #cell(crud_row)="data">
                    <div class="d-flex float-right">
                        <b-button
                            v-if="data.item.policy.contract_url"
                            :href="data.item.policy.contract_url"
                            target="_blank"
                            variant="success"
                            class="btn-sm btn-icon mr-1"
                        >
                            <feather-icon size="18" icon="DownloadCloudIcon" />
                        </b-button>
                        <router-link
                            :to="{ path: `/insurance/travel/${data.item.id}` }"
                        >
                            <b-button variant="info" class="btn-sm btn-icon">
                                <feather-icon size="18" icon="EyeIcon" />
                            </b-button>
                        </router-link>
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
                v-if="showPagination"
                class="float-right col-1"
                v-model="pagination.perPage"
                placeholder="Выберите"
                :options="pagination.perPageOptions"
            >
            </b-form-select>
            <b-pagination
                v-if="showPagination"
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
import api from "@/services/api";
import Ripple from "vue-ripple-directive";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
    paginationData,
    paginationHelperMethods,
    paginationWatchers,
} from "@/util/pagination-helper";
import { exportHelperData, exportHelperFunctions } from "@/util/exportHelper";

import {
    BRow,
    BCol,
    BFormGroup,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BTable,
    BPagination,
    BSpinner,
    BFormSelect,
    BFormDatepicker,
} from "bootstrap-vue";

export default {
    name: "Index",
    components: {
        BRow,
        BCol,
        BFormGroup,
        BInputGroup,
        BFormInput,
        BInputGroupAppend,
        BButton,
        BTable,
        BPagination,
        BSpinner,
        BFormSelect,
        BFormDatepicker,
        ToastificationContent,
    },
    directives: {
        Ripple,
    },
    data() {
        return {
            ...exportHelperData(),
            policies: [],
            filter: "",
            pagination: paginationData(),
            filter: null,
            filterOn: [],
            loading: false,
            infoModal: {
                id: "info-modal",
                title: "",
                content: "",
            },
            fields: [
                {
                    key: "id",
                    label: "ID",
                    sortable: true,
                },
                {
                    key: "status",
                    label: "Статус",
                },
                {
                    key: "price",
                    label: "Стоимость",
                    sortable: true,
                },
                {
                    key: "date_begin",
                    label: "Дата начало",
                    sortable: true,
                },

                {
                    key: "activity",
                    label: "Цель поездки",
                },
                {
                    key: "group_id",
                    label: "Тип",
                },
                // {
                //   key: 'countries',
                //   label: 'Страны',
                // },

                {
                    key: "policy.anketa_id",
                    label: "ID анкеты",
                },
                {
                    key: "policy.number",
                    label: "Номер полиса",
                },
                {
                    key: "applicant.name",
                    label: "Имя заявителя",
                },
                {
                    key: "applicant.phone",
                    label: "Номер заявителя",
                },
                {
                    key: "company.name",
                    label: "Компания",
                },
                {
                    key: "platform",
                    label: "Платформа",
                },
                {
                    key: "created_at",
                    label: "Время создания",
                    sortable: true,
                },
                {
                    key: "crud_row",
                    label: " ",
                },
            ],
        };
    },

    watch: paginationWatchers("getPolicies"),

    computed: {
        showPagination() {
            return (
                this.pagination.total > this.pagination.perPage && !this.loading
            );
        },
        minDate() {
            return new Date(this.dateFrom);
        },
    },

    async mounted() {
        this.getCompanies();
        this.setParams();
        await this.getPolicies();
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
        ...exportHelperFunctions(
            api,
            "insurance/travel/export",
            "travel_policies"
        ),
        async getCompanies() {
            api.companies.fetchAll().then(({ data }) => {
                const options = data
                    .filter((el) => el.active)
                    .map((el) => ({ value: el.id, text: el.name }));
                this.companyOptions = [
                    { value: null, text: "Выберите компанию", disabled: true },
                    ...options,
                ];
            });
        },

        async getPolicies() {
            this.loading = true;
            api.travels
                .fetchPolicies(this.getParams())
                .then((res) => {
                    this.policies = res.data.data;
                    this.pagination.total = res.data.total;
                })
                .finally(() => (this.loading = false));
        },
        ...paginationHelperMethods(
            "search[id,policy.anketa_id,policy.number," +
                "applicant.name,applicant.phone]",
            {
                id: "id",
                price: "price",
                created_at: "created_at",
                date_begin: "date_begin",
            }
        ),
    },
};
</script>

<style scoped></style>
