<template>
  <div class="container">
    <Loading :active="isLoading" :z-index="1060"></Loading>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, key) in orders" :key="key">
          <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
            <td>{{ $filters.date(item.create_at) }}</td>
            <td><span v-if="item.user" v-text="item.user.email"></span></td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, i) in item.products" :key="i">
                  {{ product.product.title }}數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ item.total }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updatePaid(item)"
                />
                <label class="form-check-label" :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  type="button"
                  @click="openModal(item)"
                >
                  檢視
                </button>
                <button
                  class="btn btn-outline-danger btn-sm ms-1"
                  type="button"
                  @click="openDeleteOrderModal(item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>

  <Pagination :pages="pagination" @emit-pages="getOrders"></Pagination>
  <DeleteModal
    :item="tempOrder"
    ref="deleteModal"
    @delete-item="deleteOrder"
  ></DeleteModal>
  <OrderModal
    ref="orderModal"
    :order="tempOrder"
    @update-paid="updatePaid"
  ></OrderModal>
</template>

<script>
import DeleteModal from "@/components/DeleteModal.vue";
import OrderModal from "@/components/OrderModal.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  data() {
    return {
      isLoading: false,
      orders: [],
      pagination: {},
      currentPage: 1,
      tempOrder: {},
      isNew: false,
    };
  },
  methods: {
    getOrders(page = 1) {
      this.isLoading = true;
      this.currentPage = page;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, "取得訂單");
        });
    },
    updatePaid(item) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      const paid = {
        is_paid: item.is_paid,
      };
      this.$http
        .put(url, { data: paid })
        .then(() => {
          this.isLoading = false;
          const orderComponent = this.$refs.orderModal;
          orderComponent.hideModal();
          this.getOrders(this.currentPage);
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, "更新");
        });
    },
    deleteOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`;
      this.$http
        .delete(url)
        .then((res) => {
          this.isLoading = false;
          const deleteComponent = this.$refs.deleteModal;
          deleteComponent.hideModal();
          this.getOrders(this.currentPage);
          this.$httpMessageState(res, "刪除");
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, "刪除");
        });
    },
    openModal(item) {
      this.tempOrder = { ...item };
      this.isNew = false;
      const orderComponent = this.$refs.orderModal;
      orderComponent.openModal();
    },
    openDeleteOrderModal(item) {
      this.tempOrder = { ...item };
      const deleteComponent = this.$refs.deleteModal;
      deleteComponent.openModal();
    },
  },
  components: {
    OrderModal,
    DeleteModal,
    Pagination,
  },
  created() {
    this.getOrders();
  },
};
</script>