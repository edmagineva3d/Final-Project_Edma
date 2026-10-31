import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  clearConfirmedBooking,
  openBookingsDrawer,
} from '../features/cart/cartSlice';
import { selectConfirmedBooking } from '../store/selectors';
import { CheckeredRibbon, StarFlowerIcon } from './DecorativeAssets';
import {
  CheckCircle,
  Copy,
  Printer,
  Calendar,
  User,
  Mail,
  Phone,
  Building,
  Users,
  X,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { BookingItem } from '../types';

export const BookingConfirmationModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const booking = useAppSelector(selectConfirmedBooking);
  const [copied, setCopied] = useState(false);

  if (!booking) return null;

  const handleCopyReference = () => {
    if (booking.bookingReference) {
      navigator.clipboard.writeText(booking.bookingReference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = booking.eventDate
    ? new Date(booking.eventDate).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Scheduled Date';

  return (
    <div
      className="cart-drawer-overlay"
      style={{ justifyContent: 'center', alignItems: 'center', padding: '1.5rem' }}
      onClick={() => dispatch(clearConfirmedBooking())}
    >
      <div
        className="checkout-modal-box"
        style={{ maxWidth: '820px' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Booking Confirmation Details"
      >
        <CheckeredRibbon height={16} />

        {/* Header */}
        <div
          style={{
            padding: '1.5rem 2rem',
            backgroundColor: '#FFFDF5',
            borderBottom: '2.5px solid var(--color-border-bold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#DCFCE7',
                border: '2.5px solid #16A34A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#16A34A',
              }}
            >
              <CheckCircle size={26} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.45rem',
                    color: 'var(--color-cobalt)',
                    margin: 0,
                  }}
                >
                  Booking Confirmed!
                </h2>
                <span
                  style={{
                    backgroundColor: '#DCFCE7',
                    border: '1.5px solid #16A34A',
                    borderRadius: '9999px',
                    padding: '2px 10px',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    color: '#166534',
                    textTransform: 'uppercase',
                  }}
                >
                  {booking.status || 'Confirmed'}
                </span>
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Your reservation has been recorded in the database.
              </span>
            </div>
          </div>

          <button
            onClick={() => dispatch(clearConfirmedBooking())}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '2px solid var(--color-cobalt)',
              backgroundColor: '#fff',
              color: 'var(--color-cobalt)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            aria-label="Close confirmation modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem',
          }}
        >
          {/* Reference Banner */}
          <div
            style={{
              backgroundColor: 'var(--color-cream-warm)',
              border: '2.5px dashed var(--color-cobalt)',
              borderRadius: '16px',
              padding: '1.25rem 1.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'block',
                }}
              >
                Official Reservation Reference
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.8rem',
                  color: 'var(--color-cobalt)',
                  letterSpacing: '0.02em',
                }}
              >
                {booking.bookingReference}
              </span>
            </div>

            <button
              onClick={handleCopyReference}
              className="pill-dashed"
              style={{
                backgroundColor: '#fff',
                fontSize: '0.9rem',
                padding: '0.45rem 1rem',
              }}
            >
              <Copy size={16} />
              <span>{copied ? 'Copied ✓' : 'Copy Reference'}</span>
            </button>
          </div>

          {/* Event & Client Details Card */}
          <div
            style={{
              backgroundColor: '#fff',
              border: '2px solid var(--color-border-bold)',
              borderRadius: '16px',
              padding: '1.25rem 1.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
            }}
          >
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Conference Event
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-cobalt)', fontSize: '1.1rem' }}>
                {booking.eventName}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Scheduled Date
              </div>
              <div style={{ fontWeight: 600, color: 'var(--color-text-body)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Calendar size={15} color="var(--color-cobalt)" />
                {formattedDate}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Organizer / Host
              </div>
              <div style={{ fontWeight: 600, color: 'var(--color-text-body)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <User size={15} color="var(--color-cobalt)" />
                {booking.clientName}
                {booking.organization && ` (${booking.organization})`}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Attendees Count
              </div>
              <div style={{ fontWeight: 600, color: 'var(--color-text-body)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Users size={15} color="var(--color-cobalt)" />
                {booking.numberOfAttendees} Guests
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                color: 'var(--color-cobalt)',
                marginBottom: '0.75rem',
              }}
            >
              Itemized Conference Expenses
            </h3>

            <div
              style={{
                border: '2px solid var(--color-cobalt)',
                borderRadius: '14px',
                overflow: 'hidden',
                backgroundColor: '#fff',
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr
                    style={{
                      backgroundColor: 'var(--color-cobalt)',
                      color: '#fff',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.9rem',
                    }}
                  >
                    <th style={{ padding: '0.75rem 1rem' }}>Category</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Item Description</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Unit Cost</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Quantity</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {booking.items.map((item: BookingItem, idx: number) => (
                    <tr
                      key={item.id || idx}
                      style={{
                        borderBottom: '1px solid #E5E7EB',
                        backgroundColor: idx % 2 === 0 ? '#fff' : '#FAFAF9',
                        fontSize: '0.9rem',
                      }}
                    >
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            backgroundColor:
                              item.category === 'Room'
                                ? '#EDE9FE'
                                : item.category === 'AddOn'
                                ? '#FEF08A'
                                : '#FCE7F3',
                            color: 'var(--color-cobalt)',
                          }}
                        >
                          {item.category}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--color-cobalt)' }}>
                        {item.itemName}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                        ${item.unitCost.toLocaleString()}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                        {item.quantity}
                      </td>
                      <td
                        style={{
                          padding: '0.75rem 1rem',
                          textAlign: 'right',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          color: 'var(--color-cobalt)',
                        }}
                      >
                        ${item.subtotal.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals Summary */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '0.4rem',
              fontSize: '0.9rem',
              color: 'var(--color-text-muted)',
            }}
          >
            <div>Rooms Total: <strong>${booking.roomsTotal.toLocaleString()}</strong></div>
            <div>AV Add-ons Total: <strong>${booking.addOnsTotal.toLocaleString()}</strong></div>
            <div>Catering Meals Total: <strong>${booking.mealsTotal.toLocaleString()}</strong></div>
            <div
              style={{
                marginTop: '0.5rem',
                padding: '0.65rem 1.5rem',
                backgroundColor: 'var(--color-butter-yellow)',
                border: '2px solid var(--color-cobalt)',
                borderRadius: '14px',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.35rem',
                color: 'var(--color-cobalt)',
              }}
            >
              Grand Total: ${booking.grandTotal.toLocaleString()}
            </div>
          </div>

          {/* Special Requests if any */}
          {booking.specialRequests && (
            <div
              style={{
                backgroundColor: 'var(--color-cream-warm)',
                border: '1.5px solid rgba(22, 54, 176, 0.2)',
                borderRadius: '12px',
                padding: '0.85rem 1.25rem',
                fontSize: '0.88rem',
              }}
            >
              <span style={{ fontWeight: 700, color: 'var(--color-cobalt)', display: 'block', marginBottom: '0.2rem' }}>
                Special Technical &amp; Dietary Requests:
              </span>
              <p style={{ margin: 0, color: 'var(--color-text-body)' }}>{booking.specialRequests}</p>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div
          style={{
            padding: '1.25rem 2rem',
            backgroundColor: '#FFFDF5',
            borderTop: '2.5px solid var(--color-border-bold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <button
            onClick={() => {
              dispatch(clearConfirmedBooking());
              dispatch(openBookingsDrawer());
            }}
            className="pill-dashed"
            style={{ backgroundColor: '#fff', fontSize: '0.92rem' }}
          >
            <BookOpen size={16} />
            <span>View All Reservations</span>
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={handlePrint}
              className="btn-squishy btn-squishy-secondary"
              style={{ fontSize: '0.95rem', padding: '0.65rem 1.25rem' }}
            >
              <Printer size={16} />
              <span>Print Receipt</span>
            </button>

            <button
              onClick={() => dispatch(clearConfirmedBooking())}
              className="btn-squishy"
              style={{ fontSize: '0.95rem', padding: '0.65rem 1.5rem' }}
            >
              <span>Done</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

