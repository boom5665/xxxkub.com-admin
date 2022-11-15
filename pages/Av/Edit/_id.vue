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
                    <CustomSelect :text_input_top="$t(year_text_top)" v-model="year" :default="year" :options="year_options" :status_value="year_status"></CustomSelect>
                    <div style="margin-top: 1rem">
                        <Inputswitch :text_input_top="$t(status_text_top)" :switchvalue="status" @switchchange="(n) => (status = n)"></Inputswitch>
                    </div>
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

            description_text_top: "Description",
            description_text_bottom: "",
            description: "",
            description_status: true,

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
        year(val) {
            if (val != 0) {
                this.preview_status = true;
            }
        },
        preview(val) {
            if (val != "") {
                this.preview_status = true;
            }
        },
        ratescore(val) {
            if (val != 0) {
                this.ratescore_status = true;
            }
        },
    },
    methods: {
        save() {
            if (this.fullname == "" || this.description == "" || (this.year == 0 || this.year == "") || this.preview == ""  || this.ratescore == 0) {
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
            if (this.year == 0 || this.year == "" ) {
                this.year_status = false;
            } else {
                this.year_status = true;
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


            if (this.fullname == "" || this.description == "" || this.year == "" || this.preview == "" || this.ratescore == "" ) {
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
                movie_type: "av",
            };

            this.$store.commit("Loading");
            this.$axios
                .$post("api/v1/detail-manage-movie", body)
                .then((response) => {
                    this.id = response.result.id;
                    this.image = response.result.picture;
                    this.fullname = response.result.full_name;
                    this.description = response.result.description;
                    this.year = response.result.year.toString();
                    this.preview = response.result.preview;
                    this.ratescore = response.result.ratescore;
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

        // Update Av
        SaveData() {
            var self = this;
            var body = {
                id: self.idpage,
                movie_type: "av",
                name_movie: self.fullname,
                description: self.description,
                year: Number(self.year),
                example_youtube: self.preview,
                score: Number(self.ratescore),
                status: self.status == true ? 1 : 0,
            };

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
