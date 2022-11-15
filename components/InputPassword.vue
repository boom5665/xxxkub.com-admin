<template>
    <div style="width: 100%">
        <div style="display: flex">
            <div>
                <label for="" class="input-label">{{ text_input_top }}</label>
                <div class="input-group">
                    <div class="user-addon-right" @click="show_password" style="cursor: pointer">
                        <font-awesome-icon v-show="check_icon_eye == true" class="size_icon_search" :icon="['fa', icon_eye1]"></font-awesome-icon>
                        <font-awesome-icon v-show="check_icon_eye == false" class="size_icon_search" :icon="['fa', icon_eye2]"></font-awesome-icon>
                    </div>
                    <input :type="type_input" class="input-all form-control ng-pristine ng-valid ng-touched" style="width: 250px !important; padding-right: 40px" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" />
                </div>
                <div class="input-error" v-if="status_value == true">
                    <font-awesome-icon class="mat-icon notranslate eye-icon mat-icon-no-color ng-star-inserted" :icon="['fa', icon_error]"></font-awesome-icon>
                    กรอกข้อมูลไม่ครบ
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["text_input_top", "value", "status_value"],
    data() {
        return {
            icon_error: "exclamation",
            icon_eye1: "eye",
            icon_eye2: "eye-slash",
            check_icon_eye: true,
            type_input: "password",
        };
    },
    methods: {
        show_password() {
            if (this.check_icon_eye == true) {
                this.check_icon_eye = false;
                this.type_input = "text";
            } else {
                this.check_icon_eye = true;
                this.type_input = "password";
            }
        },
    },
};
</script>