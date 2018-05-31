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
                <button type="button" class="btn btn-outline b-info" :class="{'active': filter === null}" @click="filter = null">Todos</button>
                <button type="button" class="btn btn-outline b-info" :class="{'active': filter === 0}" @click="filter = 0">Público</button>
                <button type="button" class="btn btn-outline b-info" :class="{'active': filter === 1}" @click="filter = 1">Amigos</button>
              </div>
              <div class="box-body">
                <ul class="list-group no-radius no-borders list-of-posts">
                  <li class="post-container" v-for="post in getFeed" id="post.id">
                    <div class="post-content">
                      <template v-if="post.is_image">
                        <img :src="post.message">
                      </template>
                      <template v-else>
                        <div class="post-message" v-if="editing !== post.id">{{post.message}}</div>
                        <textarea class="post-editing" v-else v-model.trim="postEditing.message">{{post.message}}</textarea>
                        <div class="post-date">{{ fromNowDate(post.created_date) }}</div>
                        <div class="post-actions">
                          <template v-if="editing !== post.id">
                            <button @click="editPost(post)" class="btn">Editar</button>
                            <button @click="deletePost(post.id)" class="btn">Eliminar</button>
                          </template>
                          <template v-else>
                            <button @click="savePost()" class="btn">Guardar</button>
                          </template>
                          <div class="post-scope">{{ post.scope === 0 ? 'Público' : 'Amigos' }}</div>
                        </div>
                      </template>
                    </div>
                  </li>           
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
import moment from 'moment'
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
      },
      editing: '',
      postEditing: null,
      filter: null
    }
  },
  created () {
    this.$store.dispatch('fetchFeed')
  },
  watch: {
    filter: async function (val) {
      switch (val) {
        case null:
          this.posts = this.$store.state.feed
          break
        case 0:
          this.posts = this.$store.state.feed.filter(el => el.scope === 0)
          break
        case 1:
          this.posts = this.$store.state.feed.filter(el => el.scope === 1)
          break
      }
    }
  },
  computed: {
    getFeed () {
      return this.posts
    }
  },
  methods: {
    async newPost () {
      this.post.created_date = Date()
      const res = await this.$store.dispatch('createPost', this.post)
      if (!res.response) {
        await this.$store.dispatch('fetchFeed')
        this.posts = this.$store.state.feed
      }
    },
    fromNowDate (date) {
      return moment(date).locale('es').fromNow(true)
    },
    editPost (post) {
      this.editing = post.id
      this.postEditing = post
    },
    async savePost () {
      const res = await this.$store.dispatch('savePost', this.postEditing)
      this.postEditing = null
      this.editing = ''
      if (!res.response) this.fetchFeed()
    }
  }
}
</script>
<style scoped>
.post-container {
  border: solid 1px #c0c0c0;
  border-radius: 4px;
  padding: .3rem;
  margin-bottom: .5rem;
  background-color: #f0f0f0ab;
}
.post-container .post-content .post-message {
  min-height: 3rem;
  max-height: 6rem;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #ffffff;
  border-radius: 4px;
  padding: .2rem;
  font-weight: 500;
}
.post-container .post-content .post-date {
  font-size: 9pt;
  font-style: italic;
  text-align: end;
  padding: .2rem 0;
}
.post-container .post-content .post-scope {
  float: right;
  font-size: 9pt;
  color: cadetblue;
}
.post-container .post-content .post-actions > .btn {
    margin-right: 0.2rem;
}
.post-container .post-content .post-editing {
  width: 100%;
  max-height: 3rem;
}
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
  font-size: 9pt;
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