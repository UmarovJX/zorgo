<template>
    <div>
        <b-card>
            <ValidationObserver ref="validation-observer">
                <b-row>
                    <!--   NAME [RU]   -->
                    <b-col cols="12" md="5" class="px-1">
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
                    <b-col cols="12" md="5" class="px-1">
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
                    <b-col cols="2" class="px-1">
                        <b-form-group label="Цвет" label-for="color">
                            <b-form-input
                                type="color"
                                v-model="color"
                                id="color"
                            />
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <!-- COLOR -->
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
            apiEntry: "compilations",
            name: { uz: "", ru: "" },
            color: "#ffffff",
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
            this.name = data.name;
            this.color = "#" + data.color;
        },
        async save() {
            const isValid = await this.$refs["validation-observer"].validate();
            if (isValid) {
                const data = {
                    name: this.name,
                    color: this.color,
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
.w-50px {
    width: 50px;
}
.cursor-pointer {
    cursor: pointer;
}
</style>
