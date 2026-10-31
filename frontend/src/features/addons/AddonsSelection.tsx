import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { incrementAddOn, decrementAddOn } from './addonsSlice';
import { selectAddOnsTotal } from '../../store/selectors';
import { QuantityControl } from '../../components/QuantityControl';
import { StarFlowerIcon } from '../../components/DecorativeAssets';
import { Sparkles, Sliders } from 'lucide-react';
import { AddOnOption } from '../../types';

export const AddonsSelection: React.FC = () => {
  const dispatch = useAppDispatch();
  const addons = useAppSelector((state) => state.addons.items);
  const quantities = useAppSelector((state) => state.addons.quantities);
  const addonsTotal = useAppSelector(selectAddOnsTotal);

  const getAddOnPhoto = (code: string, fallback?: string): string => {
    if (fallback) return fallback;
    switch (code) {
      case 'projectors':
        return '/assets/images/addon-projectors.jpg';
      case 'speakers':
        return '/assets/images/addon-speakers.jpg';
      case 'microphones':
        return '/assets/images/addon-microphones.jpg';
      case 'whiteboards':
        return '/assets/images/addon-whiteboards.jpg';
      case 'signage':
        return '/assets/images/addon-signage.jpg';
      default:
        return '/assets/images/addon-speakers.jpg';
    }
  };

  const getUnsplashFallback = (code: string): string => {
    switch (code) {
      case 'projectors':
        return 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80';
      case 'speakers':
        return 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80';
      case 'microphones':
        return 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80';
      case 'whiteboards':
        return 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80';
      case 'signage':
        return 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80';
      default:
        return 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80';
    }
  };

  return (
    <section id="equipment-addons" style={{ padding: '3.5rem 2rem 2.5rem', backgroundColor: '#FFF9E8' }}>
      <div style={{ maxWidth: 'var(--max-content-width)', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'var(--color-butter-yellow)',
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
            <Sliders size={16} /> Section 2: Audiovisuals &amp; Equipment
          </div>
          <h2 className="section-title">Add-ons Selection</h2>
          <p className="subtitle" style={{ maxWidth: '620px', margin: '0.5rem auto 0' }}>
            Elevate your event with state-of-the-art audio gear, 4K projection, mobile whiteboards, and custom signage.
          </p>
        </div>

        {/* 5 Add-ons Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {addons.map((addon: AddOnOption) => {
            const qty = quantities[addon.code] || 0;
            const subtotal = addon.unitPrice * qty;

            return (
              <div
                key={addon.id || addon.code}
                className="squishy-card"
                style={{
                  backgroundColor: '#fff',
                  border: qty > 0 ? '3px solid var(--color-cobalt)' : '2.5px solid var(--color-border-bold)',
                  boxShadow: qty > 0 ? '0 10px 0 var(--color-cobalt)' : '0 8px 0 rgba(22, 54, 176, 0.15)',
                }}
              >
                {/* Real Photographic Header */}
                <div
                  style={{
                    height: '190px',
                    position: 'relative',
                    overflow: 'hidden',
                    borderBottom: '2.5px solid var(--color-border-bold)',
                    backgroundColor: '#FEF9C3',
                  }}
                >
                  <img
                    src={addon.imageUrl || getAddOnPhoto(addon.code)}
                    alt={addon.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = getUnsplashFallback(addon.code);
                    }}
                  />

                  {/* Category badge */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1.5px solid var(--color-cobalt)',
                      borderRadius: '9999px',
                      padding: '3px 10px',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      color: 'var(--color-cobalt)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: '0 2px 0 var(--color-cobalt)',
                    }}
                  >
                    <Sparkles size={12} /> {addon.category}
                  </span>
                </div>

                {/* Card Body */}
                <div
                  style={{
                    padding: '1.4rem 1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.35rem',
                        color: 'var(--color-cobalt)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      {addon.name}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.88rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.5,
                        marginBottom: '1rem',
                      }}
                    >
                      {addon.description}
                    </p>
                  </div>

                  {/* Pricing and Controls */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1rem',
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: '0.78rem',
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            color: 'var(--color-text-light)',
                            display: 'block',
                          }}
                        >
                          Price Each
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.45rem',
                            fontWeight: 700,
                            color: 'var(--color-cobalt)',
                          }}
                        >
                          ${addon.unitPrice.toLocaleString()}
                        </span>
                      </div>

                      {/* Quantity Control */}
                      <QuantityControl
                        value={qty}
                        onIncrement={() => dispatch(incrementAddOn(addon.code))}
                        onDecrement={() => dispatch(decrementAddOn(addon.code))}
                        label={`${addon.name} quantity`}
                      />
                    </div>

                    {/* Subtotal */}
                    <div
                      style={{
                        paddingTop: '0.75rem',
                        borderTop: '1.5px dashed rgba(22, 54, 176, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                        Add-on Subtotal:
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: '1.15rem',
                          color: qty > 0 ? 'var(--color-cobalt)' : 'var(--color-text-light)',
                        }}
                      >
                        ${subtotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Total Bar */}
        <div className="section-total-bar" style={{ backgroundColor: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <StarFlowerIcon size={24} color="var(--color-cobalt)" />
            <span className="section-total-label">Add-ons Selection Total:</span>
          </div>
          <span className="section-total-amount">${addonsTotal.toLocaleString()}</span>
        </div>
      </div>
    </section>
  );
};
