import { IUserData, IUserGetters, IUserState } from '@/models/interfaces/user';

const initialState = (): IUserState => ({
  user: null,
});

const state = initialState();

const actions = {};

const mutations = {};

const getters: IUserGetters = {
  user: (state: IUserState): IUserData | null => {
    return state.user;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
