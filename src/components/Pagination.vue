<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <!-- 如果沒有上一頁則禁用=:class="{ disabled: !pages.has_pre }" -->
      <li class="page-item" :class="{ disabled: !pages.has_pre }">
        <!-- 點擊回到上一頁=@click="updatePages(pages.current_page - 1)-->
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="updatePage(pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <!-- 顯示當前頁數=:class="{active: pages.current_page === page}" -->
      <li
        class="page-item"
        v-for="page in pages.total_pages"
        :key="page"
        :class="{ active: pages.current_page === page }"
      >
        <span class="page-link" v-if="pages.current_page === page">{{
          page
        }}</span>
        <a
          class="page-link"
          href="#"
          v-else
          @click.prevent="updatePage(page)"
          >{{ page }}</a
        >
      </li>
      <!-- 如果沒有下一頁則禁用=:class="{ disabled: !pages.has_next }" -->
      <li class="page-item" :class="{ disabled: !pages.has_next }">
        <!-- 點擊進入下一頁=@click.prevent="updatePage(pages.current_page + 1) -->
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="updatePage(pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  // 將外層的pagination資料傳入內層使用(pages)
  props: ["pages"],
  methods: {
    // 更新頁面
    updatePage(page) {
      this.$emit("emitPages", page);
    },
  },
};
</script>