<template>
    <div>
        <div id="test1" class="content-body">
            <div style="width: 100%">
                <div style="display: flex">
                    <div class="flex_btn">
                        <div class="flex_btn" style="align-items: center">
                            <div class="btn-src">
                                <input type="date" class="input-all form-control ng-pristine ng-valid ng-touched" style="width: 140px !important; padding-left: 5px" v-model="date_start" @change="changeValueDate" />
                            </div>
                            <div class="btn-src">{{$t('to')}}</div>
                            <div class="btn-src">
                                <input type="date" class="input-all form-control ng-pristine ng-valid ng-touched" style="width: 140px !important; padding-left: 5px" v-model="date_end" @change="changeValueDate" />
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
                                        <div class="">{{$t('Times clicked')}} : {{ countall ? countall : 0}} </div>
                                        <div class="list-inline list-inline-condensed no-margin">
                                            <div>
                                                <span class="status-mark border-success"></span>
                                            </div>
                                            <div>
                                                <span class="text-muted">{{$t('Date')}} : {{ dDateStart }} - {{ dDateEnd }}</span>
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
                <div >
                    <div style="width: 100%">
                        <div>
                            <div class="columallreport" v-if="Listreport">
                                <div class="tableHeader addheader">
                                    <div class="columtext">{{$t('Image')}}</div>
                                    <div class="columName">{{$t('Number of presses')}}</div>
                                    <div class="columskip">{{$t('Position')}}</div>
                                    <div class="columstatusads">{{$t('Page')}}</div>
                                </div>

                                <div v-for="(val, i) in Listreport" :key="i">
                                    <div class="tableBody addbody">
                                        <div class="columtext">
                                            <img id="" :src="val.link" class="imgads" controls="" />
                                        </div>
                                        <div class="columName">{{ val.count }}</div>
                                        <div class="columskip">{{ $t(val.position) }}</div>
                                        <div class="columstatusads">{{ $t(val.page+' Page') }}</div>
                                    </div>
                                </div>
                            </div>
                             <div class="columallreport " style="    text-align: center;" v-else>
                              ไม่พบข้อมูล
                             </div>
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
            maxPage: null,
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
            countall: "",
            Listreport: [],
            text_btn_Edit: "Edit",
            text_btn_Clear: "Clear",
            text_btn_Add: "Add",
            search: "",
            date_start: "",
            date_end: "",
            dDateStart : "",
            dDateEnd : ""
        };
    },

    beforeCreate() {
        this.$store.commit("BreadChange", { title: "Report Advertisement Image", subtitle: "Report" });
    },
    mounted() {
        this.formdate();
        this.clickShowLoading();
    },
    watch: {},
    methods: {
        changeValueDate(e){
            var aArrayDayStart = this.date_start.split("-");
            this.dDateStart = aArrayDayStart[2] + '/' + aArrayDayStart[1] + '/' + aArrayDayStart[0]

            var aArrayDayEnd = this.date_end.split("-");
            this.dDateEnd = aArrayDayEnd[2] + '/' + aArrayDayEnd[1] + '/' + aArrayDayEnd[0]
        },
        formdate() {
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
            var lastDay = new Date();
            this.date_start = firstDay.toISOString().split("T")[0];
            this.date_end = lastDay.toISOString().split("T")[0];

            //แปลงค่า format date
            var aArrayDayStart = this.date_start.split("-");
            this.dDateStart = aArrayDayStart[2] + '/' + aArrayDayStart[1] + '/' + aArrayDayStart[0]

            var aArrayDayEnd = this.date_end.split("-");
            this.dDateEnd = aArrayDayEnd[2] + '/' + aArrayDayEnd[1] + '/' + aArrayDayEnd[0]
        },

        clickShowLoading() {
            this.$store.commit("Loading");
            this.countall = "";
            this.get_data();
        },
        checksearch() {
            this.search = this.search.trim();

            this.$store.commit("Loading");
            this.countall = "";
            this.get_data();
        },
        get_data() {
            var body = {
                type_ads: 0,
                date_start: this.date_start,
                date_end: this.date_end,
                search: this.search,
                page: this.currentPage,
                position: "",
            };
            this.$axios
                .$post("api/v1/report-click-ads", body)
                .then((response) => {
                    this.Listreport = response.result.list;
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
            if (this.Listreport) {
                for (let index = 0; index < this.Listreport.length; index++) {
                    this.countall = parseInt(this.Listreport[index].count + this.countall);
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
