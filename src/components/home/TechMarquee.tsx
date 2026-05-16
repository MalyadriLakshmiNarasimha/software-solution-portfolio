const TECHS = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Node.js', color: '#68A063' },
  { name: 'MongoDB', color: '#13AA52' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Kubernetes', color: '#326CE5' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Python', color: '#3776AB' },
  { name: 'Figma', color: '#F24E1E' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'Redis', color: '#DC382D' },
  { name: 'GraphQL', color: '#E10098' },
];

function TechChip({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3 mx-3 rounded-full bg-primary-800 border border-primary-700 flex-shrink-0">
      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
      <span className="text-primary-200 text-sm font-semibold whitespace-nowrap">{name}</span>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section className="py-16 bg-primary-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest">Technologies We Master</p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-primary-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-primary-900 to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <div className="flex animate-marquee items-center">
            {TECHS.map((tech) => <TechChip key={`a-${tech.name}`} {...tech} />)}
          </div>
          <div className="flex animate-marquee2 items-center absolute top-0">
            {TECHS.map((tech) => <TechChip key={`b-${tech.name}`} {...tech} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
