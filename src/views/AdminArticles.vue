<template>
  <div>
    <Loading :active="isLoading" :z-index="1060"></Loading>
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal(true)">
        建立新的頁面
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th style="width: 200px">標題</th>
          <th style="width: 200px">作者</th>
          <th>描述</th>
          <th style="width: 100px">建立時間</th>
          <th style="width: 100px">是否公開</th>
          <th style="width: 120px">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.title }}</td>
          <td>{{ article.author }}</td>
          <td>{{ article.description }}</td>
          <td>{{ $filters.date(article.create_at) }}</td>
          <td>
            <span v-if="article.isPublic">已上架</span>
            <span v-else>未上架</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="getArticle(article.id)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm ms-1"
                type="button"
                @click="openDelArticleModal(article)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @emit-pages="getArticles"></Pagination>
    <ArticleModal
      ref="articleModal"
      :article="tempArticle"
      :is-new="isNew"
      @update-article="updateArticle"
    ></ArticleModal>
    <DeleteModal
      :item="tempArticle"
      ref="deleteModal"
      @delete-item="deleteArticle"
    />
  </div>
</template>

<script>
import ArticleModal from "@/components/ArticleModal.vue";
import DeleteModal from "@/components/DeleteModal.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  data() {
    return {
      articles: [],
      tempArticle: {},
      isNew: false,
      isLoading: false,
      pagination: {},
      currentPage: 1,
    };
  },
  methods: {
    getArticles(page = 1) {
      this.isLoading = true;
      this.currentPage = page; // 將傳遞過來的page賦予到當前頁面,才不會跳回第一頁
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response);
        });
    },
    getArticle(id) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${id}`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          if (res.data.success) {
            this.openModal(false, res.data.article);
            this.isNew = false;
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response);
        });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempArticle = {
          isPublic: false, // 是否公開
          create_at: new Date().getTime() / 1000, //現在時間
          tag: [], //標籤
        };
        this.isNew = true; // 對應到內層ArticleModal的isNew
      } else {
        this.tempArticle = { ...item };
        this.isNew = false;
      }
      const articleModal = this.$refs.articleModal;
      articleModal.openModal();
    },
    openDelArticleModal(item) {
      this.tempArticle = { ...item };
      const deleteModal = this.$refs.deleteModal;
      deleteModal.openModal();
    },
    updateArticle(item) {
      this.tempArticle = item;
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article`;
      let method = "post";
      let status = "新增貼文";
      this.isLoading = true;
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`;
        method = "put";
        status = "更新貼文";
      }
      const articleModal = this.$refs.articleModal;
      this.$http[method](url, { data: this.tempArticle })
        .then((res) => {
          this.isLoading = false;
          this.$httpMessageState(res, status);
          articleModal.hideModal();
          this.getArticles(this.currentPage);
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, "錯誤訊息");
        });
    },
    deleteArticle() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`;
      this.isLoading = true;
      this.$http
        .delete(url)
        .then((res) => {
          this.isLoading = false;
          this.$httpMessageState(res, "刪除");
          const deleteModal = this.$refs.deleteModal;
          deleteModal.hideModal();
          this.getArticles(this.currentPage);
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, "刪除");
        });
    },
  },
  components: {
    ArticleModal,
    DeleteModal,
    Pagination,
  },
  mounted() {
    this.getArticles();
  },
};
</script>