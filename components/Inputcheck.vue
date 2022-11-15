<template>
    <div>
        <div class="input-group container">
            <div class="" style="display: flex">
                <div class="" style="position: relative">
                    <label class="switch">
                        <input :id="'Check' + id" class="switch__input" type="checkbox" @change="switchstatus" />
                        <span class="checkmark"></span>
                    </label>
                </div>
                <div style="position: relative; margin-left: 30px">
                    <label for="" class="input-label" style="margin-top: 5px !important;">{{ text_input_top }}</label>
                </div>
            </div>
            <div class="" v-if="text_input_bottom != ''">{{ text_input_bottom }}</div>
            <!-- <div class="input-error" v-if="value == true">
                <font-awesome-icon :icon="['fa', icon_error]"></font-awesome-icon>
                สถานะกำลังเปิด
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    props: ["text_input_top", "text_input_bottom", "switchvalue", "id"],
    data() {
        return {
            icon_error: "exclamation",
            valuebefor: "",
        };
    },
    mounted() {
        if (this.switchvalue == true) {
            document.getElementById("Check" + this.id).checked = true;
        }
    },
    created() {},
    methods: {
        switchstatus() {
            if (this.switchvalue == true) {
                this.valuebefor = false;
            } else {
                this.valuebefor = true;
            }
            this.$emit("switchchange", this.valuebefor);
        },
    },
    watch: {
        switchvalue(val) {
            if (val == true) {
                document.getElementById("Check" + this.id).checked = true;
                this.valuebefor = true;
            } else {
                document.getElementById("Check" + this.id).checked = false;
                this.valuebefor = false;
            }
            this.$emit("switchchange", this.valuebefor);

        },
    },
};
</script>

<style lang="scss" scoped>
.container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: 30px;
}

.container:hover input ~ .checkmark {
    background-color: #ccc;
}

.container input:checked ~ .checkmark {
    background-color: green;
}

.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

.container input:checked ~ .checkmark:after {
    display: block;
}

.container .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}
</style>
