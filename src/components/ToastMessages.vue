<template>
  <div
    class="toast-container position-fixed pe-3 top-0 end-0"
    style="z-index: 1500"
  >
    <div
      v-for="(item, index) in messages"
      :key="index"
      class="toast show"
      :class="`toast${index}`"
      role="alert"
    >
      <div class="toast-header">
        <span
          :class="`bg-${item.style}`"
          class="p-2 rounded me-2 d-inline-block"
        ></span>
        <strong class="me-auto">{{ item.title }}</strong>
        <button
          type="button"
          class="btn-close"
          @click="deleteToast(index)"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body" v-if="item.content">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script>
import mitt from "@/methods/mitt";

export default {
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    showToast() {
      setTimeout(() => {
        this.messages.shift();
      }, 6000);
    },
    deleteToast(index) {
      this.messages.splice(index, 1);  // 刪除(第index開始, 1筆)
    },
  },
  mounted() {
    mitt.on("push-message", (message) => {
      // 接收pusgMessages中的emit
      const { style = 'success', title, content } = message;
      this.messages.push({ style, title, content });
      this.showToast();
    });
  },
};
</script>