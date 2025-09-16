const Layout = (props) => {
  const { children } = props;

  const header = (
    <header>
      <div>
        <h1 className="text-gradient">CAFFIEND</h1>
        <p>For Coffee Insatiates</p>
      </div>
      <button>
        <p>Sign up for free</p>
        <i className="fa-solid fa-mug-hot" />
      </button>
    </header>
  );

  const footer = (
    <footer>
      <p>
        <span className="text-gradient">Caffiend</span> waas made by{' '}
        <a href="https://www.smoljames.com" target="_blank">
          Smoljames
        </a>
        <br />
        using the{' '}
        <a href="https://www.fantacss.smoljames.com" target="_blank">
          FantaCSS
        </a>{' '}
        design library.
      </p>
    </footer>
  );

  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
};

export default Layout;
