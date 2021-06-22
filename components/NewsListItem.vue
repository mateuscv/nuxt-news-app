<template>
  <!-- template do elemento card que mostra cada notícia na lista -->
  <div class="card">
    <article class="media">
      <!-- imagem da notícia, redimensionada para tamanho padrão de
      128x128px -->
      <figure v-if="newsItem.urlToImage" class="is-vcentered media-left">
        <p class="image is-128x128">
          <b-image ratio="16by13" :src="newsItem.urlToImage" />
        </p>
      </figure>
      <!-- divisão semântica, conteúdo textual da notícia -->
      <div class="media-content">
        <div class="content">
          <h5 style="margin-bottom:0;" class="has-text-left">
            <!-- título clicável (link) da notícia -->
            <a :href="newsItem.url" target="_blank">
              <strong style="margin-bottom:0;">
                {{ newsItem.title }}
              </strong>
            </a>
          </h5>
          <!-- infos do autor e data -->
          <i v-if="newsItem.author" style="margin-top:0; font-size:smaller">
            by {{ newsItem.author }}</i
          >
          <span
            v-if="newsItem.publishedAt"
            style="margin-top:0; font-size:smaller"
            >| {{ stringify }}</span
          >
          <!-- descrição da notícia-->
          <p class="has-text-justified">{{ newsItem.description }}</p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "NewsListItem",
  // item que recebe do componente pai (NewsList): o json da notícia que deve
  // renderizar.
  props: ["newsItem"],
  // funções computed associam nomes de variáveis (nesse caso, stringify), ao
  // retorno da função de mesmo nome
  computed: {
    // transforma a data e hora recebidas em timestamp para um formato legível
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
.is-vcentered {
  display: flex;
}
.media {
  height: 128px;
}
.card {
  background-color: rgb(251, 251, 251);
}
.image {
  padding-top: 20px;
  padding-left: 20px;
}

.has-text-justified {
  padding-right: 20px;
}
</style>
