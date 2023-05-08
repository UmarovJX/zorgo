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
                    <!--   BODY [RU]   -->
                    <b-col cols="12" md="6" class="px-1">
                        <ValidationProvider
                            name="Описание [RU]"
                            rules="required"
                            v-slot="{ errors }"
                        >
                            <b-form-group
                                label="Описание [RU]"
                                label-for="body-ru"
                            >
                                <b-form-input
                                    v-model="body.ru"
                                    id="body-ru"
                                    size="md"
                                    placeholder="Введите"
                                />
                            </b-form-group>
                            <p v-if="errors" class="validation__red">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </b-col>

                    <!--   BODY [UZ]   -->
                    <b-col cols="12" md="6" class="px-1">
                        <ValidationProvider
                            name="Описание [UZ]"
                            rules="required"
                            v-slot="{ errors }"
                        >
                            <b-form-group
                                label="Описание [UZ]"
                                label-for="body-uz"
                            >
                                <b-form-input
                                    v-model="body.uz"
                                    id="body-uz"
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
                <hr />
                <b-row>
                    <!--   PRICE   -->
                    <b-col cols="12" md="6" class="px-1">
                        <ValidationProvider
                            name="Цена"
                            rules="required"
                            v-slot="{ errors }"
                        >
                            <b-form-group label="Цена" label-for="price">
                                <b-form-input
                                    type="number"
                                    v-model="price"
                                    id="price"
                                    size="md"
                                    placeholder="Введите"
                                />
                            </b-form-group>
                            <p v-if="errors" class="validation__red">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </b-col>

                    <!--   Discounted PRICE   -->
                    <b-col cols="12" md="6" class="px-1">
                        <b-form-group
                            label="Цена со скидкой"
                            label-for="discount_price"
                        >
                            <b-form-input
                                type="number"
                                v-model="discount_price"
                                id="discount_price"
                                size="md"
                                placeholder="Введите"
                            />
                        </b-form-group>
                    </b-col>
                </b-row>
                <hr />
                <b-row>
                    <!--   COUNT   -->
                    <b-col cols="12" md="6" class="px-1">
                        <ValidationProvider
                            name="Количество"
                            rules="required"
                            v-slot="{ errors }"
                        >
                            <b-form-group label="Количество" label-for="count">
                                <b-form-input
                                    type="number"
                                    v-model="count"
                                    id="count"
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
                    <!--   UNIT   -->
                    <b-col cols="12" md="6">
                        <ValidationProvider
                            name="Единица измерения"
                            rules="required"
                            v-slot="{ errors }"
                        >
                            <b-form-group
                                label="Единица измерения"
                                label-for="unit"
                            >
                                <b-form-select
                                    id="unit"
                                    v-model="unitId"
                                    :options="unitOptions"
                                ></b-form-select>
                            </b-form-group>
                            <p v-if="errors" class="validation__red">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </b-col>
                </b-row>

                <b-row>
                    <!--   FILE INPUT   -->
                    <b-col cols="12" class="px-1">
                        <ValidationProvider
                            name="image"
                            rules="required"
                            v-slot="{ errors }"
                        >
                            <b-form-group label="Изображение">
                                <VueFileAgent
                                    ref="vueFileAgent"
                                    v-model="fileRecords"
                                    :deletable="true"
                                    :meta="true"
                                    :accept="'image/*,.zip'"
                                    :maxSize="'5MB'"
                                    :maxFiles="5"
                                    :helpText="'Выберите изображение'"
                                    :errorText="{
                                        type: 'Неверный тип файла. Разрешены только изображения или zip',
                                        size: 'Размер файла не должен превышать 5 МБ.',
                                    }"
                                    @beforedelete="onBeforeDelete($event)"
                                />
                            </b-form-group>
                            <p v-if="errors" class="validation__red">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </b-col>
                </b-row>

                <b-row>
                    <!--   CATEGORY   -->
                    <b-col cols="12" md="6">
                        <ValidationProvider
                            name="Категория"
                            rules="required"
                            v-slot="{ errors }"
                        >
                            <b-form-group
                                label="Категория"
                                label-for="category"
                            >
                                <b-form-select
                                    id="category"
                                    v-model="categoryId"
                                    :options="categoryOptions"
                                ></b-form-select>
                            </b-form-group>
                            <p v-if="errors" class="validation__red">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </b-col>
                </b-row>

                <!--   Specifications   -->
                <b-form-group
                    v-if="categorySpecs.length > 0"
                    label="Характеристики"
                    label-class="font-weigth-bold"
                >
                    <b-row v-for="spec in categorySpecs" class="">
                        <b-col cols="12" md="6" class="px-1">
                            <!--   TEXT SPEC   -->
                            <template v-if="spec.type === 'text'">
                                <ValidationProvider
                                    :name="spec.name.ru"
                                    rules="required"
                                    v-slot="{ errors }"
                                >
                                    <b-form-group
                                        :label="spec.name.ru"
                                        :label-for="`specification-${spec.id}`"
                                    >
                                        <b-form-input
                                            v-model="specValues[spec.id]"
                                            :id="`specification-${spec.id}`"
                                            placeholder="Введите"
                                        />
                                    </b-form-group>
                                    <p v-if="errors" class="validation__red">
                                        {{ errors[0] }}
                                    </p>
                                </ValidationProvider>
                            </template>
                            <!--   CHECKBOX SPEC   -->
                            <template v-if="spec.type === 'checkbox'">
                                <b-form-checkbox
                                    v-model="specValues[spec.id]"
                                    :id="`specification-${spec.id}`"
                                >
                                    {{ spec.name.ru }}</b-form-checkbox
                                >
                            </template>
                            <!--   SELECT SPEC   -->
                            <template v-if="spec.type === 'select'">
                                <ValidationProvider
                                    :name="spec.name.ru"
                                    rules="required"
                                    v-slot="{ errors }"
                                >
                                    <b-form-group
                                        :label="spec.name.ru"
                                        :label-for="`specification-${spec.id}`"
                                    >
                                        <b-form-select
                                            :id="`specification-${spec.id}`"
                                            v-model="specValues[spec.id]"
                                        >
                                            <b-form-select-option
                                                disabled
                                                :value="undefined"
                                                >Выберите характеристику
                                            </b-form-select-option>

                                            <b-form-select-option
                                                v-for="opt in spec.options"
                                                :value="+opt.id"
                                            >
                                                {{ opt.value.ru }}
                                            </b-form-select-option>
                                        </b-form-select>
                                    </b-form-group>
                                    <p v-if="errors" class="validation__red">
                                        {{ errors[0] }}
                                    </p>
                                </ValidationProvider>
                            </template>
                        </b-col>
                    </b-row>
                </b-form-group>

                <b-form-group
                    class="my-1"
                    label="Выбранные авто:"
                    label-class="font-weigth-bold"
                >
                    <b-row class="pl-1">
                        <b-col>
                            <template v-if="relations.length === 0">
                                Ничего не выбрано
                            </template>
                            <b-row v-for="bmy in relations" class="px-1 my-1">
                                <b-col
                                    cols="12"
                                    md="6"
                                    class="d-flex justify-content-between align-items-center"
                                >
                                    {{ bmy.text }}
                                    <b-button
                                        v-ripple.400="
                                            'rgba(113, 102, 240, 0.15)'
                                        "
                                        variant="outline-danger"
                                        class="delete__btn"
                                        size="sm"
                                        @click="(e) => removeRelation(bmy.text)"
                                    >
                                        <feather-icon
                                            icon="Trash2Icon"
                                            size="14"
                                        />
                                    </b-button>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                    <b-row class="mt-1">
                        <b-col cols="12" lg="3">
                            <b-form-select
                                class="mb-1"
                                :options="brandOptions"
                                v-model="brandId"
                            ></b-form-select>
                        </b-col>
                        <b-col cols="12" lg="3">
                            <b-form-select
                                class="mb-1"
                                :disabled="!brandId"
                                :options="modelOptions"
                                v-model="modelId"
                            ></b-form-select>
                        </b-col>
                        <b-col cols="12" lg="3">
                            <b-form-select
                                class="mb-1"
                                :disabled="!modelId"
                                :options="yearOptions"
                                v-model="yearId"
                            ></b-form-select>
                        </b-col>
                        <b-col cols="12" lg="3">
                            <b-button
                                class="float-right mr-1"
                                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                variant="outline-success"
                                :disabled="!yearId"
                                @click="addRelation"
                            >
                                Добавить
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
            body: {
                ru: "",
                uz: "",
            },
            price: null,
            discount_price: null,
            count: null,

            unitId: null,
            unitOptions: [
                {
                    value: null,
                    text: "Выберите единицу измерения",
                    disabled: true,
                },
            ],

            categoryId: null,
            categoryOptions: [
                {
                    value: undefined,
                    text: "Выберите Категорию",
                    disabled: true,
                },
            ],

            categorySpecs: [],
            specValues: {},

            brandId: null,
            modelId: null,
            yearId: null,
            relations: [],
            relationData: null,

            fileRecords: [],
            uploadUrl: "",
            uploadHeaders: { "X-Test-Header": "vue-file-agent" },
            isBusy: false,
        };
    },
    async mounted() {
        this.getBMY();
        this.getUnits();
        if (this.$route.params.id) {
            await this.getProduct(this.$route.params.id);
        }
        this.getSubCategories();
    },
    watch: {
        brandId: {
            handler() {
                this.modelId = null;
                this.yearId = null;
            },
        },
        modelId: {
            handler() {
                this.yearId = null;
            },
        },
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
    computed: {
        brandOptions() {
            if (!this.relationData)
                return [
                    { value: null, disabled: true, text: "Выберите бренд" },
                ];
            else {
                const opts = this.relationData
                    .filter((el) => el.active)
                    .map((el) => ({
                        value: el.id,
                        text: el.name,
                    }));

                return [
                    { value: null, disabled: true, text: "Выберите бренд" },
                    ...opts,
                ];
            }
        },

        modelOptions() {
            if (this.brandId) {
                const opts = this.relationData
                    .find((el) => el.id === this.brandId)
                    .models.filter((el) => el.active)
                    .map((el) => ({
                        value: el.id,
                        text: el.name,
                    }));

                return [
                    { value: null, disabled: true, text: "Выберите модель" },
                    ...opts,
                ];
            } else {
                [{ value: null, disabled: true, text: "Выберите модель" }];
            }
        },
        yearOptions() {
            if (this.modelId) {
                const yearIds = this.relations.map((el) => el.y);
                const opts = this.relationData
                    .find((el) => el.id === this.brandId)
                    .models.find((el) => el.id === this.modelId)
                    .years.filter((el) => el.active && !yearIds.includes(el.id))
                    .map((el) => ({
                        value: el.id,
                        text: el.name,
                    }));

                return [
                    { value: null, disabled: true, text: "Выберите год" },
                    ...opts,
                ];
            } else {
                [{ value: null, disabled: true, text: "Выберите год" }];
            }
        },
    },

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
        async getProduct(id) {
            const { data } = await api.products.fetchOneProduct(id);

            this.name = data.name;
            this.body = data.body;

            this.price = data.price;
            this.discount_price = data.discount_price;
            this.count = data.count;
            this.unitId = data.unit.id;
            this.categoryId = data.category.id;
            this.fileRecords = data.images.map((el) => ({
                name: "image.jpg",
                id: el.id,
                size: 0,
                type: "image/jpg",
                url: el.url,
                src: el.url,
            }));

            const sV = {};
            data.options.forEach((el) => {
                if (el.specification.type === "text") {
                    sV[el.specification_id] = el.value;
                } else if (el.specification.type === "checkbox") {
                    sV[el.specification_id] = el.value === "1" ? true : false;
                } else if ((el.specification.type = "select")) {
                    sV[el.specification_id] = el.option_id;
                }
            });
            this.specValues = sV;

            data.relations.forEach((el) => {
                this.relations.push({
                    id: el.id,
                    text: `${el.brand.name}, ${el.model.name}, ${el.year.name}`,
                    b: el.brand.id,
                    m: el.model.id,
                    y: el.year.id,
                });
            });
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

        onBeforeDelete(fileRecord) {
            if (confirm("Are you sure you want to delete?")) {
                this.$refs.vueFileAgent.deleteFileRecord(fileRecord);
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
        async getSubCategories() {
            api.marketplaceCommon.fetchSubCategories().then(({ data }) => {
                const options = data
                    .filter((el) => el.active)
                    .map((el) => ({ value: el.id, text: el.name.ru }));
                this.categoryOptions = [
                    { value: null, text: "Выберите Категорию", disabled: true },
                    ...options,
                ];
            });
        },

        async getUnits() {
            api.marketplaceCommon.fetchAllUnits().then(({ data }) => {
                const options = data
                    .filter((el) => el.active)
                    .map((el) => ({ value: el.id, text: el.name.ru }));
                this.unitOptions = [
                    {
                        value: null,
                        text: "Выберите единицу измерения",
                        disabled: true,
                    },
                    ...options,
                ];
            });
        },
        async getBMY() {
            api.common.getBMY().then(({ data }) => (this.relationData = data));
        },
    },
};
</script>

<style lang="scss" scoped>
.cursor-pointer {
    cursor: pointer;
}
</style>
