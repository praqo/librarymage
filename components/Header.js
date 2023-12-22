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
      </nav>
    </header>
  );
}

export default Header;
