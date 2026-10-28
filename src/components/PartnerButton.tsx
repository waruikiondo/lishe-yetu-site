'use client';

import { useEffect, useRef, useState, FormEvent } from 'react';

// Matches the "Get Involved" copy on the site
const INTERESTS = [
  'Community outreach',
  'Kitchen gardens',
  'Organisation partnership',
  'Volunteering',
  'Funding or sponsorship',
];

type Status = 'idle' | 'sending' | 'sent' | 'error';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  organisation: '',
  interests: [] as string[],
  message: '',
  website: '', // honeypot: real people never see or fill this
};

// Default look = the current olive pill button.
// If you pass your existing button's className, that is used instead.
const DEFAULT_BUTTON =
  'rounded-full bg-[#8C926B] px-12 py-5 text-xl font-bold text-white shadow-xl transition hover:bg-[#7a8059] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#8C926B]/40';

export default function PartnerButton({
  className,
  label = 'Partner With Us',
}: {
  className?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const firstField = useRef<HTMLInputElement>(null);

  const close = () => {
    setOpen(false);
    // reset after the dialog has closed, so a second visitor starts fresh
    if (status === 'sent') {
      setForm(emptyForm);
      setStatus('idle');
    }
    setError('');
  };

  // Esc to close, lock page scroll while open, focus first field
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setTimeout(() => firstField.current?.focus(), 50);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const update = (field: keyof typeof emptyForm, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const toggleInterest = (item: string) =>
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(item)
        ? f.interests.filter((i) => i !== item)
        : [...f.interests, item],
    }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.interests.length === 0) {
      setError('Pick at least one way you would like to get involved.');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Your details were not sent.');
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(
        err instanceof Error ? err.message : 'Your details were not sent.'
      );
    }
  };

  const input =
    'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-800 placeholder:text-gray-400 focus:border-[#8C926B] focus:outline-none focus:ring-2 focus:ring-[#8C926B]/30';
  const labelCls = 'mb-1.5 block text-sm font-semibold text-[#1B3C1B]';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className ?? DEFAULT_BUTTON}
      >
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
            aria-labelledby="partner-title"
            className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white text-left shadow-2xl sm:rounded-2xl"
          >
            {/* Header strip in the site's navbar green */}
            <div className="sticky top-0 z-10 flex items-center justify-between bg-[#1B3C1B] px-6 py-4">
              <h2
                id="partner-title"
                className="text-xl font-bold uppercase tracking-wide text-white"
              >
                Partner With Us
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

            {status === 'sent' ? (
              <div className="px-6 py-12 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#8C926B]/15">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1B3C1B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </div>
                <h3 className="mb-2 text-2xl font-bold text-[#1B3C1B]">
                  Thank you, {form.name.split(' ')[0]}
                </h3>
                <p className="mx-auto mb-8 max-w-sm text-gray-600">
                  We have received your details and will get back to you at{' '}
                  <span className="font-semibold text-gray-800">{form.email}</span>.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full bg-[#8C926B] px-10 py-3 font-bold text-white transition hover:bg-[#7a8059]"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5 px-6 py-6">
                <p className="text-gray-600">
                  Leave your details and our team will reach out. It takes less
                  than a minute.
                </p>

                <div>
                  <label htmlFor="pf-name" className={labelCls}>
                    Full name *
                  </label>
                  <input
                    ref={firstField}
                    id="pf-name"
                    required
                    maxLength={100}
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className={input}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="pf-email" className={labelCls}>
                      Email *
                    </label>
                    <input
                      id="pf-email"
                      type="email"
                      required
                      maxLength={150}
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className={input}
                    />
                  </div>
                  <div>
                    <label htmlFor="pf-phone" className={labelCls}>
                      Phone <span className="font-normal text-gray-400">(optional)</span>
                    </label>
                    <input
                      id="pf-phone"
                      type="tel"
                      maxLength={20}
                      autoComplete="tel"
                      placeholder="07XX XXX XXX"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      className={input}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="pf-org" className={labelCls}>
                    Organisation <span className="font-normal text-gray-400">(optional)</span>
                  </label>
                  <input
                    id="pf-org"
                    maxLength={120}
                    autoComplete="organization"
                    placeholder="School, facility, NGO, business..."
                    value={form.organisation}
                    onChange={(e) => update('organisation', e.target.value)}
                    className={input}
                  />
                </div>

                <fieldset>
                  <legend className={labelCls}>How would you like to get involved? *</legend>
                  <div className="flex flex-wrap gap-2">
                    {INTERESTS.map((item) => {
                      const on = form.interests.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggleInterest(item)}
                          className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                            on
                              ? 'border-[#1B3C1B] bg-[#1B3C1B] text-white'
                              : 'border-gray-300 bg-white text-gray-700 hover:border-[#8C926B]'
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="pf-message" className={labelCls}>
                    Anything you would like us to know?{' '}
                    <span className="font-normal text-gray-400">(optional)</span>
                  </label>
                  <textarea
                    id="pf-message"
                    rows={3}
                    maxLength={1000}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    className={`${input} resize-none`}
                  />
                </div>

                {/* Honeypot: hidden from people, bots fill it */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={form.website}
                  onChange={(e) => update('website', e.target.value)}
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />

                {error && (
                  <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error} You can also email us directly at{' '}
                    <a href="mailto:info@lisheyetu.org" className="font-semibold underline">
                      info@lisheyetu.org
                    </a>
                    .
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full rounded-full bg-[#8C926B] py-4 text-lg font-bold text-white shadow-lg transition hover:bg-[#7a8059] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending...' : 'Send my details'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}