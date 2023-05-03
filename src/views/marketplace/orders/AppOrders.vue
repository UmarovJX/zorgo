<template>
    <b-row>
        <h2 class="pl-1">Заказы</h2>

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
                @filtered="onFiltered"
            >
                <template #table-busy>
                    <div class="text-center text-primary my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong class="ml-1">Идет загрузка ...</strong>
                    </div>
                </template>

                <template #cell(status)="{ item }">
                    <b-row>
                        <b-col cols="6">{{ item.status }}</b-col>
                        <b-col cols="6"
                            ><b-button
                                v-if="item.status !== 'closed'"
                                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                v-b-modal="`modal-${item.id}`"
                                variant="outline-info"
                                class="delete__btn"
                            >
                                <feather-icon icon="Edit2Icon" size="18" />
                            </b-button>

                            <b-modal
                                :id="`modal-${item.id}`"
                                cancel-title="Отменить"
                                cancel-variant="danger btn-sm"
                                body-class="deactivate-btn_modal"
                                title="Изменить статус"
                                hide-header-close
                                centered
                            >
                                <ValidationObserver ref="validation-observer">
                                    <ValidationProvider
                                        name="Статус"
                                        rules="required"
                                        v-slot="{ errors }"
                                    >
                                        <b-form-group
                                            label="Статус"
                                            label-for="status"
                                        >
                                            <b-form-select
                                                :options="statusOptions"
                                                v-model="status"
                                            >
                                            </b-form-select>
                                        </b-form-group>
                                        <p
                                            v-if="errors"
                                            class="validation__red"
                                        >
                                            {{ errors[0] }}
                                        </p>
                                    </ValidationProvider>
                                </ValidationObserver>
                                <template #modal-footer>
                                    <b-button
                                        variant="danger btn-sm"
                                        @click="
                                            $bvModal.hide(`modal-${item.id}`),
                                                (status = null)
                                        "
                                    >
                                        Отменить
                                    </b-button>

                                    <b-button
                                        variant="success btn-sm"
                                        @click="changeStatus(item.id)"
                                    >
                                        Сохранить
                                    </b-button>
                                </template>
                            </b-modal></b-col
                        >
                    </b-row>
                </template>
                <template #cell(button)="{ item }">
                    <b-button
                        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                        @click="openDetails(item.id)"
                        variant="outline-info"
                        class="delete__btn ml-2"
                    >
                        <feather-icon icon="EyeIcon" size="18" />
                    </b-button>
                </template>

                <template #cell(client)="{ item }">
                    <div>
                        {{
                            item.client.first_name + " " + item.client.last_name
                        }}
                    </div>
                    <div>{{ item.client.phone }}</div>
                </template>
            </b-table>
        </b-col>

        <!--  PAGINATION  -->
        <b-col
            cols="12"
            class="mb-3 d-flex justify-content-between align-items-center"
            v-if="items.length > 0"
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
import ModalButton from "@/views/ui/modals/ModalButton";
import api from "@/services/api";
import Ripple from "vue-ripple-directive";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
    paginationData,
    paginationWatchers,
    paginationHelperMethods,
} from "@/util/pagination-helper";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
    name: "AppYears",
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
        ModalButton,
        ToastificationContent,
        ValidationObserver,
        ValidationProvider,
    },
    directives: {
        Ripple,
    },
    data() {
        return {
            status: null,
            statusOptions: [
                { value: null, text: "Выберите новый статус", disabled: true },
                { value: "processing", text: "processing" },
                { value: "delivery", text: "delivery" },
                { value: "canceled", text: "canceled" },
                { value: "closed", text: "closed" },
            ],
            name: null,
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
                    sortable: true,
                },
                {
                    key: "status",
                    label: "Status",
                },
                {
                    key: "price",
                    label: "Price",
                    sortable: true,
                },
                {
                    key: "created_at",
                    label: "created_at",
                    sortable: true,
                    formatter: "toLocaleDate",
                },
                {
                    key: "updated_at",
                    label: "updated_at",
                    sortable: true,
                    formatter: "toLocaleDate",
                },
                {
                    key: "client",
                    label: "Client",
                },
                {
                    key: "button",
                    label: "",
                },
            ],
            items: [],
            pagination: paginationData(),
            totalRows: 1,
        };
    },
    watch: paginationWatchers("getOrders"),

    mounted() {
        this.setParams();
        this.getOrders();
    },

    computed: {
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
        toLocaleDate(date) {
            return new Date(date).toLocaleDateString("ru");
        },
        ///////////
        ...paginationHelperMethods("search[id,name]"),
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

        async getOrders() {
            this.isBusy = true;
            await api.orders
                .fetchOrders(this.getParams())
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
        async changeStatus(id) {
            const isValid = await this.$refs["validation-observer"].validate();
            if (isValid) {
                api.orders
                    .changeStatus(id, { status: this.status })
                    .then(() => {
                        this.items = [];
                        this.getOrders();
                        this.showToast(
                            "success",
                            "Статус изменен успешно!",
                            "CheckIcon"
                        );
                    })
                    .catch((error) => {
                        console.error(error);
                        this.showToast(
                            "danger",
                            "Что-то пошло не так!",
                            "XIcon"
                        );
                    })
                    .finally(() => {
                        this.status = null;
                    });
            } else {
                this.showToast("danger", "Необходимо выбрать статус");
            }
        },
        openDetails(id) {
            this.$router.push({ name: "order-details", params: { id } });
        },

        info(item, index, button) {
            this.infoModal.title = `Row index: ${index}`;
            this.infoModal.content = JSON.stringify(item, null, 2);
            this.$root.$emit("bv::show::modal", this.infoModal.id, button);
        },
        resetInfoModal() {
            this.infoModal.title = "";
            this.infoModal.content = "";
        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.pagination.current = 1;
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
