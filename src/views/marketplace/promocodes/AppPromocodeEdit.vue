<template>
    <div>
        <b-card>
            <ValidationObserver ref="validation-observer">
                <b-row class="">
                    <!-- CODE -->
                    <b-col cols="12" md="6">
                        <b-row>
                            <b-col>
                                <ValidationProvider
                                    name="Код"
                                    rules="required"
                                    v-slot="{ errors }"
                                >
                                    <b-form-group label="Код" label-for="code">
                                        <b-form-input
                                            v-model="code"
                                            id="code"
                                            size="md"
                                            placeholder="Введите"
                                        />
                                    </b-form-group>
                                    <p v-if="errors" class="validation__red">
                                        {{ errors[0] }}
                                    </p>
                                </ValidationProvider>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col cols="12" md="6">
                        <b-form-group
                            label="Генерация промокода: Количество символов"
                            label-for="promosize"
                        >
                            <b-form-input
                                type="number"
                                v-model="promoSize"
                                id="promosize"
                                placeholder="Введите"
                            />
                        </b-form-group>
                        <b-button
                            size="sm"
                            class="btn-success float-right mt-2"
                            @click="generate"
                        >
                            Сгенерировать
                        </b-button>
                    </b-col>

                    <b-col cols="12" md="6" class="pt-1">
                        <b-row>
                            <b-col cols="12">
                                <!--   Discount   -->
                                <ValidationProvider
                                    name="Скидка"
                                    rules="required"
                                    v-slot="{ errors }"
                                >
                                    <b-form-group
                                        label="Скидка"
                                        label-for="discount"
                                    >
                                        <b-form-input
                                            type="number"
                                            v-model="discount"
                                            id="discount"
                                            size="md"
                                            placeholder="Введите"
                                        />
                                    </b-form-group>
                                    <p v-if="errors" class="validation__red">
                                        {{ errors[0] }}
                                    </p>
                                </ValidationProvider>
                            </b-col>
                            <b-col cols="12">
                                <!--   MinOrderPrice   -->
                                <ValidationProvider
                                    name="Минимальная сумма заказа"
                                    v-slot="{ errors }"
                                >
                                    <b-form-group
                                        label="Минимальная сумма заказа"
                                        label-for="min_order_sum"
                                    >
                                        <b-form-input
                                            type="number"
                                            v-model="min_order_sum"
                                            id="min_order_sum"
                                            size="md"
                                            placeholder="Введите"
                                        />
                                    </b-form-group>
                                    <p v-if="errors" class="validation__red">
                                        {{ errors[0] }}
                                    </p>
                                </ValidationProvider>
                            </b-col>
                            <b-col cols="12">
                                <!--   uses   -->
                                <ValidationProvider
                                    name="Количество применений"
                                    v-slot="{ errors }"
                                >
                                    <b-form-group
                                        label="Количество применений"
                                        label-for="min_order_sum"
                                    >
                                        <b-form-input
                                            type="number"
                                            v-model="uses"
                                            id="uses"
                                            size="md"
                                            placeholder="Введите"
                                        />
                                    </b-form-group>
                                    <p v-if="errors" class="validation__red">
                                        {{ errors[0] }}
                                    </p>
                                </ValidationProvider>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col cols="12" md="6" class="pt-1">
                        <!--   uses   -->
                        <ValidationProvider
                            name="Действителен до"
                            v-slot="{ errors }"
                        >
                            <b-form-group
                                label="Действителен до"
                                label-for="expires_at"
                            >
                                <b-form-datepicker
                                    size="md"
                                    hide-header
                                    id="expires_at"
                                    v-model="expires_at"
                                    locale="ru"
                                ></b-form-datepicker>
                            </b-form-group>
                            <p v-if="errors" class="validation__red">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </b-col>
                </b-row>
            </ValidationObserver>

            <b-button
                class="btn-success float-right mt-2"
                @click="save"
                :disabled="isSaving"
            >
                Сохранить
            </b-button>
        </b-card>
    </div>
</template>

<script>
import api from "@/services/api";
import Ripple from "vue-ripple-directive";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
    BFormDatepicker,
    BBadge,
    BFormGroup,
    BFormInput,
    BButton,
    BCard,
    BCol,
    BRow,
    BTable,
    BFormCheckbox,
    BFormCheckboxGroup,
    BFormSelect,
    BFormSelectOption,
} from "bootstrap-vue";
import { min } from "vee-validate/dist/rules";

export default {
    name: "AppBannerEdit",
    components: {
        BFormDatepicker,
        BBadge,
        BFormGroup,
        BFormInput,
        BButton,
        BCard,
        BCol,
        BRow,
        BTable,
        BFormCheckbox,
        BFormCheckboxGroup,
        BFormSelect,
        BFormSelectOption,
        ToastificationContent,
    },
    directives: {
        Ripple,
    },
    data() {
        return {
            apiEntry: "promocodes",
            isSaving: false,
            code: "",
            discount: null,
            expires_at: "",
            min_order_sum: null,
            uses: null,

            promoSize: "",
        };
    },
    async mounted() {
        if (this.$route.params.id) {
            await this.getRecord(this.$route.params.id);
        }
    },
    watch: {},
    computed: {},

    methods: {
        generate() {
            if (this.promoSize <= 0) {
                return this.showToast(
                    "danger",
                    "Укажите длину промокода больше 0",
                    "XIcon"
                );
            }
            const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const ll = letters.length;
            const nums = "1234567890";
            const nl = nums.length;
            const data = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            const l = data.length;

            this.code = "".padStart(this.promoSize, ".").replaceAll(".", () => {
                return data[Math.floor(Math.random() * l)];
            });
            // this.code = this.promoSize
            //     .replaceAll("_", () => {
            //         return letters[Math.floor(Math.random() * ll)];
            //     })
            //     .replaceAll(".", () => {
            //         return nums[Math.floor(Math.random() * nl)];
            //     });
        },
        async getRecord(id) {
            const { data } = await api[this.apiEntry].fetchOne(id);
            this.code = data.code;
            this.discount = data.discount;
            this.expires_at = new Date(data.expires_at);
            this.uses = data.uses;
            this.min_order_sum = data.min_order_sum;
        },
        async save() {
            const isValid = await this.$refs["validation-observer"].validate();
            if (isValid) {
                this.isSaving = true;
                const { code, discount, expires_at, uses, min_order_sum } =
                    this;
                const data = { code, discount };
                if (expires_at)
                    data.expires_at = new Date(expires_at).toLocaleDateString(
                        "ru"
                    );
                if (uses) data.uses = uses;
                if (min_order_sum) data.min_order_sum = min_order_sum;

                let req;
                if (this.$route.params.id) {
                    req = api[this.apiEntry].update(
                        this.$route.params.id,
                        data
                    );
                } else {
                    req = api[this.apiEntry].create(data);
                }

                req.then(() => {
                    this.$router.push({ name: this.apiEntry });
                    this.showToast(
                        "success",
                        "Успешно cохранено!",
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
                        this.isSaving = true;
                    });
            } else {
                this.showToast(
                    "danger",
                    "Заполните все обяза́тельные поля!",
                    "XIcon"
                );
            }
        },

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
    },
};
</script>

<style lang="scss" scoped>
.cursor-pointer {
    cursor: pointer;
}
</style>
