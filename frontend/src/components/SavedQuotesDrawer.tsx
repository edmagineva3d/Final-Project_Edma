import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setSavedQuotesOpen } from '../features/estimates/estimatesSlice';
import { loadSavedEstimatesThunk } from '../features/thunks';
import { CheckeredRibbon, StarFlowerIcon } from './DecorativeAssets';
import { X, RefreshCw, Bookmark, Calendar, ArrowRight } from 'lucide-react';
import { ExpenseEstimate } from '../types';

export const SavedQuotesDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.estimates.isSavedQuotesOpen);
  const savedEstimates = useAppSelector((state) => state.estimates.savedEstimates);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(14, 36, 128, 0.45)',
        backdropFilter: 'blur(4px)',
        zIndex: 10000,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) dispatch(setSavedQuotesOpen(false));
      }}
    >
      <div
        className="animate-modal-in"
        style={{
          width: '100%',
          maxWidth: '520px',
          height: '100%',
          backgroundColor: '#FFFDF5',
          boxShadow: '-10px 0 30px rgba(22, 54, 176, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '3.5px solid var(--color-cobalt)',
        }}
      >
        <CheckeredRibbon height={16} />

        {/* Drawer Header */}
        <div
          style={{
            padding: '1.5rem',
            borderBottom: '2px solid rgba(22, 54, 176, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-butter-yellow)',
                border: '2px solid var(--color-cobalt)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Bookmark size={18} color="var(--color-cobalt)" />
            </div>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  color: 'var(--color-cobalt)',
                  lineHeight: 1.1,
                }}
              >
                Saved Estimates
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                Persistent records from the backend database.
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => dispatch(loadSavedEstimatesThunk())}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                border: '1.5px solid var(--color-cobalt)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--color-cream-warm)',
                color: 'var(--color-cobalt)',
                cursor: 'pointer',
              }}
              title="Refresh from server"
            >
              <RefreshCw size={15} />
            </button>
            <button
              type="button"
              onClick={() => dispatch(setSavedQuotesOpen(false))}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                border: '1.5px solid var(--color-cobalt)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--color-cream-warm)',
                color: 'var(--color-cobalt)',
                cursor: 'pointer',
              }}
              aria-label="Close drawer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div style={{ padding: '1.25rem', overflowY: 'auto', flex: 1 }}>
          {savedEstimates.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '3rem 1.5rem',
                backgroundColor: '#fff',
                borderRadius: '24px',
                border: '2px dashed var(--color-cobalt)',
              }}
            >
              <StarFlowerIcon size={32} color="var(--color-cobalt)" />
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.2rem',
                  color: 'var(--color-cobalt)',
                  marginTop: '0.6rem',
                }}
              >
                No Saved Estimates Yet
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginTop: '0.3rem' }}>
                Open &apos;Show Details&apos; and click &apos;Save Estimate to DB&apos; to persist your customized quote.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {savedEstimates.map((est: ExpenseEstimate) => {
                const dateStr = est.createdAt ? new Date(est.createdAt).toLocaleDateString() : 'Recent';
                return (
                  <div
                    key={est.id || Math.random()}
                    className="squishy-card"
                    style={{
                      padding: '1.25rem',
                      border: '2px solid var(--color-cobalt)',
                      boxShadow: '0 4px 0 rgba(22, 54, 176, 0.1)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            backgroundColor: 'var(--color-pastel-pink)',
                            border: '1px solid var(--color-cobalt)',
                            color: 'var(--color-cobalt)',
                          }}
                        >
                          #{est.id?.slice(0, 8)}
                        </span>
                        <h4
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.15rem',
                            color: 'var(--color-cobalt)',
                            marginTop: '0.4rem',
                          }}
                        >
                          {est.eventName}
                        </h4>
                      </div>

                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          fontSize: '1.35rem',
                          color: 'var(--color-cobalt)',
                        }}
                      >
                        ${est.grandTotal.toLocaleString()}
                      </span>
                    </div>

                    <div
                      style={{
                        fontSize: '0.82rem',
                        color: 'var(--color-text-muted)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem',
                        marginBottom: '0.8rem',
                      }}
                    >
                      <div>Host: <strong style={{ color: 'var(--color-text-dark)' }}>{est.clientName}</strong> ({est.clientEmail})</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Calendar size={13} /> {dateStr} ✦ Attendees: {est.numberOfAttendees}
                      </div>
                    </div>

                    {/* Breakdown Pill Badges */}
                    <div
                      style={{
                        display: 'flex',
                        gap: '0.4rem',
                        flexWrap: 'wrap',
                        paddingTop: '0.6rem',
                        borderTop: '1px dashed rgba(22, 54, 176, 0.2)',
                        fontSize: '0.78rem',
                      }}
                    >
                      <span
                        style={{
                          padding: '2px 8px',
                          borderRadius: '6px',
                          backgroundColor: '#EDE9FE',
                          color: 'var(--color-cobalt)',
                          fontWeight: 600,
                        }}
                      >
                        Rooms: ${est.roomsTotal.toLocaleString()}
                      </span>
                      <span
                        style={{
                          padding: '2px 8px',
                          borderRadius: '6px',
                          backgroundColor: '#FEF9C3',
                          color: 'var(--color-cobalt)',
                          fontWeight: 600,
                        }}
                      >
                        Add-ons: ${est.addOnsTotal.toLocaleString()}
                      </span>
                      <span
                        style={{
                          padding: '2px 8px',
                          borderRadius: '6px',
                          backgroundColor: '#DCFCE7',
                          color: 'var(--color-cobalt)',
                          fontWeight: 600,
                        }}
                      >
                        Meals: ${est.mealsTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div
          style={{
            padding: '1.2rem',
            borderTop: '2px solid rgba(22, 54, 176, 0.15)',
            backgroundColor: '#fff',
            textAlign: 'center',
          }}
        >
          <button
            type="button"
            onClick={() => dispatch(setSavedQuotesOpen(false))}
            className="btn-squishy"
            style={{ width: '100%', fontSize: '1rem', padding: '0.65rem 1rem' }}
          >
            <span>Continue Planning</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

