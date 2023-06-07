import { useEffect, useState } from 'react';

function useAnimationGrowNumber({ value = 0, duration = 800, startDelay = 500, countStep = 40 }) {
  const [animNumber, setAnimNumber] = useState(0);

  useEffect(() => {
    let currentTime = 0;

    const step = 1 / countStep;
    const intervalStep = duration / countStep;

    setTimeout(() => {
      let timer = setInterval(() => {
        currentTime += step;
        const calculatedValue = cubicBezier(currentTime, 0.2, 0.26, 0.76, 0.95, 0, value);
        setAnimNumber(calculatedValue);

        if (calculatedValue >= value) {
          setAnimNumber(value);
          clearInterval(timer);
        }
      }, intervalStep);
    }, startDelay);
  }, [value, duration]);

  return { animNumber };
}

function cubicBezier(t, p0, p1, p2, p3, minValue, maxValue) {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  const p = p0 * uuu;
  const q = 3 * p1 * uu * t;
  const r = 3 * p2 * u * tt;
  const s = p3 * ttt;

  const value = p + q + r + s;
  const scaledValue = value * (maxValue - minValue) + minValue;

  return scaledValue;
}

export { cubicBezier };

export default useAnimationGrowNumber;
