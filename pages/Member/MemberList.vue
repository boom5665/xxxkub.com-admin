<template>
    <div>
        <div id="test1" class="content-body" style="width: 50%">
            <div style="width: 100%">
                <div style="display: flex">
                    <div>
                        <div class="input-group">
                            <div class="user-addon">
                                <img src="~assets/images/icon_search.png" class="size_icon_search" alt="" />
                            </div>
                            <input type="text" class="input-all form-control ng-pristine ng-valid ng-touched" style="width: 250px !important; padding-left: 40px" v-model="search" placeholder="" :maxlength="maxsearch" />
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
        <div class="container-CreateShareholder" style="width: 50%">
            <div style="display: flex; justify-content: flex-end">
                <Pagination :currentPage="currentPage" :maxPage="maxPage" @currentPageclk="changeCurrentPage"></Pagination>
            </div>

            <div style="width: 100%">
                <div>
                    <div class="collist">
                        <div class="tableHeader addheader">
                            <div class="columid">{{ $t(headers.No) }}</div>
                            <div class="columtext colum-left">{{ $t(headers.Username) }}</div>
                            <div class="columAct">{{ $t(headers.Status) }}</div>
                        </div>

                        <div v-for="(val, i) in List" :key="i">
                            <div class="tableBody addbody">
                                <!-- no -->
                                <div class="columid">{{ (currentPage - 1) * perPage + i + 1 }}</div>
                                <!-- member -->
                                <div class="columtext colum-left">
                                    {{ val.username }}
                                </div>
                                <!-- status -->
                                <div class="columAct">
                                    <div class="display-start">
                                        <div class="input-group">
                                            <div>
                                                <label for="" class="">{{ $t(status_text_top) }}</label>
                                                <div class="input-group">
                                                    <div class="switch-list">
                                                        <label class="switch">
                                                            <input :id="'Check' + val.id" class="switch__input" type="checkbox" @change="UpdateStatus($event, val.id)" v-model="val.status" />
                                                            <i class="switch__icon"></i>
                                                            <span class="switch__span"></span>
                                                        </label>
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

            <div style="display: flex justify-content: flex-end;">
                <Pagination :currentPage="currentPage" :maxPage="maxPage" @currentPageclk="changeCurrentPage"></Pagination>
            </div>
        </div>
    </div>
</template>



<script>
import Pagination from "~/components/Pagination.vue";
export default {
    data() {
        return {
            headers: {
                No: "No.",
                Username: "username",
                Status: "Status",
            },
            currentPage: 1,
            maxPage: null,
            perPage: 100,
            status_text_top: "Show",
            List: [],
            search: "",
            maxsearch: 200,
        };
    },
    beforeCreate() {
        this.$store.commit("BreadChange", { title: "member", subtitle: "Member Management" });
    },
    mounted() {
        this.get_data();
    },
    methods: {
        changeCurrentPage(page) {
            this.currentPage = page;
            this.get_data();
        },
        checksearch() {
            this.search = this.search.trim();
            this.get_data();
        },
        get_data() {
            var body = {
                search: this.search,
                page: this.currentPage,
                perpage: this.perPage,
            };
            this.$store.commit("Loading");

            this.$axios
                .$post("api/v1/memberdetail", body)
                .then((response) => {
                    this.maxPage = response.result.page_total;
                    this.List = response.result.list;

                    // นับเวลาปิด Loding 1วินาที
                    setTimeout(() => {
                        this.$store.commit("Loading");
                    }, 1000);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        UpdateStatus(event, id) {
            var self = this;
            var body = {
                id: id,
                status: event.target.checked == true ? 1 : 0,
            };
            // console.log(body);
            // return;

            self.$axios
                .post("api/v1/memberupdate", body)
                .then(function (response) {
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
                        self.get_category();
                    }, 1000);
                });
        },
    },
    components: { Pagination },
};
</script>


<style scoped>
tr {
    text-align: center;
}
.columAct {
    padding: 5px;
}
</style>
