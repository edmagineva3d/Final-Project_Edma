import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { incrementRoom, decrementRoom } from './roomsSlice';
import { selectRoomsTotal } from '../../store/selectors';
import { QuantityControl } from '../../components/QuantityControl';
import { StarFlowerIcon } from '../../components/DecorativeAssets';
import { Users, Building2 } from 'lucide-react';
import { RoomOption } from '../../types';

export const VenueRoomSelection: React.FC = () => {
  const dispatch = useAppDispatch();
  const rooms = useAppSelector((state) => state.rooms.items);
  const quantities = useAppSelector((state) => state.rooms.quantities);
  const roomsTotal = useAppSelector(selectRoomsTotal);

  // High-resolution real photographs
  const getRoomPhoto = (code: string, fallback?: string): string => {
    if (fallback) return fallback;
    switch (code) {
      case 'auditorium-hall':
        return '/assets/images/room-auditorium.jpg';
      case 'conference-room':
        return '/assets/images/room-conference.jpg';
      case 'presentation-room':
        return '/assets/images/room-presentation.jpg';
      case 'large-meeting-room':
        return '/assets/images/room-large-meeting.jpg';
      case 'small-meeting-room':
        return '/assets/images/room-small-meeting.jpg';
      default:
        return '/assets/images/room-auditorium.jpg';
    }
  };

  const getUnsplashFallback = (code: string): string => {
    switch (code) {
      case 'auditorium-hall':
        return 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80';
      case 'conference-room':
        return 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80';
      case 'presentation-room':
        return 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80';
      case 'large-meeting-room':
        return 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80';
      case 'small-meeting-room':
        return 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80';
      default:
        return 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80';
    }
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
          {rooms.map((room: RoomOption) => {
            const qty = quantities[room.code] || 0;
            const subtotal = room.unitPrice * qty;

            return (
              <div
                key={room.id || room.code}
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
                    backgroundColor: '#EDE9FE',
                  }}
                >
                  <img
                    src={room.imageUrl || getRoomPhoto(room.code)}
                    alt={room.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = getUnsplashFallback(room.code);
                    }}
                  />

                  {/* Capacity badge */}
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
                    <Users size={13} /> Capacity: {room.capacity}
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
