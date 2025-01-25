const Footer = () => {
  return (
    <div>
      <footer className="footer p-10 bg-base-200 text-base-content rounded-md">
        <aside>
          <img
            className="h-32"
            src="https://i.ibb.co/ngZpzvx/footer.png"
            alt=""
          />
          <p>
            NYB Restaurant.
            <br />
            Providing service since 2011
          </p>
        </aside>
        <nav>
          <header className="footer-title">Company</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <header className="footer-title">Legal</header>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <form>
          <header className="footer-title">Newsletter</header>
          <fieldset className="form-control w-80">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="join">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item"
              />
              <button className="btn btn-primary join-item">Subscribe</button>
            </div>
          </fieldset>
        </form>
      </footer>
      <footer className="bg-gray-900 text-white py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} NYB Restaurant Menu. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
