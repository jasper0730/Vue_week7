<template>
  <div class="container">
    <div>
      <Loading :active="isLoading" :z-index="1060"></Loading>
      <div class="text-end mt-4">
        <button
          class="btn btn-primary"
          type="button"
          @click="openCouponModal(true)"
        >
          建立新的優惠券
        </button>
      </div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th>名稱</th>
            <th>折扣百分比</th>
            <th>到期日</th>
            <th>是否啟用</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in coupons" :key="key">
            <td>{{ item.title }}</td>
            <td>{{ item.percent }}%</td>
            <td>{{ $filters.date(item.due_date) }}</td>
            <td>
              <span v-if="item.is_enabled === 1" class="text-success"
                >啟用</span
              >
              <span v-else class="text-muted">未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  @click="openCouponModal(false, item)"
                >
                  編輯
                </button>
                <button
                  class="btn btn-outline-danger btn-sm ms-1"
                  @click="openDeleteCouponModal(item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <CouponModal
        :coupon="tempCoupon"
        :is-new="isNew"
        ref="couponModal"
        @update-coupon="updateCoupon"
      />
      <DeleteModal
        :item="tempCoupon"
        ref="deleteModal"
        @delete-item="deleteCoupon"
      />
      <Pagination :pages="pagination" @emit-pages="getCoupons"></Pagination>
    </div>
  </div>
</template>

<script>
import DeleteModal from "@/components/DeleteModal.vue";
import CouponModal from "@/components/CouponModal.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      isNew: false,
      currentPage: 1,
      pagination: {},
      isLoading: false,
    };
  },
  methods: {
    getCoupons(page = 1) {
      this.isLoading = true;
      this.currentPage = page;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.$http // 套件axios的方法
        .get(url)
        .then((res) => {
          this.coupons = res.data.coupons;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, "優惠券");
        });
    },
    openCouponModal(isNew, item) {
      this.isNew = isNew;
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };
      } else {
        this.tempCoupon = { ...item };
      }
      const couponModal = this.$refs.couponModal;
      couponModal.openModal();
    },
    openDeleteCouponModal(item) {
      this.tempCoupon = { ...item };
      const deleteModal = this.$refs.deleteModal;
      deleteModal.openModal();
    },
    updateCoupon(tempCoupon) {
      this.isLoading = true;
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
			let method = "post";
			let data = tempCoupon;
			if(!this.isNew) {
				method = "put";
				url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
				data = this.tempCoupon;
			}
      this.$http // 套件axios的方法
        [method](url, {data})
        .then((res) => {
          this.isLoading = false;
					if(this.isNew) {
						this.$httpMessageState(res, "新增優惠券");
					} else {
						this.$httpMessageState(res, "更新優惠券");
					}
          this.getCoupons(this.currentPage);
          const couponModal = this.$refs.couponModal;
          couponModal.hideModal();
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, "新增優惠券");
        });
    },
    deleteCoupon() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.$http // 套件axios的方法
        .delete(url)
        .then((res) => {
          this.isLoading = false;
          this.$httpMessageState(res, "刪除");
          this.getCoupons(this.currentPage);
          const deleteModal = this.$refs.deleteModal;
          deleteModal.hideModal();
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, "刪除");
        });
    },
  },
  components: {
    DeleteModal,
    CouponModal,
    Pagination,
  },
  mounted() {
    this.getCoupons();
  },
};
</script>