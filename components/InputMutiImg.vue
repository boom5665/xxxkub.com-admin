<template>
    <div>
        <label for="" class="input-label">{{ text_input_top }}</label>
        <div class="imageinputMuti">
            <input type="file" accept="image/*" id="imageinputMuti" @change="previewMultiImage" :class="status_value == false ? 'alert-input' : ''" />
            <label for="imageinputMuti" class="imagebutton"> select picture</label>

            <div class="" style="width: max-content">
                <template v-if="preview_list.length">
                    <div v-for="(item, index) in preview_list" :key="index">
                        <img :src="item" class="img-fluid" />
                        <p class="mb-0">ชื่อภาพ: {{ image_list[index].name }}</p>
                    </div>
                </template>
            </div>

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
            image_list: [],
            preview_list: [],
            icon_error: "exclamation",
        };
    },

    created() {},
    methods: {
        previewMultiImage(event) {
            var input = event.target;
            var count = input.files.length;
            var index = 0;
            if (input.files) {
                while (count--) {
                    var reader = new FileReader();
                    reader.onload = (e) => {
                        this.preview_list.push(e.target.result);
                    };
                    this.image_list.push(input.files[index]);
                    reader.readAsDataURL(input.files[index]);
                    index++;
                }
            }
            this.$emit("input", input.files);
        },
    },
};
</script>


<style scoped>
.imageinputMuti {
    text-align: center;
}
.imageinputMuti input {
    display: none;
}
.imageinputMuti label {
    display: block;
    color: #fff;
    background-color: #22876e;
    padding: 0.3rem 0.6rem;
    font-size: 100%;
    cursor: pointer;
    border-radius: 5px;
}

.imageinputMuti span {
    display: none;
    text-align: center;
    cursor: pointer;
}
</style>
