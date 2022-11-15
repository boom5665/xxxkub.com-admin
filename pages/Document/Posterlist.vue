<template>
    <div id="test1" class="content-body">
        <div style="width: 100%">
            <div style="display: flex; justify-content: space-between">
                <div style="display: flex"></div>
            </div>
        </div>
        <div>
            <div style="width: 100%">
                <div>
                    <div class="columallPoster">
                        <div v-for="(val, index) in ListPoster" :key="index">
                            <div v-if="index == 'movie'">
                                <h3 class="page-title">{{ index == "movie" ? $t("movie") : "" }}</h3>
                            </div>
                            <div v-if="index == 'av'">
                                <h3 class="page-title">{{ index == "av" ? $t("av") : "" }}</h3>
                            </div>
                            <div v-if="index == 'anime'">
                                <h3 class="page-title">{{ index == "anime" ? $t("anime") : "" }}</h3>
                            </div>
                            <div v-for="(value, i) in val" :key="i">
                                <Posterlist :value="value" :i="i"></Posterlist>
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
    data() {
        return {
            ListPoster: {
                result: {},
            },

            imagestatus: true,
            image: null,
            preview: null,
            beforeimg: null,
            status_text_top: "Ads Status",
            listMovie: [],
            listmovieload: false,

            // status_text_bottom: "",
        };
    },
    beforeCreate() {
        this.$store.commit("BreadChange", {
            title: "Posters Movie List",
            subtitle: "Manage_Movie",
        });
    },
    mounted() {
        this.get_data();
    },
    computed: {
        casttypemovie() {
            var typemovie;
            if (this.typemovie == "Movie") {
                typemovie = "movie";
            } else if (this.typemovie == "av") {
                typemovie = "av";
            } else if (this.typemovie == "Anime") {
                typemovie = "an";
            } else {
                typemovie = "movie";
            }

            return typemovie;
        },
    },
    methods: {
        get_data() {
            var body = {
                typemovie: "",
                page: 1,
                perpage: 10,
                search: this.search,
            };
            this.$store.commit("Loading");
            this.$axios
                .$post("api/v1/manage-list-poster", body)
                .then((response) => {
                    let resObj = response.result.list;
                    for (const index in resObj) {
                        if (Object.hasOwnProperty.call(resObj, index)) {
                            const element = resObj[index];
                            resObj[index].previewKey = "";
                        }
                    }
                    this.ListPoster = resObj;
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



