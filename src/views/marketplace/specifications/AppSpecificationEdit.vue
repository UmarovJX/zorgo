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
                                label="Единица измерения"
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
                    <b-row v-for="entry in options" class="m-1">
                        <b-col cols="12" md="6">
                            <b-row>
                                <b-col>RU: {{ entry.value.ru }} </b-col>
                                <b-col>UZ: {{ entry.value.uz }} </b-col>
                            </b-row>
                        </b-col>
                        <b-col cols="12" md="6">
                            <b-button
                                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                variant="outline-danger"
                                class="delete__btn"
                                size="sm"
                                @click="(e) => removeRelation(bmy.text)"
                            >
                                <feather-icon icon="Trash2Icon" size="14" />
                            </b-button>
                        </b-col>
                    </b-row>
                </b-form-group>
            </ValidationObserver>

            <b-button
                class="btn-success float-right mt-2 mr-1"
                @click="saveProduct"
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
        addRelation() {
            const brand = this.relationData.find(
                (el) => el.id === this.brandId
            );
            const model = brand.models.find((el) => el.id === this.modelId);

            const year = model.years.find((el) => el.id === this.yearId);

            this.relations.push({
                text: `${brand.name}, ${model.name}, ${year.name}`,
                b: brand.id,
                m: model.id,
                y: year.id,
            });
            this.brandId = null;
            this.modelId = null;
            this.yearId = null;
        },

        removeRelation(str) {
            this.relations = this.relations.filter((el) => el.text !== str);
        },
        async getSpecification(id) {
            const { data } = await api.specifications.fetchOneSpecification(id);

            this.name = data.name;
            this.specType = data.type;
            this.filter = !!data.filter;
            this.options = data.options;
        },
        async saveProduct() {
            const isValid = await this.$refs["validation-observer"].validate();
            if (isValid) {
                const formData = new FormData();

                formData.append("name[ru]", this.name.ru);
                formData.append("name[uz]", this.name.uz);
                formData.append("body[ru]", this.body.ru);
                formData.append("body[uz]", this.body.uz);
                formData.append("price", this.price);
                if (this.discount_price) {
                    formData.append("discount_price", this.discount_price);
                }

                formData.append("count", this.count);
                formData.append("unit_id", this.unitId);
                formData.append("category_id", this.categoryId);

                this.fileRecords.forEach((el, i) => {
                    if (el.id) {
                        formData.append(`images[${i}][id]`, el.id);
                    } else {
                        formData.append(`images[${i}][file]`, el.file);
                    }
                });

                this.categorySpecs.forEach((el, i) => {
                    formData.append(`options[${i}][specification_id]`, el.id);
                    let v =
                        el.type === "checkbox"
                            ? +this.specValues[el.id]
                            : this.specValues[el.id];
                    let t = el.type === "select" ? "option_id" : "value";
                    formData.append(`options[${i}][${t}]`, v);
                });

                this.relations.forEach((el, i) => {
                    if (el.id) {
                        formData.append(`relations[${i}][id]`, el.id);
                    }
                    formData.append(`relations[${i}][brand_id]`, el.b);
                    formData.append(`relations[${i}][model_id]`, el.m);
                    formData.append(`relations[${i}][year_id]`, el.y);
                });

                let req;
                if (this.$route.params.id) {
                    req = api.products.updateProduct(
                        this.$route.params.id,
                        formData
                    );
                } else {
                    req = api.products.createProduct(formData);
                }
                req.then(() => {
                    this.$router.push({ name: "products" });
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
