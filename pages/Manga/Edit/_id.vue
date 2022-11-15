<template>
    <div id="test1" class="content-body" style="width:55%">
        <div class="row" style="width: 100%; display: block">
            <div class="col-lg-12 display-start">
                <h3>{{ $t("Manga") }}</h3>
            </div>
            <div class="col-12 display-start nopadding">
                <div class="input-group" style="width: 50%; padding: 0 1rem">
                    <img :src="image" class="imgads" controls="" />
                </div>
                <div class="input-group" style="width: 50%; padding: 0 1rem; display: block">
                    <div style="margin-top: 1rem">
                        <InputText :text_input_top="$t(fullname_text_top)" :text_input_bottom="fullname_text_bottom" :status_value="fullname_status" v-model="fullname"></InputText>
                    </div>

                    <InputTextArea :text_input_top="$t(description_text_top)" :text_input_bottom="description_text_bottom" :status_value="description_status" v-model="description"></InputTextArea>
                    <div style="margin-top: 1rem">
                        <Inputswitch :text_input_top="$t(status_text_top)" :switchvalue="status" @switchchange="(n) => (status = n)"></Inputswitch>
                    </div>
                    <div class="col-6 input-group nopadding">
                        <InputScore :text_input_top="$t(ratescore_text_top)" :text_input_bottom="ratescore_text_bottom" :status_value="ratescore_status" v-model="ratescore"></InputScore>
                    </div>
                </div>
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
            fullname_text_top: "Manga Name",
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

            ratescore_text_top: "Rate Score",
            ratescore_text_bottom: "",
            ratescore: "",
            ratescore_status: true,

            status_text_top: "Manga Show",
            status: "",
            statusstatus: true,
        };
    },
    beforeCreate() {
        this.$store.commit("BreadChange", {
            title: "Edit Manga",
            subtitle: "Manage Manga",
        });
    },
    mounted() {
        this.get_data();
    },
    computed: {},
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

        ratescore(val) {
            if (val != "") {
                this.ratescore_status = true;
            }

        },
    },
    methods: {
        save() {
            if (this.fullname == "" || this.description == "" || this.ratescore == "") {
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

            // Error คะแนน
            if (this.ratescore == "") {
                this.ratescore_status = false;
            } else {
                this.ratescore_status = true;
            }

            if (this.fullname == "" || this.description == "" || this.ratescore == "") {
                this.$swal({
                    icon: "warning",
                    title: "Please complete the information.",
                });
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
                movie_type: "manga",
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
                    this.ratescore = response.result.ratescore;
                    this.imdb = response.result.imdb;

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
                movie_type: "manga",
                name_movie: self.fullname,
                description: self.description,
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
