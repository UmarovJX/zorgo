<template>
    <div>
        <!--  ROLE NAME  -->
        <b-card>
            <ValidationObserver ref="validation-observer">
                <div class="col-12 d-flex flex-wrap p-0">
                    <!--   USERNAME   -->
                    <b-col cols="12" class="p-0 px-1">
                        <ValidationProvider
                            name="Название"
                            rules="required"
                            v-slot="{ errors }"
                        >
                            <b-form-group label="Название" label-for="name">
                                <b-form-input
                                    v-model="name"
                                    id="name"
                                    size="md"
                                    placeholder="Введите"
                                />
                            </b-form-group>
                            <p v-if="errors" class="validation__red">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </b-col>
                </div>
            </ValidationObserver>

            <b-button
                class="btn-success float-right mt-2 mr-1"
                @click="createBrand"
            >
                Создать
            </b-button>
        </b-card>
    </div>
</template>

<script>
import api from "@/services/api";
import Ripple from "vue-ripple-directive";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
    BFormGroup,
    BFormInput,
    BButton,
    BCard,
    BCol,
    BTable,
    BFormCheckbox,
    BFormCheckboxGroup,
} from "bootstrap-vue";

export default {
    name: "AppBrandsCreate",
    components: {
        BFormGroup,
        BFormInput,
        BButton,
        BCard,
        BCol,
        BTable,
        BFormCheckbox,
        BFormCheckboxGroup,
        ToastificationContent,
    },
    directives: {
        Ripple,
    },
    data() {
        return {
            name: null,
            isBusy: false,
            sortBy: "",
            sortDesc: false,
            sortDirection: "asc",
            filter: null,
            filterOn: [],
            selectMode: "multi",
            infoModal: {
                id: "info-modal",
                title: "",
                content: "",
            },
        };
    },

    methods: {
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

        async createBrand() {
            const isValid = await this.$refs["validation-observer"].validate();
            if (isValid) {
                const { name } = this;
                const data = {
                    name,
                };
                api.brands
                    .createBrand(data)
                    .then(() => {
                        this.$router.push({ name: "brands" });
                        this.showToast(
                            "success",
                            "Успешно создано!",
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
                    });
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
