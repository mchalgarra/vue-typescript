import { IThemeGetters, IThemeState } from '@/models/interfaces/theme';

const initialState = (): IThemeState => ({
  theme: 'light',
});

const state = initialState();

const mutations = {};

const actions = {};

const getters: IThemeGetters = {
  theme: (state: IThemeState): string => {
    return state.theme;
  },
  isLight: (state: IThemeState): boolean => {
    return state.theme === 'light';
  },
  isDark: (state: IThemeState): boolean => {
    return state.theme === 'dark';
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
