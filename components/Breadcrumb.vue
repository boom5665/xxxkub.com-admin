<template>
    <div class="Breadcrumb marginNav" :class="$store.state.shownav != true ? 'miniNav' : ''">
        <div class="subTitle">{{ $t($store.state.subtitle) }}/</div>
        <div class="title">{{ $t($store.state.title) }}</div>
    </div>
</template>
<script>
export default {
    name: "Breadcrumb",

    data() {
        return {
            shownav: "",
        };
    },
};
</script>
