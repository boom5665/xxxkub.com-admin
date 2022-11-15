<template>
    <div id="test1" class="content-body">
        <div style="width: 100%">
            <div>
                <div class="display-start">
                    <div class="col-lg-1 input-group">
                        <InputFile :text_input_top="image_text_top" :text_input_bottom="image_text_bottom" :status_value="imagestatus" v-model="image"></InputFile>
                    </div>
                </div>
                <div class="display-start">
                    <div class="col-lg-8 input-group">
                        <InputText :text_input_top="adsname_text_top" :text_input_bottom="adsname_text_bottom" :status_value="adsnamestatus" v-model="adsname"></InputText>
                    </div>
                </div>
                <div class="display-start">
                    <div class="col-lg-8 input-group" style="display: flex">
                        <Inputswitch :text_input_top="status_text_top" :switchvalue="status" @switchchange="(n) => (status = n)"></Inputswitch>
                    </div>
                </div>
                <div class="display-start">
                    <div class="col-lg-8 input-group">
                        <InputText :text_input_top="adsurl_text_top" :text_input_bottom="adsurl_text_bottom" :status_value="adsurlstatus" v-model="adsurl"></InputText>
                    </div>
                </div>
            </div>
            <div class="display-start">
                <div class="col-lg-3">Ads Page (เลือกจากด้านล่าง)</div>
                <div class="col-lg-8 input-group">
                    <input type="hidden" v-model="page" />
                    <div class="" v-if="adsPositionstatus == true">{{ page }}</div>
                    <div class="alert-img" v-else>Please select an ad location.</div>
                </div>
            </div>
            <div class="display-start">
                <div class="col-lg-3">Ads Position (เลือกจากด้านล่าง)</div>
                <div class="col-lg-8 input-group">
                    <input type="hidden" v-model="adsPosition" />
                    <div class="" v-if="adsPositionstatus == true">{{ adsPosition }}</div>
                    <div class="alert-img" v-else>Please select an ad location.</div>
                </div>
            </div>

            <div class="col-lg-8 select-position">
                <div class="" style="width: 100%">
                    <v-tabs v-model="tab" align-with-title>
                        <v-tabs-slider color="yellow"></v-tabs-slider>
                        <v-tab v-for="(model, i) in models" :key="i">
                            {{ model }}
                        </v-tab>
                    </v-tabs>
                </div>
                <div class="tabs">
                    <v-tabs-items v-model="tab">
                        <v-tab-item>
                            <div id="Home" class="">
                                <div class="pagelistZone">
                                    <div class="pageZone-header">Poster</div>
                                    <div class="pagelistZone-body">
                                        <div class="pagelistZone-body-content">Content</div>
                                    </div>
                                    <div class="d-flex-center">
                                        <div @click="adsposition('Bottom-AllPage', 'All')" class="position-ads" :class="adsPosition == 'Bottom(AllPage)' ? 'active' : ''">Bottom (AllPage)</div>
                                    </div>
                                </div>
                            </div>
                        </v-tab-item>
                        <v-tab-item>
                            <div id="PLAYER" class="">
                                <div class="pagelistZone">
                                    <!-- <div class="pageZone-header">Header</div> -->
                                    <div class="pagelistZone-body">
                                        <div class="playerZone">
                                            <div class="">
                                                <div @click="adsposition('Player-Top-Left', 'Player')" class="player-ads-left" :class="adsPosition == 'Player-Top-Left' ? 'active' : ''">Player-Top-Left</div>
                                            </div>
                                            <div class="">
                                                <div @click="adsposition('Player-Top-center', 'Player')" class="player-ads-top" :class="adsPosition == 'Player-Top-center' ? 'active' : ''">Player-Top-center</div>
                                            </div>

                                            <div class="">
                                                <div @click="adsposition('Player-Top-Right', 'Player')" class="player-ads-left" :class="adsPosition == 'Player-Top-Right' ? 'active' : ''">Player-Top-Right</div>
                                            </div>
                                        </div>
                                        <div class="pagelistZone-body-content">Player-content</div>
                                    </div>

                                    <!-- <button type="button" class="pagelistZone-body-banner banner-select" id="home-center" data-id="12" onclick="bannerSelect(this)" style="text-transform: capitalize">banner</button> -->
                                    <div class="d-flex-center">
                                        <div @click="adsposition('Player-Under-content', 'Player')" class="position-ads" :class="adsPosition == 'Player-Under-content' ? 'active' : ''">Player-Under-content</div>
                                    </div>
                                    <div class="pagelistZone-body-content">More Video</div>
                                </div>
                            </div>
                        </v-tab-item>
                        <v-tab-item>
                            <div id="FootballLIST" class="">
                                <div class="pagelistZone">
                                    <!-- <div class="pageZone-header">Header</div> -->
                                    <div class="pagelistZone-body">
                                        <div class="playerZone">
                                            <div class="">
                                                <div @click="adsposition('FootballList-Left', 'FootballLIST')" class="player-ads-left" :class="adsPosition == 'FootballList-Left' ? 'active' : ''">FootballList-Left</div>
                                            </div>
                                            <div class="">
                                                <div @click="adsposition('FootballList-Top-center', 'FootballLIST')" class="player-ads-top" :class="adsPosition == 'FootballList-Top-center' ? 'active' : ''">FootballList-Top-center</div>
                                            </div>

                                            <div class="">
                                                <div @click="adsposition('FootballList-Right', 'FootballLIST')" class="player-ads-left" :class="adsPosition == 'FootballList-Right' ? 'active' : ''">FootballList-Right</div>
                                            </div>
                                        </div>
                                        <div class="pagelistZone-body-content">FootballList-content</div>
                                    </div>

                                    <!-- <button type="button" class="pagelistZone-body-banner banner-select" id="home-center" data-id="12" onclick="bannerSelect(this)" style="text-transform: capitalize">banner</button> -->
                                    <div class="d-flex-center">
                                        <div @click="adsposition('FootballList-Under-content', 'FootballLIST')" class="position-ads" :class="adsPosition == 'FootballList-Under-content' ? 'active' : ''">FootballList-Under-content</div>
                                    </div>
                                    <div class="playerZone">
                                        <div class="">
                                            <div @click="adsposition('FootballList-Bottom-Left', 'FootballLIST')" class="player-ads-left" :class="adsPosition == 'FootballList-Bottom-Left' ? 'active' : ''">FootballList-Bottom-Left</div>
                                        </div>
                                        <div class="">
                                            <div @click="adsposition('FootballList-Bottom-center', 'FootballLIST')" class="player-ads-top" :class="adsPosition == 'FootballList-Bottom-center' ? 'active' : ''">FootballList-Bottom-center</div>
                                        </div>

                                        <div class="">
                                            <div @click="adsposition('FootballList-Bottom-Right', 'FootballLIST')" class="player-ads-left" :class="adsPosition == 'FootballList-Bottom-Right' ? 'active' : ''">FootballList-Bottom-Right</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </v-tab-item>
                    </v-tabs-items>
                </div>
            </div>

            <div class="col-lg-11 text-end">
                <button @click="Clear" class="btn btn_Clear btn-src"><span class="btn_font">Clear</span></button>
                <button @click="save()" class="btn btn_Save btn-src"><span class="btn_font">Save</span></button>
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

            adsname_text_top: "Ads Name",
            adsname_text_bottom: "",
            adsname: "",
            adsnamestatus: true,

            image_text_top: "Ads Image",
            image_text_bottom: "ขนาดไฟล์ไม่เกิน 100 MB",
            image: null,
            imagestatus: true,

            status_text_top: "Ads Status",
            // status_text_bottom: "",
            status: "",
            statusstatus: true,

            adsPosition: "",
            adsPositionstatus: true,
            page: "",
            FootballList: "",

            switchV_text_top: "สถานะโฆษณา",
            switchV_text_bottom: "กรุณาเลือกสถานะ เปิด-ปิด",
            switchV: true,
            // switchVstatus: true,

            tab: null,
            icon_btn_Clear: "Clear",
            text_save: "Save",
            icon_btn_submit: "submit",

            models: ["HOME", "PLAYER", "FootballLIST"],
            texts: ["text-item1", "text-item2", "text-item3", "text-item4"],
        };
    },
    beforeCreate() {
        this.$store.commit("BreadChange", {
            title: "แก้ไขโฆษณารูปภาพ",
            subtitle: "โฆษณารูปภาพ",
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
        adsorder(val) {
            if (val != "") {
                this.adsorderstatus = true;
            }
        },
        status(val) {
            if (val != "") {
                this.switchV = val;
            }
        },
    },

    methods: {
        adsposition(position, page) {
            this.page = page;
            this.adsPosition = position;
            this.adsPositionstatus = true;
            let text = position;
            const myArray = text.split("-");
        },
        Clear() {
            this.image = "";
            this.adsname = "";
            this.adsurl = "";
            this.adsPosition = "";
            this.page = "";
        },
        save() {
            if (this.image == null || this.adsname == "" || this.adsurl == "" || this.adsPosition == "") {
                this.error();
            } else {
                this.FormData();
            }
        },
        error() {
            if (this.image == null) {
                this.imagestatus = false;
            } else {
                this.imagestatus = true;
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
            if (this.adsPosition == "") {
                this.adsPositionstatus = false;
            } else {
                this.adsPositionstatus = true;
            }

            if (this.image == null || this.adsname == "" || this.adsurl == "" || this.adsorder == "") {
                this.$swal({
                    icon: "warning",
                    title: "Please complete the information.",
                });
            }
        },

        get_data() {
            // var self = this;
            this.idpage = parseInt(this.$route.params.id);
            var body = {
                id: this.idpage,
            };
            this.$axios
                .$post("api/v1/manage-detail-ads ", body)
                .then((response) => {
                    this.image = response.result.picture;
                    this.image_default = response.result.picture;
                    this.id = response.result.id;
                    this.adsname = response.result.name;
                    this.status = response.result.status == 1 ? true : false;
                    this.adsurl = response.result.url;
                    this.adsPosition = response.result.position;
                    this.page = response.result.page;
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        FormData() {
            var formData = new FormData();
            formData.append("id", this.id);
            formData.append("image", this.image);
            formData.append("name", this.adsname);
            formData.append("page", this.page);
            formData.append("position", this.adsPosition);
            formData.append("url", this.adsurl);
            formData.append("status", this.status == true ? 1 : 2);

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
                            // self.get_data();
                            self.$router.push("/Ads/Adsimg");
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
                        // self.get_data();
                        this.$router.push("/Ads/Adsimg");
                    }, 1000);
                });
        },
    },
};
</script>




