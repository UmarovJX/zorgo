<template>
    <div>
        <!--  ROLE NAME  -->
        <b-card>
            <ValidationObserver ref="validation-observer">
                <div class="col-12 d-flex flex-wrap p-0">
                    <!--   USERNAME   -->
                    <b-col cols="12" class="p-0 px-1">
                        <b-form-group label="Название" label-for="name">
                            <ValidationProvider
                                name="Название"
                                rules="required"
                                v-slot="{ errors }"
                            >
                                <b-form-input
                                    v-model="name"
                                    id="name"
                                    size="md"
                                    placeholder="Введите"
                                />
                                <p v-if="errors" class="validation__red">
                                    {{ errors[0] }}
                                </p>
                            </ValidationProvider>

                            <ValidationProvider
                                name="Бренд"
                                rules="required"
                                v-slot="{ errors }"
                            >
                                <b-form-select
                                    v-model="brand"
                                    :options="options"
                                ></b-form-select>
                                <p v-if="errors" class="validation__red">
                                    {{ errors[0] }}
                                </p>
                            </ValidationProvider>
                        </b-form-group>
                    </b-col>
                </div>
            </ValidationObserver>

            <b-button class="btn-success float-right mt-2" @click="updateModel">
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
    BFormGroup,
    BFormInput,
    BButton,
    BCard,
    BCol,
    BTable,
    BFormCheckbox,
    BFormCheckboxGroup,
    BFormSelect,
} from "bootstrap-vue";

export default {
    name: "AppModelsUpdate",
    components: {
        BFormGroup,
        BFormInput,
        BButton,
        BCard,
        BCol,
        BTable,
        BFormCheckbox,
        BFormCheckboxGroup,
        BFormSelect,
        ToastificationContent,
    },
    directives: {
        Ripple,
    },
    data() {
        return {
            brand: "",
            options: [],
            name: null,
            isBusy: false,
            sortBy: "",
            sortDesc: false,
            sortDirection: "asc",
            filter: null,
            filterOn: [],
            selectMode: "multi",
            infoModal: {
                id: "info-modal",
                title: "",
                content: "",
            },
        };
    },
    async mounted() {
        this.getOneModel();
        this.getAllBrands();
    },

    methods: {
        async getOneModel() {
            const { id } = this.$route.params;
            await api.models
                .fetchOneModel(id)
                .then((res) => {
                    this.name = res.data.name;
                    this.brand = res.data.brand.id;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async getAllBrands() {
            api.common.getBrands().then(({ data }) => {
                const options = data
                    .filter((el) => el.active)
                    .map((el) => ({ value: el.id, text: el.name }));
                this.options = [
                    { value: null, text: "Выберите бренд", disabled: true },
                    ...options,
                ];
            });
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

        async updateModel() {
            const isValid = await this.$refs["validation-observer"].validate();
            if (isValid) {
                const { id } = this.$route.params;
                const { name, brand } = this;
                const data = {
                    name,
                    brand_id: brand,
                };
                api.models
                    .updateModel(id, data)
                    .then(() => {
                        this.$router.push({ name: "models" });
                        this.showToast(
                            "success",
                            "Успешно изменено!",
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
                    });
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
