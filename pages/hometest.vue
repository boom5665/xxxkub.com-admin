<template>
    <div id="test1" class="content-body">
        <div style="width: 100%">
            <div style="display: flex">
                <div>
                    <label for="" class="input-label">หน้าหลัก</label>
                    <div class="input-group">
                        <div class="user-addon">
                            <img src="~assets/images/icon_search.png" class="size_icon_search" alt="" />
                        </div>
                        <input type="text" class="input-all form-control ng-pristine ng-valid ng-touched" style="width: 250px !important; padding-left: 40px" placeholder="" />
                    </div>
                </div>
                <div class="flex_btn">
                    <button @click="clickShowLoading" class="btn btn_search"><span class="btn_font">ค้นหา</span></button>
                </div>
            </div>
        </div>
        <div style="margin-top: 1rem">
            <Btn :text_btn="text_btn_s" />
            <Btn :text_btn="text_btn_b" />
            <Btn :text_btn="text_btn_create" :class_btn="class_btn_create" :icon_btn="icon_btn_create" />
            <!-- <BtnRefresh :text_btn="text_btn_refresh" :icon_btn="icon_btn_refresh" @refresh_status="refresh_page" /> -->
        </div>
        <div style="margin-top: 1rem">
            <BtnCheckBox></BtnCheckBox>
        </div>
        <div style="margin-top: 1rem">
            <BtnRadio></BtnRadio>
        </div>
        <div style="margin-top: 1rem">
            <Btn v-on:click.native="simple" :text_btn="text_btn_simple"></Btn>
            <Btn v-on:click.native="success" :text_btn="text_btn_success"></Btn>
            <Btn v-on:click.native="error" :text_btn="text_btn_error"></Btn>
        </div>
        <div style="margin-top: 1rem">
            <InputText :text_input_top="text_input_top_text" :text_input_bottom="text_input_bottom" v-model="value_username" :status_value="status_value_username"></InputText>
            <InputPassword :text_input_top="text_input_top_password" v-model="value_password" :status_value="status_value_password"></InputPassword>
            <InputNumber :text_input_top="text_input_top_number" v-model="value_number" :status_value="status_value_number"></InputNumber>
            <InputEmail :text_input_top="text_input_top_email" v-model="value_email" :status_value="status_value_email" @status-value="func_email"></InputEmail>
            <Btn :text_btn="text_save" v-on:click.native="test_save()" />
        </div>
        <div style="margin-top: 1rem">
            <Table></Table>
        </div>
    </div>
</template>

<script>
import Btn from "~/components/Btn.vue";
export default {
    data() {
        return {
            text_btn_s: "Single",
            text_btn_b: "About",
            text_btn_create: "Create",
            text_btn_simple: "Simple",
            text_btn_success: "Success",
            text_btn_error: "Error",
            text_btn_refresh: "Refresh",
            class_btn_create: "btn_create",
            icon_btn_create: "plus",
            icon_btn_refresh: "arrow-rotate-right",
            text_input_top_text: "Username",
            text_input_bottom: "2-8 Characters long; A-Z, a-z, 0-9",
            text_input_top_password: "Password",
            text_input_top_number: "Number",
            text_input_top_email: "Email",
            text_save: "Save",
            value_username: "",
            value_password: "",
            value_number: "",
            value_email: "",
            status_value_username: false,
            status_value_password: false,
            status_value_number: false,
            status_value_email: false,
            status_value_null_emil: null,
        };
    },
    beforeCreate() {
        this.$store.commit("BreadChange", {
            title: "title",
            subtitle: "subtitle",
        });
    },
    watch: {},
    methods: {
        func_email(data) {
            this.status_value_null_emil = data;
        },
        test_save() {
            if (this.value_username == "") {
                this.status_value_username = true;
            } else {
                this.status_value_username = false;
            }
            if (this.value_password == "") {
                this.status_value_password = true;
            } else {
                this.status_value_password = false;
            }
            if (this.value_number == "") {
                this.status_value_number = true;
            } else {
                this.status_value_number = false;
            }
            if (this.value_email == "") {
                this.status_value_email = true;
            } else {
                this.status_value_email = false;
            }
            if (this.value_username != "" && this.value_password != "" && this.value_number != "" && this.value_email != "" && this.status_value_null_emil == true) {
                this.$swal({
                    icon: "success",
                    title: "Hello",
                    text: "Hello brave new world!",
                });
            } else {
                console.log("error");
            }
        },
        refresh_page() {
        },
        clickShowLoading() {
            this.$store.commit("Loading");
            setTimeout(() => {
                this.$store.commit("Loading");
            }, 3000);
        },

        simple() {
            this.$swal("Hello world!");
        },

        success() {
            this.$swal({
                icon: "success",
                title: "Hello",
                text: "Hello brave new world!",
            });
        },

        error() {
            this.$swal({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        },
    },
    components: { Btn },
};
</script>
