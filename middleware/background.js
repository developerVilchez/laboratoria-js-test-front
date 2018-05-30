export default function ({ route }) {
  if (route.path) {
    if (route.path === '/login' || route.path === '/login/') {
      if (process.browser) {
        document.body.classList.add('darkyellow')
        document.body.classList.remove('non-darkyellow')
      }
    } else {
      if (process.browser) {
        document.body.classList.add('non-darkyellow')
        document.body.classList.remove('darkyellow')
      }
    }
  }
}
