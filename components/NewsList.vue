<template>
  <!-- template do componente da lista de notícias -->
  <div class="block box has-text-left">
    <!-- chamada para renderização do componente FeaturePanel (busca, etc.) -->
    <FeaturePanel class="panel" />

    <!-- animação de carregamento, quando a chamada para a API está em
    andamento -->
    <section v-if="$fetchState.pending">
      <b-skeleton width="20%" :animated="animated"></b-skeleton>
      <b-skeleton width="40%" :animated="animated"></b-skeleton>
      <b-skeleton width="80%" :animated="animated"></b-skeleton>
      <b-skeleton :animated="animated"></b-skeleton>
    </section>

    <!-- mensagem mostrada ao usuário quando nenhuma notícia é encontrada. -->
    <h3
      class="title"
      v-else-if="
        newsList.articles === undefined || newsList.articles.length === 0
      "
    >
      Nenhuma notícia encontrada! :(
    </h3>

    <!-- caso existam notícias conforme os parâmetros requisitados,
    mostra-as -->
    <div v-else-if="newsList.articles.length !== 0">
      <!-- chamada (lazy loading) para renderização de cada notícia -->
      <LazyNewsListItem
        class="card"
        v-for="newsListItem of articles"
        :key="newsListItem.id"
        :newsItem="newsListItem"
      />

      <!-- elemento que mostra as páginas, cada uma com um máx. de 5
      notícias -->
      <nav
        class="is-centered pagination"
        role="navigation"
        aria-label="pagination"
      >
        <!-- lista dos botões de página -->
        <ul
          v-if="newsList.articles.length != undefined"
          class="pagination-list"
          style="margin-top:10px"
        >
          <li>
            <!-- ao clicar em um botão de página, exceto o atual, a lista de
            notícias recarrega a visualização de forma reativa, mostrando
            as notícias referentes àquela página (intervalo de posições
            do array de notícias) -->
            <a
              class="pagination-link"
              :class="{ 'is-current': page === 1 }"
              aria-label="Page 1"
              @click="getInitialFinalFirstPage"
              >1</a
            >
          </li>
          <li v-if="newsList.articles.length >= 6">
            <a
              class="pagination-link"
              :class="{ 'is-current': page === 2 }"
              aria-label="Goto page 2"
              @click="getInitialFinalSecondPage"
              >2</a
            >
          </li>
          <li v-if="newsList.articles.length >= 11">
            <a
              class="pagination-link"
              :class="{ 'is-current': page === 3 }"
              aria-label="Goto page 3"
              @click="getInitialFinalThirdPage"
              >3</a
            >
          </li>
          <li v-if="newsList.articles.length >= 16">
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
  </div>
</template>

<script>
export default {
  // inicialização de variáveis do componente
  data() {
    let info = "";
    let newsList = [];
    return {
      newsList,
      info,
      animated: true,
      initial: 0,
      final: 5,
      page: 1
    };
  },
  // funções computed associam nomes de variáveis ao retorno da função de mesmo
  // nome
  computed: {
    // retorna a lista de notícias da página atual
    articles: function() {
      return this.newsList.articles.slice(this.initial, this.final);
    },
    // atualiza a busca reativamente com o valor armazenado no state
    search: function() {
      if (this.$store.state.search == "") {
        return "";
      }
      return this.$store.state.search;
    },
    // atualiza o país reativamente com o valor armazenado no state
    country: function() {
      if (this.$store.state.country == "") {
        return "";
      }
      return this.$store.state.country;
    },
    // monta a url de requisição da api, conforme o país e termos de busca
    // especificados
    apiUrl: function() {
      if (this.search !== "" && this.country === "") {
        return `https://newsapi.org/v2/top-headlines?q=${this.search}&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`;
      }
      if (this.search !== "" && this.country !== "") {
        return `https://newsapi.org/v2/top-headlines?q=${this.search}&country=${this.country}&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`;
      }
      if (this.search === "" && this.country === "") {
        return `https://newsapi.org/v2/top-headlines&country=${this.country}&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`;
      }
      if (this.search === "" && this.country !== "") {
        return `https://newsapi.org/v2/top-headlines?country=${this.country}&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`;
      }
    }
  },
  // funções watched monitoram as variáveis "computed" determinadas, ativando
  // quando estas são chamadas.
  watch: {
    // quando a string de busca é atualizada, faz uma nova requisição à API.
    search() {
      this.$fetch();
    },
    // quando a string do código de país é atualizada, faz uma nova requisição à
    // API.
    country() {
      this.$fetch();
    }
  },
  // métodos do componente
  methods: {
    // métodos abaixo determinam qual a página atual de acordo com a qual o
    // usuário escolheu, bem como os índices que determinam o intervalo do array
    // de notícias representado por aquela página
    getInitialFinalFirstPage() {
      this.initial = 0;
      this.final = 5;
      this.page = 1;
    },
    getInitialFinalSecondPage() {
      this.initial = 5;
      this.final = 10;
      this.page = 2;
    },
    getInitialFinalThirdPage() {
      this.initial = 10;
      this.final = 15;
      this.page = 3;
    },
    getInitialFinalFourthPage() {
      this.initial = 15;
      this.final = 20;
      this.page = 4;
    }
  },
  // chamada da API, com a URL computada.
  async fetch() {
    this.newsList = await fetch(this.apiUrl).then(res => res.json());
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

.title {
  font-size: 22pt;
  color: rgb(46, 46, 46);
  text-align: center;
}

.loader-wrapper .is-active {
  opacity: 1;
  z-index: 1;
}
</style>
