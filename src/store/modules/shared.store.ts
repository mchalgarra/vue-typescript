import {
  ISharedState,
  ISharedGetters,
  ISnackbarData,
  IShowSnackbarPayload,
} from '@/models/interfaces/shared';
import { Store } from 'vuex';

/**
 * Instantiates the inicial Shared module state.
 *
 * @returns The Shared module state.
 */
const initialState = (): ISharedState => ({
  snackbar: {
    show: false,
    color: 'error',
    text: '',
    timeout: 4000,
  },
  isLoading: false,
});

const state = initialState();

const mutations = {
  /**
   * Sets the snackbar with the given data.
   *
   * @param state - The Shared module state.
   * @param data - The snackbar data.
   */
  setSnackbar(state: ISharedState, data: ISnackbarData): void {
    state.snackbar = { ...data, timeout: data.timeout || 4000 };
  },
  /**
   * Clears the snackbar, setting it to it's initial state.
   *
   * @param state - The Shared module state.
   */
  clearSnackbar(state: ISharedState): void {
    state.snackbar = {
      show: false,
      color: 'error',
      text: '',
      timeout: 4000,
    };
  },
  /**
   * Sets the application loading state.
   *
   * @param state - The Shared module state.
   * @param data - The loading state to be set.
   */
  setLoading(state: ISharedState, data: boolean): void {
    state.isLoading = data;
  },
};

const actions = {
  /**
   * Sets the snackbar to visible.
   *
   * @param store - The vuex store.
   * @param payload - The snackbar data containing the color, text and timeout.
   */
  showSnackbar(
    { commit }: Store<ISharedState>,
    payload: IShowSnackbarPayload,
  ): void {
    commit('setSnackbar', {
      ...payload,
      show: true,
    });
  },
  /**
   * Sets the snackbar to hidden.
   *
   * @param store - The vuex store.
   */
  hideSnackbar({ commit }: Store<ISharedState>): void {
    commit('clearSnackbar');
  },
};

const getters: ISharedGetters = {
  /**
   * Gets the snackbar data from the state.
   *
   * @param state - The Shared module state.
   * @returns The snackbar data.
   */
  snackbar: (state: ISharedState): ISnackbarData => {
    return state.snackbar;
  },
  /**
   * Gets whether the application is in loading state or not.
   *
   * @param state - The Shared module state.
   * @returns The application loading state.
   */
  isLoading: (state: ISharedState): boolean => {
    return state.isLoading;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
