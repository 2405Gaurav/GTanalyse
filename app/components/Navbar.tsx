import {Link} from "react-router";
const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 ">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 rounded-2xl bg-white/50 px-6 my-2 shadow-sm">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <img 
                                src="images/navicn.png" 
                                width={50} 
                                height={50}
                                alt="Resumind Logo"
                                className="transition-transform duration-200 group-hover:scale-105"
                            />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
                            RESUMIND
                        </span>
                    </Link>
                    {/* Right side actions */}
                    <div className="flex items-center gap-4">
                        <Link 
                            to="/upload" 
                            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span className="hidden sm:inline">Upload Resume</span>
                            <span className="sm:hidden">Upload</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar