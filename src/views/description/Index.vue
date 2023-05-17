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
                    <b-row>
                        <b-col md="6" v-for="(data, key) in item.body">
                            <ValidationProvider
                                :name="`Описание [${key.toUpperCase()}]`"
                                rules="required"
                                v-slot="{ errors }"
                            >
                                <b-form-group
                                    :label="`Описание [${key.toUpperCase()}]`"
                                    :label-for="`body.${key}`"
                                >
                                    <quill-editor
                                        v-model="item.body[key]"
                                        ref="myQuillEditor"
                                        :options="quillEditorConfig"
                                    >
                                    </quill-editor>
                                </b-form-group>
                                <p v-if="errors" class="validation__red">
                                    {{ errors[0] }}
                                </p>
                            </ValidationProvider>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group label="Ссылка" label-for="link">
                                <b-form-input
                                    v-model="item.link"
                                    id="link"
                                    size="md"
                                    placeholder="Введите"
                                />
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-card>
                <b-button
                    class="btn-success float-right"
                    @click="update()"
                    v-if="isUpdateAvailable"
                >
                    Сохранить
                </b-button>
            </ValidationObserver>
        </b-col>
    </b-row>
</template>

<script>
import quillConfig from "@/util/quillConfig";
import Description from "@/services/description";
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
import permissionComputeds from "@/util/permissionComputeds";

const api = new Description();

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
    computed: { ...permissionComputeds("description") },
    data() {
        return {
            type: "osago",
            title: "Осаго",
            errors: [],
            quillEditorConfig: quillConfig,
            item: {
                body: { ru: "", uz: "" },
                link: "",
            },
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
                })
                .finally(() => window.scrollTo(0, 0));
        },

        update() {
            this.$refs["validation-observer"].validate().then((isValid) => {
                if (isValid) {
                    api.update(this.type, this.item)
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
    },
};
</script>

<style scoped></style>
