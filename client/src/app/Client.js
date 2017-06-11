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
    console.log('checkStatus', response);
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

/**
 * @method getArticles
 * @param {String} query - find these articles
 * @returns {Promise.<JSON>}
 */
export function getArticles(query) {
  console.log('getArticles', query);
  return fetch('/articles/' + query, {
    accept: 'application/json'
  })
    .then(checkStatus)
    .then(parseJSON);
}

/**
 * @method postNewArticle
 * @param {Object} payload - a new article model object
 * @returns {Promise.<Response>}
 */
export function postNewArticle(payload) {
  return fetch("/articles/add", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(checkStatus)
}

/**
 * @method deleteArticle
 * @param {Number} mongoId - a mongo record id
 * @returns {Promise.<Response>}
 */
export function deleteArticle(mongoId) {
  console.log('Client :: deleteArticle', mongoId);
  return fetch("/articles/delete/" + mongoId, {
    method: "DELETE"
  }).then(checkStatus)
}

