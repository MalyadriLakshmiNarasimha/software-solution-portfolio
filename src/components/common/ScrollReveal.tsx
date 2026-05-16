import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
}

export default function ScrollReveal({ children, className = '', delay = 0, direction = 'up' }: ScrollRevealProps) {
  const { ref, inView } = useInView();

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 24 : 0,
      x: direction === 'left' ? -24 : direction === 'right' ? 24 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
