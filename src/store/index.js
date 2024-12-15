import { createStore } from 'vuex';

export default createStore({
  state: {
    widgets: [],
    loading: false,
    activeWidgetId: null,
  },
  mutations: {
    setWidgets(state, widgets) {
      state.widgets = [...widgets];
      state.loading = false;
    },
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },
    updateWidget(state, updatedWidget) {
      const index = state.widgets.findIndex(widget => widget.id === updatedWidget.id);
      if (index !== -1) {
        state.widgets[index] = { ...state.widgets[index], ...updatedWidget };
        state.widgets = [...state.widgets];
        localStorage.setItem('widgets', JSON.stringify(state.widgets));
      }
    },
    setActiveWidget(state, widgetId) {
      if (state.activeWidgetId === widgetId) {
        state.activeWidgetId = null;
      }
      else {
        state.activeWidgetId = widgetId;
      }
      state.widgets = state.widgets.map(widget => ({
        ...widget,
        active: widget.id === state.activeWidgetId,
      }));
      state.widgets = [...state.widgets];
      localStorage.setItem('widgets', JSON.stringify(state.widgets));
    },
  },
  actions: {
    async fetchWidgets({ commit }) {
      commit('setLoading', true);
      if (localStorage.getItem('widgets')) {
        commit('setWidgets', JSON.parse(localStorage.getItem('widgets')));
        commit('setLoading', false);
      } else {
        try {
          const response = await fetch(
            'https://b795b019-1f84-41f4-93a3-a702d686c75a.mock.pstmn.io/product-widgets'
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          commit('setWidgets', data);
          localStorage.setItem('widgets', JSON.stringify(data));
        } catch (error) {
          console.error('Failed to fetch widgets:', error.message);
        } finally {
          commit('setLoading', false);
        }
      }
    },
    updateWidget({ commit }, widget) {
      commit('updateWidget', widget);
    },
    setActiveWidget({ commit }, widgetId) {
      commit('setActiveWidget', widgetId);
    },
  },
  getters: {
    allWidgets: state => {
      return [...state.widgets];
    },
    isLoading: state => state.loading,
    activeWidgetId: state =>{
      return (state.widgets.findIndex(w => w.active) > -1) ? state.widgets.findIndex(w => w.active)+1: null;
    }
  },
});
