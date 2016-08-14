function tinyMCEinit() {
  const config = {
    selector: '#task-editor',
    height: 150,
    setup: editor => editor.on('change', ev => editor.save())
  };
  tinymce.init(config);
}

function approve(json) {
  const el = $('#message');
  const body = el.find('#message-body');
  body.html('Lodaing...');
  el.modal();
  console.log(json);
  const opts = {
    method: 'post',
    body: json,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const url = '/api/task'
  fetch(url, opts)
    .then(res => !res.ok
      ? Promise.reject(new Error(res.statusText))
      : res.json()
    )
    .then(data => body.html(data.message))
    .catch(err => {
      console.log(err)
      body.html(err.message)
    });
}
document.querySelector('#add-task').addEventListener('submit', ev => {
  ev.preventDefault();
  const json = serialize(ev.target);
  [
    approve
  ].forEach(f => f(json));
});
