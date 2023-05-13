<template>
    <div>
        <b-card>
            <ValidationObserver ref="validation-observer">
                <b-row>
                    <!--   NAME [RU]   -->
                    <b-col cols="12" md="6" class="px-1">
                        <ValidationProvider
                            name="Название [RU]"
                            rules="required"
                            v-slot="{ errors }"
                        >
                            <b-form-group
                                label="Название [RU]"
                                label-for="name-ru"
                            >
                                <b-form-input
                                    v-model="name.ru"
                                    id="name-ru"
                                    size="md"
                                    placeholder="Введите"
                                />
                            </b-form-group>
                            <p v-if="errors" class="validation__red">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </b-col>

                    <!--   NAME [UZ]   -->
                    <b-col cols="12" md="6" class="px-1">
                        <ValidationProvider
                            name="Название [UZ]"
                            rules="required"
                            v-slot="{ errors }"
                        >
                            <b-form-group
                                label="Название [UZ]"
                                label-for="name-uz"
                            >
                                <b-form-input
                                    v-model="name.uz"
                                    id="name-uz"
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

                <b-row>
                    <!--   DELIVERY PRICE   -->
                    <b-col cols="12" md="6" class="px-1">
                        <ValidationProvider
                            name="Цена доставки"
                            rules="required"
                            v-slot="{ errors }"
                        >
                            <b-form-group
                                label="Цена доставки"
                                label-for="delivery"
                            >
                                <b-form-input
                                    type="number"
                                    v-model="delivery_price"
                                    id="delivery"
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
            isSaving: false,
            apiEntry: "regions",
            name: {
                ru: "",
                uz: "",
            },
            delivery_price: null,
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
        async getRecord(id) {
            const { data } = await api[this.apiEntry].fetchOne(id);
            this.name = data.name;
            this.delivery_price = data.delivery_price;
        },
        async save() {
            const isValid = await this.$refs["validation-observer"].validate();
            if (isValid) {
                this.isSaving = true;
                const { name, delivery_price } = this;
                const formData = { name, delivery_price };

                let req;
                if (this.$route.params.id) {
                    req = api[this.apiEntry].update(
                        this.$route.params.id,
                        formData
                    );
                } else {
                    req = api[this.apiEntry].create(formData);
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
