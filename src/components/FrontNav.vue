<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">首頁</router-link>
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
            to="/products"
            >產品列表</router-link
          >
          <router-link class="nav-link" to="/cart">購物車</router-link>
          <router-link class="nav-link" to="/blog">Blog</router-link>
          <router-link class="nav-link" to="/login">登入</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>