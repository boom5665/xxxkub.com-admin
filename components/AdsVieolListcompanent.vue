<template>
    <div class="addbody">
        <div class="columid">{{ i + 1 }}</div>
        <div class="columtext">
            <template v-if="previewStatus == true">
                <div class="file">
                    <div class="">
                        <video :src="val.previewKey" controls style="width: auto; height: 300px" />
                    </div>
                </div>
            </template>
            <template v-else-if="textalert">
                <p class="mb-0" style="color: red">{{ textalert }}</p>
            </template>
            <template v-else>
                <div class="file">
                    <div class="">
                        <video :src="val.video" controls style="width: auto; height: 300px" />
                    </div>
                </div>
            </template>
        </div>
        <div class="columAct pad-10">
            <div class="columActleft">
                <div class="display-start">
                    <div class="input-group">
                        <InputText :text_input_top="$t(adsname_text_top)" :status_value="adsnamestatus" v-model="val.name"></InputText>
                    </div>
                </div>

                <div class="display-start">
                    <div class="input-group">
                        <InputUrl :text_input_top="$t(adsurl_text_top)" :status_value="adsurlstatus" :text_input_bottom="adsurl_text_bottom" v-model="val.url"></InputUrl>
                    </div>
                </div>

                <div class="display-start">
                    <div class="input-group">
                        <InputNumber :text_input_top="$t(adsskip_text_top)" :status_value="adsskipstatus" v-model="val.skip" :min="1" :max="1000"></InputNumber>
                    </div>
                </div>

                <div class="display-start">
                    <div class="input-group">
                        <Inputswitch :text_input_top="$t(status_text_top)" :switchvalue="val.status" :id="val.id" @switchchange="(n) => (val.status = n)"></Inputswitch>
                    </div>
                </div>

                <div class="">
                    <div class="" style="display: flex; flex-direction: column; padding-bottom: 15px">
                        <label for="" class="input-label"> {{ $t(Video_text_top) }} </label>
                        <div class="imageinput">
                            <input type="file" ref="fileupload" accept="video/mp4,video/webm" :id="'imageInput' + val.id" @change="previewImage($event, i)" />
                            <label :for="'imageInput' + val.id" class="imagebutton">{{ $t("Select Video") }}</label>
                            <div class="input-label-bottom" style="text-align: left">{{ $t(Video_text_bottom) }}</div>
                        </div>
                    </div>
                    <div class="display-start" style="margin-bottom: 10px">
                        <div style="">
                            <button @click="Delete(val.id)" class="btn btn_delete btn-src" style="width: 60px">
                                <span class="btn_font">{{ $t("Delete") }}</span>
                            </button>
                        </div>
                        <div style="">
                            <button @click="save(val.id, val.name, val.url, val.skip, val.status, val.video)" class="btn btn_search btn-src" style="width: 60px">
                                <span class="btn_font">{{ $t("Save") }}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["val", "i"],
    data() {
        return {
            adsurl_text_top: "Ads URL",
            adsurlstatus: true,
            adsurl_text_bottom: "example: https://www.google.com/",

            adsname_text_top: "Video Ads Name",
            adsnamestatus: true,

            Video_text_top: "Ads Video",
            Video_text_bottom: "File Type is MP4 Only",

            adsskip_text_top: "Skip Time",
            adsskipstatus: true,
            status_text_top: "Video status",

            previewStatus: false,
            textalert: "",
        };
    },
    methods: {
        previewImage(event, i) {
            const self = this;
            const input = event.target;
            if (input.files.length > 0) {
                self.beforeimg = input.files;
                const file = event.target.files[0];
                const blobURL = URL.createObjectURL(file);

                self.val.video = input.files[0].type;
                onload = (e) => {
                    self.val.previewKey = input.files[0];
                };
                self.val.previewKey = blobURL;
                if (self.val.video == "video/mp4" || self.val.video == "video/webm") {
                    self.previewStatus = true;
                    self.val.video = input.files[0];
                } else {
                    self.textalert = "รองรับเฉพาะไฟล์ Mp4 หรือ WebM";
                    self.previewStatus = false;
                }
            }
        },

        save(id, name, url, skip, status, video) {
            // เช็ค URL ว่าใช่ไหม
            var regex = new RegExp('^(https?:\\/\\/)?'+ // protocol
                                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                                    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                                    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                                    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

            if (video == "" || name.trim()== "" || url.trim() == "" || regex.test(url) == false || skip == 0) {
                this.error(id, name, url, skip, status, video);
            } else {
                this.FormData(id, name, url, skip, status, video);
            }
        },
        error(id, name, url, skip, status, video) {
            if (video == null) {
                this.videostatus = false;
            } else {
                this.videostatus = true;
            }
            if (name.trim() == "") {
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

            if (url.trim() == "" || regex.test(url) == false) {
                this.adsurlstatus = false;
            } else {
                this.adsurlstatus = true;
            }
            if (skip == "") {
                this.adsskipstatus = false;
            } else {
                this.adsskipstatus = true;
            }
            if (video == null || url.trim() == "" || regex.test(url) == false || name.trim() == "" || skip == "") {
                this.$swal({
                    icon: "warning",
                    title: "Please complete the information.",
                });
            }
        },
        FormData(id, name, url, skip, status, video) {
            var formData = new FormData();
            formData.append("id", id);
            formData.append("vdo", video);
            formData.append("url", url.trim());
            formData.append("name", name.trim());
            formData.append("skip", skip);
            formData.append("status", status == true ? 1 : 2);

            this.$store.commit("Loading");
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
                        location.reload();
                    }, 1000);
                });
        },
        Delete(id) {
            var self = this;
            self.$swal({
                title: self.$t("Confirm to Delete"),
                text: self.$t("If it is deleted, it cannot be reversed"),
                icon: "warning",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                showCancelButton: true,
                confirmButtonText: self.$t("Confirm"),
                cancelButtonText: self.$t("cancel"),
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed == true) {
                    this.submitDelete(id);
                }
            });
        },
        submitDelete(id) {
            var formData = {
                id: id,
            };
            this.$store.commit("Loading");
            var self = this;
            self.$axios
                .post("api/v1/ads-vdo/delete", formData)
                .then(function (response) {
                    if (response.data.code == 200) {
                        self.$swal({
                            icon: "success",
                            title: self.$t("Delete Successful"),
                        });
                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    self.$swal({
                        icon: "error",
                        title: self.$t("Delete Failed"),
                    });
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                });
        },
    },
};
</script>
