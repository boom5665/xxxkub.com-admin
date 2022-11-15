<template>
    <div>
        <div class="content-body" v-if="loaded">
            <div class="panel-heading">
                <div class="heading-elements"></div>
                <div class="table-responsive">
                    <div class="table table-lg text-nowrap">
                        <div style="display: flex">
                            <div class="col-lg-12">
                                <div class="col-lg-12">
                                    <div class="media-left">
                                        <h3 class="" >{{ $t("Advertisement Image") }}</h3>
                                        <div class="" style="padding: 5px 5px 5px 0px;"> {{ $t("Times clicked") }} : {{ countallImage }}</div>
                                        <div class="list-inline list-inline-condensed no-margin">
                                            <div>
                                                <span class="text-muted" style="padding: 5px 5px 5px 0px;">{{ $t("Date") }} : {{ date_startImage }} - {{ date_endImage }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-11">
                                    <div>
                                        <line-chart v-if="loaded" style="width: 100%" :height="100" :key="updated" :chart-data="lineData" :chart-options="options" />
                                    </div>
                                    <div class="dis-center">
                                        <button @click="Month" class="btn btn_search btn-src">
                                            <span class="btn_font">{{ $t("Month") }}</span>
                                        </button>
                                        <button @click="LastMonth" class="btn btn_search btn-src">
                                            <span class="btn_font">{{ $t("Last Month") }}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-body" v-if="loadedvideo">
            <div class="panel-heading">
                <div class="heading-elements"></div>
                <div class="table-responsive">
                    <div class="table table-lg text-nowrap">
                        <div style="display: flex">
                            <div class="col-lg-12">
                                <div class="col-lg-12">
                                    <div class="media-left">
                                        <h3 class="" >{{ $t("Advertisement Video") }}</h3>
                                        <div class="" style="padding: 5px 5px 5px 0px;">{{ $t("Times clicked") }} : {{ countallVideo }}</div>
                                        <div class="list-inline list-inline-condensed no-margin">
                                            <div>
                                                <span class="text-muted" style="padding: 5px 5px 5px 0px;">{{ $t("Date") }} {{ date_startVideo }} - {{ date_endVideo }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-11">
                                    <div>
                                        <line-chart v-if="loadedvideo" vstyle="width: 100%" :height="100" :key="updated" :chart-data="lineDataVideo" :chart-options="options" />
                                    </div>
                                    <div class="dis-center">
                                        <button @click="MonthVideo" class="btn btn_search btn-src">
                                            <span class="btn_font">{{ $t("Month") }}</span>
                                        </button>
                                        <button @click="LastMonthVideo" class="btn btn_search btn-src">
                                            <span class="btn_font">{{ $t("Last Month") }}</span>
                                        </button>
                                    </div>
                                </div>
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
            loaded: false,
            loadedvideo: false,
            updated: 0,
            lineData: {
                labels: [],
                datasets: [],
            },
            lineDataVideo: {
                labels: [],
                datasets: [],
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

            Listreport: [],
            text_btn_Edit: "Edit",
            text_btn_Clear: "Clear",
            text_btn_Add: "Add",
            search: "",
            countallImage: "",
            date_startImage: "",
            date_endImage: "",

            ListreportVideo: [],
            countallVideo: "",
            date_startVideo: "",
            date_endVideo: "",
        };
    },

    beforeCreate() {
        this.$store.commit("BreadChange", { title: "Dashboard", subtitle: "Dashboard" });
    },
    computed: {
        showdateVideo() {
            for (let index = 0; index < 30; index++) {
                this.lineDataVideo.labels.push(index);
            }
            return this.lineDataVideo.labels;
        },
        datachart() {},
    },
    mounted() {
        this.formdate();
    },
    watch: {},
    methods: {
        formdate() {
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
            var lastDay = new Date();
            this.date_startImage = firstDay.toISOString().split("T")[0];
            this.date_endImage = lastDay.toISOString().split("T")[0];
            this.date_startVideo = firstDay.toISOString().split("T")[0];
            this.date_endVideo = lastDay.toISOString().split("T")[0];
            this.get_dataVideo();
            this.get_data();
        },
        Month() {
            this.countallImage = "";
            this.countallVideo = "";
            this.date_startImage = "";
            this.date_endImage = "";
            this.lineData.labels = [];
            this.lineData.datasets = [];
            if (this.date_startImage == "") {
                var date = new Date();
                var firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
                var lastDay = new Date();
                this.date_startImage = firstDay.toISOString().split("T")[0];
                this.date_endImage = lastDay.toISOString().split("T")[0];
                this.get_data();
            }
        },
        LastMonth() {
            this.countallImage = "";
            this.countallVideo = "";
            this.date_startImage = "";
            this.date_endImage = "";
            this.lineData.labels = [];
            this.lineData.datasets = [];
            if (this.date_startImage == "") {
                var date = new Date();
                var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 2);
                var lastDay = new Date(date.getFullYear(), date.getMonth() + 0, 1);
                this.date_startImage = firstDay.toISOString().split("T")[0];
                this.date_endImage = lastDay.toISOString().split("T")[0];
                this.get_data();
            }
        },

        MonthVideo() {
            this.countallImage = "";
            this.countallVideo = "";
            this.date_startVideo = "";
            this.date_endVideo = "";
            this.lineDataVideo.labels = [];
            this.lineDataVideo.datasets = [];
            if (this.date_startVideo == "") {
                var date = new Date();
                var firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
                var lastDay = new Date();
                this.date_startVideo = firstDay.toISOString().split("T")[0];
                this.date_endVideo = lastDay.toISOString().split("T")[0];
                this.get_dataVideo();
            }
        },
        LastMonthVideo() {
            this.countallImage = "";
            this.countallVideo = "";
            this.date_startVideo = "";
            this.date_endVideo = "";
            this.lineDataVideo.labels = [];
            this.lineDataVideo.datasets = [];
            if (this.date_startVideo == "") {
                var date = new Date();
                var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 2);
                var lastDay = new Date(date.getFullYear(), date.getMonth() + 0, 1);
                this.date_startVideo = firstDay.toISOString().split("T")[0];
                this.date_endVideo = lastDay.toISOString().split("T")[0];
                this.get_dataVideo();
            }
        },

        get_data() {
            this.loaded = false;
            var body = {
                date_start: this.date_startImage,
                date_end: this.date_endImage,
            };
            this.$store.commit("Loading");
            this.$axios
                .$post("api/v1/dashboard-list", body)
                .then((response) => {
                    this.Listreport = response.result.image;
                    if (this.Listreport) {
                        var i = 0;
                        for (const key in this.Listreport) {
                            if (Object.hasOwnProperty.call(this.Listreport, key)) {
                                const element = this.Listreport[key];
                                this.countallImage = parseInt(element.count_click + this.countallImage);
                                var color = "rgba(0, 0, 0, 1)";
                                switch (i) {
                                    case 0:
                                        color = "rgba(34, 135, 135)";
                                        break;
                                    case 1:
                                        color = "rgba(255, 153, 0)";
                                        break;
                                    case 2:
                                        color = "rgba(1, 116, 188)";
                                        break;
                                    default:
                                        color = "rgba(0, 0, 0, 1)";
                                        break;
                                }

                                this.lineData.datasets.push({
                                    label: key,
                                    // height: "400px",
                                    backgroundColor: "transparent",
                                    borderColor: color,
                                    pointBackgroundColor: "rgba(171, 71, 188, 1)",

                                    data: [],
                                });
                                for (let index = 0; index < element.date_time_click.length; index++) {
                                    const e = element.date_time_click[index].click;
                                    this.lineData.datasets[i].data.push(e);

                                    if (i == 0) {
                                        var date = new Date(element.date_time_click[index].date);
                                        var Day = date.toLocaleDateString("en-us", { day: "numeric", month: "short" });
                                        this.lineData.labels.push(Day);
                                    }
                                }
                                i++;
                                this.loaded = true;
                            }
                        }
                    }
                    setTimeout(() => {
                        this.$store.commit("Loading");
                    }, 1000);
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        get_dataVideo() {
            this.loadedvideo = false;
            var body = {
                date_start: this.date_startVideo,
                date_end: this.date_endVideo,
            };
            this.$store.commit("Loading");
            this.$axios
                .$post("api/v1/dashboard-list", body)
                .then((response) => {
                    this.ListreportVideo = response.result.video;

                    if (this.ListreportVideo) {
                        for (let index = 0; index < this.ListreportVideo.length; index++) {
                            const eVideo = this.ListreportVideo[index];
                            var color = "rgba(0, 0, 0, 1)";
                            switch (index) {
                                case 0:
                                    color = "rgba(34, 135, 135)";
                                    break;
                                case 1:
                                    color = "rgba(255, 153, 0)";
                                    break;
                                default:
                                    color = "rgba(0, 0, 0, 1)";
                                    break;
                            }
                            this.lineDataVideo.datasets.push({
                                label: eVideo.name,
                                // height: "400px",
                                backgroundColor: "transparent",
                                borderColor: color,
                                pointBackgroundColor: "rgba(171, 71, 188, 1)",
                                data: [],
                            });
                            for (let i = 0; i < eVideo.date_time_click.length; i++) {
                                const e = eVideo.date_time_click[i];
                                this.countallVideo = parseInt(e.click + this.countallVideo);
                                this.lineDataVideo.datasets[index].data.push(e.click);
                                if (index == 0) {
                                    var date = new Date(e.date);
                                    var Day = date.toLocaleDateString("en-us", { day: "numeric", month: "short" });
                                    this.lineDataVideo.labels.push(Day);
                                }
                            }
                        }

                        if(
                            this.$cookies.get("authen") == 2 || 
                            (
                                this.$cookies.get("package").package_manga == 1 && 
                                this.$cookies.get("package").package_movie == 0 && 
                                this.$cookies.get("package").package_anime == 0 && 
                                this.$cookies.get("package").package_av == 0
                            )
                        ){
                            this.loadedvideo = false;
                        }else{
                            this.loadedvideo = true;
                        }
                    }
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

<style lang="scss" scoped>
.chartjs-render-monitor {
    animation: chartjs-render-animation 0.001s;
    // width: 100% !important;
    height: 600px !important;
    // font-size: 20px !important;
    margin-bottom: 10px;
}
.dis-center {
    display: flex;
    justify-content: center;
}
</style>
