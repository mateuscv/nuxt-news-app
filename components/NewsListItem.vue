<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-128x128">
        <img :src="newsItem.urlToImage" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <h5 style="margin-bottom:0;" class="has-text-justified">
          <a :href="newsItem.url">
            <strong style="margin-bottom:0;">
              {{ newsItem.title }}
            </strong>
          </a>
        </h5>
        <i v-if="newsItem.author" style="margin-top:0; font-size:smaller">
          by {{ newsItem.author }}</i
        >
        <span
          v-if="newsItem.publishedAt"
          style="margin-top:0; font-size:smaller"
          >| {{ stringify }}</span
        >
        <p class="has-text-justified">{{ newsItem.description }}</p>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "NewsListItem",
  props: ["newsItem"],
  computed: {
    stringify: function() {
      return (
        new Date(this.newsItem.publishedAt).toLocaleDateString() +
        " às " +
        new Date(this.newsItem.publishedAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      );
    }
  }
};
</script>

<style scoped>
a {
  color: brown;
}
</style>
