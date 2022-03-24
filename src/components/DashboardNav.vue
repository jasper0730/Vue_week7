<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">回前台</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link
            class="nav-link active"
            aria-current="page"
            to="/admin/products"
            >產品列表</router-link
          >
          <router-link class="nav-link" to="/admin/orders">訂單</router-link>
          <router-link class="nav-link" to="/admin/coupons">優惠券</router-link>
          <router-link class="nav-link" to="/admin/articles"
            >部落格</router-link
          >
          <a href="#" @click.prevent="$emit('logout')" class="nav-link">登出</a>
        </div>
      </div>
    </div>
  </nav>
</template>