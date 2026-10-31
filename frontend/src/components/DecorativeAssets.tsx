import React from 'react';

export const StarFlowerIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 20,
  color = 'currentColor',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path
      d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z"
      fill={color}
    />
    <circle cx="12" cy="10" r="1.5" fill="#FFF" />
  </svg>
);

export const CheckeredRibbon: React.FC<{ height?: number; className?: string }> = ({
  height = 20,
  className = '',
}) => (
  <div
    className={`checkered-ribbon ${className}`}
    style={{ height: `${height}px` }}
    role="presentation"
  />
);

export const WavyScallopDivider: React.FC<{ text?: string }> = ({
  text = 'GOOD THINGS, IN CRAFT ✦ MEMORABLE CONFERENCES ✦ GATHER & CO ✦ SEAMLESS PLANNING ✦',
}) => {
  return (
    <div className="wavy-marquee-wrapper">
      <div className="wavy-marquee-track animate-marquee">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
};

// Squishy 3D / Clay Graphic SVGs for Room, AddOn, and Meal items
export const RoomAuditoriumGraphic: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
    <rect x="20" y="30" width="120" height="100" rx="24" fill="#DDD6FE" stroke="#1636B0" strokeWidth="4" />
    <path d="M40 90C60 70 100 70 120 90" stroke="#1636B0" strokeWidth="6" strokeLinecap="round" />
    <rect x="55" y="100" width="50" height="20" rx="8" fill="#FEF08A" stroke="#1636B0" strokeWidth="3" />
    <circle cx="80" cy="55" r="12" fill="#F8B4D9" stroke="#1636B0" strokeWidth="3" />
  </svg>
);

export const RoomConferenceGraphic: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
    <rect x="25" y="35" width="110" height="90" rx="24" fill="#BAE6FD" stroke="#1636B0" strokeWidth="4" />
    <ellipse cx="80" cy="80" rx="36" ry="20" fill="#FEF08A" stroke="#1636B0" strokeWidth="3" />
    <circle cx="45" cy="80" r="7" fill="#F8B4D9" stroke="#1636B0" strokeWidth="3" />
    <circle cx="115" cy="80" r="7" fill="#F8B4D9" stroke="#1636B0" strokeWidth="3" />
    <circle cx="80" cy="50" r="7" fill="#F8B4D9" stroke="#1636B0" strokeWidth="3" />
    <circle cx="80" cy="110" r="7" fill="#F8B4D9" stroke="#1636B0" strokeWidth="3" />
  </svg>
);

export const RoomPresentationGraphic: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
    <rect x="25" y="30" width="110" height="100" rx="24" fill="#FFD4EC" stroke="#1636B0" strokeWidth="4" />
    <rect x="45" y="45" width="70" height="42" rx="10" fill="#FFF" stroke="#1636B0" strokeWidth="3" />
    <line x1="80" y1="87" x2="80" y2="115" stroke="#1636B0" strokeWidth="4" strokeLinecap="round" />
    <line x1="60" y1="115" x2="100" y2="115" stroke="#1636B0" strokeWidth="4" strokeLinecap="round" />
    <path d="M55 60L75 75L105 52" stroke="#1636B0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SpeakerGraphic: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
    <rect x="35" y="25" width="90" height="110" rx="22" fill="#FEF08A" stroke="#1636B0" strokeWidth="4" />
    <circle cx="80" cy="55" r="14" fill="#DDD6FE" stroke="#1636B0" strokeWidth="3" />
    <circle cx="80" cy="95" r="22" fill="#BAE6FD" stroke="#1636B0" strokeWidth="3" />
    <circle cx="80" cy="95" r="8" fill="#1636B0" />
  </svg>
);

export const MicrophoneGraphic: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
    <rect x="58" y="25" width="44" height="65" rx="22" fill="#F8B4D9" stroke="#1636B0" strokeWidth="4" />
    <path d="M42 65C42 86 58 102 80 102C102 102 118 86 118 65" stroke="#1636B0" strokeWidth="4" strokeLinecap="round" fill="none" />
    <line x1="80" y1="102" x2="80" y2="128" stroke="#1636B0" strokeWidth="5" strokeLinecap="round" />
    <line x1="55" y1="128" x2="105" y2="128" stroke="#1636B0" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

export const ProjectorGraphic: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
    <rect x="25" y="50" width="110" height="60" rx="18" fill="#BAE6FD" stroke="#1636B0" strokeWidth="4" />
    <circle cx="55" cy="80" r="16" fill="#FEF08A" stroke="#1636B0" strokeWidth="3" />
    <circle cx="55" cy="80" r="7" fill="#1636B0" />
    <rect x="90" y="72" width="30" height="6" rx="3" fill="#1636B0" />
    <rect x="90" y="84" width="20" height="6" rx="3" fill="#1636B0" />
  </svg>
);

export const WhiteboardGraphic: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
    <rect x="25" y="30" width="110" height="80" rx="14" fill="#FFFDF5" stroke="#1636B0" strokeWidth="4" />
    <line x1="45" y1="110" x2="35" y2="135" stroke="#1636B0" strokeWidth="4" strokeLinecap="round" />
    <line x1="115" y1="110" x2="125" y2="135" stroke="#1636B0" strokeWidth="4" strokeLinecap="round" />
    <line x1="40" y1="130" x2="120" y2="130" stroke="#1636B0" strokeWidth="3" strokeLinecap="round" />
    <path d="M40 55C60 65 80 45 105 60" stroke="#F8B4D9" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const SignageGraphic: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
    <rect x="40" y="25" width="80" height="95" rx="16" fill="#DDD6FE" stroke="#1636B0" strokeWidth="4" />
    <rect x="55" y="42" width="50" height="24" rx="8" fill="#FEF08A" stroke="#1636B0" strokeWidth="2.5" />
    <line x1="55" y1="78" x2="105" y2="78" stroke="#1636B0" strokeWidth="3" strokeLinecap="round" />
    <line x1="55" y1="90" x2="90" y2="90" stroke="#1636B0" strokeWidth="3" strokeLinecap="round" />
    <line x1="80" y1="120" x2="80" y2="138" stroke="#1636B0" strokeWidth="5" strokeLinecap="round" />
    <line x1="60" y1="138" x2="100" y2="138" stroke="#1636B0" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

export const BreakfastGraphic: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
    <ellipse cx="80" cy="100" rx="55" ry="32" fill="#FFFDF5" stroke="#1636B0" strokeWidth="4" />
    {/* Cinnamon roll pastry swirl */}
    <ellipse cx="80" cy="85" rx="36" ry="22" fill="#FEF08A" stroke="#1636B0" strokeWidth="3" />
    <path
      d="M70 82C75 75 90 77 92 84C94 92 72 96 68 88C64 78 88 68 98 80"
      stroke="#1636B0"
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="112" cy="70" r="10" fill="#F8B4D9" stroke="#1636B0" strokeWidth="2.5" />
  </svg>
);

export const LunchGraphic: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
    <ellipse cx="80" cy="95" rx="52" ry="32" fill="#DCFCE7" stroke="#1636B0" strokeWidth="4" />
    <ellipse cx="80" cy="88" rx="42" ry="24" fill="#BBF7D0" stroke="#1636B0" strokeWidth="3" />
    <circle cx="70" cy="84" r="8" fill="#F8B4D9" stroke="#1636B0" strokeWidth="2.5" />
    <circle cx="92" cy="82" r="7" fill="#FEF08A" stroke="#1636B0" strokeWidth="2.5" />
    <circle cx="82" cy="94" r="9" fill="#BAE6FD" stroke="#1636B0" strokeWidth="2.5" />
  </svg>
);

export const HighTeaGraphic: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
    <ellipse cx="80" cy="115" rx="45" ry="16" fill="#DDD6FE" stroke="#1636B0" strokeWidth="3.5" />
    <path
      d="M50 65C50 95 62 105 80 105C98 105 110 95 110 65H50Z"
      fill="#FFD4EC"
      stroke="#1636B0"
      strokeWidth="4"
    />
    {/* Teacup handle */}
    <path
      d="M110 72C122 72 125 88 108 92"
      stroke="#1636B0"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <path d="M72 45C70 52 75 56 73 62" stroke="#1636B0" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M85 42C83 50 88 54 86 62" stroke="#1636B0" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

export const DinnerGraphic: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
    <ellipse cx="80" cy="98" rx="55" ry="34" fill="#FFF" stroke="#1636B0" strokeWidth="4" />
    <path
      d="M48 95C48 68 112 68 112 95H48Z"
      fill="#DDD6FE"
      stroke="#1636B0"
      strokeWidth="4"
    />
    <circle cx="80" cy="62" r="6" fill="#FEF08A" stroke="#1636B0" strokeWidth="2.5" />
    <line x1="38" y1="105" x2="122" y2="105" stroke="#1636B0" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

