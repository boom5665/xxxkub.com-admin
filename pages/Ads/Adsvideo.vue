<template>
    <div id="test1" class="content-body">
        <div>
            <div class="">
                <div>
                    <div class="columallvideo" v-if="Listads">
                        <!-- <div class="tableHeader addheader">
                            <div class="columid">{{ $t("No.") }}</div>
                            <div class="columtext">{{ $t("Video") }}</div>
                            <div class="columAct">{{ $t("Actions") }}</div>
                        </div> -->

                        <div v-for="(val, i) in Listads" :key="i">
                          <AdsVieolListcompanent :val="val" :i="i"></AdsVieolListcompanent>
                        </div>
                    </div>
                     <div class="columallvideo" style="text-align: center;" v-else>
                      ไม่พบข้อมูล
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
            image: null,
            preview: null,
            beforeimg: null,
        };
    },
    beforeCreate() {
        this.$store.commit("BreadChange", { title: "Advertisement Video", subtitle: "Advertisement" });
    },
    mounted() {
        this.get_data();
    },
    watch: {},
    methods: {

        get_data() {
            var body = {
                search: "",
            };
            this.$store.commit("Loading");
            this.$axios
                .$post("api/v1/ads-vdo/get-list ", body)
                .then((response) => {
                    this.Listads = response.result;
                    let resObj = response.result;
                    for (const i in resObj) {
                        if (Object.hasOwnProperty.call(resObj, i)) {
                            const element = resObj[i];
                            resObj[i].previewKey = "";
                        }
                    }
                    this.Listads = resObj;
                    setTimeout(() => {
                        this.$store.commit("Loading");
                    }, 1000);
                })
                .catch((error) => {
                    console.log(error);
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
