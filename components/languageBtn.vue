<template>
    <div class="component-lang">
        <button id="divToHide" class="btn-language " @click="clickSelect()">
            <div class="w-selected" v-if="Language == 'en'">
                <div class="left">
                    <template v-if="$i18n.locale == 'th'">
                        <img class="img-money" src="~/assets/images/th.svg" />
                        ไทย
                    </template>
                    <template v-if="$i18n.locale == 'en'">
                        <img class="img-money" src="~/assets/images/en.svg" />
                        English
                    </template>
                    <!-- <template v-if="$i18n.locale == 'cn'">
                        <img class="img-money" src="~/assets/images/cn.svg" />
                        Chinese
                    </template> -->
                </div>
                <div class="right">
                    <font-awesome-icon class="img-arrow" :icon="['fa', 'angle-down']"></font-awesome-icon>
                </div>
            </div>
        </button>
        <transition name="slide-fade">
            <div class="frame-lang" v-if="langSelect == true">
                <nuxt-link :to="switchLocalePath('en')" :class="$i18n.locale == 'en' ? 'bd-box-active' : ''" class="border-box"> <img class="img-money" src="~/assets/images/en.svg" alt="" />English </nuxt-link>
                <nuxt-link :to="switchLocalePath('th')" :class="$i18n.locale == 'th' ? 'bd-box' : ''" class="border-box"> <img class="img-money" src="~/assets/images/th.svg" alt="" />ไทย </nuxt-link>
                <!-- <nuxt-link :to="switchLocalePath('cn')" :class="$i18n.locale == 'cn' ? 'bd-box-active' : ''" class="border-box"> <img class="img-money" src="~/assets/images/cn.svg" alt="" />Chinese </nuxt-link> -->
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            langSelect: false,
            Language: "en",
        };
    },
    mounted() {
        self = this;
        document.onclick = function (e) {
            if (e.target.id !== "divToHide") {
                if (self.langSelect == true) {
                    self.langSelect = false;
                }
            }
        };
    },
    methods: {
        clickSelect() {
            if (this.langSelect == true) {
                this.langSelect = false;
            } else {
                this.langSelect = true;
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
