<template>
  <div role="main" class="app-content box-shadow-z0">
    <topbar/>
    <section class="body-section">
      <article class="padding">
        <div class="row">
          <div class="posts_c">
            <div class="box text-color-gray">
              <div class="box-header">
                <h2>Feed</h2><br>
                <form class="navbar-form form-inline v-m"  v-on:submit.prevent="newPost" role="search">
                  <div class="form-group l-h m-a-0">
                    <div class="input-group">
                      <textarea v-model.trim="post.message" class="form-control form-control-sm b-a radius" placeholder="¿Qué está pasando?"></textarea>
                      <div class="control-btns">
                        <select v-model="post.scope" class="select-scope radius">
                          <option :value="0">Público</option>
                          <option :value="1">Amigos</option>
                        </select>
                        <input class="radius orange publishing-btn" type="submit" value="Publicar">
                      </div>

                    </div>
                  </div>
                </form>
                <div class="box-divider m-a-0"></div>
              </div>
              <div class="btn-group toggle-kind-of-ops">
                <button type="button" class="btn btn-outline b-info" @click="filterPosts('friends')">Amigos</button>
                <button type="button" class="btn btn-outline b-info" @click="filterPosts('public')">Público</button>
              </div>
              <div class="box-body">
                <ul class="list-group no-radius no-borders">
                                    
                </ul>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import topbar from '@/components/KHeader'
export default {
  name: 'admin',
  layout: 'app',
  middleware: 'admin',
  components: {
    topbar
  },
  data () {
    return {
      posts: this.$store.state.feed,
      post: {
        message: '',
        scope: 0,
        is_image: false
      }
    }
  },
  created () {},
  methods: {
    async newPost () {
      this.post.created_date = Date()
      const res = await this.$store.dispatch('createPost', this.post)
      if (!res.response) this.$store.dispatch('fetchFeed')
    }
  }
}
</script>
<style scoped>
input, select { 
  min-width: 0;
}
.radius {
  border: solid 1px rgba(120, 130, 140, .2);
  border-radius: 5px !important;
}
textarea {
  padding: 5px 10px;
  max-width: calc(100% - 22px);
  height: 5rem;
}
.publishing-btn {
  width: 7rem;
  margin: 0;
}
.select-scope {
  min-width: 3rem;
  width: 7rem;
}
.control-btns {
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
  margin-top: .5rem;
}
.control-btns > * {
  margin-left: 5px !important;
}
.btn-group {
  list-style: none;
}
.toggle-kind-of-ops {
  display: flex;
  justify-content: center;
}
ul {
  padding: 0;
  list-style: none;
  max-height: 90vh;
  overflow: scroll;
}
.btn {
  padding: .5rem;
}
.b-info {
    border-color: #00e3c2;
}
.box p {
  font-size: 12pt;
}
.box {
  border-radius: 4px
}

.box-divider{
 border-bottom: 2px solid rgba(120,130,140,.13);
}

.box-body {
  max-width: 30rem;
  margin: 0 auto;
  color: #707070;
}


h2, h3, h4 {
  color: #182233
}

.posts_c {
  flex: 1 0 25%;
  max-width: 40rem;
}

.row > div {
  margin: 0 auto;
}

h2, h3, h4 {
    font-family: inherit;
}
</style>