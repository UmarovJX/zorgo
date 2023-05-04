<template>
    <div>
        <AppCategoryEdit/>
    </div>
</template>

<script>
import AppCategoryEdit from "@/components/marketplace/category/AppCategoryEdit.vue";

export default {
    name: "AppCategoriesCrud",
    components: { AppCategoryEdit },

    methods: {
        splitRoute(item) {
            return item.split("-")[1];
        },
    },
};
</script>

<style lang="scss" scoped></style>
