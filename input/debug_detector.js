const threshold = 160;
const widthThreshold = window.outerWidth - window.innerWidth > threshold;
const heightThreshold = window.outerHeight - window.innerHeight > threshold;
const orientation = widthThreshold ? 'vertical' : 'horizontal';
if (widthThreshold || heightThreshold) alert('devtools activated!');