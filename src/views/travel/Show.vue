<template>
    <b-row>
        <b-col md="12" class="d-flex justify-content-between mb-1">
            <h2>Путешествие #{{ policy.id }}</h2>

            <b-button
                v-if="policy.policy.contract_url"
                :href="policy.policy.contract_url"
                target="_blank"
                variant="success"
                class="btn-icon d-flex align-items-center"
            >
                <span style="padding-right: 4px">Скачать договор</span>
                <feather-icon
                    size="18"
                    icon="DownloadCloudIcon"
                    style="padding-left: 4px"
                />
            </b-button>
        </b-col>
        <b-col md="9" sm="12">
            <b-card>
                <div class="row">
                    <b-col md="9" sm="12">
                        <b-card-title>Полис</b-card-title>
                        <table class="row">
                            <tbody class="col-md-4 col-sm-12">
                                <tr>
                                    <th class="pr-1">Номер анкеты:</th>
                                    <td>{{ policy.policy.anketa_id }}</td>
                                </tr>
                                <tr>
                                    <th class="pr-1">Серия:</th>
                                    <td>{{ policy.policy.number }}</td>
                                </tr>
                                <tr>
                                    <th class="pr-1">Стоимость:</th>
                                    <td>{{ policy.price | formatNumber }}</td>
                                </tr>
                                <tr>
                                    <th class="pr-1">Сумма страхования:</th>
                                    <td>
                                        {{
                                            policy.insurance_sum
                                                | formatNumber("евро")
                                        }}
                                    </td>
                                </tr>
                                <tr>
                                    <th class="pr-1">Программа:</th>
                                    <td>{{ policy.program.name }}</td>
                                </tr>
                                <tr>
                                    <th class="pr-1">Тип:</th>
                                    <td>{{ groupType }}</td>
                                </tr>
                            </tbody>
                            <tbody class="col-md-4 col-sm-12">
                                <tr>
                                    <th class="pr-1">Цель поездки:</th>
                                    <td>{{ policy.activity }}</td>
                                </tr>
                                <tr>
                                    <th class="pr-1">Страны:</th>
                                    <td>{{ policy.countries }}</td>
                                </tr>
                            </tbody>
                            <tbody class="col-md-4 col-sm-12">
                                <tr>
                                    <th class="pr-1">Дата начало:</th>
                                    <td>{{ policy.date_begin }}</td>
                                </tr>
                                <tr>
                                    <th class="pr-1">Дата окончание:</th>
                                    <td>{{ policy.date_end }}</td>
                                </tr>
                                <tr>
                                    <th class="pr-1">Дата создания:</th>
                                    <td>{{ policy.created_at }}</td>
                                </tr>
                                <tr>
                                    <th class="pr-1">Статус:</th>
                                    <td
                                        v-if="
                                            policy.status === 3 ||
                                            policy.status === 7
                                        "
                                        class="text-danger"
                                    >
                                        {{ getStatus() }}
                                    </td>
                                    <td v-else class="text-success">
                                        {{ getStatus() }}
                                    </td>
                                </tr>
                                <tr>
                                    <th class="pr-1">Платформа</th>
                                    <td>{{ platformValue }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </b-col>
                    <b-col md="3" sm="12" class="d-flex justify-content-center">
                        <div class="text-center">
                            <img
                                :src="policy.company.image"
                                alt=""
                                width="150"
                            />
                            <p>{{ policy.company.name }}</p>
                        </div>
                    </b-col>
                </div>
            </b-card>
        </b-col>

        <b-col md="3" sm="12">
            <b-card>
                <b-card-title>Заявитель</b-card-title>
                <table>
                    <tbody>
                        <tr>
                            <th class="pr-1">Номер телефона:</th>
                            <td>
                                <a :href="`tel:${policy.applicant.phone}`">{{
                                    policy.applicant.phone
                                }}</a>
                            </td>
                        </tr>
                        <tr>
                            <th class="pr-1">Фамилия и имя:</th>
                            <td>{{ policy.applicant.name }}</td>
                        </tr>
                        <tr>
                            <th class="pr-1">Дата рождения:</th>
                            <td>{{ policy.applicant.birthdate }}</td>
                        </tr>
                        <tr>
                            <th class="pr-1">Серия и номер паспорта:</th>
                            <td>{{ policy.applicant.passport }}</td>
                        </tr>
                    </tbody>
                </table>
            </b-card>
        </b-col>
        <b-col md="3" sm="12" v-for="(person, index) in policy.persons">
            <b-card>
                <b-card-title>Путешественник #{{ index + 1 }}</b-card-title>
                <table>
                    <tbody>
                        <tr>
                            <th class="pr-1">Фамилия и имя:</th>
                            <td>{{ person.name }}</td>
                        </tr>
                        <tr>
                            <th class="pr-1">Дата рождения:</th>
                            <td>{{ person.birthdate }}</td>
                        </tr>
                        <tr>
                            <th class="pr-1">Серия и номер паспорта:</th>
                            <td>{{ person.passport }}</td>
                        </tr>
                    </tbody>
                </table>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
import Travel from "@/services/travels";
import {
    BRow,
    BCol,
    BCard,
    BCardTitle,
    BCardBody,
    BButton,
} from "bootstrap-vue";

const api = new Travel();

export default {
    name: "Show",
    components: {
        BRow,
        BCol,
        BCard,
        BCardTitle,
        BCardBody,
        BButton,
    },
    computed: {
        groupType() {
            return this.policy.group_id ? "Семейниый" : "Индувидуальный";
        },
    },
    data() {
        return {
            policy: {},
        };
    },
    async mounted() {
        await this.loadPolicy();
    },
    computed: {
        platformValue() {
            if (this.policy.platform === "browser") return "Сайт";
            if (this.policy.platform === "mobile")
                return "Мобильное приложение";
            else return "";
        },
    },
    methods: {
        async loadPolicy() {
            await api.fetchPolicy(this.$route.params.id).then((res) => {
                this.policy = res.data;
            });
        },
        driverLicense(driver) {
            return driver.license_series + driver.license_number;
        },

        getStatus() {
            if (this.policy.status === 2 && this.policy.payment_status) {
                return "Выдан";
            }
            return "Отменен";
        },
    },
};
</script>

<style scoped></style>
