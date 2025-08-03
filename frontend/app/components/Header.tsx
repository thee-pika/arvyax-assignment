"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Toaster } from '@/components/ui/sonner';
import { UserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import useAuth from '../hooks/useAuth';

const Header = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        toast.success("LogOut Successful!!");
        setTimeout(() => {
            router.push("/auth/login")
        }, 1000);
    }

    return (
        <header className="bg-[#13361C] text-white shadow-lg">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href={"/"}>
                            <h1
                                className="text-xl font-bold flex gap-2 cursor-pointer hover:text-[#E3EFD3] transition-colors"
                            >
                                <Image src="/icon.png" alt="logo" width={40} height={40} />
                                <span className='flex items-center'>Wellness Platform</span>
                            </h1>
                        </Link>
                    </div>

                    <div className='flex justify-evenly font-semibold w-[30rem] items-center'>
                        <Link href={"/"}>
                            <span className="hover:bg-[#E3EFD3] text-[#E3EFD3] cursor-pointer hover:text-[#13361C] px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors">Home</span>
                        </Link>
                        <Link href={"/about"}>
                            <span className="hover:bg-[#E3EFD3] text-[#E3EFD3] cursor-pointer hover:text-[#13361C] px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors">About US</span>
                        </Link>
                        <Link href={"/contact"}>
                            <span className="hover:bg-[#E3EFD3] text-[#E3EFD3] cursor-pointer hover:text-[#13361C] px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors">Contact</span>
                        </Link>
                        {
                            user && <Link href={"/session/all"} className="hover:bg-[#E3EFD3] text-[#E3EFD3] cursor-pointer hover:text-[#13361C] px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"><span>Session</span></Link>
                        }
                    </div>
                    {
                        !user && <div className="space-x-4">
                            <Link href={"/auth/login"}>
                                <button

                                    className="hover:bg-[#E3EFD3] text-[#E3EFD3] cursor-pointer hover:text-[#13361C] px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                                >
                                    Login
                                </button>
                            </Link>
                            <Link href={"/auth/signup"}>
                                <button

                                    className="hover:bg-[#E3EFD3] cursor-pointer text-[#E3EFD3] hover:text-[#13361C] px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                                >
                                    Register
                                </button>
                            </Link>
                        </div>
                    }
                    <div>
                        {
                            user &&
                            <DropdownMenu>
                                <DropdownMenuTrigger className='hover:bg-gray-600 p-4 rounded-full cursor-pointer'><UserRound /></DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <Link href={"/session"}>
                                        <DropdownMenuItem >New Session</DropdownMenuItem>
                                    </Link>
                                    <Link href={"/session/my"}>
                                        <DropdownMenuItem >My Sessions</DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>

                                </DropdownMenuContent>
                            </DropdownMenu>
                        }
                    </div>
                </div>
            </div>
            <Toaster />
        </header>
    );
};

export default Header;

