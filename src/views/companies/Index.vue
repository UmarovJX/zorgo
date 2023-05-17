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
                    <div class="float-right">
                        <router-link
                            :to="{
                                name: 'company-update',
                                params: { id: data.item.id },
                            }"
                        >
                            <b-button
                                variant="success"
                                size="sm"
                                class="btn-icon"
                            >
                                <feather-icon icon="Edit2Icon"></feather-icon>
                            </b-button>
                        </router-link>
                    </div>
                </template>
            </b-table>
        </b-col>
    </b-row>
</template>

<script>
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
