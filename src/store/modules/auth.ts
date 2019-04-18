import { AuthCredentials } from '@/ts-declare/types/AuthCredentials';
import { RegisterCredentials } from '@/ts-declare/types/RegisterCredentials';

import { Module, ActionTree, MutationTree, GetterTree } from 'vuex';

import { Person } from '@/ts-declare/classes/Person';
import prettyPhone from '@/utils/pretty-phone';
import { RootState } from '../index';

export enum AUTH_MUTATIONS {
  PERSON = 'PERSON',
  ERROR = 'ERROR',
  TOKEN = 'TOKEN',
  PROCESSING = 'PROCESSING'
}

export interface AuthState {
  person: Person | null;
  token: string;
  error: string;
  isProcessing: boolean;
}

export const getters: GetterTree<AuthState, RootState> = {
  isLogin(authState): boolean {
    return authState.token !== '';
  },
  prettyPhone(authState): string {
    if (authState.person !== null) {
      return prettyPhone(authState.person.phone);
    }
    return '';
  }
};

export const actions: ActionTree<AuthState, RootState> = {
  signIn({ commit }, credentials: AuthCredentials): void {

    commit(AUTH_MUTATIONS.PROCESSING, true);

    new Promise((resolve, reject) => {

      // SOME AUTH IMPLEMENTATION SHOULD BE HERE

      // stub
      if (Math.random() > 0.5) {
        resolve({
          status: 'ok', data: {
            person: {
              id: 100,
              firstName: 'Vasya',
              middleName: '',
              lastName: 'Pup',
              phone: credentials.phone
            },
            token: 'onesuperdupertokenfromcryptoworld'
          }
        });
      }

      resolve({
        status: 'err', data: {
          msg: 'Bad credentials'
        }
      });

    })
      .then((resp: any) => {
        commit(AUTH_MUTATIONS.PROCESSING, false);
        if (resp.status === 'err') {
          commit(AUTH_MUTATIONS.ERROR, resp.data.msg);
        } else {
          commit(AUTH_MUTATIONS.TOKEN, resp.data.token);
          commit(AUTH_MUTATIONS.PERSON, resp.data.person);
        }
      })
      .catch((err) => {
        commit(AUTH_MUTATIONS.PROCESSING, false);
        commit(AUTH_MUTATIONS.ERROR, err.toSting());
      });
  },
  signUp({ commit }, credentials: RegisterCredentials): Promise<void> {
    commit(AUTH_MUTATIONS.PROCESSING, true);

    return new Promise((resolve, reject) => {

      // THE IMPLEMENTATION OF REGISTRATION SHOULD BE HERE

      // stub
      if (Math.random() > 0.5) {

        commit(AUTH_MUTATIONS.PROCESSING, false);
        commit(AUTH_MUTATIONS.PERSON, {
          id: 100,
          firstName: credentials.firstName,
          middleName: credentials.middleName,
          lastName: credentials.lastName,
          phone: credentials.phone
        });
        resolve();
      } else {
        commit(AUTH_MUTATIONS.PROCESSING, false);
        commit(AUTH_MUTATIONS.ERROR, 'Bad credentials');
        reject();
      }
    });
  },
  signOut({ commit }): void {
    commit(AUTH_MUTATIONS.PERSON, null);
    commit(AUTH_MUTATIONS.TOKEN, '');
  }
};

export const mutations: MutationTree<AuthState> = {
  [AUTH_MUTATIONS.PROCESSING](authState: AuthState, isProcessing: boolean) {
    if (isProcessing) {
      authState.error = '';
    }
    authState.isProcessing = isProcessing;
  },
  [AUTH_MUTATIONS.ERROR](authState: AuthState, error: string) {
    authState.error = error;
  },
  [AUTH_MUTATIONS.TOKEN](authState: AuthState, token: string) {
    authState.token = token;
  },
  [AUTH_MUTATIONS.PERSON](authState: AuthState, person: Person | null) {
    authState.person = person as Person;
  }
};

export const state: AuthState = {
  person: null,
  token: '',
  error: '',
  isProcessing: false
};

const namespaced: boolean = true;

export const auth: Module<AuthState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};

