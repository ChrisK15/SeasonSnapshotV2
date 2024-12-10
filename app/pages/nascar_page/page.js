import React from 'react';
import UseNascarData from '../../hooks/NASCAR/UseNascarPlayData';

export default function Home() {
  return (
    <div style={{ backgroundColor: 'black', height: '100vh', color: 'white' }}>
      <UseNascarData />
    </div>
  );
}
