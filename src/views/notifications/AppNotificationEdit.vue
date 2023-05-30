<template>
    <div>
        <b-card>
            <ValidationObserver ref="validation-observer">
                <b-row>
                    <!--   title   -->
                    <b-col cols="12" class="px-1">
                        <ValidationProvider
                            name="Название"
                            rules="required"
                            v-slot="{ errors }"
                        >
                            <b-form-group label="Название" label-for="title">
                                <b-form-input
                                    v-model="title"
                                    id="title"
                                    size="md"
                                    placeholder="Введите"
                                />
                            </b-form-group>
                            <p v-if="errors" class="validation__red">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </b-col>

                    <!--   body   -->
                    <b-col cols="12" class="px-1">
                        <ValidationProvider
                            name="Текст"
                            rules="required"
                            v-slot="{ errors }"
                        >
                            <b-form-group label="Текст" label-for="body">
                                <b-form-input
                                    v-model="body"
                                    id="body"
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
                    <!--   FILE INPUT   -->
                    <b-col cols="12" class="px-1">
                        <ValidationProvider
                            name="Изображение"
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
                                    :maxFiles="1"
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
                    <!--   TYPE   -->
                    <b-col cols="12" md="6" class="px-1">
                        <b-form-group label="Тип уведомления" label-for="type">
                            <b-form-select
                                id="type"
                                v-model="type"
                                :options="typeOptions"
                            ></b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row v-if="type === 'update'">
                    <!--   android   -->
                    <b-col cols="12" md="6" class="px-1">
                        <ValidationProvider
                            name="Android"
                            rules="required"
                            v-slot="{ errors }"
                        >
                            <b-form-group label="Android" label-for="android">
                                <b-form-input
                                    v-model="android"
                                    id="android"
                                    size="md"
                                    placeholder="Введите"
                                />
                            </b-form-group>
                            <p v-if="errors" class="validation__red">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </b-col>

                    <!--   ios   -->
                    <b-col cols="12" md="6" class="px-1">
                        <ValidationProvider
                            name="ios"
                            rules="required"
                            v-slot="{ errors }"
                        >
                            <b-form-group label="IOS" label-for="ios">
                                <b-form-input
                                    v-model="ios"
                                    id="ios"
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
                <b-row v-if="type === 'attached'">
                    <!--   TYPE   -->
                    <b-col cols="12" md="6" class="px-1">
                        <b-form-group
                            label="Прикрепить к"
                            label-for="resource_type"
                        >
                            <b-form-select
                                id="resource_type"
                                v-model="resource_type"
                                :options="resourceOptions"
                            ></b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12">
                        <b-table
                            select-mode="single"
                            selected-variant="info"
                            selectable
                            striped
                            hover
                            responsive
                            sort-icon-left
                            :busy="isLoading"
                            :items="items"
                            :fields="fields"
                            @row-selected="onRowSelected"
                        >
                            >
                            <template #cell(image)="data">
                                <div
                                    style="width: 70px; height: 70px"
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
                            <template #table-busy>
                                <div class="text-center text-primary my-2">
                                    <b-spinner class="align-middle"></b-spinner>
                                    <strong class="ml-1"
                                        >Идет загрузка ...</strong
                                    >
                                </div>
                            </template>

                            <template #cell(active)="data">
                                <span v-if="data.item.active">Активен</span>
                                <span v-else>Не активен</span>
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
            </ValidationObserver>

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
    BSpinner,
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
import {
    paginationData,
    paginationWatchers,
    paginationHelperMethods,
} from "@/util/pagination-helper";

export default {
    name: "AppProductEdit",
    components: {
        BSpinner,
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
            filter: "",
            apiEntry: "notifications",
            title: "",
            body: "",
            type: "simple",
            typeOptions: [
                { value: "simple", text: "simple" },
                { value: "attached", text: "attached" },
                { value: "update", text: "update" },
            ],
            fileRecords: [],
            android: "",
            ios: "",
            resource_type: "category",
            resource: "",
            resourceOptions: [
                { value: "category", text: "Категория" },
                { value: "product", text: "Товар" },
            ],
            isSaving: false,
            pagination: paginationData(),
            isLoading: false,
            items: [],
        };
    },
    async mounted() {
        this.getItems();
    },
    watch: {
        ...paginationWatchers("getItems"),

        resource_type: {
            handler() {
                this.getItems();
            },
        },
    },
    computed: {
        fields() {
            if (this.resource_type === "category")
                return [
                    {
                        key: "id",
                        label: "ID",
                    },
                    {
                        key: "name.ru",
                        label: "Название",
                    },
                    {
                        key: "image",
                        label: "Изображения",
                    },
                    {
                        key: "active",
                        label: "Статус",
                    },
                    {
                        key: "category.name.ru",
                        label: "Категория",
                    },
                ];
            else
                return [
                    {
                        key: "id",
                        label: "ID",
                    },
                    {
                        key: "name.ru",
                        label: "Название",
                    },
                    {
                        key: "price",
                        label: "Цена",
                    },

                    {
                        key: "unit.name.ru",
                        label: "Единица измерения",
                    },
                    {
                        key: "active",
                        label: "Статус",
                    },
                    {
                        key: "image",
                        label: "Изображение",
                    },
                    {
                        key: "category.name.ru",
                        label: "Категория",
                    },
                ];
        },
    },

    methods: {
        onRowSelected(items) {
            console.log(items);
            this.resource = items[0];
        },
        async getItems() {
            this.isLoading = true;
            this.resource = null;
            let req;
            if (this.resource_type === "category") {
                req = api.categories.fetchSubCategories(this.getParams());
            } else {
                req = api.products.fetchProducts(this.getParams());
            }
            req.then((res) => {
                this.items = res.data.data;
                this.pagination.total = res.data.total;
            })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        ...paginationHelperMethods("", {}),
        onBeforeDelete(fileRecord) {
            if (confirm("Are you sure you want to delete?")) {
                this.$refs.vueFileAgent.deleteFileRecord(fileRecord);
            }
        },

        async save() {
            const isValid = await this.$refs["validation-observer"].validate();
            if (isValid) {
                this.isSaving = true;
                const formData = new FormData();
                formData.append("title", this.title);
                formData.append("body", this.body);
                if (this.fileRecords[0].file) {
                    formData.append("image", this.fileRecords[0].file);
                }

                formData.append("type", this.type);

                if (this.type === "update") {
                    formData.append("links[android]", this.android);
                    formData.append("links[ios]", this.ios);
                }

                if (this.type === "attached") {
                    formData.append("resource_type", this.resource_type);
                    if (!this.resource) {
                        this.showToast(
                            "danger",
                            "Необходимо выбрать ресурс из таблицы!",
                            "XIcon"
                        );
                        this.isSaving = false;
                        return;
                    } else {
                        formData.append("resource_id", this.resource.id);
                    }
                }

                let req;

                req = api[this.apiEntry].create(formData);

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
