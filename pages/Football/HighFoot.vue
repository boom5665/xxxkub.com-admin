<template>
    <div id="test1" class="content-body">
        <div style="width: 100%">
            <div style="display: flex">
                <div>
                    <div class="input-group">
                        <div class="user-addon">
                            <img src="~assets/images/icon_search.png" class="size_icon_search" alt="" />
                        </div>
                        <input type="text" class="input-all form-control ng-pristine ng-valid ng-touched" style="width: 250px !important; padding-left: 40px" v-model="search" placeholder="" />
                    </div>
                </div>
                <div class="flex_btn">
                    <button @click="clickShowLoading" class="btn btn_search btn-src"><span class="btn_font">Search</span></button>
                    <button  class="btn btn_search btn-src"><span class="btn_font">Clear</span></button>
                    <nuxt-link to="/Football/FootballAdd" tag="button"><Btn :text_btn="text_btn_Add" /></nuxt-link>
                </div>
            </div>
        </div>
        <div class="container-CreateShareholder">
            <div style="width: 100%">
                <div>
                    <table>
                        <tr class="tableHeader" v-for="(value, i) in headers" :key="i">
                            <th>{{ value.id }}</th>
                            <th>{{ value.name }}</th>
                            <th>{{ value.Url }}</th>
                            <th>{{ value.date }}</th>
                            <th>{{ value.Act }}</th>
                        </tr>
                        <tr class="tableBody" v-for="(value, i) in body" :key="i">
                            <td>{{ i + 1 }}</td>
                            <td>{{ value.name }}</td>
                            <td>{{ value.Url }}</td>
                            <td>{{ value.date }}</td>
                            <td>
                                <nuxt-link :to="toeditpage(i)" tag="button"><Btn :text_btn="text_btn_Edit" /></nuxt-link>
                                <button @click="Delete" class="btn_delete btn-src"><span class="btn_font">Delete</span></button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            headers: [
                {
                    id: "No",
                    name: "ชื่อ",
                    Url: "youtube",
                    date: "วันที่",
                    Act: "Action",
                },
            ],
            body: [
                {
                    name: "ชื่อ",
                    Url: "youtube",
                    date: "วันที่",
                },
            ],
            text_btn_Delete: "Delete",
            text_btn_Edit: "Edit",
            text_btn_Clear: "Clear",
            text_btn_Add: "Add",
            search: "",
        };
    },
    beforeCreate() {
        this.$store.commit("BreadChange", { title: "ไฮไลต์ ฟุตบอล", subtitle: "ฟุคบอล" });
    },
    mounted() {},
    watch: {},
    methods: {
       toeditpage(id) {
            return "/Football/Footballedit/" + id;
        },
        clickShowLoading() {
            // this.$store.commit("Loading");
            // setTimeout(() => {
            //     this.$store.commit("Loading");
            // }, 3000);
        },
        Clear() {
            this.search = "";
        },
        Delete() {
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
                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire("Deleted!", "Your file has been deleted.", "success");
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire("Cancelled", "Your imaginary file is safe :)", "error");
                }
            });
        },
    },
};
</script>



