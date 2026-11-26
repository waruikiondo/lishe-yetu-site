'use client';

import { useEffect, useState } from 'react';

const DEFAULT_BUTTON =
  'rounded-full bg-[#8C926B] px-6 py-2 font-bold text-white shadow-md transition hover:bg-[#7a8059]';

type Row = { label: string; value: string; copy?: boolean };

const MPESA: Row[] = [
  { label: 'Paybill (Business no.)', value: '247247', copy: true },
  { label: 'Account no.', value: '332211', copy: true },
];

const BANK: Row[] = [
  { label: 'Bank', value: 'Equity Bank (Kenya) Limited' },
  { label: 'Account name', value: 'Lishe Yetu Initiative' },
  { label: 'Account no.', value: '1010185558826', copy: true },
  { label: 'SWIFT code', value: 'EQBLKENA', copy: true },
  { label: 'Bank code', value: '068' },
  { label: 'Branch', value: 'Marsabit (101)' },
  { label: 'Currency', value: 'KES' },
];

export default function DonateButton({
  className,
  label = 'Donate',
  onOpen,
}: {
  className?: string;
  label?: string;
  onOpen?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState('');

  const openModal = () => {
    onOpen?.();
    setOpen(true);
  };
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => setCopied(''), 1500);
    } catch {
      /* clipboard may be blocked on some browsers; ignore */
    }
  };

  const Rows = ({ rows }: { rows: Row[] }) => (
    <div className="divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-200">
      {rows.map((r) => (
        <div key={r.label} className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wide text-gray-400">{r.label}</p>
            <p className="truncate text-base font-semibold text-gray-800">{r.value}</p>
          </div>
          {r.copy && (
            <button
              type="button"
              onClick={() => copy(r.value)}
              className="shrink-0 rounded-full border border-[#8C926B] px-3 py-1 text-xs font-semibold text-[#1B3C1B] transition hover:bg-[#8C926B] hover:text-white"
            >
              {copied === r.value ? 'Copied' : 'Copy'}
            </button>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <button type="button" onClick={openModal} className={className ?? DEFAULT_BUTTON}>
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 sm:items-center sm:p-4"
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="donate-title"
            className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-white text-left shadow-2xl sm:rounded-2xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between bg-[#1B3C1B] px-6 py-4">
              <h2 id="donate-title" className="text-xl font-bold uppercase tracking-wide text-white">
                Support Our Work
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="rounded-full p-1 text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="space-y-6 px-6 py-6">
              <p className="text-gray-600">
                Your support helps us bring safe, nutritious food to more families. Give through any of the options below.
              </p>

              <div>
                <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#8C926B]">M-Pesa Paybill</h3>
                <Rows rows={MPESA} />
                <p className="mt-2 text-xs text-gray-500">
                  M-Pesa menu &rarr; Lipa na M-Pesa &rarr; Pay Bill &rarr; enter the Business and Account numbers above.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#8C926B]">Bank deposit</h3>
                <Rows rows={BANK} />
              </div>

              <p className="rounded-lg bg-[#8C926B]/10 px-4 py-3 text-sm text-gray-700">
                After giving, email{' '}
                <a href="mailto:info@lisheyetu.org" className="font-semibold underline">
                  info@lisheyetu.org
                </a>{' '}
                if you would like a receipt or a word of thanks.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
