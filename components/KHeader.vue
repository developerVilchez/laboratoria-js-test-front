<template>
<div class="app-header navbar-md white box-shadow">
   <div class="navbar">
      <ul class="nav navbar-nav pull-right">
       <li class="nav-item dropdown">
          <a class="nav-link non-user-select" @click="logout()"><i class="fa fa-sign-out text-warning" aria-hidden="true"></i>&nbsp;&nbsp;Salir</a>
       </li>
      </ul>
   </div>
</div>
</template>
<script>
export default {
  name: 'kheader',
  props: {
    newOp: { type: Boolean, default: false }
  },
  data () {
    return {}
  },
  methods: {
    async logout () {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        // this.formError = e.message
      }
    }
  }
}
</script>
<style scoped>

.app-header {
    position: fixed;
    top: 0;
    z-index: 1020;
    background: #504913;
}

.app-footer, .app-header {
    left: 0;
    right: 0;
    margin: 0;
}
.box-shadow, .box-shadow .box, .box-shadow .box-color {
    box-shadow: 0 2px 2px rgba(0,0,0,.03), 0 1px 0 rgba(0,0,0,.03);
}

.navbar-md {
    min-height: 4rem;
}

.navbar {
    position: relative;
    padding: .5rem 1rem;
}

.navbar {
    border: none;
    margin: 0;
    padding: 0 1rem;
    flex-shrink: 0;
    min-height: 3.5rem;
}

.navbar-brand {
    float: left;
    padding-top: .25rem;
    padding-bottom: .25rem;
    margin-right: 1rem;
    font-size: 1rem;
}

@media (min-width: 544px) {
	.navbar {
    	border-radius: .25rem;
	}
}

.navbar-brand {
    padding: 0;
    font-size: 20px;
    font-weight: 700;
}
.navbar-nav .nav-item {
    margin-left: 3rem;
}

.nav-text {
    line-height: 1.125rem;
    padding: .5625rem 0;
}

.navbar .nav-text {
    line-height: 1;
    display: inline-block;
    padding: 0;
}

.nav>li>a .nav-text {
    font-weight: 500;
}
</style>