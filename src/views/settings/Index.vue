<template>
    <b-row>
        <b-col cols="12">
            <h2>Контакты и ссылки</h2>
        </b-col>
        <b-col cols="12">
            <b-card>
                <ValidationObserver immediate ref="validation-observer">
                    <b-row>
                        <b-col md="6">
                            <ValidationProvider
                                name="Email"
                                rules="email"
                                v-slot="{ errors }"
                            >
                                <b-form-group label="Email" label-for="email">
                                    <b-form-input
                                        v-model="item.email"
                                        id="email"
                                        size="md"
                                        placeholder="Введите"
                                    />
                                </b-form-group>
                                <p v-if="errors" class="validation__red">
                                    {{ errors[0] }}
                                </p>
                            </ValidationProvider>
                        </b-col>
                        <b-col md="6">
                            <b-form-group
                                label="Номер телефона"
                                label-for="phone"
                            >
                                <b-form-input
                                    v-model="item.phone"
                                    id="phone"
                                    size="md"
                                    placeholder="Введите"
                                />
                            </b-form-group>
                            <p v-if="errors" class="validation__red">
                                {{ errors[0] }}
                            </p>
                        </b-col>
                        <b-col md="6" v-for="(data, key) in item.address">
                            <b-form-group
                                :label="`Адрес [${key.toUpperCase()}]`"
                                :label-for="`address-${key}`"
                            >
                                <b-form-input
                                    v-model="item.address[key]"
                                    :id="`address-${key}`"
                                    size="md"
                                    placeholder="Введите"
                                />
                            </b-form-group>
                            <p v-if="errors" class="validation__red">
                                {{ errors[0] }}
                            </p>
                        </b-col>
                        <b-col md="6">
                            <ValidationProvider
                                name="Ссылка на Play Market"
                                rules="required"
                                v-slot="{ errors }"
                            >
                                <b-form-group
                                    label="Ссылка на Play Market"
                                    label-for="links_android"
                                >
                                    <b-form-input
                                        v-model="item.links.android"
                                        id="links_android"
                                        size="md"
                                        placeholder="Введите"
                                    />
                                </b-form-group>
                                <p v-if="errors" class="validation__red">
                                    {{ errors[0] }}
                                </p>
                            </ValidationProvider>
                        </b-col>
                        <b-col md="6">
                            <ValidationProvider
                                name="Ссылка на AppStore"
                                rules="required"
                                v-slot="{ errors }"
                            >
                                <b-form-group
                                    label="Ссылка на AppStore"
                                    label-for="links_ios"
                                >
                                    <b-form-input
                                        v-model="item.links.ios"
                                        id="links_ios"
                                        size="md"
                                        placeholder="Введите"
                                    />
                                </b-form-group>
                                <p v-if="errors" class="validation__red">
                                    {{ errors[0] }}
                                </p>
                            </ValidationProvider>
                        </b-col>
                        <b-col md="12">
                            <b-form-group
                                label="Онлайн чат | Служба поддержки"
                                label-for="online_chat"
                            >
                                <b-form-input
                                    v-model="item.online_chat"
                                    id="online_chat"
                                    size="md"
                                    placeholder="Введите"
                                />
                            </b-form-group>
                            <p v-if="errors" class="validation__red">
                                {{ errors[0] }}
                            </p>
                        </b-col>
                        <b-col md="6" v-for="(data, key) in public_offer">
                            <ValidationProvider
                                :name="`Публичная оферта [${key.toUpperCase()}]`"
                                rules="mimes:application/pdf"
                                v-slot="{ errors }"
                            >
                                <b-form-group
                                    :label="`Публичная оферта [${key.toUpperCase()}]`"
                                    :label-for="`public-offer-${key}`"
                                >
                                    <b-form-file
                                        v-model="public_offer[key]"
                                        placeholder="Загрузите pdf файл"
                                        drop-placeholder="Drop file here..."
                                        :id="`public-offer-${key}`"
                                        accept="application/pdf"
                                    ></b-form-file>
                                </b-form-group>
                                <p v-if="errors" class="validation__red">
                                    {{ errors[0] }}
                                </p>
                            </ValidationProvider>
                        </b-col>
                        <b-col
                            md="6"
                            v-for="(data, key) in personal_data_agreement"
                        >
                            <ValidationProvider
                                :name="`Соглашение на обработку персональных данных [${key.toUpperCase()}]`"
                                rules="mimes:application/pdf"
                                v-slot="{ errors }"
                            >
                                <b-form-group
                                    :label="`Соглашение на обработку персональных данных [${key.toUpperCase()}]`"
                                    :label-for="`personal_data_agreement-${key}`"
                                >
                                    <b-form-file
                                        v-model="personal_data_agreement[key]"
                                        placeholder="Загрузите pdf файл"
                                        drop-placeholder="Drop file here..."
                                        :id="`personal_data_agreement-${key}`"
                                        accept="application/pdf"
                                    ></b-form-file>
                                </b-form-group>
                                <p v-if="errors" class="validation__red">
                                    {{ errors[0] }}
                                </p>
                            </ValidationProvider>
                        </b-col>
                        <b-col md="6">
                            <ValidationProvider
                                name="Telegram"
                                v-slot="{ errors }"
                            >
                                <b-form-group
                                    label="Telegram"
                                    label-for="social-telegram"
                                >
                                    <b-form-input
                                        v-model="item.social.telegram"
                                        id="social-telegram"
                                        size="md"
                                        placeholder="Введите"
                                    />
                                </b-form-group>
                                <p v-if="errors" class="validation__red">
                                    {{ errors[0] }}
                                </p>
                            </ValidationProvider>
                        </b-col>
                        <b-col md="6">
                            <ValidationProvider
                                name="Facebook"
                                v-slot="{ errors }"
                            >
                                <b-form-group
                                    label="Facebook"
                                    label-for="social-facebook"
                                >
                                    <b-form-input
                                        v-model="item.social.facebook"
                                        id="social-facebook"
                                        size="md"
                                        placeholder="Введите"
                                    />
                                </b-form-group>
                                <p v-if="errors" class="validation__red">
                                    {{ errors[0] }}
                                </p>
                            </ValidationProvider>
                        </b-col>
                        <b-col md="6">
                            <ValidationProvider
                                name="Instagram"
                                v-slot="{ errors }"
                            >
                                <b-form-group
                                    label="Instagram"
                                    label-for="social-instagram"
                                >
                                    <b-form-input
                                        v-model="item.social.instagram"
                                        id="social-instagram"
                                        size="md"
                                        placeholder="Введите"
                                    />
                                </b-form-group>
                                <p v-if="errors" class="validation__red">
                                    {{ errors[0] }}
                                </p>
                            </ValidationProvider>
                        </b-col>
                        <b-col md="6">
                            <ValidationProvider
                                name="YouTube"
                                v-slot="{ errors }"
                            >
                                <b-form-group
                                    label="YouTube"
                                    label-for="social-youtube"
                                >
                                    <b-form-input
                                        v-model="item.social.youtube"
                                        id="social-youtube"
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
                </ValidationObserver>
                <b-button class="btn-success float-right" @click="update()">
                    Сохранить
                </b-button>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
import Settings from "@/services/settings";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
    BRow,
    BFormGroup,
    BFormInput,
    BFormFile,
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
import log from "echarts/src/scale/Log";

const api = new Settings();

export default {
    name: "Index",
    components: {
        BRow,
        BFormGroup,
        BFormInput,
        BFormFile,
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
    },
    data() {
        return {
            errors: [],
            item: {
                email: "",
                phone: "",
                address: { ru: "", uz: "" },
                links: {
                    ios: "",
                    android: "",
                },
                online_chat: "",

                social: {
                    telegram: "",
                    facebook: "",
                    instagram: "",
                    youtube: "",
                },
            },
            public_offer: { ru: null, uz: null },
            personal_data_agreement: { ru: null, uz: null },
        };
    },
    mounted() {
        this.loadItem();
    },
    methods: {
        loadItem() {
            api.fetch()
                .then((res) => {
                    this.item = res.data;
                })
                .finally(() => window.scrollTo(0, 0));
        },

        update() {
            this.$refs["validation-observer"].validate().then((isValid) => {
                if (isValid) {
                    const formData = new FormData();

                    formData.append("email", this.item.email ?? "");
                    formData.append("phone", this.item.phone ?? "");
                    formData.append("address[ru]", this.item.address.ru ?? "");
                    formData.append("address[uz]", this.item.address.uz ?? "");
                    formData.append("links[ios]", this.item.links.ios ?? "");
                    formData.append(
                        "links[android]",
                        this.item.links.android ?? ""
                    );
                    formData.append("online_chat", this.item.online_chat ?? "");
                    if (this.public_offer.ru)
                        formData.append(
                            "public_offer[ru]",
                            this.public_offer.ru ?? ""
                        );
                    if (this.public_offer.uz)
                        formData.append(
                            "public_offer[uz]",
                            this.public_offer.uz ?? ""
                        );
                    if (this.personal_data_agreement.ru)
                        formData.append(
                            "personal_data_agreement[ru]",
                            this.personal_data_agreement.ru ?? ""
                        );
                    if (this.personal_data_agreement.uz)
                        formData.append(
                            "personal_data_agreement[uz]",
                            this.personal_data_agreement.uz ?? ""
                        );

                    formData.append(
                        "social[telegram]",
                        this.item.social.telegram ?? ""
                    );
                    formData.append(
                        "social[facebook]",
                        this.item.social.facebook ?? ""
                    );
                    formData.append(
                        "social[instagram]",
                        this.item.social.instagram ?? ""
                    );
                    formData.append(
                        "social[youtube]",
                        this.item.social.youtube ?? ""
                    );

                    api.update(formData)
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
