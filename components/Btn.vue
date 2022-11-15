<template>
    <button class="btn btn_search" :class="class_btn">
        <font-awesome-icon v-if="icon_btn != undefined" :icon="['fa', icon_btn]"></font-awesome-icon>
        <span class="btn_font">{{ text_btn }}</span>
    </button>
</template>

<script>
export default {
    props: ["text_btn", "class_btn", "icon_btn"],
    data() {
        return {};
    },
    watch: {},
    mounted() {},
    methods: {},
};
</script>