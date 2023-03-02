import { reactive } from 'vue'

const store = ({
  state: reactive({
    active: null
  }),
  getters: {
    getBionicReaderStatus() {
      return store.state.active
    }
  },
  mutations: {
    toggleBionicReader() {
      var currentStatus = store.state.active;
      store.state.active = !currentStatus
    }
  },
  actions: {
    initializeCount() {
      store.state.active = false
    }
  }
})

export default store