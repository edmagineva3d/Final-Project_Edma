import React from 'react';
import {
  StarFlowerIcon,
  WavyScallopDivider,
  CheckeredRibbon,
  RoomAuditoriumGraphic,
  SpeakerGraphic,
  BreakfastGraphic,
} from './DecorativeAssets';
import { ArrowDown, Calendar, Users, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <section id="hero" style={{ width: '100%' }}>
      {/* Top Hero Container (Recreating the "Hi! We're Dollop!" ceramic card composition) */}
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
              <Sparkles size={16} /> Welcome to Gather & Co.
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
              Gather &amp; Co. started because most conference booking tools are cold, tedious, and rigid.
              We believe great events deserve inspiring spaces, crystal-clear AV technology, and delightful culinary catering.
            </p>
            <p>
              Whether you are hosting an intimate 5-person executive retreat or a 200-seat keynote summit,
              our interactive planner calculates your exact budget with transparent live pricing and instant quote persistence.
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

        {/* Right Card: Conference Visual Collage with Rounded Frame */}
        <div
          style={{
            position: 'relative',
            borderRadius: '28px',
            overflow: 'hidden',
            border: '3px solid var(--color-cobalt)',
            boxShadow: '0 12px 0 rgba(22, 54, 176, 0.15)',
            background: 'linear-gradient(135deg, #FFE4F2 0%, #EDE9FE 50%, #E0F2FE 100%)',
            minHeight: '380px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          {/* Decorative badges */}
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
            }}
          >
            <Calendar size={14} /> 2026 Season Open
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '18px',
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
            }}
          >
            <Users size={14} /> Capacity: 5 to 200+
          </div>

          {/* Central graphic */}
          <div className="animate-float" style={{ marginBottom: '1rem' }}>
            <RoomAuditoriumGraphic size={160} />
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.45rem',
              color: 'var(--color-cobalt)',
              marginBottom: '0.4rem',
            }}
          >
            Crafted for Unforgettable Gatherings
          </h3>
          <p
            style={{
              fontSize: '0.95rem',
              color: 'var(--color-text-muted)',
              maxWidth: '320px',
            }}
          >
            Auditoriums, breakout suites, 4K audiovisuals, and farm-fresh artisanal catering in one joyful experience.
          </p>
        </div>
      </div>

      {/* Wavy Scallop Divider Marquee */}
      <WavyScallopDivider text="✦ SEAMLESS EVENTS ✦ CRAFTED WITH CARE ✦ MEMORABLE GATHERINGS ✦ GATHER & CO ✦ LIVE BUDGETING ✦" />

      {/* Cobalt Blue Highlight Section (Recreating "Find your new fav" with 3 squishy items) */}
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
              maxWidth: '600px',
              margin: '0 auto 3rem',
            }}
          >
            Select what you need, leave what you don’t. Our vertical slice calculation engine computes every subtotal dynamically.
          </p>

          {/* 3 Categories Preview Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem',
            }}
          >
            {/* Card 1: Venue Rooms */}
            <div
              onClick={onGetStarted}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '2px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '28px',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ height: '140px', display: 'flex', alignItems: 'center' }}>
                <RoomAuditoriumGraphic size={130} />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  color: '#fff',
                  marginTop: '1rem',
                  marginBottom: '0.4rem',
                }}
              >
                Venue Rooms
              </h3>
              <p style={{ color: 'var(--color-sky-blue)', fontSize: '0.92rem' }}>
                5 verified room sizes from 5 to 200 seats
              </p>
            </div>

            {/* Card 2: AV Add-ons */}
            <div
              onClick={onGetStarted}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '2px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '28px',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ height: '140px', display: 'flex', alignItems: 'center' }}>
                <SpeakerGraphic size={130} />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  color: '#fff',
                  marginTop: '1rem',
                  marginBottom: '0.4rem',
                }}
              >
                AV Equipment
              </h3>
              <p style={{ color: 'var(--color-pastel-pink)', fontSize: '0.92rem' }}>
                Microphones, speakers, projectors &amp; boards
              </p>
            </div>

            {/* Card 3: Catering Meals */}
            <div
              onClick={onGetStarted}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '2px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '28px',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ height: '140px', display: 'flex', alignItems: 'center' }}>
                <BreakfastGraphic size={130} />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  color: '#fff',
                  marginTop: '1rem',
                  marginBottom: '0.4rem',
                }}
              >
                Artisan Catering
              </h3>
              <p style={{ color: 'var(--color-butter-yellow)', fontSize: '0.92rem' }}>
                Breakfast, lunch, high tea &amp; 3-course dinner
              </p>
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
