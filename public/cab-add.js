document.querySelector('#add-task').addEventListener('submit', ev => {
  ev.preventDefault();
  const data = {};
  $(ev.target).serializeArray().map(x => data[x.name] = x.value);
  const el = $('#message');
  const body = el.find('#message-body');
  body.html('Lodaing...');
  el.modal();
  fetch('/api/task', {
    body: JSON.stringify(data),
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => !res.ok
      ? Promise.reject(new Error(res.statusText))
      : res.json()
    ).then(data => body.html(data.message))
    .catch(err => body.html(err.message));
  return false;
});
