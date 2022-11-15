<template>
    <div id="test1" class="content-body" style="width: max-content">
        <div class="row">
            <div class="" style="display: flex">
                <div class="col-12">
                    <div class="display-start">
                        <div class="input-group">
                            <InputText :text_input_top="$t(title_text_top)" :text_input_bottom="$t(title_text_bottom)" :status_value="titlestatus" v-model="title"></InputText>
                        </div>
                    </div>
                    <div class="display-start">
                        <div class="input-group">
                            <InputTextArea :text_input_top="$t(Description_text_top)" :status_value="Descriptionstatus" v-model="Description"></InputTextArea>
                        </div>
                    </div>
                    <div class="display-start">
                        <div class="input-group">
                            <InputText :text_input_top="$t(Slogan_text_top)" :text_input_bottom="$t(Slogan_text_bottom)" :status_value="Sloganstatus" v-model="Slogan"></InputText>
                        </div>
                    </div>
                    <div class="display-start">
                        <div class="input-group">
                            <InputNumber :text_input_top="$t(DateMovie_top_number)" :text_input_bottom="$t(DateMovie_text_bottom)" :status_value="DateMoviestatus" v-model="DateMovie" :min="1" :max="90"></InputNumber>
                        </div>
                    </div>
                    <div class="display-start">
                        <div class="col-6 input-group dis-flex">
                            <InputFile :text_input_top="$t(image_text_top)" :text_input_bottom="$t(image_text_bottom)" :status_value="imagestatus" v-model="image" :_id="1"></InputFile>
                        </div>
                        <div class="col-6 input-group dis-flex">
                            <InputFile :text_input_top="$t(image_list_text_top)" :text_input_bottom="$t(image_list_text_bottom)" :status_value="image_liststatus" v-model="image_list" :_id="2"></InputFile>
                        </div>
                    </div>
                    <div class="text-end">
                        <button @click="save()" class="btn btn_search">
                            <span class="btn_font">{{ $t("Save") }}</span>
                        </button>
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
            title_text_top: "Title Website",
            title_text_bottom: "Example Movie Online 24 Hrs.",
            title: "",
            titlestatus: true,

            Description_text_top: "Description Website",
            Description: "",
            Descriptionstatus: true,

            Slogan_text_top: "Slogan",
            Slogan_text_bottom: "Example Movie Online 24 Hrs.",
            Slogan: "",
            Sloganstatus: true,

            DateMovie_top_number: "New Movie Duration",
            DateMovie_text_bottom: "The date range to count new movies. For example, entering 60 will mean that movies updated today and back 60 days are 'New Movies'.",
            DateMovie: "",
            DateMoviestatus: true,

            image_text_top: "Logo Image",
            image_text_bottom: "File Type .png",
            image: "",
            imagestatus: true,

            image_list_text_top: "Icon Image",
            image_list_text_bottom: "File Type .ico",
            image_list: "",
            image_liststatus: true,

            image_default: "",
            image_list_default: "",

            id: "",
            tab: null,
            icon_btn_Clear: "Clear",
            text_save: "Save",
        };
    },

    watch: {
        title(val) {
            if (val.trim() != "") {
                this.titlestatus = true;
            }
        },
        Description(val) {
            if (val.trim() != "") {
                this.Descriptionstatus = true;
            }
        },
        Slogan(val) {
            if (val.trim() != "") {
                this.Sloganstatus = true;
            }
        },
        DateMovie(val) {
            if (val != "") {
                this.DateMoviestatus = true;
            }
        },
        image(val) {
            if (val != "" && val.type == "image/png") {
                this.imagestatus = true;
            }
        },
        image_list(val) {
            if (val != "" && val.type == "image/x-icon") {
                this.image_liststatus = true;
            }
        },
    },

    beforeCreate() {
        this.$store.commit("BreadChange", {
            title: "Setting Web",
            subtitle: "Setting",
        });
    },

    mounted() {
        this.get_data();
    },
    methods: {
        Clear() {
            this.title = "";
            this.Description = "";
            this.Slogan = "";
            this.DateMovie = "";
            this.image = "";
            this.image_list = "";
        },
        save() {
            if (
                this.title.trim() == "" || 
                this.Description.trim() == "" || 
                this.Slogan.trim() == "" || 
                this.DateMovie == "" || 
                this.image == "" || 
                (typeof this.image.name == 'string' && this.image.type != "image/png") || 
                this.image_list == "" || 
                (typeof this.image_list.name == 'string' && this.image_list.type != "image/x-icon")
            ) {
                this.error();
            } else {
                this.FormData();
            }
        },
        get_data() {
            this.$store.commit("Loading");
            this.$axios
                .$post("api/v1/manage-get-detail-setting")
                .then((response) => {
                    this.id = response.result.id;
                    this.title = response.result.title_header;
                    this.Description = response.result.description_footer;
                    this.Slogan = response.result.slogan;
                    this.DateMovie = response.result.condition_movienew;
                    this.image = response.result.logo;
                    this.image_list = response.result.icon;
                    this.image_default = response.result.logo;
                    this.image_list_default = response.result.icon;

                    setTimeout(() => {
                        this.$store.commit("Loading");
                    }, 500);
                })

                .catch((error) => {
                    console.log(error);
                });
        },

        error() {
            if (this.title.trim() == "") {
                this.titlestatus = false;
            } else {
                this.titlestatus = true;
            }
            if (this.Description.trim() == "") {
                this.Descriptionstatus = false;
            } else {
                this.Descriptionstatus = true;
            }
            if (this.Slogan.trim() == "") {
                this.Sloganstatus = false;
            } else {
                this.Sloganstatus = true;
            }
            if (this.DateMovie == "") {
                this.DateMoviestatus = false;
            } else {
                this.DateMoviestatus = true;
            }
            if (this.image == "") {
                this.imagestatus = false;
            } else {
                this.imagestatus = true;
            }
            if (typeof this.image.name == 'string' && this.image.type != "image/png") {
                this.$swal({
                    icon: "error",
                    title: self.$t("Image Type Incorrect"),
                });
                this.imagestatus = false;
            } else {
                this.imagestatus = true;
            }
            if (this.image_list == "") {
                this.image_liststatus = false;
            } else {
                this.image_liststatus = true;
            }
            if (typeof this.image_list.name == 'string' && this.image_list.type != "image/x-icon") {
                this.$swal({
                    icon: "error",
                    title: self.$t("Image Type Incorrect"),
                });
                this.image_liststatus = false;
            } else {
                this.image_liststatus = true;
            }
            if (this.title.trim() == "" || this.Description.trim() == "" || this.Slogan.trim() == "" || this.DateMovie == "" || this.image == "" || this.image_list == "") {
                this.$swal({
                    icon: "warning",
                    title: "Please complete the information.",
                });
            }
        },

        FormData() {
            var formData = new FormData();
            formData.append("id", this.id);
            formData.append("title_header", this.title.trim());
            formData.append("description_footer", this.Description.trim());
            formData.append("slogan", this.Slogan.trim());
            formData.append("condition_movienew", this.DateMovie);

            formData.append("logo", this.image == this.image_default ? null : this.image);
            formData.append("icon", this.image_list == this.image_list_default ? null : this.image_list);

            this.$store.commit("Loading");
            var self = this;
            self.$axios
                .post("api/v1/web/manage-update-setting", formData)
                .then(function (response) {
                    if (response.data.code == 200) {
                        self.$swal({
                            icon: "success",
                            title: self.$t("Save Successful"),
                        });
                        setTimeout(function () {
                            location.reload();
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



