<template>
    <div>
        <label for="" class="input-label">{{ text_input_top }}</label>
        <div class="input-group">
            <input type="text" class="input-all form-control ng-pristine ng-valid ng-touched" style="width: 280px !important" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" />
            <!-- <div class="input-label-bottom" v-if="check_error == true">{{ text_input_bottom }}</div> -->
            <div class="input-error" v-if="status_value == true">
                <font-awesome-icon :icon="['fa', icon_error]"></font-awesome-icon>
                กรอกข้อมูลไม่ครบ
            </div>
            <div class="input-error" v-if="check_error == false">
                <font-awesome-icon :icon="['fa', icon_error]"></font-awesome-icon>
                รูปแบบไม่ถูกต้อง
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
            check_error: true,
            reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
            email: "",
        };
    },
    watch: {
        value() {
            this.isEmailValid();
        },
    },
    methods: {
        isEmailValid() {
            if (this.value != "") {
                if (this.reg.test(this.value)) {
                    this.check_error = true;
                } else {
                    this.check_error = false;
                }
                this.$emit("status-value", this.check_error);
            }
        },
    },
};
</script>