// state, onde ficam armazenadas as variáveis globais à aplicação
export const state = () => ({
  // variáveis search (busca) e country (país) são inicializadas aqui (para o
  // primeiro carregamento da página)
  search: "",
  country: "br"
});

// mutações são funções que mudam variáveis no state.
export const mutations = {
  // mudar a variável search para a nova digitada pelo usuário.
  CHANGE_SEARCH(state, payload) {
    state.search = payload;
  },

  // mudar a variável country para o novo país escolhido pelo usuário.
  CHANGE_COUNTRY(state, payload) {
    state.country = payload;
  }
};

