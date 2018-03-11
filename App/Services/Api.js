// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = "http://api.kairos.com") => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      "app_id": "11d54ad1",
      "app_key": "5d1a4fe444a69c64cdfed10390f7ac7c" ,
      "Content-Type" : "application/json"
    },
    // 10 second timeout...
    timeout: 10000
  })

  payload = {"image" : "https://timedotcom.files.wordpress.com/2014/03/happily-surprised.jpg" }

  const url = "/v2/media?source="
  const image = "https://timedotcom.files.wordpress.com/2014/03/happily-surprised.jpg"
  lastURL = "status_code=0&timeout=60"
  const finalURL = baseURL + url + image + "&" + lastURL
  
  // ------
  // STEP 2
  // ------
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.post('/detect', payload)
  const getEmotion = () => api.post(finalURL)
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})

  // ------
  // STEP 3
  // ------
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,
    getEmotion,
  }
}

// let's return back our create method as the default.
export default {
  create
}
