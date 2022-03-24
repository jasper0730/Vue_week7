<template>
  <div class="container">
    <Loading :active="isLoading"></Loading>
    <h1>產品列表</h1>
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>品項</th>
          <th>金額</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>
            <img v-if="item.imageUrl" class="img-fluid" :src="item.imageUrl" alt="item.title" />
          </td>
          <td>{{ item.title }}</td>
          <td>
            <del>原價:{{ item.origin_price }}</del>
            <p>現在只要{{ item.price }}</p>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-secondary me-1 rounded"
                @click.prevent="getMore(item.id)"
              >
                查看更多
              </button>
              <button
                type="button"
                class="btn btn-outline-danger rounded"
                @click.prevent="addToCart(item.id)"
              >
                加入購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <ProductModal
      ref="productModal"
      :modal-data="product"
      @add-to-cart="addToCart"
    ></ProductModal>
    <Pagination @emit-pages="getProducts" :pages="pagination"></Pagination>
  </div>
</template>

<script>
import ProductModal from "@/components/ProductModal.vue";
import mitt from "@/methods/mitt";
import Pagination from "@/components/Pagination.vue";

export default {
  data() {
    return {
      products: [],
      product: {},
      isLoading: false,
      currentPage: 1,
      pagination: {},
    };
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      this.currentPage = page;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}`;
      this.$http // 套件axios的方法
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, "產品列表");
        });
    },
    getMore(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http // 套件axios的方法
        .get(url)
        .then((res) => {
          this.product = res.data.product;
          this.$refs.productModal.openModal();
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, "查看");
        });
    },
    addToCart(id, qty = 1) {
      // qty設定預設值,若無帶入其他值則qty為一
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const data = {
        data: {
          product_id: id,
          qty,
        },
      };
      this.$http // 套件axios的方法
        .post(url, data)
        .then((res) => {
          this.$httpMessageState(res, "加入購物車");
          this.$refs.productModal.hideModal();
          this.isLoading = false;
        })
        .catch((err) => {
          this.$httpMessageState(err.response, "加入購物車");
        });
    },
  },
  mounted() {
    this.getProducts();
    mitt.on("get-cart", () => { // 使用套件mitt來使用CartView.vue的函式
      this.getCart();
    });
  },
  components: {
    ProductModal,
    Pagination,
  },
};
</script>