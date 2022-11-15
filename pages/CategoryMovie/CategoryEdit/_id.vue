<template>
    <div id="test1" class="content-body">
        <div style="width: 100%">
            <div>
                <div class="display-start">
                    <div class="col-lg-3">Category Name</div>
                    <div class="col-lg-8 input-group">
                        <input type="text" class="input-all form-control ng-pristine ng-valid ng-touched" :class="namestatus == false ? 'alert-input' : ''" v-model="name" @keydown="statusinputtrue('name')" />
                    </div>
                </div>


                <div class="col-lg-11 text-end">
                   <!-- <button  class="btn btn_Clear btn-src"><span class="btn_font">Clear</span></button> -->
                    <Btn :text_btn="text_save" v-on:click.native="test_save()" />
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


            name: "",
            namestatus: true,

            image: null,
            imagestatus: true,

            adsvideo: "",
            adsvideostatus: true,


            tab: null,
            icon_btn_Clear: "Clear",
            text_save: "Save",
            icon_btn_submit: "submit",
            preview: null,
            preview_list: [],
            image_list: [],
        };
    },
    beforeCreate() {
        this.$store.commit("BreadChange", {
            title: "แก้ไขหมวดหมู่หนัง",
            subtitle: "หมวดหมู่หนัง",
        });
    },
    watch: {},
    methods: {
        statusinputtrue(event) {
            if (event == "name") {
                if (this.namestatus == false) {
                    this.namestatus = true;
                }
            }
        },

        previewImage(event) {
            var input = event.target;
            if (input.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.preview = e.target.result;
                };
                this.image = input.files[0];
                reader.readAsDataURL(input.files[0]);

                this.imagestatus = true;
            }
        },
        reset() {},

        test_save() {

            if (this.name == "") {
                this.namestatus = false;
            } else {
                this.namestatus = true;
            }

            if ( this.name == "" ) {
                this.$swal({
                    icon: "warning",
                    title: "Please complete the information.",
                });
            }
        },

        refresh_page() {
        },
        clickShowLoading() {
            this.$store.commit("Loading");
            setTimeout(() => {
                this.$store.commit("Loading");
            }, 3000);
        },

        simple() {
            this.$swal("Hello world!");
        },

        success() {
            this.$swal({
                icon: "success",
                title: "Hello",
                text: "Hello brave new world!",
            });
        },

        error() {
            this.$swal({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        },
    },
};
</script>




