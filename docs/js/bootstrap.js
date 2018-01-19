if (document.getElementById('side-toggle')) {
  document.getElementById('side-toggle').addEventListener('click', function () {
    document.body.classList.toggle("side-open");
  });
}

if (document.getElementById('victor')) {
  Elm.Victor.embed(document.getElementById('victor'));
}
