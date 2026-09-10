import React from 'react';
import { Question } from '../types';

interface FigureDisplayProps {
  question: Question;
}

export default function FigureDisplay({ question }: FigureDisplayProps) {
  if (!question.figure) return null;

  const data = question.figureData || {};

  const renderFigure = () => {
    switch (question.figure) {
      case 'square':
        return (
          <svg viewBox="0 0 200 200" className="w-full max-w-[200px] mx-auto">
            <rect
              x="40" y="40" width="120" height="120"
              fill="rgba(0, 243, 255, 0.1)"
              stroke="#00f3ff"
              strokeWidth="2"
            />
            {/* Размер стороны */}
            <text x="100" y="30" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="Nunito">
              {data.side || '?'} см
            </text>
            <text x="175" y="105" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="Nunito">
              {data.side || '?'} см
            </text>
            {/* Углы */}
            <rect x="40" y="40" width="10" height="10" fill="none" stroke="#fff" strokeWidth="1" opacity="0.5" />
            <rect x="150" y="40" width="10" height="10" fill="none" stroke="#fff" strokeWidth="1" opacity="0.5" />
            <rect x="40" y="150" width="10" height="10" fill="none" stroke="#fff" strokeWidth="1" opacity="0.5" />
            <rect x="150" y="150" width="10" height="10" fill="none" stroke="#fff" strokeWidth="1" opacity="0.5" />
          </svg>
        );

      case 'rectangle':
        return (
          <svg viewBox="0 0 240 160" className="w-full max-w-[240px] mx-auto">
            <rect
              x="30" y="30" width="180" height="100"
              fill="rgba(57, 255, 20, 0.1)"
              stroke="#39ff14"
              strokeWidth="2"
            />
            <text x="120" y="22" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="Nunito">
              {data.width || '?'} см
            </text>
            <text x="225" y="85" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="Nunito">
              {data.height || '?'} см
            </text>
            {/* Углы */}
            <rect x="30" y="30" width="10" height="10" fill="none" stroke="#fff" strokeWidth="1" opacity="0.5" />
            <rect x="200" y="30" width="10" height="10" fill="none" stroke="#fff" strokeWidth="1" opacity="0.5" />
            <rect x="30" y="120" width="10" height="10" fill="none" stroke="#fff" strokeWidth="1" opacity="0.5" />
            <rect x="200" y="120" width="10" height="10" fill="none" stroke="#fff" strokeWidth="1" opacity="0.5" />
          </svg>
        );

      case 'triangle':
        return (
          <svg viewBox="0 0 200 180" className="w-full max-w-[200px] mx-auto">
            <polygon
              points="100,20 180,160 20,160"
              fill="rgba(255, 0, 228, 0.1)"
              stroke="#ff00e4"
              strokeWidth="2"
            />
            <text x="100" y="178" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="Nunito">
              {data.base || '?'} см
            </text>
            {/* Высота */}
            <line x1="100" y1="20" x2="100" y2="160" stroke="#fff" strokeWidth="1" strokeDasharray="4" opacity="0.5" />
            <text x="115" y="95" fill="#fff" fontSize="13" fontFamily="Nunito">
              h = {data.height || '?'} см
            </text>
          </svg>
        );

      case 'circle':
        return (
          <svg viewBox="0 0 200 200" className="w-full max-w-[200px] mx-auto">
            <circle
              cx="100" cy="100" r="70"
              fill="rgba(255, 247, 0, 0.1)"
              stroke="#fff700"
              strokeWidth="2"
            />
            {/* Радиус */}
            <line x1="100" y1="100" x2="170" y2="100" stroke="#fff" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="3" fill="#fff" />
            <text x="135" y="93" fill="#fff" fontSize="13" fontFamily="Nunito">
              r = {data.radius || '?'} см
            </text>
          </svg>
        );

      case 'trapezoid':
        return (
          <svg viewBox="0 0 240 160" className="w-full max-w-[240px] mx-auto">
            <polygon
              points="70,30 170,30 210,140 30,140"
              fill="rgba(191, 0, 255, 0.1)"
              stroke="#bf00ff"
              strokeWidth="2"
            />
            <text x="120" y="22" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="Nunito">
              a = {data.top || '?'} см
            </text>
            <text x="120" y="158" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="Nunito">
              b = {data.bottom || '?'} см
            </text>
            {/* Высота */}
            <line x1="120" y1="30" x2="120" y2="140" stroke="#fff" strokeWidth="1" strokeDasharray="4" opacity="0.6" />
            <text x="135" y="90" fill="#fff" fontSize="12" fontFamily="Nunito">
              h = {data.height || '?'}
            </text>
          </svg>
        );

      case 'rhombus':
        return (
          <svg viewBox="0 0 200 200" className="w-full max-w-[200px] mx-auto">
            <polygon
              points="100,20 180,100 100,180 20,100"
              fill="rgba(255, 102, 0, 0.1)"
              stroke="#ff6600"
              strokeWidth="2"
            />
            {/* Диагонали */}
            <line x1="100" y1="20" x2="100" y2="180" stroke="#fff" strokeWidth="1" strokeDasharray="4" opacity="0.5" />
            <line x1="20" y1="100" x2="180" y2="100" stroke="#fff" strokeWidth="1" strokeDasharray="4" opacity="0.5" />
            <text x="108" y="100" fill="#fff" fontSize="12" fontFamily="Nunito">
              d₁={data.d1 || '?'}
            </text>
            <text x="108" y="115" fill="#fff" fontSize="12" fontFamily="Nunito">
              d₂={data.d2 || '?'}
            </text>
          </svg>
        );

      case 'parallelogram':
        return (
          <svg viewBox="0 0 240 160" className="w-full max-w-[240px] mx-auto">
            <polygon
              points="60,30 220,30 180,140 20,140"
              fill="rgba(0, 243, 255, 0.1)"
              stroke="#00f3ff"
              strokeWidth="2"
            />
            <text x="140" y="22" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="Nunito">
              a = {data.base || '?'} см
            </text>
            {/* Высота */}
            <line x1="60" y1="30" x2="60" y2="140" stroke="#fff" strokeWidth="1" strokeDasharray="4" opacity="0.6" />
            <text x="70" y="90" fill="#fff" fontSize="12" fontFamily="Nunito">
              h = {data.height || '?'}
            </text>
          </svg>
        );

      case 'composite':
        return (
          <svg viewBox="0 0 260 180" className="w-full max-w-[260px] mx-auto">
            {/* Прямоугольник */}
            <rect
              x="30" y="60" width="140" height="100"
              fill="rgba(57, 255, 20, 0.1)"
              stroke="#39ff14"
              strokeWidth="2"
            />
            {/* Треугольник сверху */}
            <polygon
              points="30,60 170,60 100,10"
              fill="rgba(255, 0, 228, 0.1)"
              stroke="#ff00e4"
              strokeWidth="2"
            />
            <text x="100" y="178" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="Nunito">
              {data.width || '?'} см
            </text>
            <text x="185" y="115" fill="#fff" fontSize="13" fontFamily="Nunito">
              {data.height || '?'} см
            </text>
            <text x="110" y="45" fill="#fff" fontSize="12" fontFamily="Nunito">
              h={data.triangleHeight || '?'}
            </text>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className="my-4 p-4 bg-black/40 rounded-xl border border-white/10">
      {renderFigure()}
    </div>
  );
}
