import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { incrementRoom, decrementRoom } from './roomsSlice';
import { selectRoomsTotal } from '../../store/selectors';
import { QuantityControl } from '../../components/QuantityControl';
import {
  RoomAuditoriumGraphic,
  RoomConferenceGraphic,
  RoomPresentationGraphic,
  StarFlowerIcon,
} from '../../components/DecorativeAssets';
import { Users, Building2 } from 'lucide-react';
import { RoomOption } from '../../types';

export const VenueRoomSelection: React.FC = () => {
  const dispatch = useAppDispatch();
  const rooms = useAppSelector((state) => state.rooms.items);
  const quantities = useAppSelector((state) => state.rooms.quantities);
  const roomsTotal = useAppSelector(selectRoomsTotal);

  const getGraphic = (code: string) => {
    switch (code) {
      case 'auditorium-hall':
        return <RoomAuditoriumGraphic size={110} />;
      case 'conference-room':
        return <RoomConferenceGraphic size={110} />;
      case 'presentation-room':
        return <RoomPresentationGraphic size={110} />;
      case 'large-meeting-room':
        return <RoomConferenceGraphic size={110} />;
      case 'small-meeting-room':
        return <RoomPresentationGraphic size={110} />;
      default:
        return <RoomAuditoriumGraphic size={110} />;
    }
  };

  const getPastelBg = (index: number) => {
    const bgs = [
      '#EDE9FE', // soft lavender
      '#E0F2FE', // soft sky blue
      '#FFE4F2', // soft blush pink
      '#FEF9C3', // soft butter yellow
      '#DCFCE7', // soft mint
    ];
    return bgs[index % bgs.length];
  };

  return (
    <section id="venue-rooms" style={{ padding: '3.5rem 2rem 2.5rem' }}>
      <div style={{ maxWidth: 'var(--max-content-width)', margin: '0 auto' }}>
        {/* Section Header */}
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
            <Building2 size={16} /> Section 1: Venue Spaces
          </div>
          <h2 className="section-title">Venue Room Selection</h2>
          <p className="subtitle" style={{ maxWidth: '620px', margin: '0.5rem auto 0' }}>
            Choose the conference rooms required for your attendees. Increment or decrement quantities freely.
          </p>
        </div>

        {/* 5 Rooms Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {rooms.map((room: RoomOption, idx: number) => {
            const qty = quantities[room.code] || 0;
            const subtotal = room.unitPrice * qty;

            return (
              <div
                key={room.id || room.code}
                className="squishy-card"
                style={{
                  backgroundColor: '#fff',
                  border: qty > 0 ? '3px solid var(--color-cobalt)' : '2.5px solid var(--color-border-bold)',
                }}
              >
                {/* Visual Header with Pastel Background */}
                <div
                  style={{
                    backgroundColor: getPastelBg(idx),
                    padding: '1.5rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '2.5px solid var(--color-border-bold)',
                    position: 'relative',
                  }}
                >
                  {getGraphic(room.code)}
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
                    <Users size={12} /> Cap: {room.capacity}
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
                      {room.name}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.88rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.5,
                        marginBottom: '1rem',
                      }}
                    >
                      {room.description}
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
                          Unit Cost
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.45rem',
                            fontWeight: 700,
                            color: 'var(--color-cobalt)',
                          }}
                        >
                          ${room.unitPrice.toLocaleString()}
                        </span>
                      </div>

                      {/* Quantity Control */}
                      <QuantityControl
                        value={qty}
                        onIncrement={() => dispatch(incrementRoom(room.code))}
                        onDecrement={() => dispatch(decrementRoom(room.code))}
                        label={`${room.name} quantity`}
                      />
                    </div>

                    {/* Subtotal Indicator */}
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
                        Room Subtotal:
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
        <div className="section-total-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <StarFlowerIcon size={24} color="var(--color-cobalt)" />
            <span className="section-total-label">Room Selection Total:</span>
          </div>
          <span className="section-total-amount">${roomsTotal.toLocaleString()}</span>
        </div>
      </div>
    </section>
  );
};
