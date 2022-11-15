<template>
    <div>
        <div>
            <div class="container-CreateShareholder" style="width: 60%">
                <div class="display-start" style="width: 100%">

                    <!-- หมวดหมู่หนัง -->
                    <div style="width: 60%;padding: 0 1rem;">
                        <h3 style="margin-bottom: 1rem;">{{ $t('Category Movie') }}</h3>
                        <div class="columallcate">
                            <div class="tableHeader addheader">
                                <div class="columid">{{$t('No.')}}</div>
                                <div class="columtext colum-left">{{$t('Category')}}</div>
                                <div class="columAct" >{{$t('Actions')}}</div>
                            </div>

                            <div v-for="(val, i) in Listads" :key="i">
                                <div class="tableBody addbody">
                                    <div class="columid">{{ i + 1 }}</div>
                                    <div class="columtext colum-left">
                                        {{ val.category_name_th }}
                                    </div>

                                    <div class="columAct" >
                                        <div class="columActleft">
                                            <div class="display-start">
                                                <div class="input-group">
                                                    <div>
                                                        <label for="" class="">{{ $t(status_text_top) }}</label>
                                                        <div class="input-group">
                                                            <div class="switch-list">
                                                                <label class="switch">
                                                                    <input :id="'Check' + val.id" class="switch__input" type="checkbox" @change="SaveCategory($event, val.id, val.category_name_th, val.category_name_en, val.category_sort)" v-model="val.status" />
                                                                    <i class="switch__icon"></i>
                                                                    <span class="switch__span"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style="">
                                                    <!-- <button @click="save(val.id, val.status)" class="btn btn_Save btn-src"><span class="btn_font">Save</span></button> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ประเภทหนัง -->
                    <div style="width: 60%;padding: 0 1rem;">
                        <h3 style="margin-bottom: 1rem;">{{ $t('Type Movie') }}</h3>
                        <div class="columallcate">
                            <div class="tableHeader addheader">
                                <div class="columid">{{$t('No.')}}</div>
                                <div class="columtext colum-left">{{$t('Type')}}</div>
                                <div class="columAct">{{$t('Actions')}}</div>
                            </div>

                            <div v-for="(type, i) in ListType" :key="i">
                                <div class="tableBody addbody">
                                    <div class="columid">{{ i + 1 }}</div>
                                    <div class="columtext colum-left">
                                        {{ type.type_name_th }}
                                    </div>

                                    <div class="columAct">
                                        <div class="columActleft">
                                            <div class="display-start">
                                                <div class="input-group">
                                                    <div>
                                                        <label for="" class="">{{ $t(status_text_top) }}</label>
                                                        <div class="input-group">
                                                            <div class="switch-list">
                                                                <label class="switch">
                                                                    <input :id="'Check' + type.id" class="switch__input" type="checkbox" @change="SaveType($event, type.id, type.type_name_th, type.type_name_en, type.type_sort)" v-model="type.status" />
                                                                    <i class="switch__icon"></i>
                                                                    <span class="switch__span"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style="">
                                                    <!-- <button @click="save(val.id, val.status)" class="btn btn_Save btn-src"><span class="btn_font">Save</span></button> -->
                                                </div>
                                            </div>
                                        </div>
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
    data() {
        return {
            status_text_top: "Show",
            Listads: [],
            ListType: [],
            texts: [""],
            search: "",
        };
    },
    beforeCreate() {
        this.$store.commit("BreadChange", { title: "Category Movie", subtitle: "Category Manage" });
    },
    mounted() {
        this.get_category();
        this.get_type();
    },
    watch: {},
    methods: {
        get_category() {
            var body = {
                typemovie: "movie",
                page: 1,
                perpage: 100,
                search: this.search,
            };
            this.$store.commit("Loading");
            this.$axios
                .$post("api/v1/manage-list-category", body)
                .then((response) => {
                    this.Listads = response.result.list;
                    setTimeout(() => {
                        this.$store.commit("Loading");
                    }, 1000);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        get_type() {
            var body = {
                typemovie: "movie",
                page: 1,
                perpage: 100,
                search: this.search,
            };
            this.$store.commit("Loading");
            this.$axios
                .$post("api/v1/manage-list-type", body)
                .then((response) => {
                    this.ListType = response.result.list;
                    setTimeout(() => {
                        this.$store.commit("Loading");
                    }, 1000);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        SaveCategory(event, id, name_th, name_en, sort) {
            var formData = {
                id: id,
                typemovie: "movie",
                category_name_th: name_th,
                category_name_en: name_en,
                status: event.target.checked == true ? 1 : 0,
                category_sort: sort
            };

            var self = this;
            self.$axios
                .post("api/v1/manage-update-category", formData)
                .then(function (response) {
                    if (response.data.code == 200) {
                        self.$swal({
                            icon: "success",
                            title: self.$t("Save Successful"),
                        });

                        setTimeout(function () {
                            self.get_category();
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
                        self.get_category();
                    }, 1000);
                });
        },
        SaveType(event, id, name_th, name_en, sort) {
            var formData = {
                id: id,
                typemovie: "movie",
                type_name_th: name_th,
                type_name_en: name_en,
                status: event.target.checked == true ? 1 : 0,
                type_sort: sort
            };

            var self = this;
            self.$axios
                .post("api/v1/manage-update-type", formData)
                .then(function (response) {
                    if (response.data.code == 200) {
                        self.$swal({
                            icon: "success",
                            title: self.$t("Save Successful"),
                        });

                        setTimeout(function () {
                            self.get_type();
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
                        self.get_type();
                    }, 1000);
                });
        },
    },
};
</script>


<style lang="scss" scoped>
tr {
    text-align: center;
}

</style>

