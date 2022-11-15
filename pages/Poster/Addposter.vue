<template>
    <div id="test1" class="content-body" style="width: max-content">
        <div class="row">
            <div class="col-lg-12">
                <div class="display-start">
                    <div class="input-group" style="">
                        <InputimgAds :text_input_top="$t(slideimg_text_top)" :text_input_bottom="$t(slideimg_text_bottom)" :status_value="slideimgstatus" v-model="slideimg"></InputimgAds>
                    </div>
                </div>
                <div class="display-start">
                    <div class="input-group" style="width: 400px">
                        <InputText :text_input_top="$t(slidename_text_top)" :text_input_bottom="$t(slidename_text_bottom)" :status_value="slidenamestatus" v-model="slidename"></InputText>
                    </div>
                </div>
                <div class="">
                    <div class="input-group">
                        <CustomSelect :text_input_top="$t(typemovie_text_top)" v-model="typemovie" :default="typemovie" :options="typeotion" style="width: 400px"></CustomSelect>
                    </div>
                </div>

                <div class="display-start">
                    <div class="input-group" style="width: 400px">
                        <InputText v-debounce:1s="searchmovie" :text_input_top="$t(movie_id_text_top)" :text_input_bottom="movie_id_text_bottom" :status_value="movie_idstatus" v-model="fullname">
                            <!-- @switchchange="(n) => (status = n)" -->
                        </InputText>
                    </div>
                </div>
                <div class="display-start" style="justify-content: center">
                    <div v-if="listmovieload == false">
                        <div v-if="list.length != 0" class="selectGroup">
                            <div class="selectOption" v-for="(value, index) in list" :key="index" @click="selectmovie(value.movie_id, value.full_name)">
                                <div>{{ value.full_name }}</div>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="listmovieload == true">
                        <div class="display-start dis-center">
                            <img src="~assets/images/Spin-1s-200px.svg" style="width: 100px" />
                        </div>
                    </div>
                </div>
                <div class=" text-end" style="margin-top : 20px;">
                    <!-- <button @click="Clear" class="btn btn_Clear btn-src"><span class="btn_font">Clear</span></button> -->
                    <button @click="save()" class="btn btn_search btn-src">
                        <span class="btn_font">{{ $t("Save") }}</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js"></script>
<script>
export default {
    data() {
        return {
            listmovieload: false,

            movie_id_text_top: "Movie Name",
            movie_id_text_bottom: "",
            movie_id: "",
            movie_idstatus: true,

            slidename_text_top: "Slide Name",
            slidename_text_bottom: "",
            slidename: "",
            slidenamestatus: true,

            slideimg_text_top: "Slide Image",
            slideimg_text_bottom: "File size is not more than 100 MB",
            slideimg: null,
            slideimgstatus: true,

            tab: null,
            icon_btn_Clear: "Clear",
            text_save: "Save",
            icon_btn_submit: "submit",

            typemovie_options: [],

            typemovie_text_top: "Typemovie",
            typemovie_text_bottom: "",
            typemovie: "",
            typemovie_value: null,
            typemovie_status: true,
            search: "",
            list: [],
            movieid: "",
            fullname: "",
        };
    },
    beforeCreate() {
        this.$store.commit("BreadChange", {
            title: "Add Posters Movie",
            subtitle: "Manage_Movie",
        });
    },
    watch: {
        slidename(val) {
            if (val != "") {
                this.slidenamestatus = true;
            }
        },

        movieid(val) {
            if (val != "") {
                this.movie_idstatus = true;
            }
        },

        typemovie(typemovie) {
            if (typemovie != "") {
                this.typemoviestatus = true;
                if (typemovie) {
                    this.get_data();
                }
            }
        },

        slideimg(val) {
            if (val != "") {
                this.slideimgstatus = true;
            }
        },
    },
    mounted() {
        this.get_data();
    },
    computed: {
        casttypemovie() {
            var typemovie;
            if (this.typemovie == "Movie") {
                typemovie = "movie";
            } else if (this.typemovie == "Av") {
                typemovie = "av";
            } else if (this.typemovie == "Anime") {
                typemovie = "anime";
            } else if (this.typemovie == "Manga") {
                typemovie = "manga";
            } else {
                typemovie = "movie";
            }

            return typemovie;
        },
        typeotion(){
            var opions = []
            if(this.$cookies.get("package").package_movie == 1){
                opions.push({ label: "Movie", value: "Movie" });
            }

            if(this.$cookies.get("package").package_anime == 1){
                opions.push({ label: "Anime", value: "Anime" });
            }

            if(this.$cookies.get("package").package_av == 1){
                opions.push({ label: "Av", value: "Av" });
            }

            if(this.$cookies.get("package").package_manga == 1){
                opions.push({ label: "Manga", value: "Manga" });
            }

            return opions;
        },
    },
    methods: {
        selectmovie(id, fullname) {
            this.movieid = id;
            this.fullname = fullname;
        },
        searchmovie(search) {
            this.search = search;
            if (this.search) {
                this.get_data();
            } else {
                this.list = [];
                this.movieid = "";
                this.listmovieload = false;
            }
        },
        save() {
            if (this.slideimg == null || this.slidename == "") {
                this.error();
            } else {
                this.FormData();
            }
        },
        error() {
            if (this.slideimg == null) {
                this.slideimgstatus = false;
            } else {
                this.slideimgstatus = true;
            }
            if (this.slidename == "") {
                this.slidenamestatus = false;
            } else {
                this.slidenamestatus = true;
            }

            if (this.slideimg == "" || this.slidename == "" || this.movieid == "") {
                this.$swal({
                    icon: "warning",
                    title: "Please complete the information.",
                });
            }
        },
        get_data() {
            var body = {
                search: this.search,
                perpage: 1000,
                page: 1,
                movie_type: this.casttypemovie,
                status: "1",
            };
            // return;

            if (this.search) {
                this.listmovieload = true;

                this.$axios
                    .$post("api/v1/list-manage-movie", body)
                    .then((response) => {
                        this.list = response.result.list;

                        setTimeout(() => {
                            this.listmovieload = false;
                        }, 1000);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },

        FormData() {
            var formData = new FormData();
            formData.append("slideimg", this.slideimg);
            formData.append("slidename", this.slidename.trim());
            formData.append("typemovie", this.casttypemovie.trim());
            formData.append("movie_id", this.movieid);

            this.$store.commit("Loading");
            var self = this;
            self.$axios
                .post("api/v1/manage-create-poster", formData)
                .then(function (response) {

                    if (response.data.code == 200) {
                        self.$swal({
                            icon: "success",
                            title: self.$t("Save Successful"),
                        });
                        setTimeout(function () {
                            location.reload();
                            //  this.$store.commit("Loading");
                            self.get_data();
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




