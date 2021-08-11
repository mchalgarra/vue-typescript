import { auth, authPersistence, db } from '@/main';
import {
  ILoginPayload,
  ISignUpPayload,
  IUserData,
  IUserGetters,
  IUserState,
} from '@/models/interfaces/user';
import { getNowISOString } from '@/utils/date';
import { Store } from 'vuex';

/**
 * Instantiates the inicial User module state.
 *
 * @returns The User module state.
 */
const initialState = (): IUserState => ({
  user: null,
});

const state = initialState();

const mutations = {
  setUser(state: IUserState, data: IUserData | null): void {
    state.user = data ? { ...data } : null;
  },
};

const actions = {
  /**
   * Signs the user up and adds it to the state.
   *
   * @param store - The vuex store.
   * @param payload - The payload containing the essential user info.
   */
  async signUp(
    { commit, dispatch }: Store<IUserState>,
    payload: ISignUpPayload,
  ): Promise<boolean> {
    commit('setLoading', true);

    await auth.setPersistence(authPersistence.local);

    return new Promise((resolve) => {
      auth
        .createUserWithEmailAndPassword(
          payload.user.email,
          payload.user.password,
        )
        .then(async (user) => {
          const data = user.user;

          if (!data) {
            dispatch('showSnackbar', {
              color: 'error',
              text: 'Error on creating new user',
            });
            resolve(false);
            return;
          }

          const now = getNowISOString();

          const userData: IUserData = {
            id: data.uid,
            name: payload.user.name,
            email: payload.user.email,
            createdAt: now,
            updatedAt: now,
            isActive: true,
            roles: ['common'],
          };

          await db.collection('users').doc(data.uid).set(userData);

          await data.updateProfile({ displayName: payload.user.name });

          commit('setUser', userData);
          commit('setLoading', false);

          resolve(true);
          return userData;
        })
        .catch((error) => {
          commit('setLoading', false);
          dispatch('showSnackbar', {
            color: 'error',
            text: error.message,
          });
          resolve(false);
        });
    });
  },
  /**
   * Logs the user in and adds it's data to the state.
   *
   * @param store - The vuex store.
   * @param payload - The payload user e-mail and password.
   */
  async login(
    { commit, dispatch }: Store<IUserState>,
    payload: ILoginPayload,
  ): Promise<boolean> {
    commit('setLoading', true);

    const { user, remember } = payload;

    if (remember) {
      await auth.setPersistence(authPersistence.local);
    } else {
      await auth.setPersistence(authPersistence.none);
    }

    return new Promise((resolve) => {
      auth
        .signInWithEmailAndPassword(user.email, user.password)
        .then(async (user) => {
          const data = user.user;

          if (!data) {
            dispatch('showSnackbar', {
              color: 'error',
              text: 'Error on logging user in',
            });
            resolve(false);
            return;
          }

          const doc = await db.collection('users').doc(data.uid).get();
          const docData = doc.data();

          if (!docData) {
            dispatch('showSnackbar', {
              color: 'error',
              text: 'Error on loading user data',
            });
            resolve(false);
            return;
          }

          const userData: IUserData = docData as IUserData;

          commit('setUser', userData);
          commit('setLoading', false);

          resolve(true);
          return userData;
        })
        .catch((error) => {
          commit('setLoading', false);
          dispatch('showSnackbar', {
            color: 'error',
            text: error.message,
          });
          resolve(false);
        });
    });
  },
  /**
   * Logs the user out and removes it's data from the state.
   *
   * @param store - The vuex store.
   */
  async logout({ commit }: Store<IUserState>): Promise<void> {
    auth.signOut();
    commit('setUser', null);
    window.localStorage.removeItem('user');
  },
  /**
   * Automatically logs the user in depending on the auth persistence.
   *
   * @param store - The vuex store.
   * @param payload - The auto login payload containing the user id.
   */
  async autoLogin(
    { commit, dispatch }: Store<IUserState>,
    payload: { id: string },
  ): Promise<void> {
    commit('setLoading', true);

    const { id } = payload;

    const doc = await db.collection('users').doc(id).get();
    const userData = doc.data() as IUserData | undefined;

    if (!userData) {
      dispatch('showSnackbar', {
        color: 'error',
        text: 'Error on automatically loading user data',
      });
      commit('setLoading', false);
      return;
    }

    commit('setUser', userData);

    commit('setLoading', false);
  },
};

const getters: IUserGetters = {
  /**
   * Gets the user data from the state.
   *
   * @param state - The User module state.
   * @returns The user data.
   */
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
