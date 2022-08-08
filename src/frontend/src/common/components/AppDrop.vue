<template>
  <transition name="fade" appear>
    <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
      <slot />
    </div>
  </transition>
</template>

<script>
import { DATA_TRANSFER_PAYLOAD } from "@/static/constants";

export default {
  name: "DropItem",
  methods: {
    onDrop({ dataTransfer }) {
      const payload = dataTransfer.getData(DATA_TRANSFER_PAYLOAD);
      if (payload) {
        const transferData = JSON.parse(
          dataTransfer.getData(DATA_TRANSFER_PAYLOAD)
        );
        this.$emit("drop", transferData);
      }
    },
  },
};
</script>
