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
        <div class="container-CreateShareholder" style="flex-direction: column">
            <div style="display: flex; justify-content: flex-end">
                <Pagination :currentPage="currentPage" :maxPage="maxPage" @currentPageclk="changeCurrentPage"></Pagination>
            </div>

            <div style="width: 100%">
                <div>
                    <div class="collist">
                        <div class="tableHeader addheader">
                            <div class="columid">{{ $t(headers.No) }}</div>
                            <div class="columName">{{ $t(headers.Img) }}</div>
                            <div class="columtext colum-left">{{ $t(headers.Name) }}</div>
                            <div class="columstatusads">{{ $t(headers.Rating) }}</div>
                            <div class="columAct">{{ $t(headers.Act) }}</div>
                        </div>

                        <div v-for="(val, i) in List" :key="i">
                            <div class="tableBody addbody">
                                <!-- ??????????????? -->
                                <div class="columid">{{ (currentPage - 1) * perPage + i + 1 }}</div>
                                <!-- ?????????????????? -->
                                <div class="columName">
                                    <img id="" :src="val.picture" class="imgadslist" controls="" />
                                </div>
                                <!-- ???????????????????????? -->
                                <div class="columtext colum-left">
                                    {{ val.full_name }}
                                </div>
                                <!-- ?????????????????? -->
                                <!-- ??????????????? -->
                                <div class="columstatusads">
                                    {{ val.ratescore }}
                                </div>
                                <div class="columAct">
                                    <nuxt-link class="btn btn_search btn-src" :to="Edit(val.id)" tag="button">
                                            <span class="btn_font">{{ $t("Edit Manga") }}</span>
                                    </nuxt-link
                                    >
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
                Img: "Image",
                Name: "Movie_Name",
                Quality: "Quality",
                Sound: "Sound",
                Rating: "Rating",
                Date: "Date",
                Act: "Actions",
            },
            currentPage: 1,
            maxPage: null,
            perPage: 100,
            List: [],
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
        this.$store.commit("BreadChange", { title: "Manga List", subtitle: "Manage_Movie" });
    },
    mounted() {
        this.get_data();
    },
    watch: {
        // currentPage() {
        //     this.get_data();
        // },
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
                search: this.search.trim(),
                page: this.currentPage,
                perpage: this.perPage,
                movie_type: "manga",
                status: "1",
            };
            this.$store.commit("Loading");

            this.$axios
                .$post("api/v1/list-manage-movie", body)
                .then((response) => {
                    this.maxPage = response.result.page_total;
                    this.List = response.result.list;

                    // ?????????????????????????????? Loding 1??????????????????
                    setTimeout(() => {
                        this.$store.commit("Loading");
                    }, 3000);

                    // check token expire
                    if (response.code == 4001) {
                        this.$router.push("/login");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        Edit(id) {
            return "/Manga/Edit/" + id;
        },
    },
    components: { Pagination },
};
</script>


<style scoped>
tr {
    text-align: center;
}
</style>
