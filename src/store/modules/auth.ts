class AuthState {
  // TODO: replace by real User type/class
  public person: any;

  constructor() {
    this.person = null;
  }
}

const getters = {
  isLogin(state: AuthState): boolean {
    return state.person !== null;
  }
};


const actions = {};

const mutations = {};

export default {
  namespaced: true,
  state: new AuthState(),
  getters,
  actions,
  mutations
};
