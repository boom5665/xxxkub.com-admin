<template>
    <div id="test1" class="content-body" style="width: max-content">
        <div class="">
            <div class="display-start">
                <div class="input-group">
                    <InputText :text_input_top="$t(adsname_text_top)" :text_input_bottom="adsname_text_bottom" :status_value="adsnamestatus" v-model="adsname"></InputText>
                </div>
            </div>

            <div class="display-start">
                <div class="input-group">
                    <InputUrl :text_input_top="$t(adsurl_text_top)" :text_input_bottom="adsurl_text_bottom" :status_value="adsurlstatus" v-model="adsurl"></InputUrl>
                </div>
            </div>

            <div class="display-start">
                <div class="input-group">
                    <InputNumber :text_input_top="$t(adsskip_text_top)" :text_input_bottom="adsskip_text_bottom" :status_value="adsskipstatus" v-model="adsskip" :min="1" :max="1000"></InputNumber>
                </div>
            </div>

            <div class="display-start">
                <div class="input-group">
                    <InputVideo :text_input_top="$t(video_text_top)" :text_input_bottom="$t(video_text_bottom)" :status_value="videostatus" v-model="video"></InputVideo>
                </div>
            </div>
            <div class="text-end">
                <!-- <button @click="Clear" class="btn btn_Clear btn-src"><span class="btn_font">Clear</span></button> -->
                <button @click="save()" class="btn btn_search btn-src">
                    <span class="btn_font">{{ $t("Save") }}</span>
                </button>
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
            adsurl_text_bottom: "example: https://www.google.com/",
            adsurl: "",
            adsurlstatus: true,

            adsname_text_top: "Video Ads Name",
            adsname_text_bottom: "",
            adsname: "",
            adsnamestatus: true,

            video_text_top: "Ads Video",
            video_text_bottom: "File Type is MP4 Only",
            video: null,
            videostatus: true,

            adsskip_text_top: "Skip Time",
            adsskip_text_bottom: "",
            adsskip: "",
            adsskipstatus: true,

            tab: null,
            icon_btn_Clear: "Clear",
            text_save: "Save",
            icon_btn_submit: "submit",
            preview: null,
        };
    },
    beforeCreate() {
        this.$store.commit("BreadChange", {
            title: "Add Advertisement Video",
            subtitle: "Advertisement",
        });
    },
    watch: {
        adsname(val) {
            if (val.trim() != "") {
                this.adsnamestatus = true;
            }
        },
        adsurl(val) {
            if (val.trim() != "") {
                this.adsurlstatus = true;
            }
        },
        adsvideo(val) {
            let type = this.video.type;
            if (val.trim() != "" || type == "video/mp4" || type == "video/webm") {
                this.adsvideostatus = true;
            }
        },
        adsskip(val) {
            if (val != 0) {
                this.adsskipstatus = true;
            }
        },
    },
    methods: {
        Clear() {
            this.video = "";
            this.adsname = "";
            this.adsurl = "";
            this.adsskip = "";
        },
        save() {
            // เช็ค URL ว่าใช่ไหม
            var regex = new RegExp('^(https?:\\/\\/)?'+ // protocol
                                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                                    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                                    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                                    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
            
            let type = "";
            if(this.video != null){
                type = this.video.type;
            }
            if (
                this.video == null || 
                ( type != "video/mp4" && 
                type != "video/webm" ) ||
                this.adsname.trim() == "" || 
                this.adsurl.trim() == "" ||
                this.adsskip == 0 ||
                regex.test(this.adsurl) == false
            ) {
                this.error();
            } else {
                this.FormData();
            }
        },
        error() {
            let type = "";
            if(this.video != null){
                type = this.video.type;
            }
            
            if (this.video == null || (type != "video/mp4" && type != "video/webm") ) {
                this.videostatus = false;
            } else {
                this.videostatus = true;
            }
            if (this.adsname.trim() == "") {
                this.adsnamestatus = false;
            } else {
                this.adsnamestatus = true;
            }

            // เช็ค URL ว่าใช่ไหม
            var regex = new RegExp('^(https?:\\/\\/)?'+ // protocol
                                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                                    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                                    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                                    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

            if (this.adsurl.trim() == ""|| regex.test(this.adsurl) == false) {
                this.adsurlstatus = false;
            } else {
                this.adsurlstatus = true;
            }
            if (this.adsskip == 0) {
                this.adsskipstatus = false;
            } else {
                this.adsskipstatus = true;
            }
            if (
                this.video == null || 
                (type != "video/mp4" && type != "video/webm") || 
                this.adsurl.trim() == "" || 
                regex.test(this.adsurl) == false || 
                this.adsname.trim() == "" || 
                this.adsskip == 0
            ) {
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

        FormData() {
            var formData = new FormData();
            formData.append("vdo", this.video);
            formData.append("url", this.adsurl.trim());
            formData.append("name", this.adsname.trim());
            formData.append("skip", this.adsskip);

            this.$store.commit("Loading");
            var self = this;
            this.$axios
                .post("api/v1/ads-vdo/create", formData)
                .then(function (response) {

                    if (response.data.code == 200) {
                        self.$swal({
                            icon: "success",
                            title: self.$t("Save Successful"),
                        });
                        setTimeout(function () {
                            self.$store.commit("Loading");
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




