<template>
    <b-row>
        <b-col cols="12">
            <h2>{{ title }}</h2>
        </b-col>
        <b-col cols="12">
            <ValidationObserver
                rules="required"
                immediate
                ref="validation-observer"
            >
                <b-card>
                    <b-card-title>Раздел №1</b-card-title>
                    <b-row>
                        <b-col
                            md="6"
                            v-for="(data, key) in item.section_1.name"
                        >
                            <ValidationProvider
                                :name="`Заголовок [${key.toUpperCase()}]`"
                                rules="required"
                                v-slot="{ errors }"
                            >
                                <b-form-group
                                    :label="`Заголовок [${key.toUpperCase()}]`"
                                    :label-for="`section_1-name-${key}`"
                                >
                                    <b-form-input
                                        v-model="item.section_1.name[key]"
                                        :id="`section_1-name-${key}`"
                                        size="md"
                                        placeholder="Введите"
                                    />
                                </b-form-group>
                                <p v-if="errors" class="validation__red">
                                    {{ errors[0] }}
                                </p>
                            </ValidationProvider>
                        </b-col>
                        <b-col
                            md="6"
                            v-for="(data, key) in item.section_1.body"
                        >
                            <b-form-group
                                :label="`Описание [${key.toUpperCase()}]`"
                                :label-for="`section_1-body.${key}`"
                            >
                                <quill-editor
                                    v-model="item.section_1.body[key]"
                                    ref="myQuillEditor"
                                    :options="quillEditorConfig"
                                >
                                </quill-editor>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
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
                </b-card>
                <b-card>
                    <b-card-title>Раздел №2</b-card-title>
                    <b-row>
                        <b-col
                            md="6"
                            v-for="(data, key) in item.section_2.name"
                        >
                            <ValidationProvider
                                :name="`Заголовок [${key.toUpperCase()}]`"
                                rules="required"
                                v-slot="{ errors }"
                            >
                                <b-form-group
                                    :label="`Заголовок [${key.toUpperCase()}]`"
                                    :label-for="`section_2-name-${key}`"
                                >
                                    <b-form-input
                                        v-model="item.section_2.name[key]"
                                        :id="`section_2-name-${key}`"
                                        size="md"
                                        placeholder="Введите"
                                    />
                                </b-form-group>
                                <p v-if="errors" class="validation__red">
                                    {{ errors[0] }}
                                </p>
                            </ValidationProvider>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group
                                label="Ссылка на YouTube"
                                label-for="section_2-link"
                            >
                                <b-form-input
                                    v-model="item.section_2.link"
                                    id="section_2-link"
                                    size="md"
                                    placeholder="Введите"
                                />
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-card>
                <b-card>
                    <b-card-title>Раздел №3</b-card-title>
                    <b-row>
                        <b-col
                            md="6"
                            v-for="(data, key) in item.section_3.name"
                        >
                            <ValidationProvider
                                :name="`Заголовок [${key.toUpperCase()}]`"
                                rules="required"
                                v-slot="{ errors }"
                            >
                                <b-form-group
                                    :label="`Заголовок [${key.toUpperCase()}]`"
                                    :label-for="`section_3-name-${key}`"
                                >
                                    <b-form-input
                                        v-model="item.section_3.name[key]"
                                        :id="`section_3-name-${key}`"
                                        size="md"
                                        placeholder="Введите"
                                    />
                                </b-form-group>
                                <p v-if="errors" class="validation__red">
                                    {{ errors[0] }}
                                </p>
                            </ValidationProvider>
                        </b-col>
                        <b-col
                            md="6"
                            v-for="(data, key) in item.section_3.body"
                        >
                            <b-form-group
                                :label="`Описание [${key.toUpperCase()}]`"
                                :label-for="`section_3-body.${key}`"
                            >
                                <quill-editor
                                    v-model="item.section_3.body[key]"
                                    ref="myQuillEditor"
                                    :options="quillEditorConfig"
                                >
                                </quill-editor>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-card>
                <b-card v-if="type !== 'travel'">
                    <b-card-title>Партнеры</b-card-title>
                    <b-row>
                        <b-col md="6" v-for="(data, key) in item.partners_text">
                            <b-form-group
                                :label="`Текст [${key.toUpperCase()}]`"
                                :label-for="`partners-text-${key}`"
                            >
                                <b-form-textarea
                                    v-model="item.partners_text[key]"
                                    :id="`partners-text-${key}`"
                                    size="md"
                                    rows="3"
                                    placeholder="Введите"
                                />
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-card>
                <b-card>
                    <b-card-title>SEO</b-card-title>
                    <b-row>
                        <b-col md="6" v-for="(data, key) in item.seo_meta">
                            <b-form-group
                                :label="`Текст [${key.toUpperCase()}]`"
                                :label-for="`seo_meta-${key}`"
                            >
                                <b-form-textarea
                                    v-model="item.seo_meta[key]"
                                    :id="`seo_meta-${key}`"
                                    size="md"
                                    rows="3"
                                    placeholder="Введите"
                                />
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-card>
            </ValidationObserver>
        </b-col>
        <b-col cols="12">
            <b-card>
                <b-button class="btn-success float-right" @click="update()">
                    Сохранить
                </b-button>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
import quillConfig from "@/util/quillConfig";
import MainPage from "@/services/mainPage";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
    BRow,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BButton,
    BCard,
    BCardTitle,
    BCol,
    BTable,
    BFormCheckbox,
    BFormCheckboxGroup,
    BFormSelect,
    BCardText,
} from "bootstrap-vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import log from "echarts/src/scale/Log";

const api = new MainPage();

export default {
    name: "Index",
    components: {
        BRow,
        BFormGroup,
        BFormInput,
        BFormTextarea,
        BButton,
        BCard,
        BCardTitle,
        BCol,
        BTable,
        BFormCheckbox,
        BFormCheckboxGroup,
        BFormSelect,
        BCardText,
        ToastificationContent,
        quillEditor,
    },
    data() {
        return {
            type: "osago",
            title: "Осаго",
            errors: [],
            quillEditorConfig: quillConfig,
            item: {
                partners_text: { ru: "", uz: "" },
                section_1: {
                    name: { ru: "", uz: "" },
                    body: { ru: "", uz: "" },
                },
                section_2: {
                    name: { ru: "", uz: "" },
                    link: "",
                },
                section_3: {
                    name: { ru: "", uz: "" },
                    body: { ru: "", uz: "" },
                },
            },
            fileRecords: [],
            uploadUrl: "",
            uploadHeaders: { "X-Test-Header": "vue-file-agent" },
            fileRecordsForUpload: [],
        };
    },
    watch: {
        "$route.name": {
            handler() {
                this.setType();
                this.loadItem();
            },
        },
    },
    mounted() {
        this.setType();
        this.loadItem();
    },
    methods: {
        setType() {
            const arr = this.$route.name.split("-");
            this.type = arr[arr.length - 1];
            if (this.type === "osago") {
                this.title = "Осаго";
            } else if (this.type === "kasko") {
                this.title = "Каско";
            } else {
                this.title = "Путешествие";
            }
        },
        loadItem() {
            api.fetch(this.type)
                .then((res) => {
                    this.item = res.data;
                    this.fileRecords = [
                        {
                            name: "image.jpg",
                            size: 0,
                            type: "image/jpg",
                            url: res.data.section_1.image,
                            src: res.data.section_1.image,
                        },
                    ];
                })
                .finally(() => window.scrollTo(0, 0));
        },

        update() {
            this.$refs["validation-observer"].validate().then((isValid) => {
                if (isValid) {
                    let response;
                    let body = this.item;
                    delete body.section_1.image;
                    if (this.type === "travel") {
                        delete body.partners_text;
                    }

                    if (!this.fileRecords[0].file) {
                        response = api.update(this.type, body);
                    } else {
                        const formData = new FormData();

                        Object.keys(body).forEach((section) => {
                            Object.keys(body[section]).forEach((field) => {
                                if (typeof body[section][field] !== "object") {
                                    formData.append(
                                        `${section}[${field}]`,
                                        body[section][field]
                                    );
                                } else {
                                    Object.keys(body[section][field]).forEach(
                                        (key) => {
                                            formData.append(
                                                `${section}[${field}][${key}]`,
                                                body[section][field][key]
                                            );
                                        }
                                    );
                                }
                            });
                        });

                        formData.append(
                            "section_1[image]",
                            this.fileRecords[0].file
                        );
                        response = api.update(this.type, formData);
                    }

                    response
                        .then(() => {
                            this.loadItem();
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
                        })
                        .finally(() => window.scrollTo(0, 0));
                }
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

        deleteUploadedFile: function (fileRecord) {
            // Using the default uploader. You may use another uploader instead.
            this.$refs.vueFileAgent.deleteUpload(
                this.uploadUrl,
                this.uploadHeaders,
                fileRecord
            );
        },
        filesSelected: function (fileRecordsNewlySelected) {
            const validFileRecords = fileRecordsNewlySelected.filter(
                (fileRecord) => !fileRecord.error
            );
            this.fileRecordsForUpload =
                this.fileRecordsForUpload.concat(validFileRecords);
        },
        onBeforeDelete: function (fileRecord) {
            const i = this.fileRecordsForUpload.indexOf(fileRecord);
            if (i !== -1) {
                // queued file, not yet uploaded. Just remove from the arrays
                this.fileRecordsForUpload.splice(i, 1);
                const k = this.fileRecords.indexOf(fileRecord);
                if (k !== -1) this.fileRecords.splice(k, 1);
            } else {
                if (confirm("Вы уверены, что хотите удалить изображение?")) {
                    this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
                }
            }
        },
        fileDeleted: function (fileRecord) {
            const i = this.fileRecordsForUpload.indexOf(fileRecord);
            if (i !== -1) {
                this.fileRecordsForUpload.splice(i, 1);
            } else {
                this.deleteUploadedFile(fileRecord);
            }
        },
    },
};
</script>

<style scoped></style>
