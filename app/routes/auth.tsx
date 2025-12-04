import {usePuterStore} from "~/lib/puter";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";

export const meta = () => ([
    { title: 'Resumind | Auth' },
    { name: 'description', content: 'Log into your account' },
])

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next])

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0a15] to-[#1a0f1f] flex items-center justify-center p-4">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-950/10 via-transparent to-blue-950/10 pointer-events-none"></div>

            {/* Main Card */}
            <div className="relative z-10 w-full max-w-md">
                {/* Very subtle border glow */}
                <div className="absolute -inset-px bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-2xl blur-sm"></div>
                
                {/* Card content */}
                <section className="relative bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8 md:p-12">
                    {/* Logo/Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 rounded-xl  flex items-center justify-center">
                          <img src="/images/navicn.png" alt="" />
                        </div>
                    </div>

                    {/* Header */}
                    <div className="flex flex-col items-center gap-3 text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-white">

                        </h1>
                        <h2 className="text-neutral-400 text-lg">
                            Log In to Continue Your Job Journey
                        </h2>
                    </div>

                    {/* Divider */}
                    <div className="relative mb-10">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-800"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-neutral-900 text-neutral-500">Secure Authentication</span>
                        </div>
                    </div>

                    {/* Auth Button */}
                    <div className="space-y-4">
                        {isLoading ? (
                            <button 
                                disabled
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 cursor-not-allowed"
                            >
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Signing you in...</span>
                            </button>
                        ) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <button 
                                        onClick={auth.signOut}
                                        className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Log Out</span>
                                    </button>
                                ) : (
                                    <button 
                                        onClick={auth.signIn}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Log In</span>
                                    </button>
                                )}
                            </>
                        )}
                    </div>

                    {/* Info text */}
                    <p className="text-center text-neutral-500 text-sm mt-8">
                    Your data is encrypted and secure
                    </p>
                </section>
            </div>
        </main>
    )
}

export default Auth