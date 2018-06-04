<template>
  <section class="hello">
    <article>
      <form class="bg-white" v-on:submit.prevent="login()">
        <div class="form-group">
          <div class="input-box">
            <i class="fa fa-at" aria-hidden="true"></i>
            <input v-validate="'required|email'" name="email" placeholder="Correo Electronico" v-model.trim="user.email" type="email">
          </div>
          <span class="error_span">{{ errors.first('email') }}</span>
        </div>
        <div class="form-group">
          <div class="input-box">
            <i class="fa fa-lock" aria-hidden="true"></i>
            <input v-validate="'required|min:4'" name="password" placeholder="Contraseña" v-model="user.password" type="password">
          </div>
          <span class="error_span">{{ errors.first('password') }}</span>
        </div>
        <input class="radius orange btn-big" type="submit" value="Iniciar Sesion">
        <div class="alert alert-lightred" v-if="error">
            <strong>Error!</strong> {{ errorMessage }}. Su email o contraseña son incorrectos.
        </div>
        <!--<nuxt-link class="link-bold" to="/recuperar-contrasena" hreflang="es-pe">Olvidé contraseña</nuxt-link>-->
      </form>
    </article>
  </section>
</template>
<script>
import localStorage from 'localStorage'
export default {
  name: 'login',
  middleware: 'guest',
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      error: null,
      errorMessage: ''
    }
  },
  head () {
    return {
      title: 'Ingresa a tu cuenta - Kambista',
      meta: [
        { hid: 'description', name: 'description', content: 'Iniciar sesión. Accede a tu perfil de Kambista con tu correo electrónico y contraseña' },
        { property: 'og:description', content: 'Iniciar sesión. Accede a tu perfil de Kambista con tu correo electrónico y contraseña' },
        { property: 'og:url', content: 'https://www.kambista.com/login' }
      ]
    }
  },
  created () {
    this.redirect()
  },
  methods: {
    async login () {
      this.$validator.validate().then(async result => {
        if (result) {
          try {
            await this.$store.dispatch('login', this.user)
            this.user.email = ''
            this.user.password = ''
            this.error = false
          } catch (e) {
            this.error = true
            this.errorMessage = e.message
          }
        }
      })
    },
    redirect () {
      if (localStorage.getItem('Auth')) {
        this.$router.replace({ path: '/feed' })
      }
    }
  }
}
</script>
<style scoped>
.error_span {
  color: orangered;
  margin-left: 5px;
}
.hello {
  padding-top: 5rem;
  padding-bottom: 5rem;
}
a:focus, a:hover {
  color: #243043
}
</style>