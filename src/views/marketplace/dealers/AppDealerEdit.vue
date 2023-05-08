<template>
    <div>
        <b-card>
            <ValidationObserver ref="validation-observer">
                <b-row>
                    <!--   USERNAME   -->
                    <b-col cols="12" md="6" class="px-1">
                        <ValidationProvider
                            name="Имя пользователя"
                            rules="required"
                            v-slot="{ errors }"
                        >
                            <b-form-group
                                label="Имя пользователя"
                                label-for="username"
                            >
                                <b-form-input
                                    v-model="username"
                                    id="username"
                                    size="md"
                                    placeholder="Введите"
                                />
                            </b-form-group>
                            <p v-if="errors" class="validation__red">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </b-col>

                    <!--   PASSWORD   -->
                    <b-col cols="12" md="6" class="px-1">
                        <!-- <ValidationProvider
                            name="Пароль"
                            rules="required"
                            v-slot="{ errors }"
                        > -->
                        <b-form-group label="Пароль" label-for="password">
                            <b-form-input
                                v-model="password"
                                id="password"
                                size="md"
                                placeholder="Введите"
                            />
                        </b-form-group>
                        <!-- <p v-if="errors" class="validation__red">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider> -->
                    </b-col>
                </b-row>

                <b-row>
                    <!--   FULLNAME   -->
                    <b-col cols="12" md="6" class="px-1">
                        <b-form-group label="Полное имя" label-for="fullname">
                            <b-form-input
                                v-model="fullname"
                                id="fullname"
                                size="md"
                                placeholder="Введите"
                            />
                        </b-form-group>
                    </b-col>

                    <!--   COMPANY   -->
                    <b-col cols="12" md="6" class="px-1">
                        <ValidationProvider
                            name="Компания"
                            rules="required"
                            v-slot="{ errors }"
                        >
                            <b-form-group label="Компания" label-for="company">
                                <b-form-input
                                    v-model="company"
                                    id="company"
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
                    <!--   PHONE   -->
                    <b-col cols="12" md="6" class="px-1">
                        <ValidationProvider
                            name="Телефон"
                            rules="required"
                            v-slot="{ errors }"
                        >
                            <b-form-group label="Телефон" label-for="phone">
                                <b-form-input
                                    v-model="phone"
                                    id="phone"
                                    size="md"
                                    placeholder="Введите"
                                />
                            </b-form-group>
                            <p v-if="errors" class="validation__red">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </b-col>

                    <!--   ADDRESS   -->
                    <b-col cols="12" md="6" class="px-1">
                        <b-form-group label="Адрес" label-for="address">
                            <b-form-input
                                v-model="address"
                                id="address"
                                size="md"
                                placeholder="Введите"
                            />
                        </b-form-group>
                    </b-col>
                </b-row>
            </ValidationObserver>

            <b-button class="btn-success float-right mt-2" @click="save">
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
    name: "AppProductEdit",
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
            apiEntry: "dealers",
            username: "",
            password: "",
            fullname: "",
            company: "",
            phone: "",
            address: "",
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
            this.username = data.username;
            this.password = data.password;
            this.fullname = data.full_name;
            this.company = data.company;
            this.phone = data.phone;
            this.address = data.address;
        },
        async save() {
            const isValid = await this.$refs["validation-observer"].validate();
            if (isValid) {
                const data = {
                    username: this.username,
                    password: this.password,
                    fullname: this.full_name,
                    company: this.company,
                    phone: this.phone,
                    address: this.address,
                };

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
