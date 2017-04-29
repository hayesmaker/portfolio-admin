function getArticles(query, cb) {
  return fetch('/articles/' + query, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function postNewArticle(payload, cb) {
  return fetch("/articles/add", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(checkStatus)
    .then(cb);
}

function deleteArticle(mongoId, cb) {
  console.log('Client :: deleteArticle', mongoId);
  return fetch("/articles/delete/" + mongoId, {
    method: "DELETE"
  }).then(checkStatus)
    .then(cb);
}

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

function parseJSON(response) {
  return response.json();
}

const Client = { getArticles, postNewArticle, deleteArticle };
export default Client;