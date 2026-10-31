import React from 'react';
import {
  StarFlowerIcon,
  WavyScallopDivider,
  CheckeredRibbon,
} from './DecorativeAssets';
import { ArrowDown, Calendar, Users, Sparkles, Building2, Sliders, Utensils } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <section id="hero" style={{ width: '100%' }}>
      {/* Top Hero Container (Recreating the "Hi! We're Dollop!" ceramic card composition with real venue photography) */}
      <div
        style={{
          maxWidth: 'var(--max-content-width)',
          margin: '0 auto',
          padding: '2.5rem 2rem 3rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center',
        }}
      >
        {/* Left Card: Company Introduction */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                color: 'var(--color-cobalt)',
                fontSize: '1rem',
                backgroundColor: 'var(--color-pastel-pink)',
                padding: '0.35rem 1rem',
                borderRadius: '9999px',
                border: '1.5px solid var(--color-cobalt)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <Sparkles size={16} /> Welcome to Gather &amp; Co.
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              color: 'var(--color-cobalt)',
              lineHeight: 1.15,
            }}
          >
            Hi! We&apos;re Gather &amp; Co.!
          </h1>

          <div
            style={{
              fontSize: '1.05rem',
              color: 'var(--color-text-dark)',
              lineHeight: 1.7,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.9rem',
            }}
          >
            <p>
              Gather &amp; Co. was founded because traditional conference planning is cold, fragmented, and full of hidden fees.
              We curate premier convention centers, high-clarity audiovisual tech, and farm-fresh hospitality into one seamless, transparent experience.
            </p>
            <p>
              From intimate 5-person executive retreats to 200-seat plenary conventions, our live estimation engine calculates every
              item authoritatively and saves your custom quotes directly to our secure database.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={onGetStarted} className="pill-dashed">
              <span>EXPLORE VENUE</span>
              <StarFlowerIcon size={16} color="var(--color-cobalt)" />
            </button>
            <button
              onClick={onGetStarted}
              className="btn-squishy"
              style={{ padding: '0.65rem 1.6rem', fontSize: '1.05rem' }}
            >
              <span>Get Started</span>
              <ArrowDown size={18} />
            </button>
          </div>
        </div>

        {/* Right Card: High-Resolution Real Photograph of Conference Venue */}
        <div
          style={{
            position: 'relative',
            borderRadius: '28px',
            overflow: 'hidden',
            border: '3.5px solid var(--color-cobalt)',
            boxShadow: '0 12px 0 rgba(22, 54, 176, 0.15)',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            backgroundColor: '#0E2480',
          }}
        >
          {/* Background Real Photo with Subtle Dark Gradient */}
          <img
            src="/assets/images/hero-venue.jpg"
            alt="Premier Convention Center Hall"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
            }}
            onError={(e) => {
              // Fallback to Unsplash CDN if local path is not resolved
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80';
            }}
          />

          {/* Top Decorative Floating Badges */}
          <div
            style={{
              position: 'absolute',
              top: '18px',
              right: '18px',
              backgroundColor: 'var(--color-butter-yellow)',
              border: '2px solid var(--color-cobalt)',
              borderRadius: '9999px',
              padding: '0.4rem 0.9rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.85rem',
              color: 'var(--color-cobalt)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 3px 0 var(--color-cobalt)',
              zIndex: 2,
            }}
          >
            <Calendar size={14} /> 2026 Season Open
          </div>

          <div
            style={{
              position: 'absolute',
              top: '18px',
              left: '18px',
              backgroundColor: '#fff',
              border: '2px solid var(--color-cobalt)',
              borderRadius: '9999px',
              padding: '0.4rem 0.9rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.85rem',
              color: 'var(--color-cobalt)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 3px 0 var(--color-cobalt)',
              zIndex: 2,
            }}
          >
            <Users size={14} /> Capacity: 5 to 200+
          </div>

          {/* Bottom Card Caption with Frost Glass Effect */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              padding: '1.5rem',
              background: 'linear-gradient(to top, rgba(14, 36, 128, 0.92) 0%, rgba(14, 36, 128, 0.6) 70%, transparent 100%)',
              color: '#fff',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.45rem',
                color: 'var(--color-butter-yellow)',
                marginBottom: '0.4rem',
              }}
            >
              Crafted for Memorable Gatherings
            </h3>
            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--color-sky-blue)',
                lineHeight: 1.45,
                margin: 0,
              }}
            >
              Architectural auditoriums, ergonomic boardrooms, 4K laser projection, and farm-fresh hospitality catering.
            </p>
          </div>
        </div>
      </div>

      {/* Wavy Scallop Divider Marquee */}
      <WavyScallopDivider text="✦ SEAMLESS EVENTS ✦ CRAFTED WITH CARE ✦ REAL VENUES & HOSPITALITY ✦ GATHER & CO ✦ LIVE BUDGETING ✦" />

      {/* Cobalt Blue Highlight Section (Recreating "Find your new fav" with 3 Real Photography Cards) */}
      <div
        style={{
          backgroundColor: 'var(--color-cobalt)',
          padding: '4rem 2rem 5rem',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 'var(--max-content-width)', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              color: 'var(--color-butter-yellow)',
              marginBottom: '0.75rem',
            }}
          >
            Find your event balance
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.15rem',
              color: 'var(--color-pastel-pink)',
              maxWidth: '620px',
              margin: '0 auto 3rem',
            }}
          >
            Select what you need, leave what you don’t. Our vertical slice calculation engine computes every subtotal dynamically.
          </p>

          {/* 3 Categories Preview Cards with Real Photos */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem',
            }}
          >
            {/* Card 1: Venue Rooms */}
            <div
              onClick={onGetStarted}
              style={{
                backgroundColor: '#fff',
                borderRadius: '28px',
                border: '3px solid var(--color-butter-yellow)',
                boxShadow: '0 8px 0 rgba(0, 0, 0, 0.2)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src="/assets/images/room-auditorium.jpg"
                  alt="Venue Rooms"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'var(--color-butter-yellow)',
                    color: 'var(--color-cobalt)',
                    border: '1.5px solid var(--color-cobalt)',
                    borderRadius: '9999px',
                    padding: '2px 10px',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                  }}
                >
                  5 Venue Types
                </span>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-cobalt)', marginBottom: '0.3rem' }}>
                  <Building2 size={18} />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: 'var(--color-cobalt)', margin: 0 }}>
                    Venue Rooms
                  </h3>
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                  Auditoriums, presentation rooms, and executive meeting suites for 5 to 200 participants.
                </p>
              </div>
            </div>

            {/* Card 2: AV Add-ons */}
            <div
              onClick={onGetStarted}
              style={{
                backgroundColor: '#fff',
                borderRadius: '28px',
                border: '3px solid var(--color-pastel-pink)',
                boxShadow: '0 8px 0 rgba(0, 0, 0, 0.2)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src="/assets/images/addon-speakers.jpg"
                  alt="AV Equipment Add-ons"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'var(--color-pastel-pink)',
                    color: 'var(--color-cobalt)',
                    border: '1.5px solid var(--color-cobalt)',
                    borderRadius: '9999px',
                    padding: '2px 10px',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                  }}
                >
                  Pro Equipment
                </span>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-cobalt)', marginBottom: '0.3rem' }}>
                  <Sliders size={18} />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: 'var(--color-cobalt)', margin: 0 }}>
                    AV Equipment
                  </h3>
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                  Wireless microphones, PA sound, 4K projection, magnetic whiteboards, and custom signage.
                </p>
              </div>
            </div>

            {/* Card 3: Catering Meals */}
            <div
              onClick={onGetStarted}
              style={{
                backgroundColor: '#fff',
                borderRadius: '28px',
                border: '3px solid var(--color-sky-blue)',
                boxShadow: '0 8px 0 rgba(0, 0, 0, 0.2)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src="/assets/images/meal-breakfast.jpg"
                  alt="Artisanal Catering Meals"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'var(--color-sky-blue)',
                    color: 'var(--color-cobalt)',
                    border: '1.5px solid var(--color-cobalt)',
                    borderRadius: '9999px',
                    padding: '2px 10px',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                  }}
                >
                  Chef Catering
                </span>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-cobalt)', marginBottom: '0.3rem' }}>
                  <Utensils size={18} />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: 'var(--color-cobalt)', margin: 0 }}>
                    Artisan Catering
                  </h3>
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                  Breakfast pastries, hot deli buffet lunch, high tea service, and plated 3-course dinner.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onGetStarted}
            className="btn-squishy btn-squishy-secondary"
            style={{ fontSize: '1.2rem', padding: '0.95rem 2.4rem' }}
          >
            <span>Start Planning Your Event</span>
            <ArrowDown size={20} />
          </button>
        </div>
      </div>

      {/* Checkered Bottom Ribbon */}
      <CheckeredRibbon height={16} />
    </section>
  );
};
