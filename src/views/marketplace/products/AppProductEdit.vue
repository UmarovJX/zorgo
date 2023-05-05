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
import { ExternalLinkIcon } from "vue-feather-icons";

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

            fileRecords: [],
            uploadUrl: "",
            uploadHeaders: { "X-Test-Header": "vue-file-agent" },
            isBusy: false,
        };
    },
    async mounted() {
        this.getUnits();
        if (this.$route.params.id) {
            await this.getProduct(this.$route.params.id);
        }
        this.getSubCategories();
    },
    watch: {
        specValues: {
            handler(val) {
                console.log(val);
            },
            deep: true,
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

    methods: {
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
        async getSpecs() {
            api.marketplaceCommon;
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
    },
};
</script>

<style lang="scss" scoped>
.cursor-pointer {
    cursor: pointer;
}
</style>
