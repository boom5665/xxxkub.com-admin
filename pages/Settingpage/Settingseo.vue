<template>
    <div id="test1" class="content-body" style="width: max-content">
        <div class="row" >
            <div class="col-lg-12">
                <div class="display-start">
                    <div class="input-group">
                        <InputText :text_input_top="$t(title_text_top)" :text_input_bottom="$t(title_text_bottom)" :status_value="titlestatus" v-model="title"></InputText>
                    </div>
                </div>

                <div class="display-start">
                    <div class="input-group">
                        <InputText :text_input_top="$t(Seo_text_top)" :text_input_bottom="$t(Seo_text_bottom)" :status_value="Seostatus" v-model="Seo"></InputText>
                    </div>
                </div>

                <div class="display-start">
                    <div class="input-group">
                        <InputText :text_input_top="tracking_text_top" :text_input_bottom="$t(tracking_text_bottom)" :status_value="tracking_status" v-model="tracking"></InputText>
                    </div>
                </div>

                <!-- <div class="display-start">
                    <div class="input-group">
                        <InputFileSeo :text_input_top="$t(Sitemap_text_top)" :status_value="Sitemapstatus" v-model="Sitemap"></InputFileSeo>
                    </div>
                </div> -->
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
            title_text_top: "Setting SEO Title",
            title_text_bottom: "",
            title: "",
            titlestatus: true,

            Seo_text_top: "Setting SEO Description",
            Seo_text_bottom: "",
            Seo: "",
            Seostatus: true,

            // Sitemap_text_top: "Setting Sitemap",
            // Sitemap_text_bottom: "",
            // Sitemap: "",
            // Sitemapstatus: true,

            tracking_text_top: "Tracking ID (Google Analytics)",
            tracking_text_bottom: "",
            tracking: "",
            tracking_status: true,

            // Keyword_text_top: "ตั้งค่า Keyword สำหรับหน้าแสดงหนัง",
            // Keyword_text_bottom: "เช่น ตัวอย่าง defalut หนังใหม่ ดูหนัง เรื่องย่อของหนัง",
            // Keyword: "",
            // Keywordstatus: true,

            tab: null,
            icon_btn_Clear: "Clear",
            text_save: "Save",
        };
    },
    watch: {
        title(val) {
            if (val != "") {
                this.titlestatus = true;
            }
        },
        Seo(val) {
            if (val != "") {
                this.Seostatus = true;
            }
        },
        // Sitemap(val) {
        //     if (val != "") {
        //         this.Sitemapstatus = true;
        //     }
        // },
    },
    beforeCreate() {
        this.$store.commit("BreadChange", {
            title: "Setting SEO",
            subtitle: "Setting",
        });
    },
    mounted() {
        this.get_data();
    },
    methods: {
        Clear() {
            this.title = "";
            this.Seo = "";
            this.Sitemap = "";
        },
        save() {
            if (this.title.trim() == "" || this.Seo.trim() == "" ) {
                this.error();
            } else {
                this.FormData();
            }
        },

        error() {
            if (this.title.trim() == "") {
                this.titlestatus = false;
            } else {
                this.titlestatus = true;
            }
            if (this.Seo.trim() == "") {
                this.Seostatus = false;
            } else {
                this.Seostatus = true;
            }
            // if (this.Sitemap == "") {
            //     this.Sitemapstatus = false;
            // } else {
            //     this.Sitemaptatus = true;
            // }

            if (this.title.trim() == "" || this.Seo.trim() == "") {
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
                    this.id = response.result.id;
                    this.title = response.result.seo_title;
                    this.Seo = response.result.seo_description;
                    // this.Sitemap = response.result.sitemap;
                    this.tracking = response.result.track_id;
                    setTimeout(() => {
                        this.$store.commit("Loading");
                    }, 500);
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        FormData() {
            var formData = new FormData();
            formData.append("id", this.id);
            formData.append("seo_title", this.title.trim());
            formData.append("seo_description", this.Seo.trim());
            formData.append("track_id", this.tracking.trim());

            this.$store.commit("Loading");
            var self = this;
            this.$axios
                .post("api/v1/seo/manage-update-setting", formData)
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




