// Navigation
function toggleSearch() {
  let _searchBar = $("#toggleSearch");
  let _menuIcon = $("#hamburgerIcon");
  _searchBar.width() == 0 ? _searchBar.width(330) : _searchBar.width(0);
  _menuIcon.toggle();
};