import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <a
            rel="noreferrer noopener"
            href="/"
            className="font-bold text-xl flex"
          >
            <Link to='/' className='flex gap-3 items-center'>
                    <img src="/assets/images/logo.png" alt="logo" width={150} height={30} />
            </Link>
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Quicklinks</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="/"
              className="opacity-60 hover:opacity-100"
            >
              Home
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="/about"
              className="opacity-60 hover:opacity-100"
            >
              About
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="howto"
              className="opacity-60 hover:opacity-100"
            >
              How To
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="/developer"
              className="opacity-60 hover:opacity-100"
            >
              Developer
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Download</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              App Store
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Play Store
            </a>
          </div>
        </div>

      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy; 2024 Landing page made by{" "}
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://ajosedamilare.com/"
            className="text-primary-500 transition-all border-primary hover:border-b-2"
          >
            Payfly Engineering Team
          </a>
        </h3>
      </section>
    </footer>
  );
};
