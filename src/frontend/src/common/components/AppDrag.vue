<template>
  <div
    :draggable="isDraggable"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>
import { DATA_TRANSFER_PAYLOAD, MOVE } from "@/static/constants";

export default {
  name: "DragItem",
  props: {
    transferData: {
      type: Object,
      required: true,
    },
    isDraggable: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      DATA_TRANSFER_PAYLOAD,
      MOVE,
    };
  },
  methods: {
    onDrag({ dataTransfer }) {
      dataTransfer.effectAllowed = MOVE;
      dataTransfer.dropEffect = MOVE;
      dataTransfer.setData(
        DATA_TRANSFER_PAYLOAD,
        JSON.stringify(this.transferData)
      );
    },
  },
};
</script>
