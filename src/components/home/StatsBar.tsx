import { useEffect, useState } from 'react';
import { useInView } from '../../hooks/useInView';

const STATS = [
  { value: 3, suffix: '+', label: 'Projects Delivered' },
  { value: 3, suffix: '+', label: 'Enterprise Clients' },
  { value: 1, suffix: '', label: 'Years of Excellence' },
  { value: 1, suffix: '', label: 'Countries Served' },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const { ref, inView } = useInView(0.3);

  return (
    <section ref={ref as React.Ref<HTMLElement>} className="bg-primary-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map(({ value, suffix, label }, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl sm:text-5xl font-heading font-bold text-gradient mb-2">
                <CountUp target={value} suffix={suffix} active={inView} />
              </div>
              <p className="text-primary-400 text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
