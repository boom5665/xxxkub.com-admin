<template>
    <div id="test1" class="content-body" style="width: max-content">
        <div class="row" >
            <div class="col-lg-12">
                <div class="display-start">
                    <div class="input-group">
                        <InputText :text_input_top="$t(login_endpoint_text)" :status_value="login_endpoint_status" v-model="login_endpoint"></InputText>
                    </div>
                </div>

                <div class="display-start">
                    <div class="input-group">
                        <InputUrl :text_input_top="$t(url_register_text)" :status_value="url_register_status" v-model="url_register"></InputUrl>
                    </div>
                </div>

                <div class="display-start display-column">
                    <div id="AreaIp" class="input-group display-column">
                        <label for="" class="input-label">{{ $t(allowip_text) }}</label>
                        <div v-for="(val, index) in allowip" :key="index">
                            <div class="input-group display-column">
                                <input type="text" v-model="allowip[index]" class="input-all form-control ng-pristine ng-valid ng-touched" :class="allowip_status == false ? 'alert-input' : ''"  v-on:keypress="isIp($event)"/>
                                <div class="input-label-bottom" v-if="allowip_text_bottom != ''">{{ $t(allowip_text_bottom) }}</div>
                                <div class="input-error" v-if="allowip_status == false">
                                    <font-awesome-icon :icon="['fa', icon_error]"></font-awesome-icon>
                                    Please complete the information.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 10px;">
                        <button @click="addRowIp(allowip)" class="btn btn_search btn-src">
                            <span class="btn_font"><font-awesome-icon :icon="['fa', 'plus']"></font-awesome-icon> {{ $t("Add") }}</span>
                        </button>
                        <button @click="removeRowIp(allowip)" class="btn btn_delete btn-src" v-if="allowip.length > 1">
                            <span class="btn_font"><font-awesome-icon :icon="['fa', 'minus']"></font-awesome-icon> {{ $t("Delete") }}</span>
                        </button>
                    </div>
                </div>

                <div class="display-start display-column">
                    <div class="input-group display-column">
                        <label for="" class="input-label">{{ $t(secretkey_text) }}</label>
                        <p class="secretkey">{{ secretkey }}</p>
                    </div>
                    <div>
                        <button @click="copyKey(secretkey)" class="btn btn_search btn-src">
                            <span class="btn_font"><font-awesome-icon :icon="['fa', 'copy']"></font-awesome-icon> {{ $t("Copy Key") }}</span>
                        </button>
                    </div>
                </div>

                <div class="display-start">
                    <div class="input-group">
                        <InputTextArea :text_input_top="$t(description_text)" :status_value="description_status" v-model="description"></InputTextArea>
                    </div>
                </div>
 
                <div class="text-end" style="margin-top: 20px;">
                    <button @click="save()" class="btn btn_search btn-src">
                        <span class="btn_font">{{ $t("Save") }}</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js"></script>
<script>
export default {
    data() {
        return {
            login_endpoint_text: "Login Endpoint",
            login_endpoint: "",
            login_endpoint_status: true,

            url_register_text: "URL Register",
            url_register: "",
            url_register_status: true,

            allowip_text: "Ip",
            allowip: [],
            allowip_text_bottom: "Ex. 127.0.1.1",
            allowip_status: true,

            description_text: "Description",
            description: "",
            description_status: true,

            secretkey_text: "Secret Key",
            secretkey: "",
            text_save: "Save",
        };
    },
    watch: {
        login_endpoint(val) {
            if (val != "") {
                this.login_endpoint_status = true;
            }
        },
        url_register(val) {
            if (val != "") {
                this.url_register_status = true;
            }
        },
        description(val) {
            if (val != "") {
                this.description_status = true;
            }
        },

    },
    beforeCreate() {
        this.$store.commit("BreadChange", {
            title: "Setting Authen",
            subtitle: "Setting",
        });
    },
    mounted() {
        this.get_data();
    },
    methods: {
        addRowIp(allowip) {
            this.allowip.push("");
        },
        removeRowIp(allowip) {
            if(this.allowip.length > 1){
                this.allowip.splice((this.allowip.length-1), 1);
            }
        },
        copyKey(val){
            navigator.clipboard.writeText(val)
            this.$swal({
                icon: "success",
                title: this.$t("Copy Success"),
            });
        },
        isIp(e) {
            let char = String.fromCharCode(e.keyCode); // Get the character
            if(/^[0-9.]+$/.test(char)) return true; // Match with regex 
            else e.preventDefault(); // If not match, don't add to input text
        },
        save() {
            var element = []    
            for (let index = 0; index < this.allowip.length; index++) {
                if (this.allowip[index].trim() != "") {
                    element.push(this.allowip[index].trim());
                }
            }
            this.allowip = element;
            if(this.allowip.length <= 0){
                this.allowip = [""];
                this.error();
            }

            if (
                this.login_endpoint.trim() == "" || 
                this.url_register.trim() == "" || 
                this.allowip == "" ||
                this.description.trim() == ""
            ) {
                this.error();
            } else {
                this.UpdateAuthen();
            }
        },

        error() {
            if (this.login_endpoint.trim() == "") {
                this.login_endpoint_status = false;
            } else {
                this.login_endpoint_status = true;
            }

            if (this.url_register.trim() == "") {
                this.url_register_status = false;
            } else {
                this.url_register_status = true;
            }

            if (this.allowip.length == 1 && this.allowip == "") {
                this.allowip_status = false;
            } else {
                this.allowip_status = true;
            }

            if (this.description.trim() == "") {
                this.description_status = false;
            } else {
                this.description_status = true;
            }

            if (
                this.login_endpoint.trim() == "" || 
                this.url_register.trim() == "" || 
                (this.allowip.length == 1 && this.allowip == "") || 
                this.description == ""
            ) {
                this.$swal({
                    icon: "warning",
                    title: "Please complete the information.",
                });
            }
        },

        get_data() {
            this.$store.commit("Loading");
            this.$axios
                .$post("api/v1/manage-get-detail-setting")
                .then((response) => {
                    this.login_endpoint = response.result.external_login_endpoint;
                    this.url_register = response.result.external_url_register;
                    console.log(this.url_register);

                    var allowip = response.result.external_allowip;
                    allowip.map(el => {
                        return el.split(',')
                    })
                    this.allowip = allowip;

                    this.secretkey = response.result.external_secretkey;
                    this.description = response.result.external_description;

                    setTimeout(() => {
                        this.$store.commit("Loading");
                    }, 500);
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        UpdateAuthen() {
            var self = this;
            var body = {
                id: 1,
                external_login_endpoint: this.login_endpoint.trim(),
                external_url_register: this.url_register.trim(),
                external_description: this.description.trim(),
                external_allowip: this.allowip
            };
            this.$store.commit("Loading");
            
            this.$axios
                .post("api/v1/authen/manage-update-setting", body)
                .then(function (response) {

                    if (response.data.code == 200) {
                        self.$swal({
                            icon: "success",
                            title: self.$t("Save Successful"),
                        });
                        setTimeout(function () {
                            location.reload();
                        }, 500);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    self.$swal({
                        icon: "error",
                        title: self.$t("Save Failed"),
                    });
                    setTimeout(function () {
                        self.get_data();
                    }, 1000);
                });
        },
    },
};
</script>




