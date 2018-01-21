(function () {
  var toggles = document.querySelectorAll('[data-action="toggle-menu"]');
  var nav = document.querySelector('nav');
  var main = document.querySelector('main');
  var victor = document.getElementById('victor');
  Array.from(toggles).forEach(function (node) {
    node.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector('nav').classList.toggle('open');
      document.querySelector('main').classList.toggle('menu-open');
    });
  });
  main.addEventListener('click', function (e) {
    nav.classList.remove('open');
    main.classList.remove('menu-open');
  });
  if (victor) {
    Elm.Victor.embed(document.getElementById('victor'));
  }
}());
