<template>
    <div>
        <label for="" class="input-label">{{ text_input_top }}</label>
        <div class="imageinput">
            <input type="file" ref="fileupload" accept="image/*" :id="'imageInput' + _id" @change="previewImage" :class="status_value == false ? 'alert-input' : ''" style="" />
            <label :for="'imageInput' + _id" class="imagebutton">{{$t('Select Picture')}}</label>
            <div :class="icon" v-if="text_input_bottom != ''" style="text-align: left">{{ text_input_bottom }}</div>
            <div class="input-error" v-if="status_value == false">
                <font-awesome-icon :icon="['fa', icon_error]"></font-awesome-icon>
                Please complete the information.
            </div>
            <template v-if="preview">
                <div class="file">
                    <div class="widthfile">
                        <img :src="preview" class="img-fluid" />
                    </div>
                    <p class="mb-0">{{ image.name }}</p>
                </div>
            </template>
            <template v-else-if="value">
                <div class="file">
                    <div class="widthfile">
                        <img :src="value" class="img-fluid" />
                    </div>
                </div>
            </template>
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
                self.image = input.files[0];
                reader.readAsDataURL(input.files[0]);
                self.$emit("input", this.$refs.fileupload.files[0]);
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

.img-fluid img {
    max-width: 200px;
    max-height: 170px;
}
.file {
    display: flex;
    flex-direction: column;
    align-content: space-around;
    align-items: center;

    .widthfile {
        width: 150px;
        height: 150px;
    }
}
</style>
