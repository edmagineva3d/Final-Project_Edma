import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  closeDetailsModal,
  updateClientDetails,
  setSaveSuccessMessage,
  setSaveError,
} from '../features/estimates/estimatesSlice';
import { resetRooms } from '../features/rooms/roomsSlice';
import { resetAddOns } from '../features/addons/addonsSlice';
import { resetMeals } from '../features/meals/mealsSlice';
import {
  selectSelectedItemsList,
  selectGrandTotal,
  selectRoomsTotal,
  selectAddOnsTotal,
  selectMealsTotal,
} from '../store/selectors';
import { saveCurrentEstimateThunk } from '../features/thunks';
import { CheckeredRibbon, StarFlowerIcon } from './DecorativeAssets';
import { X, CheckCircle, AlertTriangle, Save, RotateCcw, Calendar, Mail, User } from 'lucide-react';
import { EstimateItem } from '../types';

export const ShowDetailsModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.estimates.isDetailsModalOpen);
  const items = useAppSelector(selectSelectedItemsList);
  const roomsTotal = useAppSelector(selectRoomsTotal);
  const addOnsTotal = useAppSelector(selectAddOnsTotal);
  const mealsTotal = useAppSelector(selectMealsTotal);
  const grandTotal = useAppSelector(selectGrandTotal);

  const saving = useAppSelector((state) => state.estimates.saving);
  const saveError = useAppSelector((state) => state.estimates.saveError);
  const saveSuccessMessage = useAppSelector((state) => state.estimates.saveSuccessMessage);

  const clientName = useAppSelector((state) => state.estimates.clientName);
  const clientEmail = useAppSelector((state) => state.estimates.clientEmail);
  const eventName = useAppSelector((state) => state.estimates.eventName);
  const notes = useAppSelector((state) => state.estimates.notes);

  const [showHostForm, setShowHostForm] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    dispatch(setSaveError(null));
    dispatch(setSaveSuccessMessage(null));
    await dispatch(saveCurrentEstimateThunk());
  };

  const handleResetAll = () => {
    if (window.confirm('Are you sure you want to clear all selections?')) {
      dispatch(resetRooms());
      dispatch(resetAddOns());
      dispatch(resetMeals());
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(14, 36, 128, 0.45)',
        backdropFilter: 'blur(5px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) dispatch(closeDetailsModal());
      }}
    >
      <div
        className="animate-modal-in"
        style={{
          backgroundColor: '#FFFDF5',
          borderRadius: '32px',
          border: '3.5px solid var(--color-cobalt)',
          boxShadow: '0 20px 50px rgba(22, 54, 176, 0.35)',
          maxWidth: '820px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Checkered Top Ribbon */}
        <CheckeredRibbon height={16} />

        {/* Modal Header */}
        <div
          style={{
            padding: '1.5rem 2rem 1.25rem',
            borderBottom: '2.5px solid rgba(22, 54, 176, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-pastel-pink)',
                border: '2px solid var(--color-cobalt)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <StarFlowerIcon size={20} color="var(--color-cobalt)" />
            </div>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  color: 'var(--color-cobalt)',
                  lineHeight: 1.1,
                }}
              >
                Expense Details &amp; Summary
              </h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Comprehensive breakdown of selected venue, equipment, and catering items.
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => dispatch(closeDetailsModal())}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-cream-warm)',
              border: '2px solid var(--color-cobalt)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-cobalt)',
              cursor: 'pointer',
              boxShadow: '0 2px 0 var(--color-cobalt)',
            }}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div style={{ padding: '1.5rem 2rem', overflowY: 'auto', flex: 1 }}>
          {/* Feedback Banners */}
          {saveSuccessMessage && (
            <div
              style={{
                backgroundColor: '#DCFCE7',
                border: '2px solid #16A34A',
                borderRadius: '16px',
                padding: '0.85rem 1.25rem',
                color: '#15803D',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '1.25rem',
              }}
            >
              <CheckCircle size={20} />
              <span>{saveSuccessMessage}</span>
            </div>
          )}

          {saveError && (
            <div
              style={{
                backgroundColor: '#FEE2E2',
                border: '2px solid #EF4444',
                borderRadius: '16px',
                padding: '0.85rem 1.25rem',
                color: '#B91C1C',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '1.25rem',
              }}
            >
              <AlertTriangle size={20} />
              <span>{saveError}</span>
            </div>
          )}

          {/* Toggle Host / Event Details Form */}
          <div style={{ marginBottom: '1.5rem' }}>
            <button
              type="button"
              onClick={() => setShowHostForm(!showHostForm)}
              style={{
                fontSize: '0.88rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                color: 'var(--color-cobalt)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
              }}
            >
              <span>{showHostForm ? '▲ Hide Host & Event Details' : '▼ Add / Edit Host & Event Details'}</span>
            </button>

            {showHostForm && (
              <div
                style={{
                  marginTop: '0.75rem',
                  backgroundColor: '#fff',
                  border: '2px solid var(--color-cobalt)',
                  borderRadius: '20px',
                  padding: '1.2rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1rem',
                  boxShadow: '0 4px 0 rgba(22, 54, 176, 0.08)',
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: 'var(--color-cobalt)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      marginBottom: '0.3rem',
                    }}
                  >
                    <User size={14} /> Organizer / Client Name:
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => dispatch(updateClientDetails({ clientName: e.target.value }))}
                    placeholder="e.g. Jane Smith"
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.8rem',
                      borderRadius: '10px',
                      border: '1.5px solid var(--color-cobalt)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.92rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: 'var(--color-cobalt)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      marginBottom: '0.3rem',
                    }}
                  >
                    <Mail size={14} /> Organizer Email:
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => dispatch(updateClientDetails({ clientEmail: e.target.value }))}
                    placeholder="e.g. jane@company.com"
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.8rem',
                      borderRadius: '10px',
                      border: '1.5px solid var(--color-cobalt)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.92rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: 'var(--color-cobalt)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      marginBottom: '0.3rem',
                    }}
                  >
                    <Calendar size={14} /> Conference Event Title:
                  </label>
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => dispatch(updateClientDetails({ eventName: e.target.value }))}
                    placeholder="e.g. Annual Tech Symposium 2026"
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.8rem',
                      borderRadius: '10px',
                      border: '1.5px solid var(--color-cobalt)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.92rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* 4-COLUMN EXPENSE SUMMARY TABLE (Specified in Section 3.F & PDF) */}
          {items.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '3rem 1.5rem',
                backgroundColor: '#fff',
                borderRadius: '24px',
                border: '2px dashed var(--color-cobalt)',
              }}
            >
              <StarFlowerIcon size={36} color="var(--color-cobalt)" />
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  color: 'var(--color-cobalt)',
                  marginTop: '0.75rem',
                  marginBottom: '0.3rem',
                }}
              >
                No Selections Yet
              </h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', maxWidth: '360px', margin: '0 auto' }}>
                Increase room quantities, add audiovisual equipment, or choose catering meals to see your calculated
                estimate table.
              </p>
            </div>
          ) : (
            <div
              style={{
                backgroundColor: '#fff',
                borderRadius: '24px',
                border: '2.5px solid var(--color-cobalt)',
                overflow: 'hidden',
                boxShadow: '0 6px 0 rgba(22, 54, 176, 0.1)',
              }}
            >
              <div style={{ overflowX: 'auto' }}>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    textAlign: 'left',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        backgroundColor: 'var(--color-cobalt)',
                        color: '#fff',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.95rem',
                        letterSpacing: '0.02em',
                      }}
                    >
                      <th style={{ padding: '1rem 1.25rem' }}>Selection Type</th>
                      <th style={{ padding: '1rem 1rem', textAlign: 'right' }}>Unit Cost</th>
                      <th style={{ padding: '1rem 1rem', textAlign: 'center' }}>Quantity</th>
                      <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item: EstimateItem, idx: number) => {
                      const isEven = idx % 2 === 0;
                      return (
                        <tr
                          key={`${item.category}-${item.itemCode}`}
                          style={{
                            backgroundColor: isEven ? '#FFFDF5' : '#FFF9E8',
                            borderBottom: '1px solid rgba(22, 54, 176, 0.1)',
                          }}
                        >
                          <td style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: 'var(--color-cobalt)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span
                                style={{
                                  fontSize: '0.72rem',
                                  padding: '2px 6px',
                                  borderRadius: '6px',
                                  backgroundColor:
                                    item.category === 'Room'
                                      ? '#EDE9FE'
                                      : item.category === 'AddOn'
                                      ? '#FEF9C3'
                                      : '#DCFCE7',
                                  border: '1px solid var(--color-cobalt)',
                                  color: 'var(--color-cobalt)',
                                  fontWeight: 700,
                                }}
                              >
                                {item.category}
                              </span>
                              <span>{item.itemName}</span>
                            </div>
                          </td>
                          <td
                            style={{
                              padding: '0.85rem 1rem',
                              textAlign: 'right',
                              fontWeight: 600,
                              color: 'var(--color-text-dark)',
                            }}
                          >
                            ${item.unitCost.toLocaleString()}
                          </td>
                          <td
                            style={{
                              padding: '0.85rem 1rem',
                              textAlign: 'center',
                              fontFamily: 'var(--font-display)',
                              fontWeight: 700,
                              color: 'var(--color-cobalt)',
                            }}
                          >
                            {item.quantity}
                          </td>
                          <td
                            style={{
                              padding: '0.85rem 1.25rem',
                              textAlign: 'right',
                              fontFamily: 'var(--font-display)',
                              fontWeight: 700,
                              fontSize: '1.05rem',
                              color: 'var(--color-cobalt)',
                            }}
                          >
                            ${item.subtotal.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    {/* Category Subtotal Summaries */}
                    <tr style={{ backgroundColor: '#FAF5FF', borderTop: '2px solid var(--color-cobalt)' }}>
                      <td colSpan={3} style={{ padding: '0.65rem 1.25rem', fontWeight: 700, color: 'var(--color-cobalt)' }}>
                        Rooms Selection Subtotal:
                      </td>
                      <td style={{ padding: '0.65rem 1.25rem', textAlign: 'right', fontWeight: 700, color: 'var(--color-cobalt)' }}>
                        ${roomsTotal.toLocaleString()}
                      </td>
                    </tr>
                    <tr style={{ backgroundColor: '#FAF5FF' }}>
                      <td colSpan={3} style={{ padding: '0.65rem 1.25rem', fontWeight: 700, color: 'var(--color-cobalt)' }}>
                        AV Add-ons Subtotal:
                      </td>
                      <td style={{ padding: '0.65rem 1.25rem', textAlign: 'right', fontWeight: 700, color: 'var(--color-cobalt)' }}>
                        ${addOnsTotal.toLocaleString()}
                      </td>
                    </tr>
                    <tr style={{ backgroundColor: '#FAF5FF' }}>
                      <td colSpan={3} style={{ padding: '0.65rem 1.25rem', fontWeight: 700, color: 'var(--color-cobalt)' }}>
                        Catering Meals Subtotal:
                      </td>
                      <td style={{ padding: '0.65rem 1.25rem', textAlign: 'right', fontWeight: 700, color: 'var(--color-cobalt)' }}>
                        ${mealsTotal.toLocaleString()}
                      </td>
                    </tr>

                    {/* GRAND TOTAL ROW */}
                    <tr
                      style={{
                        backgroundColor: 'var(--color-butter-yellow)',
                        borderTop: '3px solid var(--color-cobalt)',
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      <td
                        colSpan={3}
                        style={{
                          padding: '1rem 1.25rem',
                          fontWeight: 800,
                          fontSize: '1.2rem',
                          color: 'var(--color-cobalt)',
                          textTransform: 'uppercase',
                        }}
                      >
                        Grand Total:
                      </td>
                      <td
                        style={{
                          padding: '1rem 1.25rem',
                          textAlign: 'right',
                          fontWeight: 800,
                          fontSize: '1.6rem',
                          color: 'var(--color-cobalt)',
                        }}
                      >
                        ${grandTotal.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div
          style={{
            padding: '1.25rem 2rem',
            borderTop: '2.5px solid rgba(22, 54, 176, 0.15)',
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <button
            type="button"
            onClick={handleResetAll}
            className="pill-dashed"
            style={{ backgroundColor: '#FEE2E2', borderColor: '#DC2626', color: '#DC2626' }}
            disabled={items.length === 0}
          >
            <RotateCcw size={16} />
            <span>Reset Selections</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={() => dispatch(closeDetailsModal())}
              className="pill-dashed"
              style={{ backgroundColor: 'var(--color-cream-warm)' }}
            >
              Close
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={items.length === 0 || saving}
              className="btn-squishy"
              style={{ padding: '0.65rem 1.5rem', fontSize: '1rem' }}
            >
              <Save size={18} />
              <span>{saving ? 'Saving to Database...' : 'Save Estimate to DB'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
