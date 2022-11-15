<template>
    <div id="test1" class="content-body" style="width: max-content">
        <div class="" v-if="Listads != null">
            <div class="col-lg-11 select-position-ads">
                <div class="" style="width: 100%">
                    <div align-with-title>
                        <div v-for="(model, i) in models" :key="i">
                            {{ $t(model) }}
                        </div>
                    </div>
                </div>
                <div>
                    <div class="tabs">
                        <div>
                            <!-- <v-tab-item>
                            <div id="Home" class="">
                                <div class="pagelistZone">
                                    <div class="pageZone-header">{{ $t("Poster") }}</div>
                                    <div class="pagelistZone-body">
                                        <div class="pagelistZone-body-content">{{ $t("Content") }}</div>
                                    </div>
                                    <DragDrop :value_data="ListadsAll" :width="'100%'" @afterData="(n) => (ListadsAll = n)"></DragDrop>
                                </div>
                            </div>
                        </v-tab-item> -->

                            <div id="PLAYER" class="">
                                <div class="pagelistZone">
                                    <div class="pagelistZone-body">
                                        <div class="playerZone">
                                            <div class="player-ads-left-position">
                                                <DragDrop :value_data="AllTopLeft" :width="'100%'" @afterData="(n) => (AllTopLeft = n)"></DragDrop>
                                            </div>
                                            <div class="">
                                                <DragDrop :value_data="AllTopCenter" :width="'100%'" @afterData="(n) => (AllTopCenter = n)"></DragDrop>
                                            </div>
                                            <div class="player-ads-left-position">
                                                <DragDrop :value_data="AllTopRight" :width="'100%'" @afterData="(n) => (AllTopRight = n)"></DragDrop>
                                            </div>
                                        </div>
                                        <div class="pagelistZone-body-content">{{ $t("Content") }}</div>
                                        <DragDrop :value_data="AllBottom" :width="'100%'" @afterData="(n) => (AllBottom = n)"></DragDrop>
                                    </div>
                                </div>
                            </div>

                            <!-- <v-tab-item>
                            <div id="FootballLIST" class="">
                                <div class="pagelistZone">
                                    <div class="pagelistZone-body">
                                        <div class="playerZone">
                                            <div class="player-ads-left-position">
                                                <DragDrop :value_data="FootballLeft" :width="'100%'" @afterData="(n) => (FootballLeft = n)"></DragDrop>
                                            </div>
                                            <div class="">
                                                <DragDrop :value_data="FootballContent" :width="'100%'" @afterData="(n) => (FootballContent = n)"></DragDrop>
                                            </div>
                                            <div class="player-ads-left-position">
                                                <DragDrop :value_data="FootballRight" :width="'100%'" @afterData="(n) => (FootballRight = n)"></DragDrop>
                                            </div>
                                        </div>
                                        <div class="pagelistZone-body-content">{{$t('Football Content')}}</div>
                                    </div>
                                    <div class="">
                                        <DragDrop :value_data="FootballUnder" :width="'100%'" @afterData="(n) => (FootballUnder = n)"></DragDrop>
                                    </div>
                                    <div class="playerZone">
                                        <div class="player-ads-left-position">
                                            <DragDrop :value_data="FootballBottomL" :width="'100%'" @afterData="(n) => (FootballBottomL = n)"></DragDrop>
                                        </div>
                                        <div class="">
                                            <DragDrop :value_data="FootballBottomC" :width="'100%'" @afterData="(n) => (FootballBottomC = n)"></DragDrop>
                                        </div>
                                        <div class="player-ads-left-position">
                                            <DragDrop :value_data="FootballBottomR" :width="'100%'" @afterData="(n) => (FootballBottomR = n)"></DragDrop>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </v-tab-item> -->
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
        <div class="columallreportreq" style="text-align: center" v-else>{{ textalert }}</div>
    </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js"></script>
<script>
export default {
    data() {
        return {
            data_seq: [],
            Listads: [],
            AllTopCenter: [],
            AllTopLeft: [],
            AllTopRight: [],
            AllBottom: [],
            textalert: "",
            seq: "",
            PositionId: "",

            tab: null,
            icon_btn_Clear: "Clear",
            text_save: "Save",
            icon_btn_submit: "submit",
            models: ["HOME"],
        };
    },
    watch: {
        // ListadsAll(val) {
        //     if (val) {
        //         this.datasend(val);
        //     }
        // },
        AllTopCenter(val) {
            if (val) {
                this.datasend(val);
            }
        },
        AllTopLeft(val) {
            if (val) {
                this.datasend(val);
            }
        },
        AllTopRight(val) {
            if (val) {
                this.datasend(val);
            }
        },
        AllBottom(val) {
            if (val) {
                this.datasend(val);
            }
        },
    },
    mounted() {
        this.get_data();
    },
    methods: {
        datasend(val) {
            if (val != "") {
                for (let i = 0; i < val.length; i++) {
                    if (this.data_seq) {
                        for (let index = 0; index < this.data_seq.length; index++) {
                            if (val[i].id == this.data_seq[index].id) {
                                this.data_seq.splice(index, 1);
                            }
                        }
                    }
                    this.$nextTick(() => {
                        var data = { id: val[i].id, seq: val[i].seq };
                        this.data_seq.push(data);
                    });
                }
            }
        },

        afterData(after) {
        },
        adsposition(position) {
            this.adsPosition = position;
            this.adsPositionstatus = true;
            let text = position;
            const myArray = text.split("-");
        },
        save() {
            this.FormData();
        },
        clickShowLoading() {
            this.$store.commit("Loading");
            setTimeout(() => {
                this.$store.commit("Loading");
            }, 3000);
        },

        get_data() {
            var body = {
                search: "",
            };
            // this.$store.commit("Loading");
            this.$axios
                .$post("api/v1/manage-list-ads", body)
                .then((response) => {
                    this.Listads = response.result;
                    if (this.Listads != null) {

                        this.AllBottom = response.result.All["All-Bottom"];
                        this.AllTopLeft = response.result.All["All-Top-Left"];
                        this.AllTopRight = response.result.All["All-Top-Right"];
                        this.AllTopCenter = response.result.All["All-Top-Center"];

                    } else {
                        this.textalert = "ไม่พบข้อมูล";
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        FormData() {
            this.$store.commit("Loading");
            var formData = {
                data_seq: this.data_seq,
            };
            // return;
            var self = this;
            this.$axios
                .post("api/v1/manage-update-seq-ads", formData)
                .then(function (response) {
                    self.$store.commit("Loading");
                    if (response.data.code == 200) {
                        self.$swal({
                            icon: "success",
                            title: self.$t("Save Successful"),
                        });
                        setTimeout(function () {
                            self.get_data();
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
                        self.get_data();
                    }, 1000);
                });
        },
    },
    beforeCreate() {
        this.$store.commit("BreadChange", {
            title: "Setting Alignment Image",
            subtitle: "Advertisement",
        });
    },
};
</script>




