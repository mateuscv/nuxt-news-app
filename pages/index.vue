<template>
  <div>
    <br />
    <div id="block" style="margin-top: 8">
      <section class="hero is-small">
        <div class="hero-body">
          <p class="title">
            News List App
          </p>
        </div>
      </section>
    </div>
    <div class="container">
      <LazyNewsList />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
html {
  background-color: rgb(225, 226, 226);
}
.title {
  text-align: center;
  color: white;
}
.hero {
  background-color: crimson;
}
</style>
