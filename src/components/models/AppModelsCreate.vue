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
                                    v-if="options.length"
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

            <b-button
                :disabled="isSaving"
                class="btn-success float-right mt-2 mr-1"
                @click="createModel"
            >
                Создать
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
import { ValidationProvider } from "vee-validate";

export default {
    name: "AppModelsCreate",
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
        ValidationProvider,
    },
    directives: {
        Ripple,
    },
    data() {
        return {
            brand: "",
            options: [],
            name: null,
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
            isSaving: false,
        };
    },
    async mounted() {
        this.getAllBrands();
    },

    methods: {
        async getAllBrands() {
            api.common.getBrands().then(({ data }) => {
                const options = data
                    .filter((el) => el.active)
                    .map((el) => ({ value: el.id, text: el.name }));
                this.options = [
                    { value: null, text: "Выберите бренд", disabled: true },
                    ...options,
                ];
                this.brand = null;
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

        async createModel() {
            const isValid = await this.$refs["validation-observer"].validate();
            if (isValid) {
                this.isSaving = true;
                const data = { name: this.name, brand_id: this.brand };
                api.models
                    .createModel(data)
                    .then(() => {
                        this.$router.push({ name: "models" });
                        this.showToast(
                            "success",
                            "Успешно создано!",
                            "CheckIcon"
                        );
                    })
                    .catch(() => {
                        console.error(error);
                        this.showToast(
                            "danger",
                            "Что-то пошло не так!",
                            "XIcon"
                        );
                    })
                    .finally(() => {
                        this.isSaving = false;
                    });
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
