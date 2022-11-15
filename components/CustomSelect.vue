<template>
    <div>
        <label for="" class="input-label">{{ $t(text_input_top) }}</label>
        <!-- :style="'width:' + width" -->
        <div class="custom-select"  :tabindex="tabindex" @blur="open = false">
            <div class="selected" :class="{ open: open }" @click="open = !open">
                {{ selected }}
            </div>
            <div class="items" :class="{ selectHide: !open }">
                <div
                    v-for="(option, i) of options"
                    :key="i"
                    @click="
                        selected = option.label;
                        open = false;
                        $emit('input', option.value);
                    ">
                    {{ option.label }}
                </div>
            </div>
        </div>
        <div class="input-error" v-if="status_value == false">
            <font-awesome-icon :icon="['fa', icon_error]"></font-awesome-icon>
            Please complete the information.
        </div>
    </div>
</template>

<script>
export default {
    model: {
        prop: "value",
        event: "input",
    },
    // props: ["width"],
    props:
    {
        text_input_top: {
            type: String,
        },
        value: {
            type: String,
        },
        options: {
            type: Array,
            required: true,
        },
        default: {
            type: String,
            required: false,
            default: null,
        },
        tabindex: {
            type: Number,
            required: false,
            default: 0,
        },
        status_value: {
            type: Boolean,
            required: false,
            default: true,
        },

    },
    data() {
        return {
            selected: this.default ? this.default : this.options.length > 0 ? this.options[0].label : null,
            open: false,
            icon_error: "exclamation",
        };
    },
    mounted() {
        (this.selected = this.default ? this.default : this.options.length > 0 ? this.options[0].label : null), this.$emit("input", this.selected);
    },
    watch: {
        default(val) {
            this.selected = String(val);
        },
    },
};
</script>

<style scoped>
.custom-select {
    position: relative;
    width: 400px;
    text-align: left;
    outline: none;
    height: 2.375rem;
    line-height: 2.375rem;
}

.custom-select .selected {
    background-color: #008f6b;
    border-radius: 0.25rem;
    color: #fff;
    padding-left: 0.625rem;
    padding-right: 2.8125rem;
    cursor: pointer;
    user-select: none;
}

.custom-select .selected.open {
    border-radius: 0.25rem 0.25rem 0px 0px;
}

.custom-select .selected:after {
    position: absolute;
    content: "";
    top: 1.125rem;
    right: 0.625rem;
    width: 0.6rem;
    height: 0.3275rem;
    background: transparent url("../static/menu-dropdown.svg") no-repeat 100%/100%;
}

.custom-select .items {
    color: #fff;
    border-radius: 0px 0px 0.25rem 0.25rem;
    overflow: hidden;
    position: absolute;
    background-color: #008f6b;
    left: 0;
    right: 0;
    z-index: 2;
}

.custom-select .items div {
    color: #fff;
    padding-left: 1em;
    cursor: pointer;
    user-select: none;
}

.custom-select .items div:hover {
    background-color: #66bca6;
}

.selectHide {
    display: none;
}

.cusanime-only {
    width: 380px !important;
}
</style>
