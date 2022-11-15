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
                        <button @click="get_data" class="btn btn_search btn-src">
                            <span class="btn_font">{{ $t("Search") }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="container-CreateShareholder">
                <div style="width: 100%">
                    <div>
                        <div class="columallcate">
                            <div class="tableHeader addheader">
                                <div class="columid">No</div>
                                <div class="columtext">Category</div>
                                <div class="columAct">Actions</div>
                            </div>

                            <div v-for="(val, i) in Listads" :key="i">
                                <div class="tableBody addbody">
                                    <div class="columid">{{ i + 1 }}</div>
                                    <div class="columtext">
                                        {{ val.category_name_th }}
                                    </div>

                                    <div class="columAct">
                                        <button @click="Delete(val.id)" class="btn_delete btn-src"><span class="btn_font">Delete</span></button>
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
            headers: [
                {
                    id: "No",
                    name: "ชื่อ",
                    Email: "E-mail",
                    Line: "Mv428955",
                    Tell: "เบอร์โทรศัพท์",
                    daterequest: "วันที่แจ้ง",
                    Act: "Actions",
                },
            ],

            Listads: [],
            text_btn_Delete: "Delete",
            text_btn_Edit: "Edit",
            text_btn_Clear: "Clear",
            text_btn_Add: "Add",
            texts: [""],
            search: "",
            maxsearch: 200,
        };
    },
    beforeCreate() {
        this.$store.commit("BreadChange", { title: "Category Promote", subtitle: "Category Movie" });
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
            this.$swal({
                title: "ยืนยันที่จะลบ",
                text: "ถ้าตกลงลบแล้วจะไม่สามารถย้อนกลับได้",
                icon: "warning",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                showCancelButton: true,
                confirmButtonText: "ตกลง",
                cancelButtonText: "ยกเลิก",
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed == true) {
                    this.submitDelete(id);
                }
            });
        },

        get_data() {
            var body = {
                typemovie: "anime",
                page: 1,
                perpage: 10,
                search: this.search,
            };
            this.$axios
                .$post("api/v1/manage-list-category", body)
                .then((response) => {
                    this.Listads = response.result.list;
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        submitDelete(id) {
            var formData = {
                id: id,
            };

            var self = this;
            self.$axios
                .post("api/v1/manage-list-category", formData)
                .then(function (response) {
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
