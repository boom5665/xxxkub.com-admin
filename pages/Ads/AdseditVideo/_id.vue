<template>
    <div id="test1" class="content-body">
        <div style="width: 100%">
            <div>
                <div class="display-start">
                    <div class="col-lg-8 input-group">
                        <InputText :text_input_top="adsname_text_top" :text_input_bottom="adsname_text_bottom" :status_value="adsnamestatus" v-model="adsname" style="width: 200px !important"></InputText>
                    </div>
                </div>

                <div class="display-start">
                    <div class="col-lg-8 input-group">
                        <InputText :text_input_top="adsurl_text_top" :text_input_bottom="adsurl_text_bottom" :status_value="adsurlstatus" v-model="adsurl"></InputText>
                    </div>
                </div>

                <div class="display-start">
                    <div class="col-lg-8 input-group">
                        <InputText :text_input_top="adsskip_text_top" :text_input_bottom="adsskip_text_bottom" :status_value="adsskipstatus" v-model="adsskip"></InputText>
                    </div>
                </div>

                <div class="display-start">
                    <div class="col-lg-8 input-group">
                        <Inputswitch :text_input_top="Vstatus_text_top" :switchvalue="Vstatus" @switchchange="(n) => (Vstatus = n)"></Inputswitch>
                    </div>
                </div>

                <div class="display-start">
                    <div class="col-lg-1 input-group">
                        <InputVideo :text_input_top="video_text_top" :text_input_bottom="video_text_bottom" :status_value="videostatus" v-model="video"></InputVideo>
                    </div>
                </div>
                <div class="col-lg-11 text-end">
                    <!-- <button @click="Clear" class="btn btn_Clear btn-src"><span class="btn_font">Clear</span></button> -->
                    <button @click="save()" class="btn btn_Save btn-src"><span class="btn_font">Save</span></button>
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
            adsurl_text_top: "Ads URL",
            adsurl_text_bottom: "",
            adsurl: "",
            adsurlstatus: true,

            adsname_text_top: "Video Ads Name",
            adsname_text_bottom: "",
            adsname: "",
            adsnamestatus: true,

            video_text_top: "Ads Video",
            video_text_bottom: "ใช้ ไฟล์ Mp4 เท่านั้น",
            video: null,
            videostatus: true,
            video_default: "",

            adsskip_text_top: "Skip Time",
            adsskip_text_bottom: "",
            adsskip: "",
            adsskipstatus: true,

            Vstatus_text_top: "Video status",
            // Vstatus_text_bottom: "กรุณาเลือกสถานะ เปิด-ปิด",
            Vstatus: "",
            // switchVstatus: true,

            tab: null,
            icon_btn_Clear: "Clear",
            text_save: "Save",
            icon_btn_submit: "submit",
            preview: null,
            idpage: "",
        };
    },
    beforeCreate() {
        this.$store.commit("BreadChange", {
            title: "แก้ไขโฆษณาวิดีโอ",
            subtitle: "โฆษณาวิดีโอ",
        });
    },
    mounted() {
        this.get_data();
    },
    watch: {
        adsname(val) {
            if (val != "") {
                this.adsnamestatus = true;
            }
        },
        adsurl(val) {
            if (val != "") {
                this.adsurlstatus = true;
            }
        },
        Vstatus(val) {
            if (val != "") {
                this.Vstatus = val;
            }
        },
        adsskip(val) {
            if (val != "") {
                this.adsskipstatus = true;
            }
        },
    },
    methods: {
        Clear() {
            this.video = "";
            this.adsname = "";
            this.adsurl = "";
            this.adsPosition = "";
            this.adsskip = "";
        },
        save() {
            if (this.video == null || this.adsname == "" || this.adsurl == "" || this.adsPosition == "") {
                this.error();
            } else {
                this.FormData();
            }
        },
        error() {
            if (this.video == null) {
                this.videostatus = false;
            } else {
                this.videostatus = true;
            }
            if (this.adsname == "") {
                this.adsnamestatus = false;
            } else {
                this.adsnamestatus = true;
            }
            if (this.adsurl == "") {
                this.adsurlstatus = false;
            } else {
                this.adsurlstatus = true;
            }
            if (this.adsskip == "") {
                this.adsskipstatus = false;
            } else {
                this.adsskipstatus = true;
            }
            if (this.video == null || this.adsurl == "" || this.adsname == "" || this.adsskip == "") {
                this.$swal({
                    icon: "warning",
                    title: "Please complete the information.",
                });
            }
        },

        clickShowLoading() {
            this.$store.commit("Loading");
            setTimeout(() => {
                this.$store.commit("Loading");
            }, 3000);
        },

        get_data() {
            // var self = this;
            this.idpage = parseInt(this.$route.params.id);
            var body = {
                id: this.idpage,
            };
            this.$axios
                .$post("api/v1/ads-vdo/get-detail ", body)
                .then((response) => {
                    this.id = response.result.id;
                    this.adsname = response.result.name;
                    this.adsskip = response.result.skip;
                    this.Vstatus = response.result.status == 1 ? true : false;
                    this.adsurl = response.result.url;
                    this.video = response.result.video;
                    this.video_default = response.result.video;
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        FormData() {
            var formData = new FormData();
            formData.append("id", this.id);
            formData.append("vdo", this.video == this.video_default ? null : this.video);
            formData.append("url", this.adsurl);
            formData.append("name", this.adsname);
            formData.append("skip", this.adsskip);
            formData.append("status", this.Vstatus == true ? 1 : 2);

            var self = this;
            this.$axios
                .post("api/v1/ads-vdo/update", formData)
                .then(function (response) {

                    if (response.data.code == 200) {
                        self.$swal({
                            icon: "success",
                            title: self.$t("Save Successful"),
                        });
                        setTimeout(function () {
                            location.reload();
                        }, 2000);
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




