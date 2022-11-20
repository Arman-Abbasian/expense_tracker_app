import sisakoImage from '../images/logo.png'

const Header = () => {
    return ( 
        <header className="h-20 bg-slate-300 w-full rounded-sm drop-shadow-md mb-10 sticky top-4 z-10">
            <nav className="flex items-center justify-center p-2">
                <div className=""><img src={sisakoImage} alt="sisako" className='h-16 w-16'/></div>
                <h1 className="flex-1 text-slate-900 font-bold text-4xl flex justify-center">sisako</h1>
            </nav>
        </header>
     );
}
 
export default Header;