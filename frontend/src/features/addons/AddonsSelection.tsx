import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { incrementAddOn, decrementAddOn } from './addonsSlice';
import { selectAddOnsTotal } from '../../store/selectors';
import { QuantityControl } from '../../components/QuantityControl';
import {
  SpeakerGraphic,
  MicrophoneGraphic,
  WhiteboardGraphic,
  ProjectorGraphic,
  SignageGraphic,
  StarFlowerIcon,
} from '../../components/DecorativeAssets';
import { Sparkles, Sliders } from 'lucide-react';
import { AddOnOption } from '../../types';

export const AddonsSelection: React.FC = () => {
  const dispatch = useAppDispatch();
  const addons = useAppSelector((state) => state.addons.items);
  const quantities = useAppSelector((state) => state.addons.quantities);
  const addonsTotal = useAppSelector(selectAddOnsTotal);

  const getGraphic = (code: string) => {
    switch (code) {
      case 'speakers':
        return <SpeakerGraphic size={105} />;
      case 'microphones':
        return <MicrophoneGraphic size={105} />;
      case 'whiteboards':
        return <WhiteboardGraphic size={105} />;
      case 'projectors':
        return <ProjectorGraphic size={105} />;
      case 'signage':
        return <SignageGraphic size={105} />;
      default:
        return <SpeakerGraphic size={105} />;
    }
  };

  const getCardBg = (index: number) => {
    const bgs = [
      '#FEF9C3', // butter yellow
      '#FFE4F2', // blush pink
      '#E0F2FE', // sky blue
      '#EDE9FE', // lavender
      '#DCFCE7', // mint
    ];
    return bgs[index % bgs.length];
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
          {addons.map((addon: AddOnOption, idx: number) => {
            const qty = quantities[addon.code] || 0;
            const subtotal = addon.unitPrice * qty;

            return (
              <div
                key={addon.id || addon.code}
                className="squishy-card"
                style={{
                  backgroundColor: '#fff',
                  border: qty > 0 ? '3px solid var(--color-cobalt)' : '2.5px solid var(--color-border-bold)',
                }}
              >
                {/* Visual Header */}
                <div
                  style={{
                    backgroundColor: getCardBg(idx),
                    padding: '1.5rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '2.5px solid var(--color-border-bold)',
                    position: 'relative',
                  }}
                >
                  {getGraphic(addon.code)}
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: '#fff',
                      border: '1.5px solid var(--color-cobalt)',
                      borderRadius: '9999px',
                      padding: '2px 8px',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      color: 'var(--color-cobalt)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
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
