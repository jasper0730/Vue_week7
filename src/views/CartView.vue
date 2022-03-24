<template>
  <div class="about">
    <div class="container">
      <Loading :active="isLoading" :z-index="1060"></Loading>
      <h1 class="my-3">購物車</h1>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="text-end">
            <button
              :disabled="!cartData.carts.length"
              type="button"
              class="btn btn-sm btn-outline-danger"
              @click="deleteAll"
            >
              清空購物車<span class="text-white bg-primary rounded px-1 ms-1">{{
                cartData.carts.length
              }}</span>
            </button>
          </div>
          <table class="table align-middle">
            <thead>
              <tr>
                <th style="width: 110px"></th>
                <th>品名</th>
                <th style="width: 110px">數量</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="cartData.carts">
                <tr v-for="item in cartData.carts" :key="item.id">
                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click.prevent="deleteSingle(item.id)"
                    >
                      <i class="bi bi-x"></i>
                    </button>
                  </td>
                  <td>
                    {{ item.product.title }}
                    <div v-if="item.coupon" class="text-success">
                      已套用優惠券
                    </div>
                  </td>
                  <td>
                    <input
                      type="number"
                      class="form-control"
                      v-model.number="item.qty"
                      @blur="updateQty(item)"
                      min="1"
                    />
                  </td>
                  <td class="text-end">{{ item.final_total }}</td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-end">總計</td>
                <td class="text-end">
                  {{ $filters.currency(cartData.total) }}
                </td>
              </tr>
              <tr>
                <td colspan="3" class="text-end">折扣</td>
                <td class="text-end text-success">
                  {{ $filters.currency(cartData.final_total-cartData.total) }}
                </td>
              </tr>
              <tr v-if="cartData.total !== cartData.final_total">
                <td colspan="3" class="text-end text-success">優惠價</td>
                <td class="text-end text-success">
                  {{ $filters.currency(cartData.final_total) }}
                </td>
              </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input
              type="text"
              class="form-control"
              v-model="coupon_code"
              placeholder="請輸入優惠碼"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="addCoupon"
                :disabled="!coupon_code"
              >
                套用優惠碼
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <Form
          class="col-md-6 g-3"
          @submit="createOrder"
          ref="form"
          v-slot="{ errors }"
        >
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <Field
              type="text"
              name="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              id="email"
              placeholder="請輸入Email"
              rules="email|required"
              v-model="form.user.email"
            />
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">訂購人姓名</label>
            <Field
              type="text"
              name="姓名"
              class="form-control"
              :class="{ 'is-invalid': errors['姓名'] }"
              id="name"
              placeholder="請輸入姓名"
              rules="required"
              v-model="form.user.name"
            />
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>
          <div>
            <div class="mb-3">
              <label for="tel" class="form-label">訂購人電話</label>
              <Field
                class="form-control"
                type="text"
                name="電話"
                :class="{ 'is-invalid': errors['電話'] }"
                id="tel"
                placeholder="請輸入電話"
                :rules="isPhone"
                v-model="form.user.tel"
              />
              <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">訂購人地址</label>
              <Field
                class="form-control"
                :class="{ 'is-invalid': errors['地址'] }"
                type="text"
                name="地址"
                id="address"
                placeholder="請輸入地址"
                rules="required"
                v-model="form.user.address"
              />
              <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="message" class="form-label">備註</label>
              <textarea
                class="form-control"
                type="text"
                id="message"
                cols="30"
                rows="10"
                v-model="form.message"
              >
              </textarea>
            </div>
            <div class="text-end">
              <button class="btn btn-danger mb-3">送出</button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartData: {
        carts: [],
      },
      isLoading: false,
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
      coupon_code: "",
    };
  },
  methods: {
    getCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          this.cartData = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, "購物車");
        });
    },
    updateQty(item) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      const data = {
        data: {
          product_id: item.id,
          qty: item.qty,
        },
      };
      this.$http
        .put(url, data)
        .then(() => {
          this.isLoading = false;
          this.getCart();
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response);
        });
    },
    deleteSingle(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http
        .delete(url)
        .then((res) => {
          this.$httpMessageState(res, "移除");
          this.getCart();
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, "移除");
        });
    },
    deleteAll() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
      this.$http
        .delete(url)
        .then((res) => {
          this.$httpMessageState(res, "清空購物車");
          this.getCart();
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, "清空購物車");
        });
    },
    addCoupon() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      const coupon = {
        data: {
          code: this.coupon_code,
        },
      };
      this.$http
        .post(url, coupon)
        .then((res) => {
          this.$httpMessageState(res, "套用優惠券");
          this.getCart();
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, "套用優惠券");
        });
    },
    createOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      const data = this.form;
      this.$http
        .post(url, { data: data })
        .then((res) => {
          this.isLoading = false;
          this.$httpMessageState(res, "訂單送出");
          this.$refs.form.resetForm(); // 清空表格內容,resetForm是vue內建功能
          this.getCart();
        })
        .catch((err) => {
          this.isLoading = false;
          this.$httpMessageState(err.response, "訂單送出");
        });
    },
    // veevalidate自訂驗證規則
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "請輸入正確的電話號碼";
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>