import {useEffect, useState} from 'react';
import Link from "next/link";

function Header({positioned}) {
  const [pagePosition, setPagePosition] = useState('');
  const isPositioned = positioned ? "positioned" : "";

  useEffect(() => {
    const onScroll = e => {
      if (window.pageYOffset > 0) {
        setPagePosition('sticky-header');
      } else {
        setPagePosition('');
      }
    }; 

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <header className={`main-header ${isPositioned} ${pagePosition}`}>
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
