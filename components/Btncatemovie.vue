<template>
    <div class="btn_radio_checkbox">
        <div class="time-group">
            <button class="type-buttonss ng-star-inserted" v-for="(val, i) in currency" :key="i" :class="{ type_active: val.key }" @click="check_val(val.text)">{{ val.text }}</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currency: [
                {
                    text: "หนังทั้งหมด",
                    key: true,
                },
                {
                    text: "หนังโป๊",
                    key: false,
                },
                {
                    text: "อนิเมะ",
                    key: false,
                },
                {
                    text: "ฟุตบอล",
                    key: false,
                },
            ],
            text_true: 0,
        };
    },
    mounted() {},
    methods: {
        check_val(text_key) {
            for (var v in this.currency) {
                if (this.currency[v].text == text_key && this.currency[v].key == true) {
                    this.currency[v].key = false;
                    if (text_key != "ALL") {
                        this.text_true = this.text_true - 1;
                    } else {
                        this.text_true = 0;
                    }
                } else if (this.currency[v].text == text_key && this.currency[v].key == false) {
                    this.currency[v].key = true;
                    if (text_key != "ALL") {
                        this.text_true = this.text_true + 1;
                    } else {
                        this.text_true = 0;
                    }
                }
            }
            if (text_key == "ALL") {
                for (var v in this.currency) {
                    this.currency[v].key = false;
                }
                this.currency[0].key = true;
            } else {
                this.currency[0].key = false;
            }

            if (this.text_true == 0) {
                this.currency[0].key = true;
            }
            this.getDataCheckVal();
        },
        getDataCheckVal() {
            var data = [];
            for (var i in this.currency) {
                if (this.currency[i].key == true) {
                    data.push(this.currency[i].text);
                }
            }
        },
    },
};
</script>
