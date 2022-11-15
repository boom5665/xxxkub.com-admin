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
                <div style="width: 100%">
                    <div>
                        <div class="columallreportreq" v-if="Listads">
                            <div class="tableHeader addheader">
                                <div class="columid">{{ $t("No.") }}</div>
                                <div class="columtext justleft">{{ $t("Name") }}</div>
                                <div class="columName">{{ $t("E-mail") }}</div>
                                <div class="columstatusads">{{ $t("Line") }}</div>
                                <div class="columstatusads">{{ $t("Tel") }}</div>
                                <div class="columstatusads">{{ $t("Date") }}</div>
                                <div class="columAct">{{ $t("Actions") }}</div>
                            </div>

                            <div v-for="(val, i) in Listads" :key="i">
                                <div class="tableBody addbody">
                                    <div class="columid">{{ (currentPage - 1) * perPage + i + 1 }}</div>

                                    <div class="columtext justleft">
                                        {{ val.name }}
                                    </div>
                                    <div class="columName">
                                        {{ val.email }}
                                    </div>
                                    <div class="columstatusads">
                                        {{ val.lineid }}
                                    </div>
                                    <div class="columstatusads">
                                        {{ val.tel }}
                                    </div>
                                    <div class="columstatusads">
                                        {{ val.create_date.split("T")[0] }}
                                    </div>
                                    <div class="columAct">
                                        <button @click="Delete(val.id)" class="btn btn_delete btn-src">
                                            <span class="btn_font">{{ $t("Delete") }}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="columallimg" style="text-align: center" v-else>ไม่พบข้อมูล</div>
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
        this.$store.commit("BreadChange", { title: "Request Advertisement", subtitle: "Report" });
    },
    mounted() {
        this.clickShowLoading();
    },
    watch: {},
    methods: {
        toeditpage(id) {
            return "/Ads/AdseditVideo/" + id;
        },

        clickShowLoading() {
            this.$store.commit("Loading");
            setTimeout(() => {
                this.$store.commit("Loading");
            }, 1000);
            this.get_data();
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
        changeCurrentPage(page) {
            this.currentPage = page;
            this.get_data();
        },
        checksearch() {
            this.search = this.search.trim();
            this.get_data();
        },
        get_data() {
            var self = this;
            var body = {
                page: this.currentPage,
                perpage: this.perPage,
                search: this.search,
            };

            self.$store.commit("Loading");
            self.$axios
                .$post("api/v1/manage-list-requestads", body)
                .then((response) => {
                    self.$store.commit("Loading");

                    self.maxPage = response.result.page_total;
                    self.Listads = response.result.list;
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        submitDelete(id) {
            var formData = {
                id: id,
            };
            this.$store.commit("Loading");
            var self = this;
            self.$axios
                .post("api/v1/manage-delete-requestads", formData)
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


