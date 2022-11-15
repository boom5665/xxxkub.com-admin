<template>
    <div id="test1" class="content-body">
        <div class="row">
            <div class="col-lg-12 dis-flex">
                <div class="col-lg-6">
                    <div class="display-column">
                        <div class="">
                            <div class="input-group margin-r nopadding">
                                <div class="">รายการหนังทั้งหมด</div>
                                <!-- <Inputswitch :id="1" :text_input_top="$t(switchAll_text_top)" :switchvalue="switchAll" @switchchange="(n) => (switchAll = n)"></Inputswitch> -->
                            </div>
                        </div>
                        <div class="">
                            <div class="input-group margin-r nopadding">
                                <Inputcheck :id="2" :text_input_top="$t(switchPromote_text_top)" :switchvalue="switchPromote" @switchchange="(n) => (switchPromote = n)"></Inputcheck>
                            </div>
                        </div>
                        <div class="">
                            <div class="input-group margin-r nopadding">
                                <Inputcheck :id="3" :text_input_top="$t(switchNew_text_top)" :switchvalue="switchNew" @switchchange="(n) => (switchNew = n)"></Inputcheck>
                            </div>
                        </div>

                        <div class="">
                            <div class="input-group margin-r nopadding">
                                <Inputcheck :id="4" :text_input_top="$t(switchAV_text_top)" :switchvalue="switchAnime" @switchchange="(n) => (switchAnime = n)"></Inputcheck>
                            </div>
                        </div>

                        <div class="">
                            <div class="input-group margin-r nopadding">
                                <Inputcheck :id="5" :text_input_top="$t(switchAnime_text_top)" :switchvalue="switchAV" @switchchange="(n) => (switchAV = n)"></Inputcheck>
                            </div>
                        </div>
                    </div>

                    <div class="display-start" style="margin-top: 3rem">
                        <div class="col-lg-12 input-group dis-flex nopadding">
                            <div class="col-lg-5 nopadding margin-left-h">
                                <div class="">{{ $t("Movie") }}</div>
                            </div>
                            <div class="col-lg-5 nopadding margin-left-h">
                                <div class="">{{ $t("Selected Movie") }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="display-start">
                        <div class="col-lg-12 input-group dis-flex">
                            <div class="col-lg-5 border-cate over-scoll">
                                <div v-for="(value, i) in categoryList" :key="i">
                                    <div class="cate-arrow" :class="value.status == false ? 'dis-cate' : ''" @click="CateSelect(value.id, value.name, value.status, i, value.statusCate)">
                                        <div class="padding-l">{{ value.name }} ({{ value.statusCate == 1 ? "Category" : "Type" }})</div>
                                        <div class="padding-r"><font-awesome-icon icon="circle-arrow-right" /></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5 border-cate over-scoll">
                                <div class="cate-arrow" v-for="(value, i) in cateretrun" :key="i">
                                    <!-- {{value}} -->
                                    <div class="cate-arrow" @click="CateDiscard(value.id, value.name, value.status, i)">
                                        <div class="padding-l">{{ value.name }}</div>
                                        <div class="padding-r"><font-awesome-icon icon="circle-xmark" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 border-cate">
                    <div class="">{{ $t("Example") }}</div>
                    <div id="Home" class="Zone-position">
                        <div class="pagelistZone">
                            <div class="pageZone-header-page">{{ $t("Movie Header") }}</div>
                            <div class="pagelistZone-body">
                                <div class="pagelistZone-body-poster-page">{{ $t("Movie Posters") }}</div>
                            </div>
                            <div v-if="switchPromote == true" class="pageZone-body-page">{{ $t("Recommended Movie") }}</div>
                            <div v-if="switchNew == true" class="pageZone-body-page">{{ $t("List New Movie") }}</div>

                            <div v-if="switchAnime == true" class="pageZone-body-page">{{ $t("List Anime") }}</div>
                            <div v-for="(value, i) in cateretrun" :key="i">
                                <div class="pageZone-body-page">{{ value.name }}</div>
                            </div>
                            <div v-if="switchAV == true" class="pageZone-body-page">{{ $t("List Av") }}</div>
                            <div class="pageZone-footer-page">{{ $t("Movie Footer") }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-12 text-end">
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
            switchPromote_text_top: "List Recommended Movie",

            switchPromote: "",
            // switchVstatus: true,

            switchNew_text_top: "List New Movie",

            switchNew: "",
            // switchVstatus: true,

            switchAV_text_top: "List Anime",

            switchAV: "",
            // switchVstatus: true,

            switchAnime_text_top: "List Av",

            switchAnime: "",
            // switchVstatus: true,

            switchAll_text_top: "Open All",
            // switchAnime_text_bottom: "กรุณาเลือกสถานะ เปิด-ปิด",
            switchAll: true,
            // switchVstatus: true,

            tab: null,
            icon_btn_Clear: "Clear",
            text_save: "Save",
            settingId: "",
            categoryList: [],
            cateretrun: [],
        };
    },
    watch: {
        switchPromote(val) {
            if (val != "") {
                this.switchPromote = val;
            }
            if (val == false) {
                this.switchAll = false;
            }
        },
        switchNew(val) {
            if (val != "") {
                this.switchNew = val;
            }
            if (val == false) {
                this.switchAll = false;
            }
        },
        switchAV(val) {
            if (val != "") {
                this.switchAV = val;
            }
            if (val == false) {
                this.switchAll = false;
            }
        },
        switchAnime(val) {
            if (val != "") {
                this.switchAnime = val;
            }
            if (val == false) {
                this.switchAll = false;
            }
        },
        switchAll(val) {
            if (val != "") {
                this.switchAll = val;
            }
            if (val == true) {
                this.switchAnime = true;
                this.switchAV = true;
                this.switchNew = true;
                this.switchPromote = true;
            }
        },
    },
    beforeCreate() {
        this.$store.commit("BreadChange", {
            title: "Setting Webpage",
            subtitle: "Setting",
        });
    },
    mounted() {
        this.get_data();
    },
    methods: {
        CateSelect(id, name, status, i, statusCate) {
            if (status == true) {
                this.cateretrun.push({ id: id, name: name, status: false, statusCate: statusCate });

                this.categoryList[i].status = false;
            }
        },
        CateDiscard(id, name, status, i) {
            status = false;
            if (status == false) {
                this.cateretrun.splice(i, 1);

                for (let index = 0; index < this.categoryList.length; index++) {
                    if (this.categoryList[index].id == id) {
                        this.categoryList[index].status = true;
                        break;
                    }
                }
            }
        },

        save() {
            this.FormData();
        },

        get_data() {
            this.$axios
                .$post("api/v1/web/get-data-setting")
                .then((response) => {
                    this.settingId = response.result.show_catelist.id;
                    this.switchPromote = response.result.show_catelist.show_movie_hot == 1 ? true : false;
                    this.switchNew = response.result.show_catelist.show_movie_new == 1 ? true : false;
                    this.switchAnime = response.result.show_catelist.show_anime == 1 ? true : false;
                    this.switchAV = response.result.show_catelist.show_av == 1 ? true : false;

                    if (response.result.data_type) {
                        for (let i = 0; i < response.result.data_type.length; i++) {
                            this.categoryList.push({ id: response.result.data_type[i].id, name: response.result.data_type[i].name_th, status: true, statusCate: 1 });
                        }
                    }
                    if (response.result.data_cate) {
                        for (let i = 0; i < response.result.data_cate.length; i++) {
                            this.categoryList.push({ id: response.result.data_cate[i].id, name: response.result.data_cate[i].name_th, status: true, statusCate: 0 });
                        }
                    }

                    if (response.result.setting_web) {
                        for (let i = 0; i < response.result.setting_web.length; i++) {
                            this.cateretrun.push({ id: response.result.setting_web[i].cate_id, name: response.result.setting_web[i].name_th, status: true, statusCate: response.result.setting_web[i].cate_type });
                            for (let n = 0; n < this.categoryList.length; n++) {
                                if (response.result.setting_web[i].cate_id == this.categoryList[n].id) {
                                    this.categoryList[n].status = false;
                                }
                            }
                        }
                    }

                })
                .catch((error) => {
                    console.log(error);
                });
        },

        FormData() {
            var formData = {
                data_show_cate_list: {
                    id: this.settingId,
                    show_av: this.switchAV == true ? 1 : 0,
                    show_anime: this.switchAnime == true ? 1 : 0,
                    show_movie_hot: this.switchNew == true ? 1 : 0,
                    show_movie_new: this.switchPromote == true ? 1 : 0,
                },
                date_sort_cate_type: [],
            };
            this.$store.commit("Loading");
            if (this.cateretrun) {
                for (let i = 0; i < this.cateretrun.length; i++) {
                    formData.date_sort_cate_type.push({
                        seq: i + 1,
                        cate_type: this.cateretrun[i].statusCate,
                        cate_id: this.cateretrun[i].id,
                    });
                }
            }
            this.$store.commit("Loading");
            var self = this;
            self.$axios
                .post("api/v1/web-page/manage-update-setting", formData)
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




