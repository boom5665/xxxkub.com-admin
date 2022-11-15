<template>
    <div>
        <label
            for=""
            class=""
            style="    display: flex;
    flex-direction: column;
    align-items: flex-start;
}"
            >{{ text_input_top }}</label
        >
        <div class="input-group">
            <div class="switch-list">
                <label class="switch" style="">
                    <input :id="'Check' + id" class="switch__input" type="checkbox" @change="switchstatus" />
                    <i class="switch__icon"></i>
                    <span class="switch__span"></span>
                </label>
            </div>
            <div class="input-label-bottom" v-if="text_input_bottom != ''">{{ text_input_bottom }}</div>
            <!-- <div class="input-error" v-if="value == true">
                <font-awesome-icon :icon="['fa', icon_error]"></font-awesome-icon>
                สถานะกำลังเปิด
            </div>
            <div class="input-error" v-if="value == false">
                <font-awesome-icon :icon="['fa', icon_error]"></font-awesome-icon>
                สถานะกำลังปิด
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
.switch {
    display: flex;
    align-items: center;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    &__input {
        display: none;
        &:checked + .switch__icon {
            background-color: green;
            &:before {
                transform: translate3d(18px, 2px, 0) scale3d(0, 0, 0);
            }
            &:after {
                transform: translate3d(20px, 2px, 0);
            }
        }
    }
    &__icon {
        position: relative;
        display: inline-block;
        max-width: 42px;
        min-width: 42px;
        min-height: 24px;
        max-height: 24px;
        background-color: #bebebe;
        border-radius: 22px;
        vertical-align: text-bottom;
        transition: all 0.3s linear;
        &:before {
            content: "";
            position: absolute;
            left: 0;
            width: 38px;
            height: 20px;
            background-color: #bebebe;
            border-radius: 11px;
            transform: translate3d(2px, 2px, 0) scaleX(1);
            transition: all 0.25s linear;
        }
        &:after {
            content: "";
            position: absolute;
            left: 0;
            width: 20px;
            height: 20px;
            background-color: #fff;
            border-radius: 11px;
            box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24);
            transform: translate3d(2px, 2px, 0);
            transition: all 0.2s ease-in-out;
        }
    }
    &__span {
        font-size: 14px;
        margin-left: 5px;
        font-weight: 400;
    }
}
</style>
