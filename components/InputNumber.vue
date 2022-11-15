<template>
    <div>
        <label for="" class="input-label">{{ text_input_top }}</label>
        <div class="input-group" style="flex-direction: column;">
            <input type="number" class="input-all form-control ng-pristine ng-valid ng-touched" v-bind:value="value" :class="status_value == false ? 'alert-input' : ''" v-on:input="$emit('input', $event.target.value)" />
            <!-- <div class="input-label-bottom" v-if="check_error == true">{{ text_input_bottom }}</div> -->
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
    props: ["text_input_top", "text_input_bottom", "value", "status_value", "min", "max"],
    data() {
        return {
            icon_error: "exclamation",
        };
    },


    watch: {
        value(val) {
            if (this.min) {
                if (parseInt(val) < this.min) {
                    this.$emit('input', this.min)
                    ;
                }
            }
            if (this.max) {
                if (parseInt(val) > this.max) {
                    this.$emit('input', this.max)
                }
            }
        },
    },
};
</script>
