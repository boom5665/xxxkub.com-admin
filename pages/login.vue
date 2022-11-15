<template>
    <div class="LoginPage">
        <div class="headerLogin">
            <LanguageBtn style="z-index: 5"></LanguageBtn>
        </div>
        <div class="bodyLogin">
            <div class="loginContainer">
                <div class="loginHeader">
                    <!-- <img src="~assets/images/logo_amb.png" alt="" /> -->
                    <div class="textTitle">{{ $t("Entertainment Management") }}</div>
                </div>
                <div class="loginBody">
                    <form novalidate="" class="fromLogin">
                        <div class="error-box" v-if="MassageError">{{ MassageError }}</div>
                        <div for="" class="labelLogin">{{ $t("Account") }}</div>
                        <div class="input-group" style="">
                            <input @keyup.13="chackLogin" type="text" class="LoginInput" :class="invalidUsername ? 'inputinvalid' : ''" formcontrolname="username" v-model="username" />
                            <div class="labelinvalid" v-if="invalidUsername">
                                <font-awesome-icon style="margin-right: 5px" :icon="['fa', 'circle-exclamation']"></font-awesome-icon>
                                <div class="">{{ $t("Enter username") }}</div>
                            </div>
                        </div>

                        <div for="" class="labelLogin">{{ $t("Password") }}</div>
                        <div class="input-group" style="margin-bottom: 36px">
                            <input @keyup.13="chackLogin" :type="showPassword" class="LoginInput" :class="invalidPssword ? 'inputinvalid' : ''" formcontrolname="password" v-model="password" />
                            <div class="icon" @click="showPass()">
                                <font-awesome-icon class="icon-eye" v-if="showPassword == 'text'" :icon="['fa', 'eye-slash']"></font-awesome-icon>
                                <font-awesome-icon class="icon-eye" v-else :icon="['fa', 'eye']"></font-awesome-icon>
                            </div>

                            <div class="labelinvalid" v-if="invalidPssword">
                                <font-awesome-icon style="margin-right: 5px" :icon="['fa', 'circle-exclamation']"></font-awesome-icon>
                                <div class="">{{ $t("Enter current password") }}</div>
                            </div>
                        </div>

                        <div style="margin-bottom: 16px">
                            <div class="signin-btn" @click="chackLogin()">{{ $t("Sign In") }}</div>
                        </div>
                        <div class="contact">{{ $t("Contact your associate in case you forgot the password or unable to sign in") }}</div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "login",
    layout: "login",
    data() {
        return {
            langSelect: false,
            Language: "th",
            showPassword: "password",
            username: "",
            password: "",
            invalidUsername: false,
            invalidPssword: false,
            MassageError: "",
        };
    },
    methods: {
        showPass() {
            if (this.showPassword == "password") {
                this.showPassword = "text";
            } else {
                this.showPassword = "password";
            }
        },
        chackLogin() {
            if (this.username) {
                if (this.password) {
                    this.goLogin();
                } else {
                    this.invalidPssword = true;
                }
            } else {
                this.invalidUsername = true;
            }
        },
        goLogin() {
            const data = {
                username: this.username,
                password: this.password,
            };
            this.$store.commit("Loading");

            this.$axios
                .$post("api/v1/loginauthen-bo", data)
                .then((response) => {
                    if (response.code == 200) {
                        // เก็บ Token ใน Cookie
                        this.$cookies.set("token", response.token, 60 * (60 * 1000));
                        this.$cookies.set("username", this.username, 60 * (60 * 1000));
                        // เก็บ Token ใน Store
                        this.$store.commit("setToken", { username: this.username, token: response.token });

                        // get package
                        this.getSetting()
                        
                    } else {
                        this.MassageError = response.msg.th;

                        this.username = "";
                        this.password = "";
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getSetting() {
            this.$axios
                .$post("api/v1/manage-get-detail-setting")
                .then((response) => {
                    if (response.code == 200) {
                        var result = response.result;
                        // เก็บ Token ใน Cookie
                        this.$cookies.set("package", result.package, 60 * (60 * 1000));
                        this.$cookies.set("configother", result.configother, 60 * (60 * 1000));
                        this.$cookies.set("authen", result.authentication, 60 * (60 * 1000));

                        // var xx = this.$cookies.get("configother");

                        // เก็บ Token ใน Store
                        this.$store.commit("setPackage", { package: result.package });
                        this.$store.commit("setConfigOther", { configother: result.configother });
                        this.$store.commit("setAuthen", { authen: result.authentication });

                        this.$store.commit("Loading");

                        this.$nextTick(function () {
                            this.$router.push("/");
                        });
                    } else {
                        this.MassageError = response.msg.th;
                        console.log(this.MassageError);
                        this.username = "";
                        this.password = "";
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    watch: {
        username() {
            if (this.username) {
                this.invalidUsername = false;
            } else {
                this.invalidUsername = true;
            }
        },
        password() {
            if (this.password) {
                this.invalidPssword = false;
            } else {
                this.invalidPssword = true;
            }
        },
    },
};
</script>
