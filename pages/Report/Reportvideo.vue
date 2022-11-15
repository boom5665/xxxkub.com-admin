<template>
    <div>
        <div id="test1" class="content-body">
            <div style="width: 100%">
                <div style="display: flex">
                    <div class="flex_btn">
                        <div class="flex_btn" style="align-items: center">
                            <div class="btn-src">
                                <input type="date" class="input-all form-control ng-pristine ng-valid ng-touched" style="width: 140px !important; padding-left: 5px" v-model="date_startVideo" @change="changeValueDate" />
                            </div>
                            <div class="btn-src">{{ $t("to") }}</div>
                            <div class="btn-src">
                                <input type="date" class="input-all form-control ng-pristine ng-valid ng-touched" style="width: 140px !important; padding-left: 5px" v-model="date_endVideo" @change="changeValueDate" />
                            </div>
                            <button @click="clickShowLoading" class="btn btn_search btn-src">
                                <span class="btn_font">{{ $t("Search") }}</span>
                            </button>
                        </div>
                        <!-- <button  class="btn btn_search btn-src"><span class="btn_font">Clear</span></button> -->
                    </div>
                    <div class="flex_btn"></div>
                </div>
            </div>
        </div>
        <div id="test1" class="content-body">
            <div class="panel-heading">
                <div class="heading-elements"></div>
                <div class="table-responsive">
                    <div class="table table-lg text-nowrap">
                        <div style="display: flex">
                            <div class="col-lg-6">
                                <div class="col-lg-12">
                                    <div class="media-left">
                                        <div class="">{{ $t("Times clicked") }} : {{ countallVideo ? countallVideo : 0 }}</div>
                                        <div class="list-inline list-inline-condensed no-margin">
                                            <div>
                                                <span class="status-mark border-success"></span>
                                            </div>
                                            <div>
                                                <span class="text-muted">{{ $t("Date") }} {{ dDateStart }} - {{ dDateEnd }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5">
                                <!-- <line-chart style="width: 100%" :key="updated" :chart-data="lineData" :chart-options="options" /> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div style="width: 100%">
                        <div>
                            <div class="columallreport" v-if="ListreportVideo">
                                <div class="tableHeader addheader">
                                    <div class="columtext">{{ $t("Video") }}</div>
                                    <div class="columName">{{ $t("Number of presses") }}</div>
                                </div>

                                <div v-for="(val, i) in ListreportVideo" :key="i">
                                    <div class="tableBody addbody">
                                        <div class="columtext">
                                            <video id="" :src="val.link" class="imgads" style="padding:10px;" controls="" />
                                        </div>
                                        <div class="columName">{{ val.count }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="columallreport" style="text-align: center" v-else>ไม่พบข้อมูล</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            currentPage: 1,
            maxPage: 1,
            perPage: 50,
            updated: 0,
            lineData: {
                labels: [],
                datasets: [
                    {
                        label: "Data One",
                        backgroundColor: "#008f6b",
                        data: [20, 10, 48, 35, 12],
                    },
                    {
                        label: "Data Two",
                        backgroundColor: "red",
                        data: [30, 100, 100, 100, 100],
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                        },
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: "Value",
                        },
                    },
                },
            },
            ListreportVideo: [],
            text_btn_Edit: "Edit",
            text_btn_Clear: "Clear",
            text_btn_Add: "Add",
            search: "",
            countallVideo: "",
            date_startVideo: "",
            date_endVideo: "",
            dDateStart : "",
            dDateEnd : ""
        };
    },

    beforeCreate() {
        this.$store.commit("BreadChange", { title: "Report Advertisement Video", subtitle: "Report" });
    },
    mounted() {
        this.formdate();
        this.clickShowLoading();
    },
    watch: {},
    methods: {
        changeValueDate(e){
            var aArrayDayStart = this.date_startVideo.split("-");
            this.dDateStart = aArrayDayStart[2] + '/' + aArrayDayStart[1] + '/' + aArrayDayStart[0]

            var aArrayDayEnd = this.date_endVideo.split("-");
            this.dDateEnd = aArrayDayEnd[2] + '/' + aArrayDayEnd[1] + '/' + aArrayDayEnd[0]
        },
        clickShowLoading() {
            this.$store.commit("Loading");
            this.countallVideo = "";
            this.get_dataVideo();
        },
        formdate() {
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
            var lastDay = new Date();
            this.date_startVideo = firstDay.toISOString().split("T")[0];
            this.date_endVideo = lastDay.toISOString().split("T")[0];
            
            //แปลงค่า format date
            var aArrayDayStart = this.date_startVideo.split("-");
            this.dDateStart = aArrayDayStart[2] + '/' + aArrayDayStart[1] + '/' + aArrayDayStart[0]

            var aArrayDayEnd = this.date_endVideo.split("-");
            this.dDateEnd = aArrayDayEnd[2] + '/' + aArrayDayEnd[1] + '/' + aArrayDayEnd[0]
        },

        get_dataVideo() {
            var body = {
                type_ads: 1,
                date_start: this.date_startVideo,
                date_end: this.date_endVideo,
                search: this.search,
                page: this.currentPage,
                perpage: 1,
                position: "",
            };
            this.$axios
                .$post("api/v1/report-click-ads", body)
                .then((response) => {
                    this.ListreportVideo = response.result.list;
                    this.maxPage = response.result.page_total;
                    this.sumcount();

                    setTimeout(() => {
                        this.$store.commit("Loading");
                    }, 1000);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        sumcount() {
            if (this.ListreportVideo) {
                for (let index = 0; index < this.ListreportVideo.length; index++) {
                    this.countallVideo = parseInt(this.ListreportVideo[index].count + this.countallVideo);
                }
            }
        },
    },
};
</script>


<style scoped>
.chartjs-render-monitor {
    width: 90%;
    height: 400px;
}
</style>
