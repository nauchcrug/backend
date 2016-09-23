const url = 'http://informaticege.ru/convert.php';

/* TODO: Class */
/*
class ApiClient {
    constructor(params) {
    }

    subject(subjId) {
        this.get
    }
}
*/

function ApiClient(params) {
    const oldApi = params => fetch(url + params)
    .then(res => res.text())
    .then(data => {
        let str = JSON.parse(data.trim());
        Promise.resolve(str);
    });
}

function Mock(params) {
    throw new Error('Not implemented!');
}

/* TODO: Fake data on testing */
if (__TEST__) {
    module.exports = client = Mock;
} else {
    module.exports = client = ApiClient;
}

client.subject = subjId => client(`?sub=${subjId}`);
