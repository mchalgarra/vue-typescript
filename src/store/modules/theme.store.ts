import { IThemeGetters, IThemeState } from '@/models/interfaces/theme';

/**
 * Instantiates the inicial Theme module state.
 *
 * @returns The Theme module state.
 */
const initialState = (): IThemeState => ({
  theme: 'light',
});

const state = initialState();

const mutations = {};

const actions = {};

const getters: IThemeGetters = {
  /**
   * Gets the current theme.
   *
   * @param state - The Theme module state.
   * @returns The current theme.
   */
  theme: (state: IThemeState): string => {
    return state.theme;
  },
  /**
   * Gets whether the current theme is light or not.
   *
   * @param state - The Theme module state.
   * @returns Whether the current theme is light or not.
   */
  isLight: (state: IThemeState): boolean => {
    return state.theme === 'light';
  },
  /**
   * Gets whether the current theme is dark or not.
   *
   * @param state - The Theme module state.
   * @returns Whether the current theme is dark or not.
   */
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
