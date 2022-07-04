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
import { transferPayload, move } from "@/static/constants";

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
      transferPayload,
      move,
    };
  },
  methods: {
    onDrag({ dataTransfer }) {
      dataTransfer.effectAllowed = move;
      dataTransfer.dropEffect = move;
      dataTransfer.setData(transferPayload, JSON.stringify(this.transferData));
    },
  },
};
</script>
