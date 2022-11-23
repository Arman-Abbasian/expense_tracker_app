import { AiOutlinePhone } from "react-icons/ai";

const Footer = () => {
    return ( 
        <footer className="flex justify-center items-center h-10 bg-slate-300 w-full rounded-sm drop-shadow-md  fixed bottom-0 z-10 bg-opacity-50 container mx-auto max-w-xl">
                <div className="flex justify-center items-center gap-2 text-slate-900 font-bold text-2xl">
                    <AiOutlinePhone />
                    <p>09331575385</p>
                </div>
        </footer>
     );
}
 
export default Footer;