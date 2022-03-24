<template>
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <DashboardNav @logout="logout"></DashboardNav>
  <router-view v-if="status"></router-view>
</template>

<script>
import DashboardNav from "@/components/DashboardNav.vue"
export default {
  data() {
    return {
      status: false,
      isLoading: false,
    };
  },
  methods: {
    logout() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}logout`;
      this.$http
        .post(url)
        .then((res) => {
          if (res.data.success === true) {
            this.isLoading = false;
            this.$router.push("/login");
            this.$httpMessageState(res, "登出");
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, "登出");
        });
    },
  },
  created() {
    const url = `${process.env.VUE_APP_API}api/user/check`;
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    this.$http.defaults.headers.common.Authorization = `${token}`; // 取出token
    this.$http
      .post(url)
      .then((res) => {
        this.$httpMessageState(res, "登入");
        this.status = true;
      })
      .catch((err) => {
        this.$httpMessageState(err.response, "登入");
        this.$router.push("/login"); // 驗證失敗轉回登入
      });
  },
  components:{
    DashboardNav,
  }
};
</script>