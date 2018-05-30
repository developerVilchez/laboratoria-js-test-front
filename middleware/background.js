export default function ({ route }) {
  if (route.path) {
    if (route.path === '/login' || route.path === '/login/') {
      if (process.browser) {
        document.body.classList.add('darkblue')
        document.body.classList.remove('non-darkblue')
      }
    } else {
      if (process.browser) {
        document.body.classList.add('non-darkblue')
        document.body.classList.remove('darkblue')
      }
    }
  }
}
