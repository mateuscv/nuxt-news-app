<template>
  <!-- template da barra de features: busca, resultados e seleção de país -->
  <div class="container">
    <div class="columns">
      <div class="column">
        <!-- campo de busca, variável search é atualizada com a string buscada
        quando o enter é pressionado -->
        <b-field class="left">
          <b-input
            placeholder="Digite uma categoria..."
            type="search"
            icon="magnify"
            v-model="search"
            @keyup.native.enter="newSearch"
          >
          </b-input>
        </b-field>
      </div>

      <div class="column middle">
        <!-- indicador do resultado da busca atual, "if" verifica se há
        uma busca no state -->
        <div v-if="$store.state.search != ''">
          <p class="sobre">Resultados para:</p>
          <p class="subtitle">{{ $store.state.search }}</p>
        </div>
      </div>

      <div class="column is-right">
        <b-field class="is-right">
          <!-- dropdown de seleção de país, ao escolher o país, o valor (código
           ISO de 2 letras) é passado para a variável country-->
          <b-select
            placeholder="Selecione o país..."
            @input="newCountry"
            v-model="country"
            icon="earth"
            expanded
          >
            <option value="">Nenhum (pesquise para obter resultados)</option>
            <option value="br">Brasil</option>
            <option value="za">África do Sul</option>
            <option value="de">Alemanha</option>
            <option value="sa">Arábia Saudita</option>
            <option value="ar">Argentina</option>
            <option value="au">Austrália</option>
            <option value="at">Áustria</option>
            <option value="be">Bélgica</option>
            <option value="bg">Bulgária</option>
            <option value="ca">Canadá</option>
            <option value="cz">Chéquia</option>
            <option value="cn">China</option>
            <option value="co">Colômbia</option>
            <option value="kr">Coreia do Sul</option>
            <option value="cu">Cuba</option>
            <option value="eg">Egito</option>
            <option value="ae">Emirados Árabes Unidos</option>
            <option value="sk">Eslováquia</option>
            <option value="si">Eslovênia</option>
            <option value="us">Estados Unidos</option>
            <option value="ph">Filipinas</option>
            <option value="fr">França</option>
            <option value="gr">Grécia</option>
            <option value="nl">Holanda</option>
            <option value="hk">Hong Kong</option>
            <option value="hu">Hungria</option>
            <option value="in">Índia</option>
            <option value="id">Indonésia</option>
            <option value="ie">Irlanda</option>
            <option value="il">Israel</option>
            <option value="it">Itália</option>
            <option value="jp">Japão</option>
            <option value="lv">Letônia</option>
            <option value="lt">Lituânia</option>
            <option value="my">Malásia</option>
            <option value="ma">Marrocos</option>
            <option value="mx">México</option>
            <option value="ng">Nigéria</option>
            <option value="no">Noruega</option>
            <option value="nz">Nova Zelândia</option>
            <option value="pl">Polônia</option>
            <option value="pt">Portugal</option>
            <option value="gb">Reino Unido</option>
            <option value="ro">Romênia</option>
            <option value="ru">Rússia</option>
            <option value="rs">Sérvia</option>
            <option value="sg">Singapura</option>
            <option value="se">Suécia</option>
            <option value="ch">Suíça</option>
            <option value="th">Tailândia</option>
            <option value="tw">Taiwan</option>
            <option value="tr">Turquia</option>
            <option value="ua">Ucrânia</option>
            <option value="ve">Venezuela</option>
          </b-select>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    // variáveis iniciais do componente
    return { search: "", country: "br" };
  },
  // métodos do componente
  methods: {
    // método que atualiza o state quando ocorre uma nova busca
    newSearch(e) {
      this.$store.commit("CHANGE_SEARCH", e.target.value);
      this.search = "";
    },
    // método que atualiza o state quando ocorre uma nova seleção de país
    newCountry(e) {
      this.$store.commit("CHANGE_SEARCH", "");
      this.search = "";
      this.$store.commit("CHANGE_COUNTRY", e);
      this.country = e;
    },
    // mapeando o nome das mutações do store (store/index.js) às utilizadas no
    // template (etapa necessária do Vuex)
    ...mapMutations({
      change_search: "CHANGE_SEARCH",
      change_country: "CHANGE_COUNTRY"
    })
  }
};
</script>

<style scoped>
.title,
.sobre {
  text-align: center;
  font-size: 18pt;
  color: rgb(46, 46, 46);
}
.middle {
  padding-top: 0;
}
.left {
  padding-left: 10px;
}
.sobre {
  font-size: 11pt;
  font-family: Arial, Helvetica, sans-serif;
}
.is-right {
  text-align: right;
  padding-right: 10px;
}
.subtitle {
  text-align: center;
}
</style>
