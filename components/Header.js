import Link from "next/link";

function Header() {
  return (
    <header className="main-header">
      <div className="logo-area">
        <Link href="/">
          <a className="logo-link">Library Mage</a>
        </Link>
      </div>
      <nav className="header-nav">
        <button className="header-search"></button>
        <div className="header-menu">
          <button className="menu-see"></button>
          <button className="menu-burger"></button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
