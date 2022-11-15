<template>
    <button class="btn btn_search" @click="refresh_page()">
        <div v-show="checkReload == true" class="icon_loader"></div>
        <font-awesome-icon v-show="checkReload == false" :icon="['fa', icon_btn]"></font-awesome-icon>
        <span>({{ timerCount }})</span>
        <span class="btn_font">{{ text_btn }}</span>
    </button>
</template>

<script>
export default {
    props: ["text_btn", "icon_btn"],
    data() {
        return {
            timerCount: 60,
            checkReload: true,
        };
    },
    created() {
        setTimeout(() => {
            this.checkReload = false;
            this.countDownTimer();
        }, 1000);
    },
    mounted() {},
    methods: {
        countDownTimer() {
            if (this.timerCount > 0) {
                setTimeout(() => {
                    this.timerCount -= 1;
                    this.countDownTimer();
                }, 1000);
            } else if (this.timerCount == 0) {
                this.timerCount = 60;
                this.countDownTimer();
                this.refresh_page();
            }
        },
        refresh_page() {
            this.checkReload = true;
            setTimeout(() => {
                this.checkReload = false;
                this.$emit("refresh_status");
                this.timerCount = 60;
            }, 1000);
        },
    },
};
</script>
