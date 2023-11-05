import React, {forwardRef} from 'react';




// feature images and other images size measurements

export const Photo = forwardRef(({url, index, faded, style, ...props}, ref) => {
  const inlineStyles = {
    opacity: faded ? '0.2' : '1',
    transformOrigin: '0 0',
    height: index === 0 ?  410 : 200,
    // width: index === 0 ?  420 : 200,
    backgroundImage: `url("${url}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    backgroundPosition: 'center',
    borderRadius: '5px',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.3), 1px 2px 0 0 rgba(0, 0, 0, 0.15)',
    
    ...style,
  };
  return(
   <div ref={ref} style={inlineStyles} {...props} > 
      
      </div>
)}
);
