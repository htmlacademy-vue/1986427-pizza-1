export default function auth({ next, store, nextMiddleware }) {
  if (!store.state.Auth.user) {
    const token = store.$jwt.getToken();
    if (token) {
      store.$api.auth.setAuthHeader();
      store.dispatch("Auth/setUser");
    } else {
      next("/");
    }
  }
  return nextMiddleware();
}
