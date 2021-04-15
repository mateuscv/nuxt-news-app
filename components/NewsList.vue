<template>
  <div class="block box has-text-left">
    <section v-if="$fetchState.pending">
      <b-skeleton width="20%" :animated="animated"></b-skeleton>
      <b-skeleton width="40%" :animated="animated"></b-skeleton>
      <b-skeleton width="80%" :animated="animated"></b-skeleton>
      <b-skeleton :animated="animated"></b-skeleton>
    </section>
    <LazyNewsListItem
      class="card"
      v-else
      v-for="newsListItem of articles"
      :key="newsListItem.id"
      :newsItem="newsListItem"
    />
    <nav
      class="is-centered pagination"
      role="navigation"
      aria-label="pagination"
    >
      <ul class="pagination-list" style="margin-top:10px">
        <li>
          <a
            class="pagination-link"
            :class="{ 'is-current': page === 1 }"
            aria-label="Page 1"
            @click="getInitialFinalFirstPage"
            >1</a
          >
        </li>
        <li>
          <a
            class="pagination-link"
            :class="{ 'is-current': page === 2 }"
            aria-label="Goto page 2"
            @click="getInitialFinalSecondPage"
            >2</a
          >
        </li>
        <li>
          <a
            class="pagination-link"
            :class="{ 'is-current': page === 3 }"
            aria-label="Goto page 3"
            @click="getInitialFinalThirdPage"
            >3</a
          >
        </li>
        <li>
          <a
            class="pagination-link"
            :class="{ 'is-current': page === 4 }"
            aria-label="Goto page 4"
            @click="getInitialFinalFourthPage"
            >4</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    let info = "";
    let newsList = [];
    return { newsList, info, animated: true, initial: 0, final: 5, page: 1 };
  },
  computed: {
    articles: function() {
      return this.newsList.articles.slice(this.initial, this.final);
    }
  },
  methods: {
    getInitialFinalFirstPage() {
      this.initial = 0;
      this.final = 5;
      this.page = 1;
    },
    getInitialFinalSecondPage() {
      this.initial = 6;
      this.final = 11;
      this.page = 2;
    },
    getInitialFinalThirdPage() {
      this.initial = 11;
      this.final = 16;
      this.page = 3;
    },
    getInitialFinalFourthPage() {
      this.initial = 17;
      this.final = 21;
      this.page = 4;
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
.pagination-link:active {
  background-color: rgb(247, 102, 131);
}
.pagination-link:hover {
  background-color: crimson;
  color: white;
}
.is-current {
  background-color: brown;
  outline: none;
}
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
