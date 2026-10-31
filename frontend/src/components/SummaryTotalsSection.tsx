import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { openDetailsModal } from '../features/estimates/estimatesSlice';
import {
  selectRoomsTotal,
  selectAddOnsTotal,
  selectMealsTotal,
  selectGrandTotal,
  selectTotalSelectedCount,
} from '../store/selectors';
import { StarFlowerIcon, WavyScallopDivider } from './DecorativeAssets';
import { Calculator, ArrowRight, Building2, Sliders, Utensils } from 'lucide-react';

export const SummaryTotalsSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const roomsTotal = useAppSelector(selectRoomsTotal);
  const addOnsTotal = useAppSelector(selectAddOnsTotal);
  const mealsTotal = useAppSelector(selectMealsTotal);
  const grandTotal = useAppSelector(selectGrandTotal);
  const selectedCount = useAppSelector(selectTotalSelectedCount);

  return (
    <section id="summary-totals" style={{ padding: '3.5rem 2rem 4rem', backgroundColor: '#FFFDF5' }}>
      <WavyScallopDivider text="✦ ACCURATE DYNAMIC PRICING ✦ VERTICAL SLICE ARCHITECTURE ✦ REAL-TIME TOTALS ✦ GATHER & CO ✦" />

      <div style={{ maxWidth: 'var(--max-content-width)', margin: '3rem auto 0' }}>
        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'var(--color-pastel-pink)',
              border: '2px solid var(--color-cobalt)',
              borderRadius: '9999px',
              padding: '0.35rem 1.1rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: 'var(--color-cobalt)',
              marginBottom: '0.8rem',
            }}
          >
            <Calculator size={16} /> Live Cost Overview
          </div>
          <h2 className="section-title">Expense Summary &amp; Grand Total</h2>
          <p className="subtitle" style={{ maxWidth: '620px', margin: '0.5rem auto 0' }}>
            All calculations derive live from your selected items, unit rates, and participant counts.
          </p>
        </div>

        {/* 4 Totals Grid (Room, AddOn, Meal, Grand Total) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.75rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* 1. Room Selection Total */}
          <div
            className="squishy-card"
            style={{
              backgroundColor: '#EDE9FE',
              padding: '1.75rem 1.5rem',
              border: '2.5px solid var(--color-cobalt)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <Building2 size={18} color="var(--color-cobalt)" />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--color-cobalt)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Room Selection Total
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '2.2rem',
                color: 'var(--color-cobalt)',
              }}
            >
              ${roomsTotal.toLocaleString()}
            </span>
            <span
              style={{
                fontSize: '0.82rem',
                color: 'var(--color-text-muted)',
                marginTop: '0.4rem',
                display: 'block',
              }}
            >
              Includes all reserved conference rooms
            </span>
          </div>

          {/* 2. Add-ons Total */}
          <div
            className="squishy-card"
            style={{
              backgroundColor: '#FEF9C3',
              padding: '1.75rem 1.5rem',
              border: '2.5px solid var(--color-cobalt)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <Sliders size={18} color="var(--color-cobalt)" />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--color-cobalt)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Add-ons Total
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '2.2rem',
                color: 'var(--color-cobalt)',
              }}
            >
              ${addOnsTotal.toLocaleString()}
            </span>
            <span
              style={{
                fontSize: '0.82rem',
                color: 'var(--color-text-muted)',
                marginTop: '0.4rem',
                display: 'block',
              }}
            >
              Audio, visual, projector &amp; signage gear
            </span>
          </div>

          {/* 3. Meals Total */}
          <div
            className="squishy-card"
            style={{
              backgroundColor: '#DCFCE7',
              padding: '1.75rem 1.5rem',
              border: '2.5px solid var(--color-cobalt)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <Utensils size={18} color="var(--color-cobalt)" />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--color-cobalt)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Meals Total
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '2.2rem',
                color: 'var(--color-cobalt)',
              }}
            >
              ${mealsTotal.toLocaleString()}
            </span>
            <span
              style={{
                fontSize: '0.82rem',
                color: 'var(--color-text-muted)',
                marginTop: '0.4rem',
                display: 'block',
              }}
            >
              Artisanal breakfast, lunch, tea &amp; dinner
            </span>
          </div>

          {/* 4. Grand Total */}
          <div
            className="squishy-card"
            style={{
              backgroundColor: 'var(--color-cobalt)',
              color: '#fff',
              padding: '1.75rem 1.5rem',
              border: '2.5px solid var(--color-cobalt-dark)',
              boxShadow: '0 8px 0 var(--color-cobalt-dark)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <StarFlowerIcon size={20} color="var(--color-butter-yellow)" />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--color-butter-yellow)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Overall Grand Total
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '2.4rem',
                color: '#fff',
                lineHeight: 1.1,
                display: 'block',
              }}
            >
              ${grandTotal.toLocaleString()}
            </span>
            <span
              style={{
                fontSize: '0.82rem',
                color: 'var(--color-sky-blue)',
                marginTop: '0.4rem',
                display: 'block',
              }}
            >
              Rooms + Add-ons + Meals Total
            </span>
          </div>
        </div>

        {/* CTA Bar */}
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '28px',
            border: '2.5px solid var(--color-cobalt)',
            padding: '1.5rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 8px 0 rgba(22, 54, 176, 0.12)',
            flexWrap: 'wrap',
            gap: '1.25rem',
          }}
        >
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                color: 'var(--color-cobalt)',
                marginBottom: '0.2rem',
              }}
            >
              Ready to review your complete itemized breakdown?
            </h4>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
              Currently {selectedCount} items selected totaling ${grandTotal.toLocaleString()}. View the 4-column summary
              table or save to database.
            </p>
          </div>

          <button
            type="button"
            onClick={() => dispatch(openDetailsModal())}
            className="btn-squishy"
            style={{ padding: '0.8rem 1.8rem', fontSize: '1.05rem' }}
          >
            <span>Show Itemized Details</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

