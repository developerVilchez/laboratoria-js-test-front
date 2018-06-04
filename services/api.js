/* eslint-disable */
import axios from 'axios'
import moment from 'moment'
import localStorage from 'localStorage'

let api = axios.create({
  // `method` is the request method to be used when making the request
  method: 'get', // default

  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
  // to methods of that instance.
  // baseURL: process.env.API_LOCATION,
  baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:4000/v1' : 'https://kambista-v2.herokuapp.com/v1',
  // `headers` are custom headers to be sent
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'Authorization': localStorage.getItem('Auth')
  },

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 600000,

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: false, // default

  // `responseType` indicates the type of data that the server will respond with
  // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // `onUploadProgress` allows handling of progress events for uploads
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` allows handling of progress events for downloads
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `maxContentLength` defines the max size of the http response content allowed
  maxContentLength: 2000000,

  // `maxRedirects` defines the maximum number of redirects to follow in node.js.
  // If set to 0, no redirects will be followed.
  maxRedirects: 3, // default

  validateStatus: function (status) {
    /*if (status === 401) {
      localStorage.removeItem('Auth')
      if (process.browser && window.location.pathname !== '/login') window.location = `${location.protocol}//${location.host}/login`
    }*/
    return status >= 200 && status < 300; // default
  }

});

export const signIn = async (credentials) => {
	let rs = null
  credentials.email = credentials.email.toLowerCase()
  try {
    rs = await api.post('customers/login?include=user', credentials)
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Bad credentials')
    }
    rs = error.response
    throw error
  }
  return rs
}

export const logout = async () => {
  let rs = null
  await api.post('customers/logout').then(response => rs = response)
      .catch(error => {
        if (error.response) {
          rs = error.response
        }
      })
  delete api.defaults.headers.Authorization
  return rs
}

export const createPost = async (post) => {
  let rs = null
  await api.post('customers/me/posts', post).then(response => rs = response)
      .catch(error => {
        if (error.response) {
          rs = error.response
        }
      })
  return rs
}

export const fetchFeed = async () => {
  let rs = null
  await api.get('posts?filter[order]=created_date%20DESC').then(response => rs = response)
      .catch(error => {
        if (error.response) {
          rs = error.response
        }
      })
  return rs
}

export const savePost = async (post) => {
  let rs = null
  await api.put(`customers/me/posts/${post.id}`, post).then(response => rs = response)
      .catch(error => {
        if (error.response) {
          rs = error.response
        }
      })
  return rs
}

export const deletePost = async (id) => {
  return await api.delete(`customers/me/posts/${id}`)
}

export const uploadImage = (file) => {
  let url = process.env.NODE_ENV !== 'production' ? 'http://localhost:4000/v1/containers/kambista/upload' : 'https://kambista-v2.herokuapp.com/v1/containers/kambista/upload'
  if (process.browser) {
    return new Promise((resolve, reject) => {
      let xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")
      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
          if (xmlhttp.status == 200) {
            // resolve instead of return inside of a Promise closure
            resolve(JSON.parse(xmlhttp.response))
          } else {
            // reject instead of throw
            // (will throw the error at the `await` expression.)
            reject(Error(`Received status code ${xmlhttp.status}`))
          }
        }
      }
      xmlhttp.open('POST', url, true)
      xmlhttp.send(file)
    })
  }
}

export default api

