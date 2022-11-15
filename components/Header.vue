<template>
    <div class="container-header">
        <div class="header-left">
            <img style="max-height: 90%" :src="image" alt="" />
        </div>
        <div class="header-right line-border">
            <div class="right-header-left">
                <button class="btn-header-currency">
                    <!-- <font-awesome-icon class="img-money"></font-awesome-icon> -->
                    <!-- ดูหนัง -->
                    <!-- <font-awesome-icon class="img-arrow" :icon="['fa', 'angle-down']"></font-awesome-icon>
                    <div class="w-currency">
                        <div class="bg-currency">
                            <div>989 USD</div>
                            <div>89,500 CNY</div>
                            <div>577,030,000 EUR</div>
                            <div>892,788,778 THB</div>
                            <div>578,140,000 GBP</div>
                            <div>578,778,889 KHR (:1000)</div>
                        </div>
                    </div> -->
                </button>
                <div class="line-border"></div>
            </div>
            <div class="right-header-right">
                <LanguageBtn></LanguageBtn>
                <!-- <button id="divToHide" class="btn-header mg-btn" @click="clickSelect()">
                    <div class="w-selected" v-if="Language == 'th'">
                        <div v-if="$i18n.locale == 'th'">
                            <img class="img-money" src="~/assets/images/th.svg" />
                        </div>
                        <div v-if="$i18n.locale == 'th'">ไทย</div>
                        <div v-if="$i18n.locale == 'en'">
                            <img class="img-money" src="~/assets/images/en.svg" />
                        </div>
                        <div v-if="$i18n.locale == 'en'">English</div>
                        <div v-if="$i18n.locale == 'cn'">
                            <img class="img-money" src="~/assets/images/cn.svg" />
                        </div>
                        <div v-if="$i18n.locale == 'cn'">Chinese</div>
                        <font-awesome-icon class="img-arrow" :icon="['fa', 'angle-down']"></font-awesome-icon>
                    </div>
                </button> -->
                <!-- <transition name="slide-fade">
                    <div class="frame-lang" v-if="langSelect == true">
                        <nuxt-link :to="switchLocalePath('en')" :class="$i18n.locale == 'en' ? 'bd-box-active' : ''" class="border-box"> <img class="img-money" src="~/assets/images/en.svg" alt="" />English </nuxt-link>
                        <nuxt-link :to="switchLocalePath('th')" :class="$i18n.locale == 'th' ? 'bd-box-active' : ''" class="border-box"> <img class="img-money" src="~/assets/images/th.svg" alt="" />ไทย </nuxt-link>
                        <nuxt-link :to="switchLocalePath('cn')" :class="$i18n.locale == 'cn' ? 'bd-box-active' : ''" class="border-box"> <img class="img-money" src="~/assets/images/cn.svg" alt="" />Chinese </nuxt-link>
                    </div>
                </transition> -->
                <!-- <button class="btn-header">
                    <font-awesome-icon class="img-money" :icon="['fa', 'mobile-button']"></font-awesome-icon>
                    {{ $t("header.version") }}
                </button> -->
                <div class="short-line-border"></div>
                <button class="btn-header mg-btn">
                    <font-awesome-icon class="img-money" :icon="['fas', 'circle-user']"></font-awesome-icon>
                    {{ Username }}
                </button>
                <button class="btn-header" @click="logout()">
                    <font-awesome-icon class="img-money" :icon="['fas', 'arrow-right-from-bracket']"></font-awesome-icon>
                    {{ $t("header.logout") }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import language from "./languageBtn.vue";

export default {
    data() {
        return {
            Username: this.$cookies.get("username"),
            image: "",
        };
    },
    mounted() {
        this.get_data();
    },
    methods: {
        get_data() {
            this.$axios
                .$post("api/v1/manage-get-detail-setting")
                .then((response) => {
                    this.image = response.result.logo;

                    this.$cookies.set("package", response.result.package, 60 * (60 * 1000));
                    this.$cookies.set("configother", response.result.configother, 60 * (60 * 1000));
                    this.$cookies.set("authen", response.result.authentication, 60 * (60 * 1000));

                    // เก็บ Token ใน Store
                    this.$store.commit("setPackage", { package: response.result.package });
                    this.$store.commit("setConfigOther", { configother: response.result.configother });
                    this.$store.commit("setAuthen", { authen: response.result.authentication });
                })

                .catch((error) => {
                    console.log(error);
                });
        },
        logout() {
            this.$cookies.remove("username");
            this.$cookies.remove("token");
            this.$cookies.remove("package");
            this.$cookies.remove("configother");
            this.$cookies.remove("authen");
            this.$nextTick(function () {
                this.$router.push("/");
            });
        },
    },
};
</script>
