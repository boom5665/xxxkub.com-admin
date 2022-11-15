<template>
    <div id="test1" class="content-body" style="width: max-content">
        <div class="row" style="width: 100%; display: block">
            <div class="col-lg-12 display-start">
                <h3>{{ $t("Movie") }}</h3>
            </div>
            <div class="col-12 display-start nopadding">
                <div class="input-group" style="width: 50%; padding: 0 1rem">
                    <img :src="image" class="imgads" controls="" />
                </div>
                <div class="input-group" style="width: 50%; padding: 0 1rem; display: block">
                    <div style="margin-top: 1rem">
                        <InputText :text_input_top="$t(fullname_text_top)" :text_input_bottom="fullname_text_bottom" :status_value="fullname_status" v-model="fullname"></InputText>
                    </div>
                    <!-- <InputText :text_input_top="$t(nameth_text_top)" :text_input_bottom="nameth_text_bottom" :status_value="nameth_status" v-model="nameth"></InputText>
                    <InputText :text_input_top="$t(nameen_text_top)" :text_input_bottom="nameen_text_bottom" :status_value="nameen_status" v-model="nameen"></InputText> -->
                    <InputTextArea :text_input_top="$t(description_text_top)" :text_input_bottom="description_text_bottom" :status_value="description_status" v-model="description"></InputTextArea>
                    <div style="margin-top: 1rem">
                        <Inputswitch :text_input_top="$t(status_text_top)" :switchvalue="status" @switchchange="(n) => (status = n)"></Inputswitch>
                    </div>
                </div>
            </div>
            <div class="col-12 display-start">
                <div class="col-6 input-group nopadding">
                    <CustomSelect :text_input_top="$t(year_text_top)" v-model="year" :default="year" :options="year_options" :status_value="year_status"></CustomSelect>
                </div>
                <div class="col-6 input-group nopadding">
                    <CustomSelect :text_input_top="$t(quality_text_top)" v-model="quality" :default="quality" :options="quality_options" :status_value="quality_status"></CustomSelect>
                </div>
            </div>
            <div class="col-12 display-start">
                <div class="col-6 input-group nopadding">
                    <CustomSelect :text_input_top="$t(sound_text_top)" v-model="sound" :default="sound" :options="sound_options" :status_value="sound_status"></CustomSelect>
                </div>
                <div class="col-6 input-group nopadding">
                    <CustomSelect :text_input_top="$t(soundbackup_text_top)" v-model="sound_backup" :default="sound_backup" :options="sound_options" :status_value="soundbackup_status"></CustomSelect>
                </div>
            </div>
            <div class="col-12 display-start">
                <div class="col-6 input-group nopadding">
                    <InputText :text_input_top="$t(preview_text_top)" :text_input_bottom="preview_text_bottom" :status_value="preview_status" v-model="preview"></InputText>
                </div>
                <div class="col-6 input-group nopadding">
                    <InputScore :text_input_top="$t(ratescore_text_top)" :text_input_bottom="ratescore_text_bottom" :status_value="ratescore_status" v-model="ratescore"></InputScore>
                </div>
                <!-- <div class="col-4 input-group">
                    <InputText :text_input_top="$t(imdb_text_top)" :text_input_bottom="imdb_text_bottom" :status_value="imdb_status" v-model="imdb"></InputText>
                </div> -->
            </div>
        </div>

        <div class="text-end col-11 display-start" style="margin-top: 1rem; display: flex; justify-content: flex-end">
            <button @click="save()" class="btn btn_search">
                <span class="btn_font">{{ $t("Save") }}</span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // Data Input
            idpage: null,
            image: null,
            fullname_text_top: "Full Name",
            fullname_text_bottom: "",
            fullname: "",
            fullname_status: true,

            nameth_text_top: "Name (Thai)",
            nameth_text_bottom: "",
            nameth: "",
            nameth_status: true,

            nameen_text_top: "Name (Eng)",
            nameen_text_bottom: "",
            nameen: "",
            nameen_status: true,

            description_text_top: "Description",
            description_text_bottom: "",
            description: "",
            description_status: true,

            // Select Quality
            quality_options: [
                { label: "HD", value: "HD" },
                { label: "Zoom", value: "Zoom" },
                { label: "Full HD", value: "Full HD" },
                { label: "4k", value: "4k" },
            ],
            quality_text_top: "Quality",
            quality_text_bottom: "",
            quality: "",
            quality_value: null,
            quality_status: true,

            preview_text_top: "Preview",
            preview_text_bottom: "",
            preview: "",
            preview_status: true,

            ratescore_text_top: "Rate Score",
            ratescore_text_bottom: "",
            ratescore: "",
            ratescore_status: true,

            //Select Year
            year_options: [{ label: "1990", value: "1990" }],
            year_text_top: "Year",
            year_text_bottom: "",
            year: "",
            year_status: true,

            // Select Sound
            sound_options: [
                { label: "Soundtrack", value: "Soundtrack" },
                { label: "Thai", value: "Thai" },
            ],
            sound_text_top: "Sound",
            soundbackup_text_top: "Sound Backup",
            sound_value: null,
            sound: "",
            sound_backup: "",
            sound_status: true,
            soundbackup_status: true,

            status_text_top: "Movie Show",
            status: "",
            statusstatus: true,

            series: false,
        };
    },
    beforeCreate() {
        this.$store.commit("BreadChange", {
            title: "Edit_Movie",
            subtitle: "Manage_Movie",
        });
    },
    mounted() {
        this.geneYear();
        this.get_data();
    },
    computed: {
        castquality() {
            var quality;
            if (this.quality == "Zoom") {
                quality = 1;
            } else if (this.quality == "Full HD") {
                quality = 2;
            } else if (this.quality == "4k") {
                quality = 3;
            } else {
                quality = 0;
            }

            return quality;
        },
        castsound() {
            return this.sound == "Soundtrack" ? 0 : 1;
        },
        castsoundbackup() {
            return this.sound_backup == "Soundtrack" ? 0 : 1;
        },
    },
    watch: {
        fullname(val) {
            if (val != "") {
                this.fullname_status = true;
            }
        },
        description(val) {
            if (val != "") {
                this.description_status = true;
            }
        },
        quality(val) {
            if (val != "") {
                this.quality_status = true;
            }
        },
        year(val) {
            if (val != 0 && val != "") {
                this.preview_status = true;
            }
        },
        preview(val) {
            if (val != "") {
                this.preview_status = true;
            }
        },
        ratescore(val) {
            if (val != "") {
                this.ratescore_status = true;
            }
        },
        sound(val) {
            if (val != "") {
                this.sound_status = true;
            }
        },
    },
    methods: {
        save() {
            if (this.fullname == "" || this.description == "" || this.year == 0 || this.quality == "" || this.sound == "" || this.soundbackup == "" || this.preview == ""  || this.ratescore == "") {
                this.error();
            } else {
                this.SaveData();
            }
        },
        error() {
            // Error ชื่อภาพยนต์
            if (this.fullname == "") {
                this.fullname_status = false;
            } else {
                this.fullname_status = true;
            }

            // Error คำอธิบาย
            if (this.description == "") {
                this.description_status = false;
            } else {
                this.description_status = true;
            }

            // Error ปี
            if (this.year == "") {
                this.year_status = false;
            } else {
                this.year_status = true;
            }

            // Error คุณภาพ
            if (this.quality == "") {
                this.quality_status = false;
            } else {
                this.quality_status = true;
            }

            // Error เสียง
            if (this.sound == "") {
                this.sound_status = false;
            } else {
                this.sound_status = true;
            }

            // Error เสียงแบคอัพ
            if (this.soundbackup == "") {
                this.soundbackup_status = false;
            } else {
                this.soundbackup_status = true;
            }

            // Error คะแนน
            if (this.preview == "") {
                this.preview_status = false;
            } else {
                this.preview_status = true;
            }

            // Error คะแนน
            if (this.ratescore == "") {
                this.ratescore_status = false;
            } else {
                this.ratescore_status = true;
            }


            if (this.fullname == "" || this.description == "" || this.year == 0 || this.quality == "" || this.sound == "" || this.soundbackup == "" || this.preview == "" || this.ratescore == "" ) {
                this.$swal({
                    icon: "warning",
                    title: "Please complete the information.",
                });
            }
        },

        geneYear() {
            var currentYear = new Date().getFullYear();
            for (let index = 1991; index <= currentYear; index++) {
                index = String(index);
                this.year_options.push({ label: index, value: index });
            }
        },

        addType(type) {
            const obj = {
                name: type.text,
                code: type.value,
            };
            this.typeOption.push(obj);
            this.type.push(obj);
        },

        selectLabel({ name_en, name_th }) {
            return `${name_en} / ${name_th}`;
        },

        // ดึงข้อมูลมาแสดง
        get_data() {
            // var self = this;
            this.idpage = parseInt(this.$route.params.id);
            var body = {
                id: this.idpage,
                movie_type: "movie",
            };

            this.$store.commit("Loading");
            this.$axios
                .$post("api/v1/detail-manage-movie", body)
                .then((response) => {
                    this.id = response.result.id;
                    this.image = response.result.picture;
                    this.fullname = response.result.full_name;
                    this.nameth = response.result.name_th;
                    this.nameen = response.result.name_en;
                    this.description = response.result.description;
                    this.year = response.result.year.toString();

                    this.quality_value = response.result.quality;
                    if (response.result.quality == 0) {
                        this.quality = "HD";
                    } else if (response.result.quality == 1) {
                        this.quality = "Zoom";
                    } else if (response.result.quality == 2) {
                        this.quality = "Full HD";
                    } else if (response.result.quality == 3) {
                        this.quality = "4k";
                    } else {
                        this.quality = "";
                    }

                    this.preview = response.result.preview;
                    this.ratescore = response.result.ratescore;
                    this.imdb = response.result.imdb;

                    this.series = response.result.player_series_link_main != "" ? true : false;
                    this.sound = response.result.sound_main == 0 ? "Soundtrack" : "Thai";
                    this.sound_backup = response.result.sound_backup1 == 0 ? "Soundtrack" : "Thai";
                    if (response.result.player_series_link_main != "") {
                        this.sound = response.result.sound_series_main == 0 ? "Soundtrack" : "Thai";
                        this.sound_backup = response.result.sound_series_backup1 == 0 ? "Soundtrack" : "Thai";
                    }

                    this.status = response.result.active;

                    // นับเวลาปิด Loding 1วินาที
                    setTimeout(() => {
                        this.$store.commit("Loading");
                    }, 1000);
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        // Update Movie
        SaveData() {
            var self = this;
            var body = {
                id: self.idpage,
                movie_type: "movie",
                name_movie: self.fullname,
                description: self.description,
                year: Number(self.year),
                quality: self.castquality,
                sound_main: String(self.castsound),
                sound_backup1: String(self.castsoundbackup),
                example_youtube: self.preview,
                score: Number(self.ratescore),
                status: self.status == true ? 1 : 0,
            };

            if (self.series == true) {
                body = {
                    id: self.idpage,
                    movie_type: "movie",
                    name_movie: self.fullname,
                    description: self.description,
                    year: Number(self.year),
                    quality: self.castquality,
                    sound_series_main: String(self.castsound),
                    sound_series_backup1: String(self.castsoundbackup),
                    example_youtube: self.preview,
                    score: Number(self.ratescore),
                    status: self.status == true ? 1 : 0,
                };
            }

            self.$axios
                .$post("api/v1/update-manage-movie", body)
                .then((response) => {
                    if (response.code == 200) {
                        self.$swal({
                            icon: "success",
                            title: self.$t("Save Successful"),
                        });
                        setTimeout(function () {
                            self.get_data();
                        }, 2000);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    self.$swal({
                        icon: "error",
                        title: self.$t("Save Failed"),
                    });
                });
        },
    },
};
</script>
