'use client';

import { useState } from 'react';
import Image from 'next/image';
// import Link from 'next/link'; // kept for when Patient Portal is re-enabled
import DonateButton from '@/components/DonateButton';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#programs', label: 'Programs' },
  { href: '#impact', label: 'Impact' },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#1B3C1B] text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3">
          <div className="relative h-11 w-11 shrink-0">
            <Image src="/logo1.jpeg" alt="Lishe Yetu Logo" fill className="object-contain" />
          </div>
          <span className="text-lg font-bold uppercase tracking-tight sm:text-xl">Lishe Yetu</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 font-medium md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="border-b-2 border-transparent transition hover:border-[#8C926B] hover:text-[#8C926B]"
            >
              {l.label}
            </a>
          ))}
          {/* Patient Portal — hidden for now; the /login route and portal are still live.
          <Link href="/login" className="border-b-2 border-transparent transition hover:border-[#8C926B] hover:text-[#8C926B]">Patient Portal</Link>
          */}
          <DonateButton className="rounded-full bg-[#8C926B] px-6 py-2 font-bold text-white shadow-md transition hover:bg-[#7a8059]" />
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="rounded-lg p-2 transition hover:bg-white/10 md:hidden"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-[#1B3C1B] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4 font-medium">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-1 transition hover:text-[#8C926B]"
              >
                {l.label}
              </a>
            ))}
            {/* Patient Portal hidden for now.
            <Link href="/login" onClick={() => setOpen(false)} className="py-1 transition hover:text-[#8C926B]">Patient Portal</Link>
            */}
                        <DonateButton
              className="mt-2 w-full rounded-full bg-[#8C926B] px-6 py-3 font-bold text-white shadow-md transition hover:bg-[#7a8059]"
            />
          </div>
        </div>
      )}
    </nav>
  );
}
