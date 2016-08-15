
function test() {
  console.log(this);
}

function atest() {
  let ar = 123;
  test.call(ar);
}

atest();
