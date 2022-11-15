<template>
    <div>
        <div class="addbody">
            <div class="columid">{{ i + 1 }}</div>
            <div class="columtext">
                <template v-if="previewKey">
                    <div class="file">
                        <div style="height: 400px; display: flex; align-items: center">
                            <img :src="previewKey" style="width: 100%; max-height: 100%" />
                        </div>
                    </div>
                </template>
                <template v-else-if="value.slideimage">
                    <div class="file">
                        <div style="height: 400px; display: flex; align-items: center">
                            <img :src="value.slideimage" style="width: 100%; max-height: 100%" />
                        </div>
                    </div>
                </template>
            </div>
            <div class="columAct">
                <div class="columActleft">
                    <div class="display-start">
                        <div class="input-group">
                            <InputText :text_input_top="$t(slidename_text_top)" :status_value="slidenamestatus" v-model="value.slidename" style="width: 200px !important"></InputText>
                        </div>
                    </div>
                    <div class="display-start p-top-ten">
                        <div class="input-group">{{ $t("Type Movie") }} : {{ $t(value.typemovie) }}</div>
                    </div>
                    <div class="display-start" style="flex-direction: column">
                        <div class="input-group" style="">
                            <InputText v-debounce:2s="searchmovie" :text_input_top="$t(movie_id_text_top)" :status_value="movie_idstatus" v-model="fullname">
                                <!-- @switchchange="(n) => (status = n)" -->
                            </InputText>
                        </div>
                        <div class="input-group" style="justify-content: center">
                            <div v-if="listmovieload == false">
                                <div v-if="listMovie.length != 0" class="selectGroup">
                                    <div class="selectOption" v-for="(value, index) in listMovie" :key="index" @click="selectmovie(value.movie_id, value.full_name)">
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
                    </div>
                    <div class="">
                        <div class="" style="display: flex; flex-direction: column; padding-bottom: 15px">
                            <label for="" class="input-label"> {{ $t(image_text_top) }} </label>
                            <div class="imageinput">
                                <input type="file" ref="fileupload" accept="image/*" :id="'imageInput' + value.id" @change="previewImage($event, index)" />
                                <label :for="'imageInput' + value.id" class="imagebutton">{{ $t("Select Picture") }}</label>
                                <div class="input-label-bottom" style="text-align: left">{{ $t(image_text_bottom) }}</div>
                                <div class="input-error" v-if="imagestatus == false">
                                    <font-awesome-icon :icon="['fa', icon_error]"></font-awesome-icon>
                                    Please complete the information.
                                </div>
                            </div>
                        </div>
                        <div class="display-start" style="margin-bottom: 10px">
                            <div style="">
                                <button @click="Delete(value.id)" class="btn btn_delete btn-src" style="width: 60px">
                                    <span class="btn_font">{{ $t("Delete") }}</span>
                                </button>
                            </div>
                            <div style="">
                                <button @click="save(value.id, value.slidename)" class="btn btn_search btn-src" style="width: 60px">
                                    <span class="btn_font">{{ $t("Save") }}</span>
                                </button>
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
    props: ["text_input_top", "text_input_bottom", "value", "i"],
    data() {
        return {
            slidename_text_top: "Slide Name",
            slidenamestatus: true,

            adsurlstatus: true,

            movie_id_text_top: "Movie Name",
            movie_idstatus: true,

            typemovie_text_top: "Type Movie",
            typemoviestatus: true,

            image_text_top: "Slide Image",
            image_text_bottom: "File size is not more than 100 MB",

            icon_error: "exclamation",
            typemovie: this.value.typemovie,
            search: "",
            listMovie: [],
            movieid: this.value.movieid,
            listmovieload: "",
            fullname: this.value.full_name,
            imagestatus: true,
            image: null,
            previewKey: "",
            beforeimg: null,
        };
    },
    mounted() {
        this.get_movie();
    },
    created() {},
    methods: {
        searchmovie(search) {
            this.search = search.trim();

            if (this.search.trim()) {
                this.get_movie();
            } else {
                this.listMovie = [];
                this.movieid = "";
                this.listmovieload = false;
            }
        },

        get_movie() {
            var body = {
                search: this.search,
                perpage: 1000,
                page: 1,
                movie_type: this.typemovie,
                status: "1",
            };
            this.$store.commit("Loading");

            if (this.search) {
                this.listmovieload = true;
                this.$axios
                    .$post("api/v1/list-manage-movie", body)
                    .then((response) => {
                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                        this.listMovie = response.result.list;

                        setTimeout(() => {
                            this.listmovieload = false;
                        }, 1000);
                    })

                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        selectmovie(id, fullname) {
            this.movieid = id;
            this.fullname = fullname;
            this.listMovie = [];
        },

        save(id, slidename) {
            if (slidename == "" || this.image == null || this.typemovie == "" || this.movieid == "") {
                this.error(slidename);
            } else {
                this.FormData(id, slidename, this.image);
            }
        },
        error(slidename) {
            if (slidename == "") {
                this.slidenamestatus = false;
            } else {
                this.slidenamestatus = true;
            }
            if (this.image == null) {
                this.imagestatus = false;
            } else {
                this.imagestatus = true;
            }
            if (this.typemovie == "") {
                this.typemoviestatus = false;
            } else {
                this.typemoviestatus = true;
            }
            if (this.movieid == "") {
                this.movie_idstatus = false;
            } else {
                this.movie_idstatus = true;
            }

            if (slidename == "" || this.typemovie == "" || this.movieid == "" || this.image == null) {
                this.$swal({
                    icon: "warning",
                    title: "Please complete the information.",
                });
            }
        },
        FormData(id, slidename) {
            var formData = new FormData();
            formData.append("id", id);
            formData.append("slidename", slidename);
            formData.append("slideimg", this.image);
            formData.append("typemovie", this.typemovie);
            formData.append("movie_id", this.movieid);

            var self = this;
            self.$store.commit("Loading");
            this.$axios
                .post("api/v1/manage-update-poster", formData)
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
                        // self.get_data();
                        this.$router.push("/Ads/Adsimg");
                    }, 1000);
                });
        },
        previewImage(event) {
            const self = this;
            const input = event.target;
            if (input.files.length > 0) {
                self.beforeimg = input.files[0];
                const reader = new FileReader();
                self.image = input.files[0];
                reader.onload = (e) => {
                    self.previewKey = e.target.result;
                };
                reader.readAsDataURL(input.files[0]);
            } else {
                if (self.beforeimg) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        self.previewKey = e.target.result;
                    };
                    reader.readAsDataURL(self.beforeimg[0]);
                }
            }
        },

        Delete(id) {
            var self = this;
            self.$swal({
                title: self.$t("Confirm to Delete"),
                text: self.$t("If it is deleted, it cannot be reversed"),
                icon: "warning",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                showCancelButton: true,
                confirmButtonText: self.$t("Confirm"),
                cancelButtonText: self.$t("cancel"),
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed == true) {
                    this.submitDelete(id);
                }
            });
        },
        submitDelete(id) {
            var formData = {
                id: id,
                typemovie: this.typemovie,
            };
            var self = this;
            self.$axios
                .post("api/v1/manage-delete-poster", formData)
                .then(function (response) {
                    if (response.data.code == 200) {
                        self.$swal({
                            icon: "success",
                            title: self.$t("Delete Successful"),
                        });
                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    self.$swal({
                        icon: "error",
                        title: self.$t("Delete Failed"),
                    });
                    setTimeout(function () {
                        location.reload();
                    }, 1000);
                });
        },
    },
};
</script>
