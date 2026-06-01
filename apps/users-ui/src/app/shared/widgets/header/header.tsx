import Link from 'next/link';
import React from 'react';

const Header = () => {
    return (
        <div className='w-full bg-white'>
            <div className='w-[80%] py-5 m-auto flex item-center justify-between'>
                <div>
                    <Link href="/">
                        <span className='text-2xl font-[600]'>EStore</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header;
