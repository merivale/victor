(function () {
  var toggles = document.querySelectorAll('[data-action="toggle-menu"]');
  var victor = document.getElementById('victor');
  var toggle = function (event) {
    event.preventDefault();
    document.querySelector('nav').classList.toggle('open');
    document.querySelector('main').classList.toggle('menu-open');
  };
  var addToggle = function (node) {
    node.addEventListener('click', toggle);
  };
  Array.from(toggles).forEach(addToggle);
  if (victor) {
    Elm.Victor.embed(document.getElementById('victor'));
  }
}());
