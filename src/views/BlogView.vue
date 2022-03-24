<template>
  <div class="container">
    <Loading :active="isLoading" :z-index="1060"></Loading>
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <template v-for="article in articles" :key="article.id">
        <div class="col" v-if="article.isPublic">
          <div class="card h-100">
            <img
              v-if="article.imageUrl"
              :src="article.imageUrl"
              class="card-img-top img-fluid"
            />
            <div class="card-body">
              <h5 class="card-title">{{ article.title }}</h5>
              <div v-html="article.description"></div>
            </div>
            <div class="card-footer">
              <router-link
                :to="`/article/${article.id}`"
                v-if="article.isPublic"
                class="btn btn-outline-primary"
              >
                文章頁面
              </router-link>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      isLoading: false,
    };
  },
  methods: {
    getArticles() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/articles`;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          this.articles = res.data.articles;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, "文章");
        });
    },
  },
  mounted() {
    this.getArticles();
  },
};
</script>