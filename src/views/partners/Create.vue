<template>
    <b-row>
        <b-col cols="12">
            <h2>Добавить</h2>
        </b-col>

        <b-col cols="12">
            <b-card>
                <ValidationObserver ref="validation-observer">
                    <b-col cols="12" class="px-1">
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
                </ValidationObserver>

                <b-button
                    :disabled="isSaving"
                    class="btn-success float-right mt-2 mr-1"
                    @click="create()"
                >
                    Сохранить
                </b-button>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
import Partners from "@/services/partners";
import Ripple from "vue-ripple-directive";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
    BRow,
    BFormGroup,
    BFormInput,
    BButton,
    BCard,
    BCol,
    BTable,
    BFormCheckbox,
    BFormCheckboxGroup,
    BFormSelect,
    BCardText,
} from "bootstrap-vue";

const api = new Partners();

export default {
    name: "Create",
    components: {
        BRow,
        BFormGroup,
        BFormInput,
        BButton,
        BCard,
        BCol,
        BTable,
        BFormCheckbox,
        BFormCheckboxGroup,
        BFormSelect,
        BCardText,
        ToastificationContent,
    },
    directives: {
        Ripple,
    },
    data() {
        return {
            isSaving: false,
            item: {},
            fileRecords: [],
            uploadUrl: "",
            uploadHeaders: { "X-Test-Header": "vue-file-agent" },
            fileRecordsForUpload: [], // maintain an upload queue
        };
    },

    methods: {
        create() {
            const isValid = this.$refs["validation-observer"].validate();
            if (isValid) {
                this.isSaving = true;
                const formData = new FormData();

                formData.append("image", this.fileRecords[0].file);

                api.create(formData)
                    .then(() => {
                        this.$router.push({ name: "partner-index" });
                        this.showToast(
                            "success",
                            "Успешно добавлено!",
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
