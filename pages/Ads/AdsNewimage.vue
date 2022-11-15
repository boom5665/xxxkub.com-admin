<template>
    <div id="test1" class="content-body" style="width: max-content">
        <div
            class="row"
            style="width: 100%; display: block;">
            <div class="col-lg-12" style="width: 700px;">
                <div class="display-start">
                    <div class="input-group" style="width: 700px;">
                        <InputimgAds :text_input_top="$t(image_text_top)" :text_input_bottom="$t(image_text_bottom)" :status_value="imagestatus" v-model="image"></InputimgAds>
                    </div>
                </div>
                <div class="display-start">
                    <div class="input-group">
                        <InputText :text_input_top="$t(adsname_text_top)" :status_value="adsnamestatus" v-model="adsname"></InputText>
                    </div>
                </div>
                <div class="display-start">
                    <div class="input-group">
                        <InputUrl :text_input_top="$t(adsurl_text_top)" :text_input_bottom="adsurl_text_bottom" :status_value="adsurlstatus" v-model="adsurl"></InputUrl>
                    </div>
                </div>
            </div>

            <div class="col-lg-12 display-start ">
                <div class="col-lg-8 nopadding">{{$t('Ads Page (Choose from below)')}} :</div>
                <div class="col-lg-4 nopadding input-group">
                    <input type="hidden" v-model="page" />
                    <div class="" v-if="adsPositionstatus == true">{{ $t(page) }} </div>
                    <div class="alert-img" v-else>{{$t('Please select an ads location.')}}</div>
                </div>
            </div>
            <div class="col-lg-12 display-start">
                <div class="col-lg-8 nopadding">{{$t('Ads Position (Choose from below)')}} :</div>
                <div class="col-lg-4 nopadding input-group">
                    <input type="hidden" v-model="adsPosition" />
                    <div class="" v-if="adsPositionstatus == true">{{ $t(adsPosition) }} </div>
                    <div class="alert-img" v-else>{{$t('Please select an ads location.')}}</div>
                </div>
            </div>

            <div class="col-lg-12 select-position">
                <div class="" style="width: 100%" v-for="(model, i) in models" :key="i">
                   {{ $t(model) }}
                </div>
                <div class="tabs">
                    <div>
                        <!-- <v-tab-item>
                            <div id="Home" class="">
                                <div class="pagelistZone">
                                    <div class="pageZone-header">{{$t('Poster')}}</div>
                                    <div class="pagelistZone-body">
                                        <div class="pagelistZone-body-content">{{$t('Content')}}</div>
                                    </div>
                                    <div class="d-flex-center">
                                        <div @click="adsposition('Bottom-AllPage', 'All')" class="position-ads" :class="adsPosition == 'Bottom(AllPage)' ? 'active' : ''">{{$t('Bottom (All Page)')}}</div>
                                    </div>
                                </div>
                            </div>
                        </v-tab-item> -->
                        <div>
                            <div id="PLAYER" class="">
                                <div class="pagelistZone">
                                    <!-- <div class="pageZone-header">Header</div> -->
                                    <div class="pagelistZone-body">
                                        <div class="playerZone">
                                            <div class="zone-left">
                                                <div @click="adsposition('All-Top-Left', 'All')" class="player-ads-left" :class="adsPosition == 'All-Top-Left' ? 'active' : ''">{{$t('Top Left')}}</div>
                                            </div>
                                            <div class="zone-center">
                                                <div @click="adsposition('All-Top-Center', 'All')" class="player-ads-top" :class="adsPosition == 'All-Top-Center' ? 'active' : ''">{{$t('Top Center')}}</div>
                                            </div>

                                            <div class="zone-left">
                                                <div @click="adsposition('All-Top-Right', 'All')" class="player-ads-left" :class="adsPosition == 'All-Top-Right' ? 'active' : ''">{{$t('Top Right')}}</div>
                                            </div>
                                        </div>
                                        <div class="pagelistZone-body-content">{{$t('Content')}}</div>
                                    </div>

                                    <!-- <button type="button" class="pagelistZone-body-banner banner-select" id="home-center" data-id="12" onclick="bannerSelect(this)" style="text-transform: capitalize">banner</button> -->

                                    <!-- <div class="pagelistZone-body-content">{{$t('Related Movies')}}</div> -->
                                    <div class="d-flex-center">
                                        <div @click="adsposition('All-Bottom', 'All')" class="position-ads" :class="adsPosition == 'All-Bottom' ? 'active' : ''">{{$t('Bottom')}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <v-tab-item>
                            <div id="FootballLIST" class="">
                                <div class="pagelistZone">

                                    <div class="pagelistZone-body">
                                        <div class="playerZone">
                                            <div class="zone-left">
                                                <div @click="adsposition('FootballList-Left', 'FootballLIST')" class="player-ads-left" :class="adsPosition == 'FootballList-Left' ? 'active' : ''">{{$t('Football Left')}}</div>
                                            </div>
                                            <div class="zone-center">
                                                <div @click="adsposition('FootballList-Top-center', 'FootballLIST')" class="player-ads-top" :class="adsPosition == 'FootballList-Top-center' ? 'active' : ''">{{$t('Football Top Center')}}</div>
                                            </div>

                                            <div class="zone-left">
                                                <div @click="adsposition('FootballList-Right', 'FootballLIST')" class="player-ads-left" :class="adsPosition == 'FootballList-Right' ? 'active' : ''">{{$t('Football Right')}}</div>
                                            </div>
                                        </div>
                                        <div class="pagelistZone-body-content">{{$t('Football Content')}}</div>
                                    </div>


                                    <div class="d-flex-center">
                                        <div @click="adsposition('FootballList-Under-content', 'FootballLIST')" class="position-ads" :class="adsPosition == 'FootballList-Under-content' ? 'active' : ''">{{$t('Football Under Content')}}</div>
                                    </div>
                                    <div class="playerZone">
                                        <div class="zone-left">
                                            <div @click="adsposition('FootballList-Bottom-Left', 'FootballLIST')" class="player-ads-left" :class="adsPosition == 'FootballList-Bottom-Left' ? 'active' : ''">{{$t('Football Bottom Left')}}</div>
                                        </div>
                                        <div class="zone-center">
                                            <div @click="adsposition('FootballList-Bottom-center', 'FootballLIST')" class="player-ads-top" :class="adsPosition == 'FootballList-Bottom-center' ? 'active' : ''">{{$t('Football Bottom Center')}}</div>
                                        </div>

                                        <div class="zone-left">
                                            <div @click="adsposition('FootballList-Bottom-Right', 'FootballLIST')" class="player-ads-left" :class="adsPosition == 'FootballList-Bottom-Right' ? 'active' : ''">{{$t('Football Bottom Right')}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </v-tab-item> -->
                    </div>
                </div>
            </div>

            <div class="col-lg-12 text-end">
                <button @click="save()" class="btn btn_search btn-src"><span class="btn_font">{{$t('Save')}}</span></button>
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

            adsname_text_top: "Ads Name",
            adsname_text_bottom: "",
            adsname: "",
            adsnamestatus: true,

            image_text_top: "Ads Image",
            image_text_bottom: "File size is not more than 100 MB",
            image: null,
            imagestatus: true,

            adsPosition: "",
            adsPositionstatus: true,
            page: "",
            FootballList: "",

            switchV_text_top: "Status",
            switchV_text_bottom: "Please select a status เปิด-ปิด",
            switchV: true,
            // switchVstatus: true,

            tab: null,
            icon_btn_Clear: "Clear",
            text_save: "Save",
            icon_btn_submit: "submit",

            models: ["HOME"],
        };
    },
    beforeCreate() {
        this.$store.commit("BreadChange", {
            title: "Add Advertisement Image",
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
        adsorder(val) {
            if (val.trim() != "") {
                this.adsorderstatus = true;
            }
        },
        switchV(val) {
            if (val.trim() != "") {
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
            this.image = null;
            this.adsname = "";
            this.adsurl = "";
            this.adsPosition = "";
            this.page = "";
        },
        save() {
            // เช็ค URL ว่าใช่ไหม
            var regex = new RegExp('^(https?:\\/\\/)?'+ // protocol
                                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                                    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                                    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                                    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

            if (this.image == null || this.adsname.trim() == "" || this.adsurl.trim() == "" || regex.test(this.adsurl) == false || this.adsPosition.trim() == "") {
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

            if (this.adsurl.trim() == "" || regex.test(this.adsurl) == false) {
                this.adsurlstatus = false;
            } else {
                this.adsurlstatus = true;
            }
            if (this.adsPosition.trim() == "") {
                this.adsPositionstatus = false;
            } else {
                this.adsPositionstatus = true;
            }

            if (this.image == null || this.adsname.trim() == "" || this.adsurl.trim() == "" || regex.test(this.adsurl) == false || this.adsPosition.trim() == "") {
                this.$swal({
                    icon: "warning",
                    title: "Please complete the information.",
                });
            }
        },

        FormData() {
           this.$store.commit("Loading");
            var formData = new FormData();
            formData.append("image", this.image);
            formData.append("name", this.adsname.trim());
            formData.append("position", this.adsPosition.trim());
            formData.append("url", this.adsurl.trim());
            formData.append("page", this.page.trim());
            var self = this;
            this.$axios
                .post("api/v1/manage-create-ads", formData)
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




