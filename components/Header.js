import Link from "next/link";

function Header({positioned}) {
  return (
    <header className={positioned ? "main-header positioned" : "main-header"}>
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
