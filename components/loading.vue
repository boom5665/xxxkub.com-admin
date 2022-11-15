<template>
    <div id="loading" v-show="$store.state.loading == true">
        <div class="loading_filter">
            <div class="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <!-- <img src="~assets/images/loading.svg" alt=""> -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {},
};
</script>