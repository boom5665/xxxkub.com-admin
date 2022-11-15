<template>
    <div>
        <div class="pagination-containter" v-if="pagination">
            <div class="pagination">
                <div class="pagination-item first" @click="ChangePage('first')"><font-awesome-icon :icon="['fas', 'angles-left']"></font-awesome-icon></div>
                <div class="pagination-item prev" @click="ChangePage('prev')"><font-awesome-icon :icon="['fas', 'angle-left']"></font-awesome-icon></div>

                <div class="pagination-item" @click="ChangePageTo(i)" v-for="i in pageCount" :key="i" :class="i == page ? 'active ' : ''">{{ i }}</div>

                <div class="pagination-item next" @click="ChangePage('next')"><font-awesome-icon :icon="['fas', 'angle-right']"></font-awesome-icon></div>
                <div class="pagination-item last" @click="ChangePage('last')"><font-awesome-icon :icon="['fas', 'angles-right']"></font-awesome-icon></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            limit: 100,
            pageCount: 5,
            page: 1,
            pagination: true,
            dataTable: [],
        };
    },
    created() {
        for (var i in 199) {
            this.dataTable.push({
                id: i,
                name: "test " + i,
            });
        }
    },
    watch: {
        page() {
        },
    },
    methods: {
        ChangePageTo(i) {
            this.page = i;
        },
        ChangePage(i) {
            switch (i) {
                case "first":
                    this.page = 1;
                    break;
                case "prev":
                    if (this.page != 1) {
                        this.page = this.page - 1;
                    }
                    break;
                case "next":
                    if (this.page != this.pageCount) {
                        this.page = this.page + 1;
                    }
                    break;
                case "last":
                    this.page = this.pageCount;
                    break;
                default:
                    this.page = this.page;
            }
        },
    },
};
</script>