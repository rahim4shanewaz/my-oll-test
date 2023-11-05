import React from 'react';

export function Grid({children, columns}) {
  return (
    <div
      style={{
        height: "100vh",
        width: "92%",
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${columns}, 1fr)`,
        gridGap: 10,
        padding: 10,
        
      }}
    >
      {children}
    </div>
  );
}
