<template>
  <!-- template da página principal, que carrega o componente da lista
  de notícias -->
  <div>
    <div id="block">
      <section class="hero is-small">
        <div class="hero-body">
          <a href="/">
            <p class="title">報道</p>
            <p class="subtitle">Últimas Notícias</p>
          </a>
        </div>
      </section>
    </div>
    <div class="container">
      <!-- carregando o componente da lista de notícias-->
      <LazyNewsList style="background-color:#fafafa" />
    </div>

    <footer>
      2021 - Mateus A. Prado e Mateus C. Vieira - Powered by
      <a href="https://newsapi.org">newsapi.org</a>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.title,
.subtitle {
  text-align: center;
  font-size: 22pt;
  color: white;
}
.subtitle {
  font-size: 15pt;
}
.hero {
  background-color: crimson;
  border-radius: 5px;
}
#block {
  margin-top: 12px;
}
footer {
  text-align: center;
  margin-top: 10px;
  font-style: italic;
  color: rgba(128, 128, 128, 0.726);
  font-size: 8pt;
}
</style>
