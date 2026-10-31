import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  toggleMeal,
  setMealPeople,
  setDefaultAttendees,
} from './mealsSlice';
import { selectMealsTotal } from '../../store/selectors';
import { StarFlowerIcon } from '../../components/DecorativeAssets';
import { Utensils, Users, Check, AlertCircle } from 'lucide-react';
import { MealOption } from '../../types';

export const MealsSelection: React.FC = () => {
  const dispatch = useAppDispatch();
  const meals = useAppSelector((state) => state.meals.items);
  const selections = useAppSelector((state) => state.meals.selections);
  const defaultAttendees = useAppSelector((state) => state.meals.defaultAttendees);
  const mealsTotal = useAppSelector(selectMealsTotal);

  const getMealPhoto = (code: string, fallback?: string): string => {
    if (fallback) return fallback;
    switch (code) {
      case 'breakfast':
        return '/assets/images/meal-breakfast.jpg';
      case 'lunch':
        return '/assets/images/meal-lunch.jpg';
      case 'high-tea':
        return '/assets/images/meal-hightea.jpg';
      case 'dinner':
        return '/assets/images/meal-dinner.jpg';
      default:
        return '/assets/images/meal-breakfast.jpg';
    }
  };

  const getUnsplashFallback = (code: string): string => {
    switch (code) {
      case 'breakfast':
        return 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80';
      case 'lunch':
        return 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80';
      case 'high-tea':
        return 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80';
      case 'dinner':
        return 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80';
      default:
        return 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80';
    }
  };

  const handleGlobalAttendeesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      dispatch(setDefaultAttendees(val));
    } else if (e.target.value === '') {
      dispatch(setDefaultAttendees(0));
    }
  };

  const handleMealPeopleChange = (code: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      dispatch(setMealPeople({ code, numberOfPeople: val }));
    } else if (e.target.value === '') {
      dispatch(setMealPeople({ code, numberOfPeople: 0 }));
    }
  };

  return (
    <section id="catering-meals" style={{ padding: '3.5rem 2rem 2.5rem' }}>
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
            <Utensils size={16} /> Section 3: Catering &amp; Hospitality
          </div>
          <h2 className="section-title">Meals Selection</h2>
          <p className="subtitle" style={{ maxWidth: '620px', margin: '0.5rem auto 0' }}>
            Choose artisanal catering for your conference attendees. Check the meals desired and specify guest count.
          </p>
        </div>

        {/* Global Attendee Headcount Quick Setter */}
        <div
          style={{
            maxWidth: '540px',
            margin: '0 auto 2.5rem',
            backgroundColor: '#fff',
            border: '2.5px solid var(--color-cobalt)',
            borderRadius: '24px',
            padding: '1.25rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 6px 0 rgba(22, 54, 176, 0.12)',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-butter-yellow)',
                border: '2px solid var(--color-cobalt)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Users size={20} color="var(--color-cobalt)" />
            </div>
            <div>
              <label
                htmlFor="global-attendees"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: 'var(--color-cobalt)',
                  display: 'block',
                }}
              >
                Number of People:
              </label>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                Syncs guest headcount across meal courses
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              id="global-attendees"
              type="number"
              min={1}
              max={1000}
              value={defaultAttendees || ''}
              onChange={handleGlobalAttendeesChange}
              style={{
                width: '90px',
                height: '42px',
                textAlign: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.3rem',
                color: 'var(--color-cobalt)',
                backgroundColor: 'var(--color-cream-warm)',
                border: '2px solid var(--color-cobalt)',
                borderRadius: '14px',
                boxShadow: '0 2px 0 var(--color-cobalt)',
              }}
            />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--color-cobalt)' }}>
              guests
            </span>
          </div>
        </div>

        {/* 4 Meals Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {meals.map((meal: MealOption) => {
            const sel = selections[meal.code] || { selected: false, numberOfPeople: defaultAttendees };
            const subtotal = sel.selected ? meal.pricePerPerson * sel.numberOfPeople : 0;

            return (
              <div
                key={meal.id || meal.code}
                className="squishy-card"
                style={{
                  backgroundColor: '#fff',
                  border: sel.selected ? '3.5px solid var(--color-cobalt)' : '2.5px solid var(--color-border-bold)',
                  boxShadow: sel.selected ? '0 10px 0 var(--color-cobalt)' : '0 8px 0 rgba(22, 54, 176, 0.15)',
                  transform: sel.selected ? 'translateY(-2px)' : 'none',
                }}
              >
                {/* Real Photographic Header */}
                <div
                  style={{
                    height: '190px',
                    position: 'relative',
                    overflow: 'hidden',
                    borderBottom: '2.5px solid var(--color-border-bold)',
                    backgroundColor: '#FFE4F2',
                  }}
                >
                  <img
                    src={meal.imageUrl || getMealPhoto(meal.code)}
                    alt={meal.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = getUnsplashFallback(meal.code);
                    }}
                  />

                  {/* Inclusion toggle badge button */}
                  <button
                    type="button"
                    onClick={() => dispatch(toggleMeal(meal.code))}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      backgroundColor: sel.selected ? 'var(--color-cobalt)' : 'rgba(255, 255, 255, 0.95)',
                      color: sel.selected ? '#fff' : 'var(--color-cobalt)',
                      border: '2px solid var(--color-cobalt)',
                      borderRadius: '9999px',
                      padding: '4px 12px',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      boxShadow: '0 2px 0 var(--color-cobalt)',
                      transition: 'all 0.15s ease',
                      zIndex: 2,
                    }}
                  >
                    {sel.selected ? <Check size={14} /> : null}
                    <span>{sel.selected ? 'Included' : 'Include'}</span>
                  </button>
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.4rem',
                          color: 'var(--color-cobalt)',
                          marginBottom: '0.35rem',
                        }}
                      >
                        {meal.name}
                      </h3>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: '1.25rem',
                          color: 'var(--color-cobalt)',
                        }}
                      >
                        ${meal.pricePerPerson} <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>/ person</span>
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: '0.88rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.5,
                        margin: '0.5rem 0 1.25rem',
                      }}
                    >
                      {meal.description}
                    </p>
                  </div>

                  {/* Guest Input and Subtotal */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: 'var(--color-cream-warm)',
                        border: '1.5px solid rgba(22, 54, 176, 0.25)',
                        borderRadius: '16px',
                        padding: '0.5rem 0.85rem',
                        marginBottom: '1rem',
                      }}
                    >
                      <label
                        htmlFor={`people-${meal.code}`}
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.88rem',
                          fontWeight: 600,
                          color: 'var(--color-cobalt)',
                        }}
                      >
                        People for {meal.name}:
                      </label>
                      <input
                        id={`people-${meal.code}`}
                        type="number"
                        min={0}
                        max={1000}
                        value={sel.numberOfPeople}
                        onChange={(e) => handleMealPeopleChange(meal.code, e)}
                        disabled={!sel.selected}
                        style={{
                          width: '72px',
                          height: '34px',
                          textAlign: 'center',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: '1.1rem',
                          color: 'var(--color-cobalt)',
                          backgroundColor: sel.selected ? '#fff' : 'rgba(0,0,0,0.05)',
                          border: '2px solid var(--color-cobalt)',
                          borderRadius: '10px',
                          opacity: sel.selected ? 1 : 0.6,
                        }}
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
                        Meal Subtotal:
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: '1.15rem',
                          color: sel.selected && subtotal > 0 ? 'var(--color-cobalt)' : 'var(--color-text-light)',
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

        {/* Validation Warning if invalid quantities */}
        {defaultAttendees <= 0 && (
          <div
            style={{
              marginTop: '1.5rem',
              backgroundColor: '#FEE2E2',
              border: '2px solid #EF4444',
              borderRadius: '16px',
              padding: '0.75rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: '#B91C1C',
              fontFamily: 'var(--font-display)',
              fontSize: '0.95rem',
            }}
          >
            <AlertCircle size={18} />
            <span>Please enter at least 1 guest for attendees count.</span>
          </div>
        )}

        {/* Section Total Bar */}
        <div className="section-total-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <StarFlowerIcon size={24} color="var(--color-cobalt)" />
            <span className="section-total-label">Meals Selection Total:</span>
          </div>
          <span className="section-total-amount">${mealsTotal.toLocaleString()}</span>
        </div>
      </div>
    </section>
  );
};
