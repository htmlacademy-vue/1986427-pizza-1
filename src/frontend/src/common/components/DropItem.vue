<template>
  <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>

<script>
import { transferPayload } from "@/static/constants";

export default {
  name: "DropItem",
  methods: {
    onDrop({ dataTransfer }) {
      const payload = dataTransfer.getData(transferPayload);
      if (payload) {
        const transferData = JSON.parse(dataTransfer.getData(transferPayload));
        this.$emit("drop", transferData);
      }
    },
  },
};
</script>
