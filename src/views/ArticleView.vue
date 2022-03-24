<template>
  <div class="container">
    <Loading :active="isLoading" :z-index="1060"></Loading>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/blog">部落格列表</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ article.title }}
        </li>
      </ol>
    </nav>
    <div class="row justify-content-center">
      <article class="col-8">
        <h2>{{ article.title }}</h2>
        <p>
          <small class="text-muted">{{
            $filters.date(article.create_at)
          }}</small>
          -
          <small class="text-muted">作者：{{ article.author }}</small>
        </p>
        <img
          v-if="article.imageUrl"
          :src="article.imageUrl"
          alt=""
          class="img-fluid mb-3"
        />
        <div v-html="article.content"></div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: {},
      id: "",
      isLoading: false,
    };
  },
  methods: {
    getArticle() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/article/${this.id}`;
      this.$http // 套件axios的方法
        .get(url)
        .then((res) => {
          this.isLoading = false;
          this.article = res.data.article;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, "文章");
        });
    },
  },
  mounted() {
    this.id = this.$route.params.articleId; // 從路由參數取得articleId
    this.getArticle();
  },
};
</script>