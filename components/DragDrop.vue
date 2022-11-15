<template>
    <div>
        <Container @drop="onDrop($event)">
            <Draggable v-for="(value, i) in value_data" :key="i" >
                <div class="d-flex-center" v-if="value.status == 1" >
                    <div class="position-ads">
                      <img id="" :src="value.picture" class="imgads-position" controls="" />
                      </div>
                </div>
            </Draggable>
        </Container>
    </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
export default {
    components: { Container, Draggable },
    props: ["value_data", "width"],
    data() {
        return {
            icon_error: "exclamation",
            drag_data: "",
        };
    },

    created() {},

    methods: {
        onDrop(dropResult) {
            //

            this.drag_data = this.applyDrag(this.value_data, dropResult);

            var k = 0;
            for (let i = 0; i < this.drag_data.length; i++) {
                if(this.drag_data[i].status == 1){
                    this.drag_data[i].seq = k + 1;
                    k++;
                }
            }

            this.$emit("afterData", this.drag_data);
        },

        applyDrag(arr, dragResult) {
            const { removedIndex, addedIndex, payload } = dragResult;
            if (removedIndex === null && addedIndex === null) return arr;
            const result = [...arr];
            let itemToAdd = payload;
            if (removedIndex !== null) {
                itemToAdd = result.splice(removedIndex, 1)[0];
            }
            if (addedIndex !== null) {
                result.splice(addedIndex, 0, itemToAdd);
            }
            return result;
        },
    },
};
</script>
