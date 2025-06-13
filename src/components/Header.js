const Header = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="container">
          <a className="navbar-brand">MyShoppingSite</a>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
};
export default Header;
