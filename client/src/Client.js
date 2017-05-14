/**
 * @method getArticles
 * @param {String} query - find these articles
 * @param {Function} cb - final call once parser completes
 * @returns {Promise.<JSON>}
 */
function getArticles(query, cb) {
  return fetch('/articles/' + query, {
    accept: 'application/json'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

/**
 * @method postNewArticle
 * @param {Object} payload - a new article model object
 * @param {Function} cb - final call once successful status received
 * @returns {Promise.<Response>}
 */
function postNewArticle(payload, cb) {
  return fetch("/articles/add", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(checkStatus)
    .then(cb);
}

/**
 * @method deleteArticle
 * @param {Number} mongoId - a mongo record id
 * @param {Function} cb - final call once successful status received
 * @returns {Promise.<Response>}
 */
function deleteArticle(mongoId, cb) {
  console.log('Client :: deleteArticle', mongoId);
  return fetch("/articles/delete/" + mongoId, {
    method: "DELETE"
  }).then(checkStatus)
    .then(cb);
}

/**
 * Basic Response Ccode checking and Error handling
 * - Will check for a successful status before passing back the Repsonse or an Error
 *
 * @method checkStatus
 * @param {Response} response
 * @returns {Error|Response}
 * @private
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }
}

/**
 * Basic JSON Parsing
 *
 * @method parseJSON
 * @param response
 * @returns {JSON}
 * @private
 */
function parseJSON(response) {
  return response.json();
}

const Client = {
  getArticles,
  postNewArticle,
  deleteArticle
};
/**
 * Helper for HTTP Request Response handling
 * - Restful API
 *
 * @class Client
 */
export default Client;