import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  closeCart,
  clearCart,
  updateCartQuantity,
  removeFromCart,
  openCheckout,
} from '../features/cart/cartSlice';
import {
  selectCartItems,
  selectCartItemCount,
  selectCartRoomsTotal,
  selectCartAddOnsTotal,
  selectCartMealsTotal,
  selectCartGrandTotal,
  selectIsCartOpen,
} from '../store/selectors';
import { StarFlowerIcon, CheckeredRibbon } from './DecorativeAssets';
import {
  ShoppingCart,
  X,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';
import { CartItem } from '../types';

export const CartDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsCartOpen);
  const items = useAppSelector(selectCartItems);
  const itemCount = useAppSelector(selectCartItemCount);
  const roomsTotal = useAppSelector(selectCartRoomsTotal);
  const addOnsTotal = useAppSelector(selectCartAddOnsTotal);
  const mealsTotal = useAppSelector(selectCartMealsTotal);
  const grandTotal = useAppSelector(selectCartGrandTotal);

  if (!isOpen) return null;

  const handleProceedToCheckout = () => {
    dispatch(closeCart());
    dispatch(openCheckout());
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'Room':
        return { bg: '#EDE9FE', border: '#7C3AED', text: '#5B21B6', label: 'Venue Space' };
      case 'AddOn':
        return { bg: '#FEF08A', border: '#CA8A04', text: '#854D0E', label: 'AV Add-on' };
      case 'Meal':
        return { bg: '#FCE7F3', border: '#DB2777', text: '#9D174D', label: 'Catering Meal' };
      default:
        return { bg: '#E0E7FF', border: '#4F46E5', text: '#3730A3', label: category };
    }
  };

  return (
    <div className="cart-drawer-overlay" onClick={() => dispatch(closeCart())}>
      <div
        className="cart-drawer-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Conference Event Shopping Cart"
      >
        {/* Top Checkered Ribbon Banner */}
        <CheckeredRibbon height={14} />

        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
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
              <ShoppingCart size={20} />
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
                Event Cart
              </h2>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--color-text-muted)',
                }}
              >
                {itemCount} {itemCount === 1 ? 'item selected' : 'items selected'}
              </span>
            </div>
          </div>

          <button
            onClick={() => dispatch(closeCart())}
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
              transition: 'transform 0.15s ease',
            }}
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="cart-drawer-body">
          {items.length === 0 ? (
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
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-cream-warm)',
                  border: '2.5px dashed var(--color-cobalt)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-cobalt)',
                  marginBottom: '1.25rem',
                }}
              >
                <ShoppingBag size={38} />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.35rem',
                  color: 'var(--color-cobalt)',
                  marginBottom: '0.5rem',
                }}
              >
                Your Cart is Empty
              </h3>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--color-text-muted)',
                  maxWidth: '280px',
                  lineHeight: 1.5,
                  marginBottom: '1.5rem',
                }}
              >
                Explore our venue spaces, AV equipment, and artisanal catering, then click &ldquo;Add to Cart&rdquo;!
              </p>
              <button
                onClick={() => dispatch(closeCart())}
                className="btn-squishy"
                style={{ fontSize: '0.95rem', padding: '0.65rem 1.5rem' }}
              >
                Browse Event Spaces
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                {items.map((item: CartItem) => {
                  const badge = getCategoryBadgeColor(item.category);

                  return (
                    <div key={item.id} className="cart-item-card">
                      {/* Real Photograph Thumbnail */}
                      <img
                        src={item.imageUrl || '/assets/images/room-conference.jpg'}
                        alt={item.name}
                        className="cart-item-thumb"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=200&q=80';
                        }}
                      />

                      {/* Info & Stepper */}
                      <div className="cart-item-info">
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '0.2rem',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '0.72rem',
                              fontFamily: 'var(--font-display)',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              padding: '2px 8px',
                              borderRadius: '9999px',
                              backgroundColor: badge.bg,
                              color: badge.text,
                              border: `1px solid ${badge.border}`,
                            }}
                          >
                            {badge.label}
                          </span>

                          <button
                            onClick={() =>
                              dispatch(
                                removeFromCart({ category: item.category, code: item.code })
                              )
                            }
                            style={{
                              border: 'none',
                              background: 'transparent',
                              color: '#9CA3AF',
                              cursor: 'pointer',
                              padding: '2px',
                              borderRadius: '4px',
                              transition: 'color 0.15s ease',
                            }}
                            title={`Remove ${item.name} from cart`}
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <h4
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.05rem',
                            color: 'var(--color-cobalt)',
                            margin: '0 0 0.25rem 0',
                          }}
                        >
                          {item.name}
                        </h4>

                        <div
                          style={{
                            fontSize: '0.82rem',
                            color: 'var(--color-text-muted)',
                            marginBottom: '0.65rem',
                          }}
                        >
                          ${item.unitPrice.toLocaleString()}{' '}
                          {item.category === 'Meal' ? '/ guest' : '/ unit'}
                        </div>

                        {/* Quantity Stepper & Subtotal */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: '0.35rem',
                            borderTop: '1px dashed rgba(22, 54, 176, 0.15)',
                          }}
                        >
                          {/* Mini Stepper */}
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              backgroundColor: 'var(--color-cream-warm)',
                              border: '1.5px solid var(--color-cobalt)',
                              borderRadius: '9999px',
                              padding: '2px 4px',
                            }}
                          >
                            <button
                              onClick={() =>
                                dispatch(
                                  updateCartQuantity({
                                    category: item.category,
                                    code: item.code,
                                    quantity: item.quantity - 1,
                                  })
                                )
                              }
                              style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                border: '1px solid var(--color-cobalt)',
                                backgroundColor: 'var(--color-butter-yellow)',
                                color: 'var(--color-cobalt)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                              }}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>

                            <span
                              style={{
                                minWidth: '24px',
                                textAlign: 'center',
                                fontFamily: 'var(--font-display)',
                                fontWeight: 700,
                                fontSize: '0.9rem',
                                color: 'var(--color-cobalt)',
                              }}
                            >
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                dispatch(
                                  updateCartQuantity({
                                    category: item.category,
                                    code: item.code,
                                    quantity: item.quantity + 1,
                                  })
                                )
                              }
                              style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                border: '1px solid var(--color-cobalt)',
                                backgroundColor: 'var(--color-butter-yellow)',
                                color: 'var(--color-cobalt)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                              }}
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          {/* Line subtotal */}
                          <span
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontWeight: 700,
                              fontSize: '1.05rem',
                              color: 'var(--color-cobalt)',
                            }}
                          >
                            ${item.subtotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Clear Cart Link */}
              <div style={{ textAlign: 'right', marginTop: '0.25rem' }}>
                <button
                  onClick={() => dispatch(clearCart())}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#EF4444',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Clear Entire Cart
                </button>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer with Totals and Checkout CTA */}
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Subtotal breakdown */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
                marginBottom: '1rem',
                fontSize: '0.88rem',
                color: 'var(--color-text-muted)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Venue Rooms:</span>
                <span style={{ fontWeight: 600, color: 'var(--color-cobalt)' }}>
                  ${roomsTotal.toLocaleString()}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>AV Add-ons:</span>
                <span style={{ fontWeight: 600, color: 'var(--color-cobalt)' }}>
                  ${addOnsTotal.toLocaleString()}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Catering Meals:</span>
                <span style={{ fontWeight: 600, color: 'var(--color-cobalt)' }}>
                  ${mealsTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Grand Total */}
            <div
              style={{
                padding: '0.85rem 1.25rem',
                backgroundColor: 'var(--color-butter-yellow)',
                border: '2px solid var(--color-cobalt)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.25rem',
                boxShadow: '0 3px 0 var(--color-cobalt)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <StarFlowerIcon size={20} color="var(--color-cobalt)" />
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: 'var(--color-cobalt)',
                  }}
                >
                  Grand Total:
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.5rem',
                  color: 'var(--color-cobalt)',
                }}
              >
                ${grandTotal.toLocaleString()}
              </span>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={handleProceedToCheckout}
              className="btn-squishy"
              style={{
                width: '100%',
                padding: '0.9rem 1.5rem',
                fontSize: '1.1rem',
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

