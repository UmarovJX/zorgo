<template>
    <div>
        <b-card>
            <ValidationObserver ref="validation-observer">
                <b-row>
                    <!--   Title   -->
                    <b-col cols="12" md="6" class="px-1">
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

                    <!--   Subtitle   -->
                    <b-col cols="12" md="6" class="px-1">
                        <b-form-group label="Описание" label-for="subtitle">
                            <b-form-input
                                v-model="subtitle"
                                id="subtitle"
                                size="md"
                                placeholder="Введите"
                            />
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <!--   LOCALE   -->
                    <b-col cols="12" md="6" class="px-1">
                        <b-form-group label="Локаль" label-for="locale">
                            <b-form-select
                                id="locale"
                                v-model="locale"
                                :options="localeOptions"
                            ></b-form-select>
                        </b-form-group>
                    </b-col>

                    <!--   LINK   -->
                    <b-col cols="12" md="6" class="px-1">
                        <b-form-group label="Ссылка" label-for="link">
                            <b-form-input
                                v-model="link"
                                id="link"
                                size="md"
                                placeholder="Введите"
                            />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12" md="6">
                        <b-form-group label="Тип баннера" label-for="type">
                            <b-form-select
                                id="type"
                                v-model="type"
                                :options="typeOptions"
                            ></b-form-select>
                        </b-form-group>
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
    name: "AppBannerEdit",
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
            isSaving: false,
            apiEntry: "banners",
            title: "",
            subtitle: "",
            link: null,
            locale: "all",
            localeOptions: [
                { value: "all", text: "all" },
                { value: "uz", text: "uz" },
                { value: "ru", text: "ru" },
            ],
            type: "web",
            typeOptions: [
                { value: "web", text: "Веб-сайт" },
                { value: "mobile", text: "Мобильное приложение" },
            ],
            fileRecords: [],
        };
    },
    async mounted() {
        if (this.$route.params.id) {
            await this.getRecord(this.$route.params.id);
        }
    },
    watch: {},
    computed: {},

    methods: {
        onBeforeDelete(fileRecord) {
            if (confirm("Are you sure you want to delete?")) {
                this.$refs.vueFileAgent.deleteFileRecord(fileRecord);
            }
        },
        async getRecord(id) {
            const { data } = await api[this.apiEntry].fetchOne(id);
            console.log(data);
            this.title = data.title;
            this.subtitle = data.subtitle;
            this.link = data.link;
            this.locale = data.locale;
            this.type = data.type;

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
        async save() {
            const isValid = await this.$refs["validation-observer"].validate();
            if (isValid) {
                this.isSaving = true;
                const formData = new FormData();
                formData.append("title", this.title);
                if (this.subtitle) {
                    formData.append("subtitle", this.subtitle);
                }
                if (this.link) {
                    formData.append("link", this.link);
                }
                formData.append("locale", this.locale);
                formData.append("type", this.type);

                if (this.fileRecords[0].file) {
                    formData.append("image", this.fileRecords[0].file);
                }

                let req;
                if (this.$route.params.id) {
                    req = api[this.apiEntry].update(
                        this.$route.params.id,
                        formData
                    );
                } else {
                    req = api[this.apiEntry].create(formData);
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
            } else {
                this.showToast(
                    "danger",
                    "Заполните все обяза́тельные поля!",
                    "XIcon"
                );
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
