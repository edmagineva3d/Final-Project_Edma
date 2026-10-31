import React from 'react';

interface QuantityControlProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  value,
  onIncrement,
  onDecrement,
  min = 0,
  max = 999,
  size = 'md',
  label = 'Quantity',
}) => {
  const btnSize = size === 'sm' ? '30px' : size === 'lg' ? '42px' : '36px';
  const fontSize = size === 'sm' ? '1rem' : size === 'lg' ? '1.4rem' : '1.2rem';
  const valSize = size === 'sm' ? '1rem' : size === 'lg' ? '1.3rem' : '1.15rem';

  return (
    <div className="qty-controller" role="group" aria-label={label}>
      <button
        type="button"
        onClick={onDecrement}
        disabled={value <= min}
        className="qty-btn"
        aria-label="Decrease quantity"
        style={{ width: btnSize, height: btnSize, fontSize }}
      >
        −
      </button>

      <span
        className="qty-value"
        style={{ fontSize: valSize, minWidth: size === 'sm' ? '24px' : '36px' }}
      >
        {value}
      </span>

      <button
        type="button"
        onClick={onIncrement}
        disabled={value >= max}
        className="qty-btn"
        aria-label="Increase quantity"
        style={{ width: btnSize, height: btnSize, fontSize }}
      >
        +
      </button>
    </div>
  );
};

