<template>
    <div>
        <b-card>
            <ValidationObserver ref="validation-observer">
                <div class="col-12 d-flex flex-wrap p-0">
                    <!--   USERNAME   -->
                    <b-col cols="12" class="p-0 px-1">
                        <ValidationProvider
                            name="Год"
                            rules="required"
                            v-slot="{ errors }"
                        >
                            <b-form-group label="Год" label-for="name">
                                <b-form-input
                                    type="number"
                                    v-model="name"
                                    id="name"
                                    size="md"
                                    placeholder="Введите год"
                                />
                            </b-form-group>
                            <p v-if="errors" class="validation__red">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                        <ValidationProvider
                            name="Модель"
                            rules="required"
                            v-slot="{ errors }"
                        >
                            <b-form-group label="Модель" label-for="">
                                <b-form-select
                                    :disabled="!options.length"
                                    v-model="model"
                                    :options="options"
                                ></b-form-select>
                            </b-form-group>

                            <p v-if="errors" class="validation__red">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </b-col>
                </div>
            </ValidationObserver>

            <b-button
                :disabled="isSaving"
                class="btn-success float-right mt-2 mr-1"
                @click="createYear"
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

export default {
    name: "AppYearsCreate",
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
            name: null,
            options: [],
            model: null,
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
        this.getAllModels();
    },

    methods: {
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
        async getAllModels() {
            api.common.getModels().then(({ data }) => {
                const options = data
                    .filter((el) => el.active)
                    .map((el) => ({ value: el.id, text: el.name }));
                this.options = [
                    { value: null, text: "Выберите Модель", disabled: true },
                    ...options,
                ];
            });
        },

        async createYear() {
            const isValid = await this.$refs["validation-observer"].validate();
            if (isValid) {
                this.isSaving = true;
                const { name } = this;
                const data = {
                    name,
                    model_id: this.model,
                };
                api.years
                    .createYear(data)
                    .then(() => {
                        this.$router.push({ name: "years" });
                        this.showToast(
                            "success",
                            "Успешно создано!",
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
                        this.isSaving = false;
                    });
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
