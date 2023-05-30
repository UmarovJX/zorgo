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
                    <!-- COLOR -->
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
            </ValidationObserver>

            <b-row>
                <b-col cols="12">
                    <b-row>
                        <b-col cols="12" lg="6">
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
                        </b-col>
                        <b-col
                            cols="12"
                            lg="6"
                            class="d-flex align-items-end m5rem"
                        >
                            <b-form-input
                                id="filterInput"
                                v-model="filter"
                                type="search"
                                placeholder="Искать"
                            />
                            <b-button :disabled="!filter" @click="filter = ''">
                                Очистить
                            </b-button>
                        </b-col>
                    </b-row>

                    <b-row class="">
                        <!--  TABLE  -->
                        <b-col cols="12">
                            <b-table
                                striped
                                hover
                                responsive
                                sort-icon-left
                                :busy="isBusy"
                                :items="productItems"
                                :fields="fields"
                            >
                                <template #table-busy>
                                    <div class="text-center text-primary my-2">
                                        <b-spinner
                                            class="align-middle"
                                        ></b-spinner>
                                        <strong class="ml-1"
                                            >Идет загрузка ...</strong
                                        >
                                    </div>
                                </template>

                                <template #cell(image)="data">
                                    <div
                                        style="width: 40px; height: 40px"
                                        v-if="data.item.image"
                                    >
                                        <img
                                            style="
                                                object-fit: contain;
                                                width: 100%;
                                                height: 100%;
                                            "
                                            :src="data.item.image"
                                        />
                                    </div>
                                </template>

                                <template #cell(crud_row)="{ item }">
                                    <div class="d-flex float-right">
                                        <b-button
                                            v-if="
                                                !selectedProducts.find(
                                                    (el) => el.id === item.id
                                                )
                                            "
                                            @click="() => addProduct(item)"
                                            variant="outline-success"
                                            class="update__btn"
                                        >
                                            Добавить
                                        </b-button>

                                        <b-button
                                            v-else
                                            @click="() => removeProduct(item)"
                                            variant="outline-danger"
                                            class="update__btn"
                                        >
                                            Убрать
                                        </b-button>
                                    </div>
                                </template>
                            </b-table>
                        </b-col>

                        <!--  PAGINATION  -->
                        <b-col
                            cols="12"
                            class="mb-3 d-flex justify-content-between align-items-center"
                        >
                            <b-form-select
                                class="float-right col-1"
                                v-model="pagination.perPage"
                                placeholder="Выберите"
                                :options="pagination.perPageOptions"
                            >
                            </b-form-select>
                            <b-pagination
                                v-model="pagination.page"
                                :total-rows="pagination.total"
                                :per-page="pagination.perPage"
                                align="center"
                                size="sm"
                                class="my-0"
                            />
                        </b-col>
                    </b-row>
                </b-col>
                <b-col cols="12"
                    ><b-row class="my-1">
                        <b-col> <b>Товары в подборке</b> </b-col>
                    </b-row>
                    <b-row
                        class="my-1 ml-2"
                        v-if="selectedProducts.length == 0"
                    >
                        <b-col> Товары не добавлены </b-col>
                    </b-row>
                    <b-row v-for="e in selectedProducts" class="px-2 my-1">
                        <b-col
                            cols="12"
                            class="d-flex justify-content-between align-items-center"
                        >
                            {{ e.name.ru }}
                            <b-button
                                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                variant="outline-danger"
                                class="delete__btn"
                                size="sm"
                                @click="() => removeProduct(e)"
                            >
                                <feather-icon icon="MinusCircleIcon" size="14" />
                            </b-button>
                        </b-col> </b-row
                ></b-col>
            </b-row>

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
    BPagination,
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
import { paginationData } from "@/util/pagination-helper";

export default {
    name: "AppProductEdit",
    components: {
        BPagination,
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
            selectedProducts: [],
            productItems: [],
            categoryId: null,
            categoryOptions: [
                {
                    value: undefined,
                    text: "Все категории",
                },
            ],
            isSaving: false,
            isBusy: false,
            filter: "",
            fields: [
                {
                    key: "name.ru",
                    label: "Название",
                    sortable: true,
                },
                {
                    key: "image",
                    label: "Изображение",
                },
                {
                    key: "category.name.ru",
                    label: "Категория",
                },

                {
                    key: "crud_row",
                    label: "Добавить",
                },
            ],
            pagination: paginationData(),
        };
    },
    async mounted() {
        this.getSubCategories();
        this.getProducts();
        if (this.$route.params.id) {
            await this.getRecord(this.$route.params.id);
        }
    },
    watch: {
        "pagination.page": {
            handler() {
                this.getProducts();
            },
        },

        "pagination.perPage": {
            handler() {
                this.getProducts();
            },
        },

        filter: {
            handler() {
                this.getProducts();
            },
        },
        categoryId: {
            handler() {
                this.getProducts();
            },
        },
    },
    computed: {},

    methods: {
        addProduct(e) {
            this.selectedProducts.push(e);
        },
        removeProduct(e) {
            this.selectedProducts = this.selectedProducts.filter(
                (el) => el.id !== e.id
            );
        },
        async getProducts() {
            this.isBusy = true;
            const params = new URLSearchParams();
            params.append("page", this.pagination.page);
            params.append("perPage", this.pagination.perPage);

            if (this.filter) {
                params.append("search[name]", this.filter);
            }
            if (this.categoryId) {
                params.append("filters[category_id]", this.categoryId);
            }
            api.products
                .fetchProducts(params)
                .then((res) => {
                    this.productItems = res.data.data;
                    this.pagination.total = res.data.total;
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    this.isBusy = false;
                });
        },
        async getRecord(id) {
            const { data } = await api[this.apiEntry].fetchOne(id);
            this.name = data.name;
            this.color = "#" + data.color;
            this.selectedProducts = data.products;
        },
        async save() {
            const isValid = await this.$refs["validation-observer"].validate();
            if (isValid) {
                this.isSaving = true;
                const data = {
                    name: this.name,
                    color: this.color.slice(1),
                    products: this.selectedProducts.map((el) => +el.id),
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
        async getSubCategories() {
            api.marketplaceCommon.fetchSubCategories().then(({ data }) => {
                const options = data
                    .filter((el) => el.active)
                    .map((el) => ({ value: el.id, text: el.name.ru }));
                this.categoryOptions = [
                    { value: null, text: "Все категории" },
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
    },
};
</script>

<style lang="scss" scoped>
.m5rem {
    margin-bottom: 0.5rem;
}
.w-50px {
    width: 50px;
}
.cursor-pointer {
    cursor: pointer;
}
</style>
