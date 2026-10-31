import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  closeCheckout,
  createBookingThunk,
  openCart,
} from '../features/cart/cartSlice';
import {
  selectCartItems,
  selectCartGrandTotal,
  selectIsCheckoutOpen,
  selectCartLoading,
  selectCartError,
  selectCartRoomsTotal,
  selectCartAddOnsTotal,
  selectCartMealsTotal,
} from '../store/selectors';
import { CheckeredRibbon, StarFlowerIcon } from './DecorativeAssets';
import {
  X,
  CheckCircle,
  Calendar,
  User,
  Mail,
  Phone,
  Briefcase,
  FileText,
  AlertCircle,
  ArrowLeft,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import { CreateBookingPayload } from '../types';

export const CheckoutModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsCheckoutOpen);
  const items = useAppSelector(selectCartItems);
  const grandTotal = useAppSelector(selectCartGrandTotal);
  const roomsTotal = useAppSelector(selectCartRoomsTotal);
  const addOnsTotal = useAppSelector(selectCartAddOnsTotal);
  const mealsTotal = useAppSelector(selectCartMealsTotal);
  const loading = useAppSelector(selectCartLoading);
  const serverError = useAppSelector(selectCartError);

  // Form State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [eventName, setEventName] = useState('GatherCo Leadership Gathering 2026');
  const [eventDate, setEventDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  });
  const [attendees, setAttendees] = useState(35);
  const [specialRequests, setSpecialRequests] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!clientName.trim()) errs.clientName = 'Client / Organizer name is required.';
    if (!clientEmail.trim()) {
      errs.clientEmail = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(clientEmail)) {
      errs.clientEmail = 'Please provide a valid email format (e.g. name@company.com).';
    }
    if (!eventName.trim()) errs.eventName = 'Event name or conference title is required.';
    if (attendees <= 0) errs.attendees = 'Number of attendees must be at least 1.';
    if (items.length === 0) errs.items = 'Your shopping cart is empty.';

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload: CreateBookingPayload = {
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim() || undefined,
      organization: organization.trim() || undefined,
      eventName: eventName.trim(),
      eventDate: eventDate ? new Date(eventDate).toISOString() : undefined,
      numberOfAttendees: attendees,
      specialRequests: specialRequests.trim() || undefined,
      items: items.map((i) => ({
        category: i.category,
        itemCode: i.code,
        quantity: i.quantity,
        numberOfPeople: i.category === 'Meal' ? i.quantity : undefined,
      })),
    };

    dispatch(createBookingThunk(payload));
  };

  return (
    <div
      className="cart-drawer-overlay"
      style={{ justifyContent: 'center', alignItems: 'center', padding: '1.5rem' }}
      onClick={() => dispatch(closeCheckout())}
    >
      <div
        className="checkout-modal-box"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Checkout and Booking Confirmation"
      >
        <CheckeredRibbon height={16} />

        {/* Modal Header */}
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
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-pastel-pink)',
                border: '2px solid var(--color-cobalt)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-cobalt)',
              }}
            >
              <Calendar size={22} />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.45rem',
                  color: 'var(--color-cobalt)',
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                Checkout &amp; Booking Confirmation
              </h2>
              <span
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-text-muted)',
                }}
              >
                Review reservation details and confirm conference booking
              </span>
            </div>
          </div>

          <button
            onClick={() => dispatch(closeCheckout())}
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
            aria-label="Close checkout modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body: Split 2 Columns */}
        <form
          onSubmit={handleConfirmBooking}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem',
          }}
        >
          {/* Server Error Alert */}
          {(serverError || formErrors.items) && (
            <div
              style={{
                backgroundColor: '#FEE2E2',
                border: '2px solid #EF4444',
                borderRadius: '12px',
                padding: '0.9rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: '#991B1B',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
              }}
            >
              <AlertCircle size={20} color="#EF4444" />
              <span>{serverError || formErrors.items}</span>
            </div>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}
          >
            {/* Left Column: Host Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: 'var(--color-cobalt)',
                  borderBottom: '2px dashed rgba(22, 54, 176, 0.2)',
                  paddingBottom: '0.4rem',
                }}
              >
                <User size={18} /> Host &amp; Organization Details
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    color: 'var(--color-cobalt)',
                    marginBottom: '0.3rem',
                  }}
                >
                  Client / Organizer Name *
                </label>
                <input
                  type="text"
                  className="checkout-input-field"
                  placeholder="e.g. Jane Doe"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
                {formErrors.clientName && (
                  <span style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.2rem', display: 'block' }}>
                    {formErrors.clientName}
                  </span>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '0.88rem',
                      color: 'var(--color-cobalt)',
                      marginBottom: '0.3rem',
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="checkout-input-field"
                    placeholder="organizer@company.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                  />
                  {formErrors.clientEmail && (
                    <span style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.2rem', display: 'block' }}>
                      {formErrors.clientEmail}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '0.88rem',
                      color: 'var(--color-cobalt)',
                      marginBottom: '0.3rem',
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="checkout-input-field"
                    placeholder="+1 (555) 000-0000"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    color: 'var(--color-cobalt)',
                    marginBottom: '0.3rem',
                  }}
                >
                  Organization / Company
                </label>
                <input
                  type="text"
                  className="checkout-input-field"
                  placeholder="e.g. Lumina Global Media"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    color: 'var(--color-cobalt)',
                    marginBottom: '0.3rem',
                  }}
                >
                  Conference Event Title *
                </label>
                <input
                  type="text"
                  className="checkout-input-field"
                  placeholder="e.g. Annual Technology Summit"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
                {formErrors.eventName && (
                  <span style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.2rem', display: 'block' }}>
                    {formErrors.eventName}
                  </span>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '0.88rem',
                      color: 'var(--color-cobalt)',
                      marginBottom: '0.3rem',
                    }}
                  >
                    Event Date
                  </label>
                  <input
                    type="date"
                    className="checkout-input-field"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '0.88rem',
                      color: 'var(--color-cobalt)',
                      marginBottom: '0.3rem',
                    }}
                  >
                    Attendees Count *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={2000}
                    className="checkout-input-field"
                    value={attendees}
                    onChange={(e) => setAttendees(parseInt(e.target.value, 10) || 1)}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    color: 'var(--color-cobalt)',
                    marginBottom: '0.3rem',
                  }}
                >
                  Special Requests / AV &amp; Dietary Notes
                </label>
                <textarea
                  className="checkout-input-field"
                  rows={2}
                  placeholder="e.g. Gluten-free meals, wireless slide clicker, specific room layout..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                />
              </div>
            </div>

            {/* Right Column: Order Summary Review */}
            <div
              style={{
                backgroundColor: '#fff',
                border: '2.5px solid var(--color-cobalt)',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 6px 0 var(--color-cobalt)',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                    borderBottom: '2px dashed rgba(22, 54, 176, 0.2)',
                    paddingBottom: '0.5rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      color: 'var(--color-cobalt)',
                    }}
                  >
                    Cart Summary ({items.length} items)
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(closeCheckout());
                      dispatch(openCart());
                    }}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--color-cobalt)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                    }}
                  >
                    <ArrowLeft size={14} /> Edit Cart
                  </button>
                </div>

                {/* Items Mini List */}
                <div
                  style={{
                    maxHeight: '220px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  {items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.88rem',
                        gap: '0.5rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <img
                          src={item.imageUrl || '/assets/images/room-conference.jpg'}
                          alt={item.name}
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            objectFit: 'cover',
                            border: '1px solid var(--color-cobalt)',
                          }}
                        />
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--color-cobalt)' }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                            Qty: {item.quantity} × ${item.unitPrice.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          color: 'var(--color-cobalt)',
                        }}
                      >
                        ${item.subtotal.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cost Breakdown */}
                <div
                  style={{
                    paddingTop: '0.75rem',
                    borderTop: '1.5px dashed rgba(22, 54, 176, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                    fontSize: '0.85rem',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Rooms Subtotal:</span>
                    <span style={{ fontWeight: 600, color: 'var(--color-cobalt)' }}>
                      ${roomsTotal.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>AV Add-ons Subtotal:</span>
                    <span style={{ fontWeight: 600, color: 'var(--color-cobalt)' }}>
                      ${addOnsTotal.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Catering Subtotal:</span>
                    <span style={{ fontWeight: 600, color: 'var(--color-cobalt)' }}>
                      ${mealsTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Total & Guarantee Notice */}
              <div style={{ marginTop: '1.25rem' }}>
                <div
                  style={{
                    padding: '0.85rem 1rem',
                    backgroundColor: 'var(--color-butter-yellow)',
                    border: '2px solid var(--color-cobalt)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      color: 'var(--color-cobalt)',
                    }}
                  >
                    Grand Total:
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '1.45rem',
                      color: 'var(--color-cobalt)',
                    }}
                  >
                    ${grandTotal.toLocaleString()}
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    backgroundColor: 'var(--color-cream-warm)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '10px',
                    fontSize: '0.78rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.4,
                  }}
                >
                  <ShieldCheck size={16} color="var(--color-cobalt)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>
                    No credit card charge required today. Submitting confirms your reservation in our database.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div
            style={{
              paddingTop: '1rem',
              borderTop: '2.5px solid var(--color-border-bold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '1rem',
            }}
          >
            <button
              type="button"
              onClick={() => dispatch(closeCheckout())}
              className="pill-dashed"
              style={{ backgroundColor: '#fff', fontSize: '0.95rem' }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || items.length === 0}
              className="btn-squishy"
              style={{
                fontSize: '1.05rem',
                padding: '0.75rem 1.8rem',
                opacity: loading || items.length === 0 ? 0.6 : 1,
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="spin" />
                  <span>Confirming Reservation...</span>
                </>
              ) : (
                <>
                  <CheckCircle size={18} />
                  <span>Confirm Conference Booking</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

