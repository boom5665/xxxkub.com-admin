<template>
    <div>
        <div class="container-profile" style="width: 460px">
            <div >
                <div class="col-12">
                    <div class="input-group">
                        <label for="" class="input-label">{{ $t(oldpassword_text_top) }}</label>
                        <div class="input-group">
                            <div class="user-addon-right" @click="show_password" style="cursor: pointer">
                                <font-awesome-icon v-show="check_icon_eye == true" class="size_icon_search" :icon="['fa', icon_eye1]"></font-awesome-icon>
                                <font-awesome-icon v-show="check_icon_eye == false" class="size_icon_search" :icon="['fa', icon_eye2]"></font-awesome-icon>
                            </div>
                            <input @keyup.13="chkChangeAllPassword" :type="type_input" class="input-all form-control ng-pristine ng-valid ng-touched" :class="chkOldPassInvalid ? 'invalid-border' : ''" v-model="OldPassword" :maxlength="max"/>
                        </div>
                        <div class="input-error" v-if="chkOldPassInvalid == true">
                            <font-awesome-icon class="mat-icon notranslate eye-icon mat-icon-no-color ng-star-inserted" :icon="['fa', icon_error]"></font-awesome-icon>
                            กรอกข้อมูลไม่ครบ
                        </div>
                    </div>
                    <div class="input-group">
                        <label for="" class="input-label">{{ $t(curpassword_text_top) }}</label>
                        <div class="input-group">
                            <div class="user-addon-right" @click="show_password" style="cursor: pointer">
                                <font-awesome-icon v-show="check_icon_eye == true" class="size_icon_search" :icon="['fa', icon_eye1]"></font-awesome-icon>
                                <font-awesome-icon v-show="check_icon_eye == false" class="size_icon_search" :icon="['fa', icon_eye2]"></font-awesome-icon>
                            </div>
                            <input @keyup.13="chkChangeAllPassword" :type="type_input" class="input-all form-control ng-pristine ng-valid ng-touched" :class="chkNewPassInvalid ? 'invalid-border' : ''" v-model="NewPassword" :maxlength="max"/>
                        </div>
                        <div class="input-error" v-if="chkNewPassInvalid == true">
                            <font-awesome-icon class="mat-icon notranslate eye-icon mat-icon-no-color ng-star-inserted" :icon="['fa', icon_error]"></font-awesome-icon>
                            กรอกข้อมูลไม่ครบ
                        </div>
                    </div>
                    <div class="input-group">
                        <label for="" class="input-label">{{ $t(cfpassword_text_top) }}</label>
                        <div class="input-group">
                            <div class="user-addon-right" @click="show_password" style="cursor: pointer">
                                <font-awesome-icon v-show="check_icon_eye == true" class="size_icon_search" :icon="['fa', icon_eye1]"></font-awesome-icon>
                                <font-awesome-icon v-show="check_icon_eye == false" class="size_icon_search" :icon="['fa', icon_eye2]"></font-awesome-icon>
                            </div>
                            <input @keyup.13="chkChangeAllPassword" :type="type_input" class="input-all form-control ng-pristine ng-valid ng-touched" :class="chkConfirmPassInvalid ? 'invalid-border' : ''" v-model="ConfirmPassword" :maxlength="max"/>
                        </div>
                        <div class="input-error" v-if="chkConfirmPassInvalid == true">
                            <font-awesome-icon class="mat-icon notranslate eye-icon mat-icon-no-color ng-star-inserted" :icon="['fa', icon_error]"></font-awesome-icon>
                            กรอกข้อมูลไม่ครบ
                        </div>
                    </div>
                    <div class="text-end mt-20">
                        <button @click="chkChangeAllPassword()" class="btn btn_search btn-src">
                            <span class="btn_font">{{ $t("change_password") }}</span>
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Profile",
    data() {
        return {
            icon_error: "exclamation",
            icon_eye1: "eye",
            icon_eye2: "eye-slash",
            check_icon_eye: true,
            type_input: "password",

            username_text_top: "username",
            username_text_bottom: "",
            username_text_status: true,
            Username: this.$cookies.get("username"),

            oldpassword_text_top: "password_now",
            oldpassword_text_bottom: "",
            OldPassword: "",
            chkOldPassInvalid: false,

            curpassword_text_top: "password_new",
            curpassword_text_bottom: "",
            NewPassword: "",
            chkNewPassInvalid: false,

            cfpassword_text_top: "password_confirm",
            cfpassword_text_bottom: "",
            ConfirmPassword: "",
            chkConfirmPassInvalid: false,

            openModal: false,
            max: 8,
        };
    },
    beforeCreate() {
        this.$store.commit("BreadChange", {
            title: "change_password",
            subtitle: "account",
        });
    },
    mounted() {},

    methods: {
        show_password() {
            if (this.check_icon_eye == true) {
                this.check_icon_eye = false;
                this.type_input = "text";
            } else {
                this.check_icon_eye = true;
                this.type_input = "password";
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

            if (this.OldPassword.trim() == "") {
                this.chkOldPassInvalid = true;
            }
            if (this.NewPassword.trim() == "") {
                this.chkNewPassInvalid = true;
            }
            if (this.ConfirmPassword.trim() == "") {
                this.chkConfirmPassInvalid = true;
            }

            if (this.OldPassword.trim() && this.NewPassword.trim() && this.ConfirmPassword.trim()) {
                this.ChangePassword()
            }
        },
        ChangePassword(){
            var self = this;
            var body = {
                old_password: self.OldPassword.trim(),
                new_password: self.NewPassword.trim(),
                password_confirm: self.ConfirmPassword.trim()
            };
            this.$store.commit("Loading");

            self.$axios
                .$post("api/v1/re-new-password", body)
                .then((response) => {
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                    if (response.code == 200) {
                        self.$swal({
                            icon: "success",
                            title: self.$t("Save Successful"),
                        });
                    }else{
                        self.$swal({
                            icon: "error",
                            title: self.$t(response.msg.en),
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                    self.$swal({
                        icon: "error",
                        title: self.$t(error.response.data.msg.en),
                    });
                });

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
