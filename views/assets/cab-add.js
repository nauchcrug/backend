function tinyMCEinit() {
  const config = {
    selector: '#task-editor',
    height: 150,
    setup: editor => editor.on('change', ev => editor.save())
  };
  tinymce.init(config);
}

function status(res) {
  return res.statusText.toLowerCase() === 'ok'
    ? Promise.resolve(res)
    : Promise.reject(new Error(res.statusText));
}

function notify(msg) {
  const log = window.console.log.bind(console);
  const el = $('#message');
  const body = el.find('#message-body');
  body.html(msg);
  el.modal();
  log(msg);
}

function approve(json) {
  console.log(json);
  const headers = new Headers;
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json')
  const opts = {
    headers,
    method: 'post',
    body: json
  };
  const url = '/api/task'
  fetch(url, opts)
    .then(status)
    .then(res => res.json())
    .then(obj => notify(obj.msg))
    .catch(err => notify(err.message));
}
document.querySelector('#add-task').addEventListener('submit', ev => {
  ev.preventDefault();
  const json = serialize(ev.target);
  [
    approve
  ].forEach(f => f(json));
});
