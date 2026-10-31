import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  closeBookingsDrawer,
  fetchBookingsThunk,
  setConfirmedBooking,
} from '../features/cart/cartSlice';
import {
  selectBookingsHistory,
  selectIsBookingsDrawerOpen,
  selectCartLoading,
} from '../store/selectors';
import { CheckeredRibbon, StarFlowerIcon } from './DecorativeAssets';
import {
  CalendarCheck,
  X,
  Search,
  Calendar,
  Users,
  ChevronRight,
  BookOpen,
  Loader2,
} from 'lucide-react';
import { Booking } from '../types';

export const BookingsHistoryDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsBookingsDrawerOpen);
  const bookings = useAppSelector(selectBookingsHistory);
  const loading = useAppSelector(selectCartLoading);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchBookingsThunk());
    }
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  const filteredBookings = bookings.filter((b) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      b.bookingReference.toLowerCase().includes(term) ||
      b.eventName.toLowerCase().includes(term) ||
      b.clientName.toLowerCase().includes(term) ||
      (b.organization && b.organization.toLowerCase().includes(term))
    );
  });

  const handleSelectBooking = (booking: Booking) => {
    dispatch(closeBookingsDrawer());
    dispatch(setConfirmedBooking(booking));
  };

  return (
    <div className="cart-drawer-overlay" onClick={() => dispatch(closeBookingsDrawer())}>
      <div
        className="cart-drawer-container"
        style={{ maxWidth: '540px' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Confirmed Bookings History"
      >
        <CheckeredRibbon height={14} />

        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-pastel-pink)',
                border: '2px solid var(--color-cobalt)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-cobalt)',
              }}
            >
              <CalendarCheck size={20} />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.35rem',
                  color: 'var(--color-cobalt)',
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                Confirmed Bookings
              </h2>
              <span
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--color-text-muted)',
                }}
              >
                {bookings.length} {bookings.length === 1 ? 'reservation' : 'reservations'} saved in database
              </span>
            </div>
          </div>

          <button
            onClick={() => dispatch(closeBookingsDrawer())}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '2px solid var(--color-cobalt)',
              backgroundColor: '#FFFDF5',
              color: 'var(--color-cobalt)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            aria-label="Close bookings history drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div
          style={{
            padding: '1rem 1.75rem 0.5rem',
            backgroundColor: '#FFFDF5',
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                color: 'var(--color-cobalt)',
              }}
            />
            <input
              type="text"
              placeholder="Search by reference, event, or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.75rem 0.55rem 2.4rem',
                border: '1.5px solid var(--color-cobalt)',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontFamily: 'var(--font-body)',
                backgroundColor: '#fff',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Drawer Body */}
        <div className="cart-drawer-body">
          {loading && bookings.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem 1rem',
                color: 'var(--color-cobalt)',
              }}
            >
              <Loader2 size={32} className="spin" />
              <p style={{ marginTop: '0.75rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                Loading saved bookings...
              </p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '3rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-cream-warm)',
                  border: '2px dashed var(--color-cobalt)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-cobalt)',
                  marginBottom: '1rem',
                }}
              >
                <BookOpen size={32} />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  color: 'var(--color-cobalt)',
                  marginBottom: '0.4rem',
                }}
              >
                {searchTerm ? 'No Matching Bookings' : 'No Bookings Yet'}
              </h3>
              <p
                style={{
                  fontSize: '0.88rem',
                  color: 'var(--color-text-muted)',
                  maxWidth: '260px',
                  lineHeight: 1.4,
                }}
              >
                {searchTerm
                  ? 'Try searching for a different reference code or organizer name.'
                  : 'Add conference spaces and meals to your cart, then complete checkout to record a booking.'}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredBookings.map((b: Booking) => {
                const dateDisplay = b.eventDate
                  ? new Date(b.eventDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'Upcoming';

                return (
                  <div
                    key={b.id || b.bookingReference}
                    onClick={() => handleSelectBooking(b)}
                    className="squishy-card"
                    style={{
                      cursor: 'pointer',
                      padding: '1.25rem',
                      border: '2px solid var(--color-cobalt)',
                      backgroundColor: '#fff',
                      gap: '0.65rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          fontSize: '1.1rem',
                          color: 'var(--color-cobalt)',
                          backgroundColor: 'var(--color-cream-warm)',
                          border: '1.5px solid var(--color-cobalt)',
                          borderRadius: '8px',
                          padding: '2px 8px',
                        }}
                      >
                        {b.bookingReference}
                      </span>

                      <span
                        style={{
                          backgroundColor: '#DCFCE7',
                          color: '#166534',
                          border: '1px solid #16A34A',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {b.status || 'Confirmed'}
                      </span>
                    </div>

                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.15rem',
                        color: 'var(--color-cobalt)',
                        margin: 0,
                      }}
                    >
                      {b.eventName}
                    </h4>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        fontSize: '0.82rem',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={13} color="var(--color-cobalt)" />
                        {dateDisplay}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Users size={13} color="var(--color-cobalt)" />
                        {b.numberOfAttendees} Attendees
                      </span>
                    </div>

                    <div
                      style={{
                        fontSize: '0.82rem',
                        color: 'var(--color-text-body)',
                        fontWeight: 600,
                      }}
                    >
                      Client: {b.clientName}
                      {b.organization ? ` • ${b.organization}` : ''}
                    </div>

                    {/* Footer Row */}
                    <div
                      style={{
                        paddingTop: '0.65rem',
                        borderTop: '1px dashed rgba(22, 54, 176, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                        {b.items?.length || 0} reservation items
                      </span>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 800,
                            fontSize: '1.25rem',
                            color: 'var(--color-cobalt)',
                          }}
                        >
                          ${b.grandTotal.toLocaleString()}
                        </span>
                        <ChevronRight size={18} color="var(--color-cobalt)" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

