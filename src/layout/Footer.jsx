import { AiOutlinePhone } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center h-10 bg-blue-500 w-full rounded-sm drop-shadow-md  fixed bottom-0 z-10  container mx-auto max-w-xl">
      <div className="flex justify-center items-center gap-2 text-slate-900 font-bold text-2xl">
        <AiOutlinePhone />
        <p>+989331575385</p>
      </div>
    </footer>
  );
};

export default Footer;
