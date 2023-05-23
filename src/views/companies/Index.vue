<template>
    <b-row>
        <b-col md="12">
            <h2>Страховые компании</h2>
        </b-col>
        <b-col md="12">
            <b-table :items="items" :fields="fields" :busy="loading">
                <template #table-busy>
                    <div class="text-center text-primary my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong class="ml-1">Идет загрузка ...</strong>
                    </div>
                </template>
                <template #cell(image)="data">
                    <img
                        :src="data.item.image"
                        width="70"
                        height="70"
                        style="object-fit: contain"
                        alt=""
                    />
                </template>
                <template #cell(action)="data">
                    <div class="d-flex float-right">
                        <!--    EDIT    -->
                        <router-link
                            v-if="isUpdateAvailable"
                            :to="{
                                name: 'company-update',
                                params: { id: data.item.id },
                            }"
                        >
                            <b-button
                                variant="outline-success"
                                class="update__btn"
                                size="sm"
                            >
                                <feather-icon icon="Edit2Icon" size="18" />
                            </b-button>
                        </router-link>

                        <!--  DEACTIVATE  -->
                        <div
                            class="ml-1"
                            v-if="data.item.active && isDeleteAvailable"
                        >
                            <!--  DEACTIVATE  -->
                            <b-button
                                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                v-b-modal="`modal-${data.item.id}`"
                                variant="outline-danger"
                                class="delete__btn"
                                size="sm"
                            >
                                <feather-icon
                                    icon="MinusCircleIcon"
                                    size="18"
                                />
                            </b-button>
                            <!-- DEACTIVATE MODAL -->
                            <b-modal
                                :id="`modal-${data.item.id}`"
                                cancel-title="Отменить"
                                cancel-variant="danger btn-sm"
                                body-class="deactivate-btn_modal"
                                title="Деактивация"
                                hide-header-close
                                centered
                            >
                                Вы действительно хотите деактивировать эту
                                позицию?

                                <template #modal-footer>
                                    <b-button
                                        variant="danger btn-sm"
                                        @click="
                                            $bvModal.hide(
                                                `modal-${data.item.id}`
                                            )
                                        "
                                    >
                                        Отменить
                                    </b-button>

                                    <b-button
                                        variant="success btn-sm"
                                        @click="
                                            deactivateEntry(
                                                data.item.id,
                                                data.item.active
                                            )
                                        "
                                    >
                                        Деактивировать
                                    </b-button>
                                </template>
                            </b-modal>
                        </div>

                        <!--  ACTIVATE  -->
                        <div
                            class="ml-1"
                            v-if="!data.item.active && isDeleteAvailable"
                        >
                            <!--  ACTIVATE  -->
                            <b-button
                                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                v-b-modal="`modal-${data.item.id}`"
                                variant="outline-info"
                                class="delete__btn"
                                size="sm"
                            >
                                <feather-icon
                                    icon="CornerUpLeftIcon"
                                    size="18"
                                />
                            </b-button>
                            <!-- ACTIVATE MODAL -->
                            <b-modal
                                :id="`modal-${data.item.id}`"
                                cancel-title="Отменить"
                                cancel-variant="danger btn-sm"
                                body-class="deactivate-btn_modal"
                                title="Активация"
                                hide-header-close
                                centered
                            >
                                Вы действительно хотите активировать эту
                                позицию?

                                <template #modal-footer>
                                    <b-button
                                        variant="danger btn-sm"
                                        @click="
                                            $bvModal.hide(
                                                `modal-${data.item.id}`
                                            )
                                        "
                                    >
                                        Отменить
                                    </b-button>

                                    <b-button
                                        variant="success btn-sm"
                                        @click="
                                            deactivateEntry(
                                                data.item.id,
                                                data.item.active
                                            )
                                        "
                                    >
                                        Активировать
                                    </b-button>
                                </template>
                            </b-modal>
                        </div>
                    </div>
                </template>
            </b-table>
        </b-col>
    </b-row>
</template>

<script>
import Ripple from "vue-ripple-directive";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

import Companies from "@/services/companies";
import permissionComputeds from "@/util/permissionComputeds";
import {
    BRow,
    BCol,
    BFormGroup,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BTable,
    BPagination,
    BSpinner,
    BFormSelect,
} from "bootstrap-vue";

const api = new Companies();

export default {
    name: "Index",
    components: {
        BRow,
        BCol,
        BButton,
        BTable,
        BSpinner,
        ToastificationContent,
    },
    directives: {
        Ripple,
    },
    data() {
        return {
            apiEntry: "companies",
            items: [],
            loading: false,
            fields: [
                {
                    key: "id",
                    label: "ID",
                },
                {
                    key: "name",
                    label: "Название",
                },
                {
                    key: "image",
                    label: "Лого",
                },
            ],
        };
    },
    async mounted() {
        await this.loadItems();
        if (this.isDeleteAvailable || this.isUpdateAvailable)
            this.fields.push({
                key: "action",
                label: "",
            });
    },
    computed: { ...permissionComputeds("company") },
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
        deactivateEntry(id, active) {
            api.deactivate(id)
                .then(() => {
                    this.loadItems();
                    if (active === 1) {
                        this.showToast(
                            "success",
                            "Деактивация прошла успешно!",
                            "CheckIcon"
                        );
                    } else {
                        this.showToast(
                            "success",
                            "Активация прошла успешно!",
                            "CheckIcon"
                        );
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.showToast("danger", "Что-то пошло не так!", "XIcon");
                });
        },
        async loadItems() {
            this.loading = true;
            await api
                .fetchAll()
                .then((res) => {
                    this.items = res.data;
                })
                .finally(() => (this.loading = false));
        },
    },
};
</script>

<style scoped></style>
