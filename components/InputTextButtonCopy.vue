<template>
    <div>
        <label for="" class="input-label">{{ text_input_top }}</label>
        <div class="input-group" style="flex-direction: column;">
            <input type="text" class="input-all form-control ng-pristine ng-valid ng-touched" :class="status_value == false ? 'alert-input' : ''" :value="value" v-on:input="$emit('input', $event.target.value)" />
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
        };
    },

    created() {},
    methods: {},
};
</script>
