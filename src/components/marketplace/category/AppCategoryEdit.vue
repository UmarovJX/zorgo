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
                                        size: 'Размер файла не должен превышать 10 МБ.',
                                    }"
                                    @select="filesSelected($event)"
                                    @beforedelete="onBeforeDelete($event)"
                                    @delete="fileDeleted($event)"
                                />
                            </b-form-group>
                            <p v-if="errors" class="validation__red">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </b-col>
                </b-row>
                <!--   SPECIFICATIONS   -->
            </ValidationObserver>

            <b-button
                :disabled="isSaving"
                class="btn-success float-right mt-2 mr-1"
                @click="saveCategory"
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
} from "bootstrap-vue";
export default {
    name: "AppCategoryEdit",
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

            fileRecords: [],
            fileRecordsForUpload: [],
            uploadUrl: "",
            uploadHeaders: { "X-Test-Header": "vue-file-agent" },
            isBusy: false,
            filter: null,
            filterOn: [],
            selectMode: "multi",
            isSaving: false,
        };
    },
    async mounted() {
        if (this.$route.params.id) {
            await this.getCategory(this.$route.params.id);
        }
        api.marketplaceCommon.fetchAllSpecifications().then(({ data }) => {
            this.allSpecs = data;
        });
        this.getCategories();
    },
    computed: {},

    methods: {
        async getCategory(id) {
            const { data } = await api.categories.fetchOneCategory(id);

            this.name = data.name;
            const image = data.image;

            this.fileRecords = [
                {
                    name: "image.jpg",
                    size: 0,
                    type: "image/jpg",
                    url: image,
                    src: image,
                },
            ];
        },
        async saveCategory() {
            const isValid = await this.$refs["validation-observer"].validate();
            if (isValid) {
                this.isSaving = true;
                const formData = new FormData();

                formData.append("name[ru]", this.name.ru);
                formData.append("name[uz]", this.name.uz);

                if (this.fileRecords[0].file) {
                    formData.append("image", this.fileRecords[0].file);
                }

                let req;
                if (this.$route.params.id) {
                    req = api.categories.updateCategory(
                        this.$route.params.id,
                        formData
                    );
                } else {
                    req = api.categories.createCategory(formData);
                }
                req.then(() => {
                    this.$router.push({ name: "categories" });
                    this.showToast("success", "Успешно изменено!", "CheckIcon");
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
        deleteUploadedFile(fileRecord) {
            // Using the default uploader. You may use another uploader instead.
            this.$refs.vueFileAgent.deleteUpload(
                this.uploadUrl,
                this.uploadHeaders,
                fileRecord
            );
        },
        filesSelected(fileRecordsNewlySelected) {
            const validFileRecords = fileRecordsNewlySelected.filter(
                (fileRecord) => !fileRecord.error
            );
            this.fileRecordsForUpload =
                this.fileRecordsForUpload.concat(validFileRecords);
        },
        onBeforeDelete(fileRecord) {
            const i = this.fileRecordsForUpload.indexOf(fileRecord);
            if (i !== -1) {
                // queued file, not yet uploaded. Just remove from the arrays
                this.fileRecordsForUpload.splice(i, 1);
                const k = this.fileRecords.indexOf(fileRecord);
                if (k !== -1) this.fileRecords.splice(k, 1);
            } else {
                if (confirm("Are you sure you want to delete?")) {
                    this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
                }
            }
        },
        fileDeleted(fileRecord) {
            const i = this.fileRecordsForUpload.indexOf(fileRecord);
            if (i !== -1) {
                this.fileRecordsForUpload.splice(i, 1);
            } else {
                this.deleteUploadedFile(fileRecord);
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
        async getCategories() {
            api.marketplaceCommon.fetchCategories().then(({ data }) => {
                const options = data
                    .filter(
                        (el) => el.active && el.id !== this.$route.params.id
                    )
                    .map((el) => ({ value: el.id, text: el.name.ru }));
                this.categoryOptions = [
                    { value: null, text: "Выберите Категорию" },
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
