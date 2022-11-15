<template>
    <div id="test1" class="content-body">
        <div style="width: 100%">
            <div style="display: flex; justify-content: space-between">
                <div style="display: flex">
                    <!-- <div>
                        <div class="input-group">
                            <div class="user-addon">
                                <img src="~assets/images/icon_search.png" class="size_icon_search" alt="" />
                            </div>
                            <input type="text" class="input-all form-control ng-pristine ng-valid ng-touched" style="width: 250px !important; padding-left: 40px" v-model="search" placeholder="" />
                        </div>
                    </div> -->

                    <!-- <div class="">
                        <div class="flex_btn">
                            <button @click="clickShowLoading" class="btn btn_search btn-src"><span class="btn_font">Search</span></button>
                            <button @click="Clear" class="btn btn_search btn-src"><span class="btn_font">Clear</span></button>
                            <nuxt-link to="/Ads/AdsNewimage" tag="button" class="btn_font">
                                <button class="btn_Add btn-src"><span class="btn_font">Add</span></button>
                            </nuxt-link>
                            <nuxt-link to="/Ads/AdsPosition" class="btn_font" tag="button"><Btn :text_btn="text_btn_Position" /></nuxt-link>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
        <div>
            <div style="width: 100%">
                <div>
                    <div class="columallimg" v-if="Listads">
                        <div v-for="(value, index) in Listads" :key="index">
                            <template v-if="index == 'All'">
                                <h3 class="page-title">{{ $t(index + " Page") }}</h3>
                            </template>
                            <div v-for="(val, i) in value" :key="i">
                                <template v-if="val">
                                    <div v-for="(v, key) in val" :key="key">
                                        <AdsImageListcompanent :value="value" :val="val" :v="v" :index="index" :i="i" :k="key"></AdsImageListcompanent>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="columallimg" style="text-align: center;" v-else>ไม่พบข้อมูล</div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import AdsImageListcompanent from "~/components/AdsImageListcompanent.vue";
export default {
    components: { AdsImageListcompanent },
    data() {
        return {
            // showModal: true,
            Listads: {},
            search: "",
            DeleteId: "",
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
            // switchVstatus: true,
            tab: null,
        };
    },
    beforeCreate() {
        this.$store.commit("BreadChange", {
            title: "Advertisement Image",
            subtitle: "Advertisement",
        });
    },
    mounted() {
        this.get_data();
    },
    methods: {
        get_data() {
            var body = {
                search: "",
            };
            this.$store.commit("Loading");
            this.$axios
                .$post("api/v1/manage-list-ads ", body)
                .then((response) => {
                    let resObj = response.result;
                    for (const key in resObj) {
                        if (Object.hasOwnProperty.call(resObj, key)) {
                            const element = resObj[key];
                            for (const index in element) {
                                if (Object.hasOwnProperty.call(element, index)) {
                                    const e = element[index];
                                    for (const i in e) {
                                        if (Object.hasOwnProperty.call(e, i)) {
                                            resObj[key][index][i].statusmodal = false;
                                            resObj[key][index][i].previewKey = "";
                                        }
                                    }
                                }
                            }
                        }
                    }
                    this.Listads = resObj;
                    setTimeout(() => {
                        this.$store.commit("Loading");
                    }, 1000);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>



