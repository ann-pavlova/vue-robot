<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li class="nav-item">
            <router-link active-class="foo" class="nav-link" :to="{name: 'Home'}" exact>
              <img src="./assets/build-a-bot-logo.png" class="logo" alt="">
              Build a robot!
            </router-link>
          </li>
          <li class="nav-item">
            <router-link active-class="foo" class="nav-link" :to="{name: 'Build'}" exact>
              Build
            </router-link>
          </li>
          <li class="nav-item">
            <router-link active-class="foo" class="nav-link" :to="{name: 'Cart'}" exact>
              Cart
            </router-link>
          </li>
          <div class="cart-items">{{cart.length}}</div>
        </ul>
      </nav>
    </header>
    <div class="container">
      <aside class="aside">
        <router-view name="aside"/>
      </aside>
      <main>
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  computed: {
      cart() {
          return this.$store.state.robots.cart;
      }
  }
}
</script>

<style>
  body {
    background: linear-gradient(to bottom, #555, #999) fixed;
  }

  .cart-items {
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50%;
    text-align: center;
  }

  .container {
    display: flex;
    margin: 10px auto 0 auto;
    justify-content: center;
  }

  .aside {
    padding: 30px;
    background-color: gray;
    width: 100px;
    min-height: 300px;
  }

  .nav-link {
    text-decoration: none;
    color: inherit;
  }

  .foo {
    color: #ffffff;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  main {
    padding: 30px;
    background-color: #ffffff;
    width: 964px;
    min-height: 300px;
  }

  header {
    background-color: #999;
    width: 1184px;
    margin: 0 auto;
  }

  ul {
    padding: 3px;
    display: flex;
  }

  .nav-item {
    display: inline-block;
    padding: 5px 10px;
    font-size: 22px;
    border-right: 1px solid #bbb;
  }

  .logo {
    vertical-align: middle;
    height: 30px;
  }
</style>
