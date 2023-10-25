<template>
  <b-row>
    <b-col cols="12">
      <h2>Редактировать</h2>
    </b-col>

    <b-col cols="12">
      <b-card>
        <ValidationObserver ref="validation-observer">
          <b-col cols="12" class="px-1">
            <ValidationProvider
              name="Название"
              rules="required"
              v-slot="{ errors }"
            >
              <b-form-group label="Название" label-for="name">
                <b-form-input
                  v-model="company.name"
                  id="name"
                  size="md"
                  placeholder="Введите"
                />
              </b-form-group>
              <p v-if="errors" class="validation__red">
                {{ errors[0] }}
              </p>
            </ValidationProvider>
            <ValidationProvider
              name="Порядок"
              rules="required"
              v-slot="{ errors }"
            >
              <b-form-group label="Порядок" label-for="order">
                <b-form-input
                  v-model="company.order"
                  id="order"
                  size="md"
                  placeholder="Введите"
                />
              </b-form-group>
              <p v-if="errors" class="validation__red">
                {{ errors[0] }}
              </p>
            </ValidationProvider>
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
            <div>
              <b-card-text class="mb-0"
                >До 5 человек для города Ташкент и Ташкентской
                области</b-card-text
              >
              <b-form-checkbox
                v-model="company.driver_limit"
                class="custom-control-primary"
                name="check-button"
                switch
              />
            </div>
          </b-col>
          <b-col cols="12" class="px-1"> </b-col>

          <b-col cols="12" class="px-1 mt-1">
            <b-form-group label="Услуги">
              <b-row>
                <b-col cols="12" md="6">
                  <b-form-group label="Осаго">
                    <b-form-checkbox
                      v-model="services.osago.available"
                      class="custom-control-primary"
                      name="check-button"
                      switch
                      >Доступен</b-form-checkbox
                    >
                    <b-form-checkbox
                      v-model="services.osago.driver_limit"
                      class="custom-control-primary"
                      name="check-button"
                      switch
                      >До 5 человек для города Ташкент и Ташкентской
                      области</b-form-checkbox
                    >
                    <b-form-checkbox
                      v-model="services.osago.driver_limit_for_regions"
                      class="custom-control-primary"
                      name="check-button"
                      switch
                      >До 5 человек для регионов</b-form-checkbox
                    >
                    <b-form-checkbox
                      v-model="services.osago.doc_insurance"
                      class="custom-control-primary"
                      name="check-button"
                      switch
                      >doc_insurance</b-form-checkbox
                    >
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                  <b-form-group label="Путешествия">
                    <b-form-checkbox
                      v-model="services.travel.available"
                      class="custom-control-primary"
                      name="check-button"
                      switch
                      >Доступен</b-form-checkbox
                    >
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
        </ValidationObserver>

        <b-button class="btn-success float-right mt-2 mr-1" @click="update()">
          Сохранить
        </b-button>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import Companies from "@/services/companies";
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

const api = new Companies();

export default {
  name: "Update",
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
      company: {},
      services: {
        osago: {},
        travel: {},
      },
      image: [],
      fileRecords: [],
      uploadUrl: "",
      uploadHeaders: { "X-Test-Header": "vue-file-agent" },
      fileRecordsForUpload: [], // maintain an upload queue
    };
  },

  async mounted() {
    await this.loadCompany();
  },

  methods: {
    async loadCompany() {
      api
        .fetch(this.$route.params.id)
        .then((res) => {
          this.company = res.data;
          this.fileRecords = [
            {
              name: "image.jpg",
              size: 0,
              type: "image/jpg",
              url: res.data.image,
              src: res.data.image,
            },
          ];

          res.data.services.forEach((el) => {
            this.services[el.name].available = el.active;
            Object.keys(el.options).forEach((key) => {
              this.services[el.name][key] = el.options[key];
            });
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },

    update() {
      const isValid = this.$refs["validation-observer"].validate();
      if (isValid) {
        const { id } = this.$route.params;
        const formData = new FormData();

        formData.append("name", this.company.name);
        formData.append("order", this.company.order);
        formData.append("driver_limit", +this.company.driver_limit);
        if (this.fileRecords[0].file)
          formData.append("image", this.fileRecords[0].file);

        formData.append("services[0][name]", "osago");
        formData.append("services[0][active]", +this.services.osago.available);
        formData.append(
          "services[0][options][driver_limit]",
          +this.services.osago.driver_limit
        );
        formData.append(
          "services[0][options][driver_limit_for_regions]",
          +this.services.osago.driver_limit_for_regions
        );
        formData.append(
          "services[0][options][doc_insurance]",
          +this.services.osago.doc_insurance
        );
        formData.append("services[1][name]", "travel");
        formData.append("services[1][active]", +this.services.travel.available);

        api
          .update(id, formData)
          .then(() => {
            this.$router.push({ name: "company-index" });
            this.showToast("success", "Успешно изменено!", "CheckIcon");
          })
          .catch((error) => {
            console.error(error);
            this.showToast("danger", "Что-то пошло не так!", "XIcon");
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
