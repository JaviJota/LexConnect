export const Footer = () => {
  return (
    <footer className="footer bg-cyan-800 text-base-content pt-20 pb-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 ms-10 md:ms-52">
        <div className=" min-h-[50px] min-w-[50]">
          <h1 className="text-5xl font-bold text-gray-200">LexiGest</h1>
        </div>
        <div className=" min-h-[50px] min-w-[50]">
          <h6 className="font-bold mb-5 text-lg text-gray-200">Support</h6>
          <ul className="leading-7">
            <li className="text-gray-200 hover:text-white cursor-pointer">
              Documentation
            </li>
            <li className="text-gray-200 hover:text-white cursor-pointer">
              Contact
            </li>
          </ul>
        </div>
        <div className=" min-h-[50px] min-w-[50]">
          <h6 className="font-bold mb-5 text-lg text-gray-200">Legal</h6>
          <ul className="leading-7">
            <li className="text-gray-200 hover:text-white cursor-pointer">
              About
            </li>
            <li className="text-gray-200 hover:text-white cursor-pointer">
              Privacy
            </li>
            <li className="text-gray-200 hover:text-white cursor-pointer">
              Terms
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-16">
        <p className="text-gray-200 mt-10">
          &copy; {new Date().getFullYear()} LexiGest. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};
