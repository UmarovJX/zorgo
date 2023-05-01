<template>
    <div>
        <b-card title="Order Details" v-if="!isBusy && order">
            <b-row>
                <b-col>
                    <b-table
                        borderless
                        striped
                        :items="mainData"
                        :fields="mainDataFields"
                        thead-class="hidden_header"
                    >
                        <template #cell(value)="{ item }">
                            <template v-if="item.label !== 'Status:'">{{
                                item.value
                            }}</template>
                            <template v-else>
                                <span>{{ item.value }}</span>
                                <b-button
                                    v-if="item.value !== 'closed'"
                                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                    v-b-modal="`modal-order`"
                                    variant="outline-info"
                                    class="delete__btn ml-2 btn-sm"
                                >
                                    <feather-icon icon="Edit2Icon" size="18" />
                                </b-button>

                                <b-modal
                                    :id="`modal-order`"
                                    cancel-title="Отменить"
                                    cancel-variant="danger btn-sm"
                                    body-class="deactivate-btn_modal"
                                    title="Изменить статус"
                                    hide-header-close
                                    centered
                                >
                                    <ValidationObserver
                                        ref="validation-observer"
                                    >
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
                                                $bvModal.hide(`modal-order`),
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
                                </b-modal>
                            </template>
                        </template>
                    </b-table>
                </b-col>
            </b-row>
            <hr />

            <b-row>
                <b-col md="6">
                    <p>Price: {{ order.price }}</p>
                    <p>Product Price: {{ order.product_price }}</p>
                    <p>Delivery Price: {{ order.delivery_price }}</p>
                    <p>Products Count: {{ order.products_count }}</p>
                </b-col>
                <b-col md="6" v-if="order.promo_code">
                    <p>Promo Code: {{ order.promo_code.code }}</p>
                    <p>Promo Code Discount: {{ order.promo_code.discount }}</p>
                </b-col>
            </b-row>
            <hr />
            <b-row>
                <b-col md="6">
                    <h5>Customer Details</h5>
                    <p>
                        Name: {{ order.details.first_name }}
                        {{ order.details.last_name }}
                    </p>
                    <p>Phone: {{ order.details.phone }}</p>
                    <p>Comment: {{ order.details.comment }}</p>
                </b-col>
                <b-col md="6">
                    <h5>Delivery Details</h5>
                    <p>Address: {{ order.details.address }}</p>
                    <p>Region: {{ order.details.city.region.name.ru }}</p>
                    <p>City: {{ order.details.city.name.ru }}</p>
                    <b-link
                        target="_blank"
                        :href="`http://www.google.com/maps/place/${order.details.location.latitude},${order.details.location.longitude}`"
                    >
                        See on map</b-link
                    >
                </b-col>
            </b-row>
            <hr />

            <b-row>
                <b-col cols="12" class="text-right">
                    <b-button variant="success btn-sm" @click="$router.go(-1)">
                        Назад
                    </b-button>
                </b-col>
            </b-row>
        </b-card>
        <div v-else class="text-center">
            <b-spinner></b-spinner>
        </div>
    </div>
</template>

<script>
import {
    BFormGroup,
    BFormSelect,
    BCard,
    BTable,
    BRow,
    BCol,
    BPagination,
    BFormInput,
    BButton,
    BSpinner,
    BLink,
} from "bootstrap-vue";
import api from "@/services/api";
import Ripple from "vue-ripple-directive";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
    name: "AppYears",
    components: {
        BFormSelect,
        BFormGroup,
        BCard,
        BTable,
        BRow,
        BCol,
        BPagination,
        BFormInput,
        BButton,
        BSpinner,
        ToastificationContent,
        BLink,
        ValidationObserver,
        ValidationProvider,
    },
    directives: {
        Ripple,
    },
    data() {
        return {
            statusOptions: [
                { value: null, text: "Выберите новый статус", disabled: true },
                { value: "processing", text: "processing" },
                { value: "delivery", text: "delivery" },
                { value: "canceled", text: "canceled" },
                { value: "closed", text: "closed" },
            ],
            status: null,
            isBusy: false,
            order: null,
        };
    },

    async created() {
        this.getOneOrder();
    },

    computed: {
        mainDataFields() {
            return [
                {
                    key: "label",
                    label: "",
                    thStyle: {
                        display: "none",
                    },
                },
                {
                    key: "value",
                    label: "",
                    thStyle: {
                        display: "none",
                    },
                },
            ];
        },
        mainData() {
            return [
                {
                    label: "ID:",
                    value: this.order.id,
                },
                {
                    label: "Status:",
                    value: this.order.status,
                },
                {
                    label: "Payment Status:",
                    value: this.order.payment_status,
                },
                {
                    label: "Created at:",
                    value: this.toLocaleDate(this.order.created_at),
                },
                {
                    label: "Updated at:",
                    value: this.toLocaleDate(this.order.updated_at),
                },
            ];
        },
    },

    methods: {
        toLocaleDate(date) {
            return new Date(date).toLocaleDateString("ru");
        },
        ///////////
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

        async getOneOrder() {
            this.isBusy = true;
            await api.orders
                .fetchOneOrder(this.$route.params.id)
                .then((res) => {
                    this.order = res.data;
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    this.isBusy = false;
                });
        },
        async changeStatus() {
            const isValid = await this.$refs["validation-observer"].validate();
            if (isValid) {
                await api.orders
                    .changeStatus(this.order.id, { status: this.status })
                    .then(() => {
                        this.getOneOrder();
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
                this.showToast("danger", "Необходимо выбрать статус", "XIcon");
            }
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
