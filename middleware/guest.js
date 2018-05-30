export default function ({ store, redirect }) {
  if (store.state.authUser && store.state.authUser.user.super) {
    redirect('/')
    /*
    error({
      message: 'Usted no posee permisos',
      statusCode: 401
    })
    */
  }
}
