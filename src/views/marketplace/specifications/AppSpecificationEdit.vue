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
                    <!--   TYPE   -->
                    <b-col cols="12" md="6">
                        <ValidationProvider
                            name="Тип"
                            rules="required"
                            v-slot="{ errors }"
                        >
                            <b-form-group
                                label="Тип характеристики"
                                label-for="unit"
                            >
                                <b-form-select
                                    id="unit"
                                    v-model="specType"
                                    :options="specTypeOptions"
                                ></b-form-select>
                            </b-form-group>
                            <p v-if="errors" class="validation__red">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </b-col>
                </b-row>

                <b-row class="mb-2 mt-1">
                    <b-col cols="12" md="6">
                        <b-form-checkbox
                            id="checkbox-filter"
                            v-model="filter"
                            name="checkbox-filter"
                        >
                            Фильтры
                        </b-form-checkbox>
                    </b-col>
                </b-row>

                <b-form-group
                    v-if="specType === 'select'"
                    label="Опции"
                    label-class="font-weigth-bold"
                >
                    <b-row
                        v-for="entry in options"
                        class="m-1 align-items-center"
                    >
                        <b-col cols="10">
                            <b-row>
                                <b-col cols="12" md="6">
                                    <b class="mr-1">RU:</b> {{ entry.value.ru }}
                                </b-col>
                                <b-col cols="12" md="6">
                                    <b class="mr-1">UZ:</b> {{ entry.value.uz }}
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col cols="2">
                            <b-button
                                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                variant="outline-danger"
                                class="delete__btn"
                                size="sm"
                                @click="(e) => removeOption(entry)"
                            >
                                <feather-icon
                                    icon="MinusCircleIcon"
                                    size="14"
                                />
                            </b-button>
                        </b-col>
                    </b-row>
                    <b-row class="align-items-end">
                        <b-col cols="12" md="5">
                            <b-form-group
                                class="mb-1"
                                label="Название опции[RU]"
                                label-for="option-name-ru"
                            >
                                <b-form-input
                                    v-model="optionName.ru"
                                    id="option-name-ru"
                                    size="md"
                                    placeholder="Введите"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="5">
                            <b-form-group
                                class="mb-1"
                                label="Название опции[UZ]"
                                label-for="option-name-uz"
                            >
                                <b-form-input
                                    v-model="optionName.uz"
                                    id="option-name-uz"
                                    size="md"
                                    placeholder="Введите"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="2">
                            <b-button
                                class="mb-1"
                                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                variant="outline-success"
                                :disabled="!optionName.ru && !optionName.uz"
                                @click="addOption"
                            >
                                Добавить
                            </b-button>
                        </b-col>
                    </b-row>
                </b-form-group>
            </ValidationObserver>

            <b-button
                class="btn-success float-right mt-2"
                @click="saveSpecification"
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
            name: {
                ru: "",
                uz: "",
            },
            filter: false,

            specType: null,
            specTypeOptions: [
                { text: "выберите тип", disabled: true, value: null },
                { text: "select", value: "select" },
                { text: "text", value: "text" },
                { text: "checkbox", value: "checkbox" },
            ],

            optionName: {
                ru: "",
                uz: "",
            },
            options: [],
            isBusy: false,
        };
    },
    async mounted() {
        if (this.$route.params.id) {
            await this.getSpecification(this.$route.params.id);
        }
    },
    watch: {
        categoryId: {
            async handler(val) {
                //sort hack

                const response =
                    await api.marketplaceCommon.fetchAllSpecifications(val);
                this.categorySpecs = [
                    ...response.data.filter((el) => el.type !== "checkbox"),
                    ...response.data.filter((el) => el.type === "checkbox"),
                ];
            },
        },
    },
    computed: {},

    methods: {
        addOption() {
            this.options.push({
                value: { uz: this.optionName.uz, ru: this.optionName.ru },
            });
            this.optionName.uz = "";
            this.optionName.ru = "";
        },

        removeOption(e) {
            this.options = this.options.filter((el) => el !== e);
        },
        async getSpecification(id) {
            const { data } = await api.specifications.fetchOneSpecification(id);

            this.name = data.name;
            this.specType = data.type;
            this.filter = !!data.filter;
            this.options = data.options;
        },
        async saveSpecification() {
            const data = {
                name: this.name,
                type: this.specType,
                filter: this.filter,
                options: this.options,
            };

            let req;
            if (this.$route.params.id) {
                req = api.specifications.updateSpecification(
                    this.$route.params.id,
                    data
                );
            } else {
                req = api.specifications.createSpecification(data);
            }

            req.then(() => {
                this.$router.push({ name: "specifications" });
                this.showToast("success", "Успешно cохранено!", "CheckIcon");
            }).catch((error) => {
                console.error(error);
                this.showToast("danger", "Что-то пошло не так!", "XIcon");
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
    },
};
</script>

<style lang="scss" scoped>
.cursor-pointer {
    cursor: pointer;
}
</style>
