import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { CheckeredRibbon } from './DecorativeAssets';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-butter-yellow-light)',
        borderTop: '3px solid var(--color-cobalt)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <CheckeredRibbon height={14} />

      <div
        style={{
          maxWidth: 'var(--max-content-width)',
          margin: '0 auto',
          padding: '3.5rem 2rem 2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start',
        }}
      >
        {/* Col 1: Brand description */}
        <div>
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              color: 'var(--color-cobalt)',
              marginBottom: '0.8rem',
            }}
          >
            Gather &amp; Co.
          </h4>
          <p
            style={{
              fontSize: '0.92rem',
              color: 'var(--color-text-dark)',
              lineHeight: 1.6,
              marginBottom: '0.8rem',
            }}
          >
            Made for inspiring conferences, midnight strategy breakthroughs, and everything between. Spaces and hospitality
            that don’t take themselves too seriously.
          </p>
          <p
            style={{
              fontSize: '0.82rem',
              color: 'var(--color-text-muted)',
              letterSpacing: '0.04em',
            }}
          >
            Stripes, scallops, and squishy shapes for everyday event planning ease.
          </p>
        </div>

        {/* Col 2: Navigation Links */}
        <div>
          <h5
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              color: 'var(--color-cobalt)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '1rem',
            }}
          >
            Quick Directory
          </h5>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              fontSize: '0.92rem',
              fontWeight: 600,
              color: 'var(--color-cobalt)',
            }}
          >
            <li>
              <a href="#venue-rooms" style={{ textDecoration: 'none' }}>
                ✦ Venue Room Selection
              </a>
            </li>
            <li>
              <a href="#equipment-addons" style={{ textDecoration: 'none' }}>
                ✦ AV Equipment Add-ons
              </a>
            </li>
            <li>
              <a href="#catering-meals" style={{ textDecoration: 'none' }}>
                ✦ Artisanal Catering Meals
              </a>
            </li>
            <li>
              <a href="#summary-totals" style={{ textDecoration: 'none' }}>
                ✦ Dynamic Budget Calculation
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Newsletter Signup (matching reference newsletter pill) */}
        <div>
          <h5
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.95rem',
              color: 'var(--color-cobalt)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '0.5rem',
            }}
          >
            Sign up for offers &amp; get 10% off
          </h5>
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              marginBottom: '1rem',
              lineHeight: 1.5,
            }}
          >
            Join our newsletter to receive the latest seasonal discounts and get 10% off your FIRST event booking.
          </p>

          <form onSubmit={handleSubscribe} style={{ position: 'relative' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#fff',
                border: '2px solid var(--color-cobalt)',
                borderRadius: '9999px',
                padding: '4px 6px 4px 16px',
                boxShadow: '0 3px 0 var(--color-cobalt)',
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                style={{
                  border: 'none',
                  outline: 'none',
                  flex: 1,
                  background: 'transparent',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.92rem',
                  color: 'var(--color-cobalt)',
                }}
              />
              <button
                type="submit"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-cobalt)',
                  color: '#fff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {subscribed ? <Check size={16} /> : <ArrowRight size={16} />}
              </button>
            </div>
            {subscribed && (
              <p
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.85rem',
                  color: 'var(--color-cobalt)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                }}
              >
                ✦ Welcome to the Gather &amp; Co. club!
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Giant playful bottom wordmark matching the reference image's "dollop!" */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          padding: '1rem 0 0.5rem',
          textAlign: 'center',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(5rem, 16vw, 13rem)',
            color: 'var(--color-cobalt)',
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            display: 'inline-block',
            transform: 'translateY(12%)',
          }}
        >
          gatherco!
        </span>
      </div>
    </footer>
  );
};
