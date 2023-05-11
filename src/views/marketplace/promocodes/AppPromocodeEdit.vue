<template>
    <div>
        <b-card>
            <ValidationObserver ref="validation-observer">
                <b-row>
                    <!--   Code   -->
                    <b-col cols="12" md="6" class="px-1">
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

                    <!--   Discount   -->
                    <b-col cols="12" md="6" class="px-1">
                        <ValidationProvider
                            name="Скидка"
                            rules="required"
                            v-slot="{ errors }"
                        >
                            <b-form-group label="Скидка" label-for="discount">
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
                </b-row>
            </ValidationObserver>

            <b-row>
                <b-col cols="6">
                    <b-form-group
                        label="Сгенерировать промокод"
                        label-for="generate"
                        label-class="font-weight-bold"
                        label-cols-lg="3"
                    >
                        <b-form-group label="Количество символов в промокоде">
                            <b-form-input
                                type="number"
                                v-model="promoSize"
                                id="promosize"
                                size="sm"
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
                    </b-form-group>
                </b-col>
            </b-row>

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

export default {
    name: "AppBannerEdit",
    components: {
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
        },
        async save() {
            const isValid = await this.$refs["validation-observer"].validate();
            if (isValid) {
                this.isSaving = true;
                const { code, discount } = this;
                const data = { code, discount };

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
                }).catch((error) => {
                    console.error(error);
                    this.showToast("danger", "Что-то пошло не так!", "XIcon");
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
