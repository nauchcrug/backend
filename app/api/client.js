const API_URL = 'http://informaticege.ru/api';
module.exports = ApiClient;

function ApiClient(url) {
    return fetch(API_URL + url)
        .then(r => r.text())
        .then(data => {
            let str = JSON.parse(data.trim());
            Promise.resolve(str);
        })
}

ApiClient.getSubject = subjId => ApiClient(`/subject/${subjId}`);

