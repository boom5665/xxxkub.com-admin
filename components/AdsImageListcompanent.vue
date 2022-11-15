<template>
    <div class="">
        <div class="addbody">
            <div class="columPos">
                <div style="margin-bottom: 5px">{{ $t("Example") }}</div>

                <template v-if="v.position == 'All-Top-Left'">
                    <img src="~assets/images/EX_all_left.jpg" class="imgads" />
                </template>
                <template v-if="v.position == 'All-Top-Right'">
                    <img src="~assets/images/EX_all_right.jpg" class="imgads" />
                </template>
                <template v-if="v.position == 'All-Bottom'">
                    <img src="~assets/images/EX_all_Bottom.jpg" class="imgads" />
                </template>
                <template v-if="v.position == 'All-Top-Center'">
                    <img src="~assets/images/EX_all_center.jpg" class="imgads" />
                </template>
            </div>
            <div class="columtext">
                <div style="margin-bottom: 5px">{{ $t("Preview Image") }}</div>
                <template v-if="previewStatus == true">
                    <div class="file">
                        <div class="">
                            <img :src="v.previewKey" style="width: 100%" />
                        </div>
                    </div>
                </template>
                <template v-else-if="textalert">
                    <p class="mb-0" style="color: red;">{{ textalert }}</p>
                </template>
                <template v-else>
                    <div class="file">
                        <div class="">
                            <img :src="v.picture" style="width: 100%" />
                        </div>
                    </div>
                </template>
            </div>
            <div class="columAct pad-10">
                <div class="columActleft">
                    <div class="display-start">
                        <div class="input-group">
                            <!-- {{ v.id }} -->
                            <InputText :text_input_top="$t(adsname_text_top)" :text_input_bottom="adsname_text_bottom" :status_value="adsnamestatus" v-model="v.name"></InputText>
                        </div>
                    </div>
                    <div class="display-start">
                        <div class="input-group">
                            <InputUrl :text_input_top="$t(adsurl_text_top)" :text_input_bottom="adsurl_text_bottom" :status_value="adsurlstatus" v-model="v.url"></InputUrl>
                        </div>
                    </div>
                    <div class="display-start p-top-ten">
                        <div class="input-group" style="display: flex">
                            <Inputswitch :text_input_top="$t(status_text_top)" :switchvalue="v.status" :id="v.id" @switchchange="(n) => (v.status = n)"></Inputswitch>
                        </div>
                    </div>
                    <div class="display-start">
                        <div class="input-group" style="flex-direction: column">
                            <div class="display-start" style="padding: 10px 0px">
                                <div class="input-group">
                                    <input type="hidden" v-model="v.page" />
                                    <div class="" v-if="adsPositionstatus == true">{{ $t("Page") }} : {{ $t(v.page + " Page") }}</div>
                                </div>
                            </div>
                            <div class="display-start">
                                <div class="input-group">
                                    <input type="hidden" v-model="v.position" />
                                    <div class="" v-if="adsPositionstatus == true">{{ $t("Position") }} : {{ $t(v.position) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <div class="" style="display: flex; flex-direction: column; padding-bottom: 15px">
                            <label for="" class="input-label"> {{ $t(image_text_top) }} </label>
                            <div class="imageinput">
                                <input type="file" ref="fileupload" accept="image/*" :id="'imageInput' + v.id" @change="previewImage($event, index)" />
                                <label :for="'imageInput' + v.id" class="imagebutton">{{ $t("Select Picture") }}</label>
                                <!-- <div class="input-label-bottom" style="text-align: left">{{ $t(image_text_bottom) }}</div> -->
                            </div>
                        </div>
                        <div class="display-start">
                            <div style="">
                                <button @click="showmodal(index)" id="myBtn" class="btn_edit btn-src" style="width: 100px">
                                    <span class="btn_font">{{ $t("Position") }}</span>
                                </button>
                            </div>
                            <div style="">
                                <button @click="Delete(v.id)" class="btn btn_delete btn-src" style="width: 60px">
                                    <span class="btn_font">{{ $t("Delete") }}</span>
                                </button>
                            </div>
                            <div style="">
                                <button @click="save(v.id, v.name, v.status, v.url, v.picture, v.page, v.position, v.video)" class="btn btn_search btn-src" style="width: 60px">
                                    <span class="btn_font">{{ $t("Save") }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <transition name="fade" appear>
                    <div class="modal-overlay" v-if="v.statusmodal" @click="v.statusmodal = false"></div>
                </transition>
                <transition name="pop" appear>
                    <div class="modal" role="dialog" v-if="v.statusmodal">
                        <div class="display-start">
                            <div class="col-lg-8" style="text-align: left">{{ $t("Ads Page (Choose from below)") }} :</div>
                            <div class="col-lg-4 input-group">
                                <div class="" v-if="adsPositionstatus == true">{{ $t(v.page + " Page") }}</div>
                                <div class="alert-img" v-else>{{ $t("Please select an ad location.") }}</div>
                            </div>
                        </div>
                        <div class="display-start">
                            <div class="col-lg-8" style="text-align: left">{{ $t("Ads Position (Choose from below)") }} :</div>
                            <div class="col-lg-4 input-group">
                                <div class="" v-if="adsPositionstatus == true">{{ $t(v.position) }}</div>
                                <div class="alert-img" v-else>{{ $t("Please select an ad location.") }}</div>
                            </div>
                        </div>

                        <div class="col-lg-11 select-position">
                            <div class="" style="width: 100%">
                                <v-tabs v-model="tab" align-with-title>
                                    <v-tabs-slider color="yellow"></v-tabs-slider>
                                    <v-tab v-for="(model, int) in models" :key="int">
                                        {{ $t(model) }}
                                    </v-tab>
                                </v-tabs>
                            </div>
                            <div class="tabs">
                                <v-tabs-items v-model="tab">
                                    <!-- <v-tab-item>
                                        <div id="Home" class="">
                                            <div class="pagelistZone">
                                                <div class="pageZone-header">{{ $t("Poster") }}</div>
                                                <div class="pagelistZone-body">
                                                    <div class="pagelistZone-body-content">{{ $t("Content") }}</div>
                                                </div>
                                                <div class="d-flex-center">
                                                    <div @click="adsposition('Bottom-AllPage', 'All')" class="position-ads" :class="v.position == 'Bottom-AllPage' ? 'active' : ''">{{ $t("Bottom (All Page)") }}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </v-tab-item> -->
                                    <v-tab-item>
                                        <div id="PLAYER" class="">
                                            <div class="pagelistZone">
                                                <!-- <div class="pageZone-header">Header</div> -->
                                                <div class="pagelistZone-body">
                                                    <div class="playerZone">
                                                        <div class="zone-left">
                                                            <div @click="adsposition('All-Top-Left', 'All')" class="player-ads-left" :class="v.position == 'All-Top-Left' ? 'active' : ''">{{ $t("Top Left") }}</div>
                                                        </div>
                                                        <div class="zone-center">
                                                            <div @click="adsposition('All-Top-Center', 'All')" class="player-ads-top" :class="v.position == 'All-Top-Center' ? 'active' : ''">{{ $t("Top Center") }}</div>
                                                        </div>

                                                        <div class="zone-left">
                                                            <div @click="adsposition('All-Top-Right', 'All')" class="player-ads-left" :class="v.position == 'All-Top-Right' ? 'active' : ''">{{ $t("Top Right") }}</div>
                                                        </div>
                                                    </div>
                                                    <div class="pagelistZone-body-content">{{ $t("Content") }}</div>
                                                </div>

                                                <!-- <button type="button" class="pagelistZone-body-banner banner-select" id="home-center" data-id="12" onclick="bannerSelect(this)" style="text-transform: capitalize">banner</button> -->

                                                <!-- <div class="pagelistZone-body-content">{{$t('Related Movies')}}</div> -->
                                                <div class="d-flex-center">
                                                    <div @click="adsposition('All-Bottom', 'All')" class="position-ads" :class="v.position == 'All-Bottom' ? 'active' : ''">{{ $t("Bottom") }}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </v-tab-item>
                                </v-tabs-items>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["value", "index", "val", "i", "v", "k"],
    data() {
        return {
            adsurl_text_top: "Ads URL",
            adsurl_text_bottom: "example: https://www.google.com/",
            adsurlstatus: true,

            adsname_text_top: "Ads Name",
            adsname_text_bottom: "",
            adsnamestatus: true,

            image_text_top: "Ads Image",
            // image_text_bottom: "ขนาดไฟล์ไม่เกิน 100 MB",

            imagestatus: true,
            image: null,
            preview: null,
            beforeimg: null,
            status_text_top: "Ads Status",
            // status_text_bottom: "",

            statusstatus: true,

            position: "",
            adsPositionstatus: true,
            page: "",
            FootballList: "",

            switchV_text_top: "สถานะโฆษณา",
            switchV_text_bottom: "กรุณาเลือกสถานะ เปิด-ปิด",
            switchV: true,
            switchVstatus: true,
            tab: null,
            models: ["HOME"],
            previewStatus: false,
            textalert: "",
        };
    },
    methods: {
        previewImage(event) {
            const self = this;
            const input = event.target;
            if (input.files.length > 0) {
                self.beforeimg = input.files;

                const reader = new FileReader();
                self.v.picture = input.files[0].type;

                reader.onload = (e) => {
                    self.v.previewKey = e.target.result;
                };
                reader.readAsDataURL(input.files[0]);
                if (self.v.picture == "image/jpeg" || self.v.picture == "image/gif" || self.v.picture == "image/png" || self.v.picture == "image/webp") {
                    self.previewStatus = true;
                    self.v.picture = input.files[0]
                } else {
                     self.textalert = "รองรับเฉพาะไฟล์ Jpeg Gif Png และ Webp";
                    self.previewStatus = false;
                }
            } else {
                if (self.beforeimg) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        self.v.previewKey = e.target.result;
                    };
                    reader.readAsDataURL(self.beforeimg[0]);
                }
            }
        },
        showmodal() {
            this.v.statusmodal = true;
        },
        adsposition(position, page) {
            this.v.page = page;
            this.v.position = position;
            let text = position;
            const myArray = text.split("-");
        },

        Delete(id) {
            this.$swal({
                title: "ยืนยันที่จะลบ",
                text: "ถ้าตกลงลบแล้วจะไม่สามารถย้อนกลับได้",
                icon: "warning",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                showCancelButton: true,
                confirmButtonText: "ตกลง",
                cancelButtonText: "ยกเลิก",
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
            this.$axios
                .post("api/v1/manage-delete-ads", formData)
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
                    self.$swal({
                        icon: "error",
                        title: self.$t("Delete Failed"),
                    });
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                });
        },
        save(id, name, status, url, picture, page, position) {
            // เช็ค URL ว่าใช่ไหม
            var regex = new RegExp('^(https?:\\/\\/)?'+ // protocol
                                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                                    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                                    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                                    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

            if (name == "" || url == "" || regex.test(url) == false) {
                this.error(name, url);
            } else {
                this.FormData(id, name, status, url, picture, page, position);
            }
        },
        error(name, url) {
            if (name == "") {
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

            if (url == "" || regex.test(url) == false) {
                this.adsurlstatus = false;
            } else {
                this.adsurlstatus = true;
            }

            if (name == "" || url == "" || regex.test(url) == false) {
                this.$swal({
                    icon: "warning",
                    title: "Please complete the information.",
                });
            }
        },
        FormData(id, name, status, url, picture, page, position) {
            var formData = new FormData();
            formData.append("id", id);
            formData.append("image", picture);
            formData.append("name", name.trim());
            formData.append("page", page.trim());
            formData.append("position", position.trim());
            formData.append("url", url.trim());
            formData.append("status", status == true ? 1 : 2);
            this.$store.commit("Loading");
            var self = this;
            this.$axios
                .post("api/v1/manage-update-ads", formData)
                .then(function (response) {
                    if (response.data.code == 200) {
                        self.$swal({
                            icon: "success",
                            title: self.$t("Save Successful"),
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
                        title: self.$t("Save Failed"),
                    });
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                });
        },
    },
};
</script>
