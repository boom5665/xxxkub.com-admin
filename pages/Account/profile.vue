<template>
    <div>
        <div class="container-profile">
            <div class="user-left">
                <div class="user-field">
                    <div class="label-font-user">{{ $t("username") }}</div>
                    <div class="label-user">company@testamb</div>
                </div>
                <div class="pass-field">
                    <div class="btn-pass">
                        <font-awesome-icon class="img-pass" :icon="['fa', 'lock']"></font-awesome-icon>
                        <div id="myBtn" class="bg-label-pass" @click="modalClick()">{{ $t("change_password") }}</div>
                    </div>

                    <div id="myModal" class="modal" v-if="openModal == true" @click="closeModal">
                        <!-- Modal content -->
                        <div id="modalPass" class="modal-content modal-changePassword">
                            <div class="font-change">{{ $t("change_password") }}</div>
                            <div class="mg-modal">
                                <div class="font-label-modal">{{ $t("change_password") }}</div>
                                <div class="relative-input">
                                    <font-awesome-icon class="img-lock" :icon="['fa', 'lock']"></font-awesome-icon>
                                    <input @keyup.13="chkChangeAllPassword" :type="OldPasswordType" class="input-modal" :class="chkOldPassInvalid ? 'invalid-border' : ''" v-model="OldPassword"/>
                                    <div class="bg-icon" @click="ShowPassword(1)">
                                        <font-awesome-icon class="img-eye" v-if="OldPasswordType == 'text'" :icon="['fa', 'eye-slash']"></font-awesome-icon>
                                        <font-awesome-icon class="img-eye" v-else :icon="['fa', 'eye']"></font-awesome-icon>
                                    </div>
                                    <div class="div-warning" v-if="chkOldPassInvalid">
                                        <font-awesome-icon class="img-warning" :icon="['fa', 'circle-exclamation']"></font-awesome-icon>
                                        <div>{{ $t("warn_password_now") }}</div>
                                    </div>
                                </div>
                                <div class="font-label-modal">{{ $t("password_new") }}</div>
                                <div class="relative-input">
                                    <font-awesome-icon class="img-lock" :icon="['fa', 'lock']"></font-awesome-icon>
                                    <input @keyup.13="chkChangeAllPassword" :type="NewPasswordType" class="input-modal" :class="chkNewPassInvalid ? 'invalid-border' : ''" v-model="NewPassword" />
                                    <div class="bg-icon" @click="ShowPassword(2)">
                                        <font-awesome-icon class="img-eye" v-if="NewPasswordType == 'text'" :icon="['fa', 'eye-slash']"></font-awesome-icon>
                                        <font-awesome-icon class="img-eye" v-else :icon="['fa', 'eye']"></font-awesome-icon>
                                    </div>
                                    <div class="div-warning" v-if="chkNewPassInvalid">
                                        <font-awesome-icon class="img-warning" :icon="['fa', 'circle-exclamation']"></font-awesome-icon>
                                        <div>{{ $t("warn_password_new") }}</div>
                                    </div>
                                </div>
                                <div class="font-label-modal">{{ $t("password_confirm") }}</div>
                                <div class="relative-input">
                                    <font-awesome-icon class="img-lock" :icon="['fa', 'lock']"></font-awesome-icon>
                                    <input @keyup.13="chkChangeAllPassword" :type="ConfirmPasswordType" class="input-modal" :class="chkConfirmPassInvalid ? 'invalid-border' : ''" v-model="ConfirmPassword" />
                                    <div class="bg-icon" @click="ShowPassword(3)">
                                        <font-awesome-icon class="img-eye" v-if="ConfirmPasswordType == 'text'" :icon="['fa', 'eye-slash']"></font-awesome-icon>
                                        <font-awesome-icon class="img-eye" v-else :icon="['fa', 'eye']"></font-awesome-icon>
                                    </div>
                                    <div class="div-warning" v-if="chkConfirmPassInvalid">
                                        <font-awesome-icon class="img-warning" :icon="['fa', 'circle-exclamation']"></font-awesome-icon>
                                        <div>{{ $t("warn_password_confirm") }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="btn-modal">
                                <button id="btnClose" class="btn-left-modal">{{ $t("cancel") }}</button>
                                <button class="btn-right-modal" @click="chkChangeAllPassword()">{{ $t("change_password") }}</button>
                            </div>
                        </div>
                    </div>

                    <div class="btn-pass">
                        <font-awesome-icon class="img-pass" :icon="['fa', 'unlock-keyhole']"></font-awesome-icon>
                        <nuxt-link class="bg-label-pass" to="/Account/changepasscode">{{ $t("change_passcode") }}</nuxt-link>
                    </div>
                </div>
            </div>
            <div class="user-line"></div>
            <div class="currency-all">
                <div class="bg-currency">
                    <div class="name-currency">CNY</div>
                    <div class="line-currency"></div>
                    <div class="balance-currency">
                        <div class="label-balance">{{ $t("balance") }}</div>
                        <div class="nember-balance">89,500.00</div>
                    </div>
                    <div class="downline-currency">
                        <div class="label-balance">{{ $t("downline_outstanding") }}</div>
                        <div class="nember-balance">0.00</div>
                    </div>
                    <div class="bets-currency">
                        <div class="label-balance">{{ $t("bet") }}</div>
                        <div class="nember-balance">0</div>
                    </div>
                </div>
                <div class="bg-currency">
                    <div class="name-currency">CNY</div>
                    <div class="line-currency"></div>
                    <div class="balance-currency">
                        <div class="label-balance">{{ $t("balance") }}</div>
                        <div class="nember-balance">89,500.00</div>
                    </div>
                    <div class="downline-currency">
                        <div class="label-balance">{{ $t("downline_outstanding") }}</div>
                        <div class="nember-balance">0.00</div>
                    </div>
                    <div class="bets-currency">
                        <div class="label-balance">{{ $t("bet") }}</div>
                        <div class="nember-balance">0</div>
                    </div>
                </div>
                <div class="bg-currency">
                    <div class="name-currency">CNY</div>
                    <div class="line-currency"></div>
                    <div class="balance-currency">
                        <div class="label-balance">{{ $t("balance") }}</div>
                        <div class="nember-balance">89,500.00</div>
                    </div>
                    <div class="downline-currency">
                        <div class="label-balance">{{ $t("downline_outstanding") }}</div>
                        <div class="nember-balance">0.00</div>
                    </div>
                    <div class="bets-currency">
                        <div class="label-balance">{{ $t("bet") }}</div>
                        <div class="nember-balance">0</div>
                    </div>
                </div>
            </div>
            <div class="total-bets">
                <div class="label-balance">{{ $t("bets_total") }}</div>
                <div class="nember-balance">1</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Profile",
    data() {
        return {
            openModal: false,
            OldPassword: "",
            chkOldPassInvalid: false,
            OldPasswordType: "password",

            chkNewPassInvalid: false,
            NewPassword: "",
            NewPasswordType: "password",

            chkConfirmPassInvalid: false,
            ConfirmPassword: "",
            ConfirmPasswordType: "password",
        };
    },
    beforeCreate() {
        this.$store.commit('BreadChange', {
            "title": "profile",
            "subtitle": "account"
        });
    },
    mounted() {},

    methods: {
        modalClick() {
            if (this.openMoal == true) {
                this.openModal = false;
            } else {
                this.openModal = true;
            }
        },
        closeModal(e) {
            if (e.target.id == "myModal" || e.target.id == "btnClose") {
                this.openModal = false;
            }
        },
        ShowPassword(input) {
            if (input == 1) {
                if (this.OldPasswordType == "password") {
                    this.OldPasswordType = "text";
                } else {
                    this.OldPasswordType = "password";
                }
            } else if (input == 2) {
                if (this.NewPasswordType == "password") {
                    this.NewPasswordType = "text";
                } else {
                    this.NewPasswordType = "password";
                }
            } else if (input == 3) {
                if (this.ConfirmPasswordType == "password") {
                    this.ConfirmPasswordType = "text";
                } else {
                    this.ConfirmPasswordType = "password";
                }
            }
        },
        chkChangeAllPassword() {
            if (this.OldPassword) {
                if (this.NewPassword) {
                    if (this.ConfirmPassword) {
                    } else {
                        this.chkConfirmPassInvalid = true;
                    }
                } else {
                    this.chkNewPassInvalid = true;
                }
            } else {
                this.chkOldPassInvalid = true;
            }
        },
    },
    watch: {
        OldPassword() {
            if (this.OldPassword) {
                this.chkOldPassInvalid = false;
            } else {
                this.chkOldPassInvalid = true;
            }
        },
        NewPassword() {
            if (this.NewPassword) {
                this.chkNewPassInvalid = false;
            } else {
                this.chkNewPassInvalid = true;
            }
        },
        ConfirmPassword() {
            if (this.ConfirmPassword) {
                this.chkConfirmPassInvalid = false;
            } else {
                this.chkConfirmPassInvalid = true;
            }
        },
    },
};
</script>
