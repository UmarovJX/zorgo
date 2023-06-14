<template>
    <b-row>
        <b-col md="12" class="d-flex justify-content-between mb-1">
            <h2>Партнеры</h2>

            <router-link
                :to="{ name: 'partner-create' }"
                v-if="isCreateAvailable"
            >
                <b-button
                    target="_blank"
                    variant="success"
                    class="btn-icon d-flex align-items-center"
                >
                    <span style="padding-right: 4px">Добавить</span>
                    <feather-icon
                        size="18"
                        icon="PlusCircleIcon"
                        style="padding-left: 4px"
                    />
                </b-button>
            </router-link>
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
                <template #cell(active)="data">
                    {{ data.item.active ? "Активен" : "Не активен" }}
                </template>
                <template #cell(action)="data">
                    <div class="float-right">
                        <router-link
                            v-if="isUpdateAvailable"
                            :to="{
                                name: 'partner-update',
                                params: { id: data.item.id },
                            }"
                        >
                            <b-button
                                variant="warning"
                                size="small"
                                class="btn-icon mr-1"
                            >
                                <feather-icon icon="EditIcon"></feather-icon>
                            </b-button>
                        </router-link>
                        <!--  DEACTIVATE  -->
                        <b-button
                            v-if="data.item.active && isDeleteAvailable"
                            v-b-modal="`modal-${data.item.id}-deactivate`"
                            variant="danger"
                            size="small"
                            class="btn-icon"
                        >
                            <feather-icon icon="MinusCircleIcon" />
                        </b-button>

                        <!-- DEACTIVATE MODAL -->
                        <b-modal
                            v-if="data.item.active"
                            :id="`modal-${data.item.id}-deactivate`"
                            cancel-title="Отменить"
                            cancel-variant="danger btn-sm"
                            body-class="deactivate-btn_modal"
                            title="Деактивация"
                            hide-header-close
                            centered
                        >
                            Вы действительно хотите деактивировать эту Компанию?

                            <template #modal-footer>
                                <b-button
                                    variant="danger btn-sm"
                                    @click="
                                        $bvModal.hide(
                                            `modal-${data.item.id}-deactivate`
                                        )
                                    "
                                >
                                    Отменить
                                </b-button>

                                <b-button
                                    variant="success btn-sm"
                                    @click="
                                        deactivate(
                                            data.item.id,
                                            data.item.active
                                        )
                                    "
                                >
                                    Деактивировать
                                </b-button>
                            </template>
                        </b-modal>

                        <!--  ACTIVATE  -->
                        <b-button
                            v-if="!data.item.active && isDeleteAvailable"
                            v-b-modal="`modal-${data.item.id}`"
                            variant="outline-info"
                            size="small"
                            class="btn-icon"
                        >
                            <feather-icon icon="CornerUpLeftIcon" />
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
                            Вы действительно хотите активировать эту Компанию?

                            <template #modal-footer>
                                <b-button
                                    variant="danger btn-sm"
                                    @click="
                                        $bvModal.hide(`modal-${data.item.id}`)
                                    "
                                >
                                    Отменить
                                </b-button>

                                <b-button
                                    variant="success btn-sm"
                                    @click="
                                        deactivate(
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
                </template>
            </b-table>
        </b-col>
    </b-row>
</template>

<script>
import Partners from "@/services/partners";
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

const api = new Partners();

export default {
    name: "Index",
    components: {
        BRow,
        BCol,
        BButton,
        BTable,
        BSpinner,
    },
    data() {
        return {
            items: [],
            loading: false,
            fields: [
                {
                    key: "id",
                    label: "ID",
                },
                {
                    key: "image",
                    label: "Лого",
                },
                {
                    key: "active",
                    label: "Статус",
                },
                {
                    key: "action",
                    label: "",
                },
            ],
        };
    },
    async mounted() {
        await this.loadItems();
    },
    computed: {
        ...permissionComputeds("partner"),
    },
    methods: {
        async loadItems() {
            this.loading = true;
            await api
                .fetchAll()
                .then((res) => {
                    this.items = res.data;
                })
                .finally(() => (this.loading = false));
        },
        deactivate(id, active) {
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
    },
};
</script>

<style scoped></style>
