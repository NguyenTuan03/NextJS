"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);  

    const toggleDropdown = () => {  
        setIsOpen(!isOpen);  
    }; 
    return (
        <div className="flex gap-2 items-center">
            <h1 className="text-xl">Nguyen Tuan</h1>
            <Link href={"/"}>Home</Link>
            <Link href={"/facebook"}>Facebook</Link>
            <Link href={"/tiktok"}>Tiktok</Link>
            <Link href={"/instagram"}>Instagram</Link>
            <div className="relative inline-block text-left">
                <div>
                    <button
                        type="button"
                        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        id="menu-button"
                        aria-expanded="true"
                        aria-haspopup="true"
                        onClick={toggleDropdown}
                    >
                        Options
                        <svg
                            className="-mr-1 size-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
                {isOpen && (  
                    <div  
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"  
                        role="menu"  
                        aria-orientation="vertical"  
                        aria-labelledby="menu-button"  
                    >  
                        <div className="py-1" role="none">  
                            <a  
                                href="#"  
                                className="block px-4 py-2 text-sm text-gray-700"  
                                role="menuitem"  
                            >  
                                Account settings  
                            </a>  
                            <a  
                                href="#"  
                                className="block px-4 py-2 text-sm text-gray-700"  
                                role="menuitem"  
                            >  
                                Support  
                            </a>  
                            <a  
                                href="#"  
                                className="block px-4 py-2 text-sm text-gray-700"  
                                role="menuitem"  
                            >  
                                License  
                            </a>  
                            <form method="POST" action="#" role="none">  
                                <button  
                                    type="submit"  
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700"  
                                    role="menuitem"  
                                >  
                                    Sign out  
                                </button>  
                            </form>  
                        </div>  
                    </div>  
                )}  
            </div>
        </div>
    );
}
