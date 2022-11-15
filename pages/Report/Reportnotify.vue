<template>
    <div>
        <div id="test1" class="content-body">
            <div style="width: 100%">
                <div style="display: flex">
                    <div>
                        <div class="input-group">
                            <div class="user-addon">
                                <img src="~assets/images/icon_search.png" class="size_icon_search" alt="" />
                            </div>
                            <input type="text" class="input-all form-control ng-pristine ng-valid ng-touched" style="width: 250px !important; padding-left: 40px" v-model="search" placeholder="" :maxlength="maxsearch"/>
                        </div>
                    </div>
                    <div class="flex_btn">
                        <button @click="checksearch" class="btn btn_search btn-src">
                            <span class="btn_font">{{ $t("Search") }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="container-CreateShareholder" style="display: flex; flex-direction: column">
                <div style="display: flex; justify-content: flex-end">
                    <Pagination :currentPage="currentPage" :maxPage="maxPage" @currentPageclk="changeCurrentPage"></Pagination>
                </div>
                <div style="width: 100%">
                    <div class="columallbroken" v-if="Listads">
                        <div class="tableHeader addheader">
                            <div class="columid">{{ $t("No.") }}</div>
                            <div class="columtext justleft">{{ $t("Movie Name") }}</div>
                            <div class="columskip justleft">{{ $t("Reason") }}</div>
                            <div class="columName" style="align-items: center">{{ $t("Date") }}</div>
                            <div class="columAct">{{ $t("Actions") }}</div>
                        </div>

                        <div class="tableBody addbody" v-for="(val, i) in Listads" :key="i">
                            <div class="columid" style="">
                                {{ (currentPage - 1) * perPage + i + 1 }}
                            </div>

                            <div class="columtext justleft">
                                {{ val.full_name }}
                            </div>
                            <div class="columskip">
                                <div class="">
                                    <div v-for="(v, index) in val.detail" :key="index">- {{ v.reason }}</div>
                                </div>
                            </div>
                            <div class="columName">
                                <div v-for="(v, index) in val.detail" :key="index">{{ v.create_data.split("T")[0] }}</div>
                            </div>
                            <div class="columAct">
                                <!-- <button @click="edit(val.movie_id, val.movie_type, val.status)" class="btn_edit btn-src"><span class="btn_font">Edit</span></button> -->
                                <button @click="Delete(val.movie_id, val.movie_type)" class="btn btn_delete btn-src">
                                    <span class="btn_font">{{ $t("Delete") }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="columallbroken" style="text-align: center" v-else>ไม่พบข้อมูล</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            Listads: [],
            text_btn_Delete: "Delete",
            text_btn_Edit: "Edit",
            text_btn_Clear: "Clear",
            text_btn_Add: "Add",
            texts: [""],
            search: "",
            maxsearch: 200,

            currentPage: 1,
            maxPage: null,
            perPage: 50,
        };
    },
    beforeCreate() {
        this.$store.commit("BreadChange", { title: "Report Broken Movie", subtitle: "Report" });
    },
    mounted() {
        this.clickShowLoading();
    },
    watch: {},
    methods: {
        clickShowLoading() {
            this.$store.commit("Loading");
            setTimeout(() => {
                this.$store.commit("Loading");
            }, 1000);
            this.get_data();
        },
        checksearch() {
            this.search = this.search.trim();

            this.get_data();
        },
        changeCurrentPage(page) {
            this.currentPage = page;
            this.get_data();
        },
        get_data() {

            var body = {
                page: this.currentPage,
                perpage: this.perPage,
                search: this.search,
                product_name: process.env.PRODUCTNAME,
            };

            this.$store.commit("Loading");
            this.$axios
                .$post("api/v1/list-report-broken", body)
                .then((response) => {

                    this.maxPage = response.result.page_total;
                    this.Listads = response.result.list;
                    setTimeout(() => {
                        this.$store.commit("Loading");
                    }, 1000);
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        Delete(movie_id, movie_type) {
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
                    this.submitDelete(movie_id, movie_type);
                }
            });
        },
        submitDelete(movie_id, movie_type) {
            var formData = {
                product_name: process.env.PRODUCTNAME,
                movie_id: movie_id,
                movie_type: movie_type,
            };

            var self = this;
            this.$store.commit("Loading");
            this.$axios
                .post("api/v1/delete-report-broken", formData)
                .then(function (response) {
                    self.$store.commit("Loading");
                    if (response.data.code == 200) {
                        self.$swal({
                            icon: "success",
                            title: self.$t("Delete Successful"),
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
                        title: self.$t("Delete Failed"),
                    });
                    setTimeout(function () {
                        self.get_data();
                    }, 1000);
                });
        },
    },
};
</script>


<style scoped>
tr {
    text-align: center;
}
</style>
