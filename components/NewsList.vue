<template>
  <div id="nlist" class="block box has-text-left">
    <section v-if="$fetchState.pending">
      <b-skeleton width="20%" :animated="animated"></b-skeleton>
      <b-skeleton width="40%" :animated="animated"></b-skeleton>
      <b-skeleton width="80%" :animated="animated"></b-skeleton>
      <b-skeleton :animated="animated"></b-skeleton>
    </section>
    <NewsListItem
      class="card"
      v-else
      v-for="newsListItem of articles"
      :key="newsListItem.id"
      :newsItem="newsListItem"
    />
  </div>
</template>

<script>
export default {
  data() {
    let info = "";
    let newsList = [];
    return { newsList, info, animated: true };
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
.loader-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #fff;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
}
.loader-wrapper .loader {
  height: 80px;
  width: 80px;
}

.loader-wrapper .is-active {
  opacity: 1;
  z-index: 1;
}
</style>
