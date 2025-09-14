"use client";

import PillNav from '@/ReactBits/PillNav/PillNav';

export default function Header() {
  return (
    <>
      <div className="flex justify-center top-0 left-0 w-full z-50 shadow py-3 fixed">
        <PillNav
          logo="/blog/assets/me.png"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Posts', href: '/posts' },
          ]}
        />
      </div>
      <div className={'py-8'}></div>
    </>
  );
}