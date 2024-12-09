// store.js

import { createStore } from 'vuex';

export default createStore({
  state: {
    language: 'english',
  },
  mutations: {
    setLanguage(state, language) {
      state.language = language;
    },
  },
  actions: {
    switchLanguage({ commit, state }) {
      // Toggle between 'english' and 'pokomo' languages
      const newLanguage = state.language === 'english' ? 'pokomo' : 'english';
      // Commit the mutation to update the language
      commit('setLanguage', newLanguage);
    },
  },
});
