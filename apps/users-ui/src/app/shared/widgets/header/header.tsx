import Link from 'next/link';
import React from 'react';
import { Search } from 'lucide-react';

const Header = () => {
    return (
        <div className='w-full bg-white'>
            <div className='w-[80%] py-5 m-auto flex items-center justify-between'>
                <div>
                    <Link href="/">
                        <span className='text-2xl font-[600]'>EStore</span>
                    </Link>
                </div>
                <div className='w-[50%] relative h-[45px] flex items-center'>
                    <input type="text" placeholder='Search for Products...' 
                    className='w-full px-4 font-Poppins font-medium border-[2.5px] border-[#3489ff] outline-none h-full rounded-lg'
                    />
                    <div className='w-[60px] cursor-pointer flex items-center justify-center h-full bg-[#3489ff] absolute top-0 right-0 rounded-r-lg'>
                        <Search color = "#ffff"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;
