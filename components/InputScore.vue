<template>
    <div>
        <label for="" class="input-label">{{ text_input_top }}</label>
        <div class="input-group" style="flex-direction: column;">
            <input type="text" class="input-all form-control ng-pristine ng-valid ng-touched" :class="status_value == false ? 'alert-input' : ''" v-model="score" v-on:input="pattern($event.target.value)" pattern="/[0-9.]/g" :maxlength="max"/>
            <div class="input-label-bottom" v-if="text_input_bottom != ''">{{ text_input_bottom }}</div>
            <div class="input-error" v-if="status_value == false">
                <font-awesome-icon :icon="['fa', icon_error]"></font-awesome-icon>
                Please complete the information.
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["text_input_top", "text_input_bottom", "value", "status_value"],
    data() {
        return {
            icon_error: "exclamation",
            score: this.value,
            max: 5,
        };
    },
    watch: {
        value(val){
            this.score = val
        },
    },
    created() {},
    methods: {
        pattern(val) {
            var regex=/[0-9.]/g;
            var p = String(val).match(regex);
            if(p != null){
                this.score = p.join("");
                this.$emit("input", this.score);
            }else{
                this.$emit("input", "");
            }
        },
    },
};
</script>
