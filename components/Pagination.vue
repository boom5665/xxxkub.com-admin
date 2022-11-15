<template>
    <div class="pagination-containter dis" v-show="maxPage > 1">
        <div class="pagination">
            <div class="pagination-item first" v-show="crPage > 2" @click="crPage = 1"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angles-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-angles-left fa-w-14"><path fill="currentColor" d="M77.25 256l137.4-137.4c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0l-160 160c-12.5 12.5-12.5 32.75 0 45.25l160 160C175.6 444.9 183.8 448 192 448s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25L77.25 256zM269.3 256l137.4-137.4c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0l-160 160c-12.5 12.5-12.5 32.75 0 45.25l160 160C367.6 444.9 375.8 448 384 448s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25L269.3 256z" class=""></path></svg></div>
            <div class="pagination-item prev" v-show="crPage > 1" @click="crPage--"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" class="svg-inline--fa fa-angle-left fa-w-8"><path fill="currentColor" d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" class=""></path></svg></div>
            <!-- <div class="page" v-show="crPage != 1" :class="{ active: crPage == 1 }" @click="crPage = 1">1</div> -->
            <!-- <div class="pagination-item dot text-left" v-show="checkDotPrev()">...</div> -->
            <div class="pagination-item" :class="{ active: crPage == index }" v-show="checkIndex(index)" v-for="index in maxPage" :key="index" @click="crPage = index">{{ index }}</div>
            <!-- <div class="pagination-item dot text-right" v-show="checkDotNext()">...</div> -->
            <!-- <div class="page" :class="{ active: crPage == maxPage }" @click="crPage = maxPage">{{ maxPage }}</div> -->
            <div class="pagination-item next" v-show="crPage < maxPage" @click="crPage++"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" class="svg-inline--fa fa-angle-right fa-w-8"><path fill="currentColor" d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" class=""></path></svg></div>
            <div class="pagination-item last" v-show="crPage + 1 < maxPage" @click="crPage = maxPage"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angles-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-angles-right fa-w-14"><path fill="currentColor" d="M246.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L178.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C47.63 444.9 55.81 448 64 448s16.38-3.125 22.62-9.375l160-160C259.1 266.1 259.1 245.9 246.6 233.4zM438.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L370.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C239.6 444.9 247.8 448 256 448s16.38-3.125 22.62-9.375l160-160C451.1 266.1 451.1 245.9 438.6 233.4z" class=""></path></svg></div>
        </div>



    </div>
</template>

  <script>
export default {
    props: ["currentPage", "maxPage"],
    data() {
        return {

            crPage:this.currentPage,

        };
    },
    watch: {
        crPage() {
            this.checkIndex();
            this.$emit("currentPageclk", this.crPage);
        },
    },
    methods: {
        checkIndex(index) {
            // if (index == 1 || index === this.maxPage) return false;
            if ((index >= this.crPage && index - 3 < this.crPage) || (index <= this.crPage && index + 3 > this.crPage)) {
                return true;
            } else {
                return false;
            }
        },
        checkDotPrev() {
            if (3 < this.crPage) {
                return true;
            } else {
                return false;
            }
        },
        checkDotNext() {
            if (this.maxPage - 3 > this.crPage) {
                return true;
            } else {
                return false;
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.active {
    background-color: #22876e !important;
    color: #fff;
}
.dis {
    display: flex;
    border-radius: 5px;
    margin: 10px;
    cursor: pointer;
    justify-content: flex-end;

    cursor: pointer;
    .text-style {
        border: 1px solid #22876e;
        background-color: rgb(237, 234, 234);
        font-size: 17px;
        text-align: center;
        padding: 10px 10px;
        &:hover {
            background-color: #22876e;
            color: #fff;
        }
    }
    .text-left {
        width: 20px;
        height: 30px;
        border: 1px solid #22876e;
        border-radius: 5px 0px 0px 5px;
        background-color: rgb(237, 234, 234);
        font-size: 20px;
        text-align: center;
        padding: 5px;
    }
    .text-right {
        width: 20px;
        height: 30px;
        border: 1px solid #22876e;
        border-radius: 0px 5px 5px 0px;
        background-color: rgb(237, 234, 234);
        font-size: 20px;
        text-align: center;
        padding: 5px;
    }
}
</style>
