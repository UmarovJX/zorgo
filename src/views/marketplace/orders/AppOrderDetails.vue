<template>
    <div>
        <b-card :title="'Заказ ' + order.id" v-if="!isBusy && order">
            <b-row>
                <b-col cols="12" md="6">
                    <b-card-text>Детали заказа:</b-card-text>
                    <b-table
                        borderless
                        striped
                        :items="mainData"
                        :fields="mainDataFields"
                        thead-class="hidden_header"
                    >
                    </b-table>
                </b-col>
                <b-col cols="12" md="6">
                    <b-card-text>Дилеры:</b-card-text>
                    <b-table
                        borderless
                        striped
                        :items="dealers"
                        :fields="dealerFields"
                        thead-class="hidden_header"
                    >
                    </b-table>
                </b-col>
            </b-row>
            <hr />

            <b-row>
                <b-col md="6">
                    <p>Стоимость: {{ order.price }}</p>
                    <p>Стоимость товара: {{ order.product_price }}</p>
                    <p>Стоимость доставки: {{ order.delivery_price }}</p>
                    <p>Количество: {{ order.products_count }}</p>
                </b-col>
                <b-col md="6" v-if="order.promo_code">
                    <p>Промокод: {{ order.promo_code.code }}</p>
                    <p>Скидка: {{ order.promo_code.discount }}</p>
                </b-col>
            </b-row>
            <hr />
            <b-row>
                <b-col md="6">
                    <h5>Данные покупателя</h5>
                    <p>
                        Имя: {{ order.details.first_name }}
                        {{ order.details.last_name }}
                    </p>
                    <p>Тел.: {{ order.details.phone }}</p>
                    <p>Комментарий: {{ order.details.comment }}</p>
                </b-col>
                <b-col md="6">
                    <h5>Данные для доставки</h5>
                    <p>Адрес: {{ order.details.address }}</p>
                    <p>Область: {{ order.details.city.region.name.ru }}</p>
                    <p>Город: {{ order.details.city.name.ru }}</p>
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
    BCardText,
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
        BCardText,
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
        dealerFields() {
            return [
                {
                    label: "ID",
                    key: "id",
                },
                {
                    label: "Название",
                    key: "company",
                },
            ];
        },
        dealers() {
            return this.order.products.map((el) => el.dealer);
        },
        mainData() {
            return [
                {
                    label: "ID:",
                    value: this.order.id,
                },
                {
                    label: "Статус:",
                    value: this.order.status,
                },
                {
                    label: "Состояние платежа:",
                    value: this.order.payment_status,
                },
                {
                    label: "Создано:",
                    value: this.toLocaleDate(this.order.created_at),
                },
                {
                    label: "Обновлено:",
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
                    this.status = res.data.status;
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
