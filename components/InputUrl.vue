<template>
    <div>
        <label for="" class="input-label">{{ text_input_top }}</label>
        <div class="input-group">
            <input type="url" pattern="^(http|https)://\.(.*)" class="input-all form-control ng-pristine ng-valid ng-touched" :class="status == false ? 'alert-input' : ''" v-model="valueUrl" v-on:input="pattern($event.target.value)" :maxlength="max" required />
            <div class="input-label-bottom" v-if="text_input_bottom != ''">{{ text_input_bottom }}</div>
            <div class="input-error" v-if="status == false">
                <font-awesome-icon :icon="['fa', icon_error]"></font-awesome-icon>
                Url ควรขึ้นต้นด้วย HTTP
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
            valueUrl : this.value,
            status: this.status_value,
            max: 255,
        };
    },
    watch: {
        value(val){
            let url = val.trim();
            this.valueUrl = url
        },
        status_value(val){
            this.status = val
        },
    },
    created() {},
    methods: {
        pattern(val) {
            if ( val.length >= 1 && val[0] != "h" && val[0] != "H" ) {
                this.status = false;
                this.valueUrl = "";
            }
            if ( val.length >= 2 && val[1] != "t" && val[1] != "T" ) {
                this.status = false;
                this.valueUrl = "";
            }
            if ( val.length >= 3 && val[2] != "t" && val[2] != "T") {
                this.status = false;
                this.valueUrl = "";
            }
            if ( val.length >= 4 && val[3] != "p" && val[3] != "P") {
                this.status = false;
                this.valueUrl = "";
            }

            // เช็ค URL ว่าใช่ไหม
            var regex = new RegExp('^(https?:\\/\\/)?'+ // protocol
                                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                                    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                                    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                                    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
            if(regex.test(val) == false){
                this.status = false;
            }else{
                this.status = true;
            }

            this.$emit("input", this.valueUrl);

        },
    },
};
</script>
