<template>
    <div>
        <label for="" class="input-label">{{ text_input_top }}</label>
        <div class="imageinput">
            <input type="file" ref="fileupload" accept="image/*" :id="'imageInput' + _id" @change="previewImage" :class="status_value == false ? 'alert-input' : ''" style="" />
            <label :for="'imageInput' + _id" class="imagebutton">{{ $t("Select Picture") }}</label>
            <div :class="icon" v-if="text_input_bottom != ''" style="text-align: left">{{ text_input_bottom }}</div>
            <div class="input-error" v-if="status_value == false">
                <font-awesome-icon :icon="['fa', icon_error]"></font-awesome-icon>
                Please complete the information.
            </div>
            <template v-if="previewStatus == true">
                <div class="file">
                    <div class="widthfile">
                        <img :src="preview" class="img-ads" />
                    </div>
                    <p class="mb-0">{{ imagename }}</p>
                </div>
            </template>
            <template v-else>
                <p class="mb-0" style="color: red">{{ textmax }}</p>
                <p class="mb-0" style="color: red">{{ textalert }}</p>
            </template>
            <!-- <template v-else-if="value">
                <div class="file">
                    <div class="widthfile">
                        <img :src="value" class="img-ads" />
                    </div>
                </div>
            </template> -->
        </div>
    </div>
</template>

<script>
export default {
    props: ["text_input_top", "text_input_bottom", "value", "status_value", "_id"],
    data() {
        return {
            image: null,
            preview: null,
            beforeimg: null,
            icon_error: "exclamation",
            icon: "input-label-bottom",
            previewStatus: false,
            textalert: "",
            textmax: "",
        };
    },

    created() {},
    methods: {
        previewImage(event) {
            const self = this;
            const input = event.target;
            if (input.files.length > 0) {
                self.beforeimg = input.files;
                const reader = new FileReader();
                reader.onload = (e) => {
                    self.preview = e.target.result;
                };
                self.imagename = input.files[0].name;
                self.image = input.files[0].type;
                self.imageSize = input.files[0].size;
                var converted = self.imageSize / (1024 * 1024).toFixed(2);
                reader.readAsDataURL(input.files[0]);

                if (converted > 10) {
                    self.previewStatus = true;
                    self.image = input.files[0];
                    self.$emit("input", this.$refs.fileupload.files[0]);
                } else {
                    self.previewStatussize = false;
                }
                if (self.image == "image/jpeg" || self.image == "image/gif" || self.image == "image/png" || self.image == "image/webp") {
                    self.previewStatus = true;
                    self.image = input.files[0];
                    self.$emit("input", this.$refs.fileupload.files[0]);
                } else {
                    self.textalert = "รองรับเฉพาะไฟล์ Jpeg Gif Png และ Webp หรือ ไฟล์ใหญ่ไม่เกิน 10 MB";
                    self.previewStatus = false;

                }

            } else {
                if (self.beforeimg) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        self.preview = e.target.result;
                    };
                    self.image = self.beforeimg[0];
                    reader.readAsDataURL(self.beforeimg[0]);
                    self.$emit("input", self.beforeimg);
                }
            }
        },
    },
};
</script>


<style lang="scss" scoped>
.imageinput {
    text-align: center;
}
.imageinput input {
    display: none;
}
.imageinput label {
    display: block;
    color: #fff;
    background-color: #1976d2;
    padding: 0.3rem 0.6rem;
    font-size: 100%;
    cursor: pointer;
    border-radius: 5px;
}

.imageinput span {
    display: none;
    text-align: center;
    cursor: pointer;
}
.imagebutton {
    width: 130px;
}

.img-ads {
    width: 100%;
}
.file {
    display: flex;
    flex-direction: column;
    align-content: space-around;
    align-items: center;

    .widthfile {
        width: -webkit-fill-available;
        height: max-content;
    }
}
</style>
