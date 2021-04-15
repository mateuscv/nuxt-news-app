<template>
  <b-carousel v-if="!$fetchState.pending" class="">
    <b-carousel-item v-for="(article, i) in articles" :key="i">
      <section>
        <div
          class="hero-body has-text-left"
          :style="{ backgroundImage: 'url(' + article.urlToImage + ')' }"
          style="background-repeat:no-repeat; background-size: 100% 100%; height: 700px"
        >
          <h1
            class="title"
            style="color:white; text-shadow: 2px 2px 4px #000000;"
          >
            {{ article.title }}
          </h1>
        </div>
      </section>
    </b-carousel-item>
  </b-carousel>
</template>

<script>
export default {
  data() {
    return {
      newsList: [],
      carousels: [
        { text: "Slide 1", color: "primary" },
        { text: "Slide 2", color: "info" },
        { text: "Slide 3", color: "success" },
        { text: "Slide 4", color: "warning" },
        { text: "Slide 5", color: "danger" }
      ]
    };
  },
  computed: {
    articles: function() {
      return this.newsList.articles.slice(0, 5);
    }
  },
  async fetch() {
    this.newsList = await fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=" +
        process.env.VUE_APP_NEWS_API_KEY
    ).then(res => res.json());
  }
};
</script>

<style scoped>
.hero-body {
  background-image: url("https://static.remove.bg/remove-bg-web/2a274ebbb5879d870a69caae33d94388a88e0e35/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg");
}
</style>
