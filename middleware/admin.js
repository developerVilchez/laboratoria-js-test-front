export default function ({ store, router }) {
  if (!store.state.authUser || !store.state.authUser.user.super) {
    store.dispatch('logout')
    router.replace({ path: '/login' })
    // redirect('/login')
    /*
    error({
      message: 'Usted no posee permisos',
      statusCode: 401
    })
    */
  }
}
