import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { openDetailsModal, toggleSavedQuotes } from '../features/estimates/estimatesSlice';
import { selectTotalSelectedCount, selectGrandTotal } from '../store/selectors';
import { StarFlowerIcon, CheckeredRibbon } from './DecorativeAssets';
import { Bookmark, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateSection }) => {
  const dispatch = useAppDispatch();
  const selectedCount = useAppSelector(selectTotalSelectedCount);
  const grandTotal = useAppSelector(selectGrandTotal);
  const savedEstimates = useAppSelector((state) => state.estimates.savedEstimates);

  const handleNav = (id: string) => {
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar-container" style={{ background: '#FFFDF5' }}>
      <CheckeredRibbon height={14} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.2rem 2.5rem',
          maxWidth: 'var(--max-content-width)',
          margin: '0 auto',
          width: '100%',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {/* Brand Logo */}
        <div
          onClick={() => handleNav('hero')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-pastel-pink)',
              border: '2.5px solid var(--color-cobalt)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-cobalt)',
            }}
          >
            <StarFlowerIcon size={22} color="var(--color-cobalt)" />
          </div>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.75rem',
                color: 'var(--color-cobalt)',
                letterSpacing: '-0.02em',
              }}
            >
              Gather & Co.
            </span>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--color-text-muted)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Conference Event Planner
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleNav('venue-rooms')}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '1.05rem',
              color: 'var(--color-cobalt)',
              padding: '0.4rem 0.6rem',
            }}
          >
            Venue Rooms
          </button>
          <button
            onClick={() => handleNav('equipment-addons')}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '1.05rem',
              color: 'var(--color-cobalt)',
              padding: '0.4rem 0.6rem',
            }}
          >
            AV Add-ons
          </button>
          <button
            onClick={() => handleNav('catering-meals')}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '1.05rem',
              color: 'var(--color-cobalt)',
              padding: '0.4rem 0.6rem',
            }}
          >
            Catering Meals
          </button>
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          {/* Saved Estimates Button */}
          <button
            onClick={() => dispatch(toggleSavedQuotes())}
            className="pill-dashed"
            title="View saved quotes history"
            style={{ backgroundColor: '#FFFDF5', fontSize: '0.9rem' }}
          >
            <Bookmark size={16} />
            <span>Saved ({savedEstimates.length})</span>
          </button>

          {/* Show Details Button */}
          <button
            onClick={() => dispatch(openDetailsModal())}
            className="btn-squishy"
            style={{
              padding: '0.65rem 1.4rem',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
            }}
          >
            <ShoppingBag size={18} />
            <span>Show Details</span>
            {selectedCount > 0 && (
              <span
                style={{
                  backgroundColor: 'var(--color-butter-yellow)',
                  color: 'var(--color-cobalt)',
                  borderRadius: '9999px',
                  padding: '2px 8px',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                }}
              >
                {selectedCount}
              </span>
            )}
            <span
              style={{
                marginLeft: '4px',
                borderLeft: '1.5px solid rgba(255,255,255,0.4)',
                paddingLeft: '8px',
                fontSize: '0.92rem',
              }}
            >
              ${grandTotal.toLocaleString()}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
