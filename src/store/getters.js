const getters = {
  isAutnenticated: state => state.isAutnenticated,
  user: state => state.user.user,
  sidebar: state => state.sideopen.sidebar,
  device: state => state.sideopen.device,
}
export default getters
