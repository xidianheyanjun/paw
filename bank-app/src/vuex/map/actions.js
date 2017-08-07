export default {
  gdmap_setUserLocation({commit}, userLocation) {
    commit('gdmap_setUserLocation', userLocation);
  },
  gdmap_setNearbank({commit}, nearbank) {
    commit('gdmap_setNearbank', nearbank);
  }
};