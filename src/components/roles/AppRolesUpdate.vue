<template>
    <div>
        <!--  ROLE NAME  -->
        <b-card>
            <ValidationObserver ref="validation-observer">
                <div class="d-flex flex-wrap">
                    <div class="col-12 d-flex flex-wrap p-0">
                        <!--   NAME   -->
                        <b-col cols="12" class="p-0">
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
                                        placeholder="Название"
                                    />
                                </b-form-group>
                                <span class="validation__red">{{
                                    errors[0]
                                }}</span>
                            </ValidationProvider>
                        </b-col>
                    </div>
                </div>
            </ValidationObserver>
        </b-card>

        <!--  PERMISSIONS  -->
        <b-card>
            <template>
                <div>
                    <!-- TABLE -->
                    <b-table
                        striped
                        responsive
                        sort-icon-left
                        thead-class="hidden_header"
                        :busy="isBusy"
                        :items="sortedItems"
                        :fields="fields"
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                        :sort-direction="sortDirection"
                        :filter="filter"
                        :filter-included-fields="filterOn"
                    >
                        <template #table-busy>
                            <div class="text-center text-primary my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong class="ml-1">Идет загрузка ...</strong>
                            </div>
                        </template>

                        <template #cell(type)="data">
                            <span>{{
                                translatePermissions(data.item.type)
                            }}</span>
                        </template>

                        <template #cell(all)="data">
                            <div class="pm-row-all">
                                <template v-if="data.item.header">
                                    <b>{{ data.item.header }}</b>
                                </template>
                                <template v-for="item in data.item.permissions">
                                    <div class="pm-row-one">
                                        <b-form-checkbox
                                            v-if="item.type"
                                            v-model="item.active"
                                            @change="switchAll(item)"
                                        >
                                            <span>{{
                                                slugName(item.slug)
                                            }}</span>
                                        </b-form-checkbox>
                                    </div>
                                </template>
                                <b-form-checkbox-group
                                    class="pm-row-perm"
                                    v-model="selected"
                                >
                                    <template
                                        v-for="item in data.item.permissions"
                                    >
                                        <b-form-checkbox
                                            v-if="!item.type"
                                            :value="item.id"
                                        >
                                            <span>{{
                                                slugName(item.slug)
                                            }}</span>
                                        </b-form-checkbox>
                                    </template>
                                </b-form-checkbox-group>
                            </div>
                        </template>
                    </b-table>
                </div>
            </template>

            <b-button class="btn-success float-right mt-2" @click="updateRole">
                Сохранить
            </b-button>
        </b-card>
    </div>
</template>

<script>
import slugTranslations from "@/util/slugTranslations";
import sortPermissionsComputed from "@/util/sortPermissions";

import api from "@/services/api";
import Ripple from "vue-ripple-directive";
import { VueGoodTable } from "vue-good-table";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
    BAvatar,
    BBadge,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdownItem,
    BButton,
    BDropdown,
    BCard,
    BCol,
    BTable,
    BFormCheckbox,
    BFormCheckboxGroup,
    BSpinner,
} from "bootstrap-vue";

export default {
    name: "AppRolesUpdate",
    components: {
        BCard,
        BCol,
        BFormGroup,
        BFormInput,
        VueGoodTable,
        BAvatar,
        BBadge,
        BPagination,
        BFormSelect,
        BDropdownItem,
        BDropdown,
        BTable,
        BFormCheckbox,
        BFormCheckboxGroup,
        BButton,
        BSpinner,
        ToastificationContent,
    },
    directives: {
        Ripple,
    },
    data() {
        return {
            name: "",
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
            fields: [
                {
                    key: "type",
                    label: "Разрешение",
                },
                {
                    key: "all",
                    label: " ",
                },
            ],
            items: [],
            selected: [],
            slugTranslations,
        };
    },
    computed: {
        ...sortPermissionsComputed,
    },

    async mounted() {
        await this.getPermissionsByGroup();
        await this.fetchOneRole();
        this.checkActiveAll();
    },

    watch: {
        selected: {
            immediate: true,
            handler() {
                this.checkActiveAll();
            },
        },
    },

    methods: {
        async fetchOneRole() {
            const { id } = this.$route.params;
            this.isBusy = true;
            await api.roles
                .fetchOneRole(id)
                .then((res) => {
                    this.selected = res.data.permissions.map((item) => {
                        return item.id;
                    });
                    this.name = res.data.name;
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    this.isBusy = false;
                });
        },

        async getPermissionsByGroup() {
            await api.permissions
                .fetchPermissionsByGroup()
                .then((res) => {
                    this.items = res.data;
                    this.items.forEach((item, index) => {
                        const ids = item.permissions.map((perm) => perm.id);
                        this.items[index].permissions.unshift({
                            slug: "all",
                            type: item.type,
                            id: ids,
                            active: false,
                        });
                        this.items[index].permissions = item.permissions.map(
                            (permission) => {
                                return { ...permission, active: false };
                            }
                        );
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        checkActiveAll() {
            this.items.forEach((item) => {
                if (item.permissions[0].slug === "all") {
                    let checkList = [];
                    item.permissions[0].id.forEach((item) => {
                        this.selected.indexOf(item) !== -1
                            ? checkList.push(true)
                            : checkList.push(false);
                    });
                    checkList.every((item) => item === true)
                        ? (item.permissions[0].active = true)
                        : (item.permissions[0].active = false);
                }
            });
        },

        switchAll(event) {
            if (event.active) {
                event.id.forEach((item) => {
                    if (!this.selected.includes(item)) {
                        this.selected.push(item);
                    }
                });
            } else {
                event.id.forEach((item) => {
                    const id = this.selected.indexOf(item);
                    if (id !== -1) {
                        this.selected.splice(id, 1);
                    }
                });
            }
        },

        slugName(slug) {
            if (slug) {
                switch (slug.split("-")[0]) {
                    case "all":
                        return "Все";
                    case "show":
                        return "Просмотр";
                    case "create":
                        return "Создание";
                    case "update":
                        return "Изменение";
                    case "delete":
                        return "Удаление";
                }
            }
        },

        translatePermissions(item) {
            const val = this.slugTranslations[item];

            return val;
        },

        async updateRole() {
            const isValid = await this.$refs["validation-observer"].validate();
            if (isValid) {
                const { id } = this.$route.params;
                const { name, selected } = this;
                const data = {
                    name,
                    permissions: selected,
                };

                console.log(JSON.stringify(data));
                api.roles
                    .updateRole(id, data)
                    .then(() => {
                        this.$router.push({ name: "roles" });
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
.red__error {
    color: red;
}

.pm-row-all {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0;
    grid-row-gap: 0;

    & .pm-row-one {
        grid-area: 1/1/2/2;

        ::v-deep .custom-checkbox {
            min-width: 120px;
            padding: 0;

            & .custom-control-label {
                padding-left: 1.8rem;
            }
        }
    }

    & .pm-row-perm {
        width: 100%;
        grid-area: 1/2/2/6;

        ::v-deep .custom-checkbox {
            min-width: 120px;
            width: 25%;
            padding: 0;
            margin: 0;

            & .custom-control-label {
                padding-left: 1.8rem;
            }
        }
    }
}
</style>

<style>
/*.hidden_header {*/
/*  display: none;*/
/*}*/
</style>
