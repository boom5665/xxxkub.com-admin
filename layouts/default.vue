<template>
    <div>
        <Loading />
        <Header></Header>
        <div style="margin-top: 70px">
            <Navbar></Navbar>
            <Breadcrumb />
            <div class="container-scoll marginNav" :class="$store.state.shownav != true ? 'miniNav' : ''">
                <div class="container-main">
                    <Nuxt />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Loading from "~/components/loading.vue";
export default {
    name: "index",
    data() {
        return {
            shownav: "",
        };
    },
    methods: {},
    components: { Loading },
    mounted() {},
};
</script>
