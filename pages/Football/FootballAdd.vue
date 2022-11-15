<template>
    <div id="test1" class="content-body">
        <div style="width: 100%">
            <div>
                <div class="display-start">
                    <div class="col-lg-4 input-group">
                        <InputText :text_input_top="footname_text_top" :text_input_bottom="footname_text_bottom" :status_value="footnamestatus" v-model="footname"></InputText>
                    </div>
                </div>

                <div class="display-start">
                    <div class="col-lg-4 input-group">
                        <InputText :text_input_top="footurl_text_top" :text_input_bottom="footurl_text_bottom" :status_value="footurlstatus" v-model="footurl"></InputText>
                    </div>
                </div>

                <div class="display-start">
                    <div class="col-lg-4 input-group">
                        <InputDate :text_input_top="footdate_text_top" :text_input_bottom="footdate_text_bottom" :status_value="footdatestatus" v-model="footdate"></InputDate>
                    </div>
                </div>

                <div class="col-lg-11 text-end">
                    <button  class="btn btn_search btn-src"><span class="btn_font">Clear</span></button>
                    <Btn :text_btn="text_save" v-on:click.native="test_save()" />
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
            footurl_text_top: "Youtube URL",
            footurl_text_bottom: "เช่น กรุณาใส่เป็น Ml5TwG7QDGc หลังเท่ากับ",
            footurl: "",
            footurlstatus: true,

            footname_text_top: "Name",
            footname_text_bottom: "",
            footname: "",
            footnamestatus: true,

            image: null,
            imagestatus: true,


            footdate_text_top: "วันที่ลงแข่ง",
            footdate_text_bottom: "",
            footdate: "",
            footdatestatus: true,

            tab: null,
            icon_btn_Clear: "Clear",
            text_save: "Save",
            icon_btn_submit: "submit",
            preview: null,
            preview_list: [],
            image_list: [],
        };
    },
    beforeCreate() {
        this.$store.commit("BreadChange", {
            title: "เพิ่มไฮไลท์ ฟุตบอล",
            subtitle: "ฟุตบอล",
        });
    },
    watch: {
        footname(val) {
            if (val != "") {
                this.footnamestatus = true;
            }
        },
        footurl(val) {
            if (val != "") {
                this.footurlstatus = true;
            }
        },
        footdate(val) {
            if (val != "") {
                this.footdatestatus = true;
            }
        },
    },
    methods: {
        statusinputtrue(event) {
            if (event == "name") {
                if (this.footnamestatus == false) {
                    this.footnamestatus = true;
                }
            }
            if (event == "url") {
                if (this.footurlstatus == false) {
                    this.footurlstatus = true;
                }
            }

            if (event == "footdate") {
                if (this.footdatestatus == false) {
                    this.footdatestatus = true;
                }
            }

            if (event == "video") {
                if (this.adsvideostatus == false) {
                    this.adsvideostatus = true;
                }
            }
        },

        previewImage(event) {
            var input = event.target;

            if (input.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.preview = e.target.result;
                };
                this.image = input.files[0];
                reader.readAsDataURL(input.files[0]);

                this.imagestatus = true;
            }
        },
        reset() {},

        test_save() {
            // if (this.image == null) {
            //     this.imagestatus = false;
            // } else {
            //     this.imagestatus = true;
            // }
            if (this.footname == "") {
                this.footnamestatus = false;
            } else {
                this.footnamestatus = true;
            }
            if (this.footurl == "") {
                this.footurlstatus = false;
            } else {
                this.footurlstatus = true;
            }
            if (this.footdate == "") {
                this.footdatestatus = false;
            } else {
                this.footdatestatus = true;
            }
            if (this.footname == "" || this.footurl == "" || this.footdate == "") {
                this.$swal({
                    icon: "warning",
                    title: "Please complete the information.",
                });
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
};
</script>




