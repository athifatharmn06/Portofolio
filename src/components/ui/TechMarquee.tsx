import { skillCategories } from '../../data/skills';

/** Two opposing infinite marquees of every skill, pausing on hover. */
export default function TechMarquee() {
  const all = skillCategories.flatMap((c) => c.skills);
  const mid = Math.ceil(all.length / 2);
  const rows = [all.slice(0, mid), all.slice(mid)];

  return (
    <div
      className="relative overflow-hidden border-y border-white/5 bg-[#03030f] py-6"
      aria-label="Technologies I work with"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#03030f] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#03030f] to-transparent" />

      {rows.map((row, r) => (
        <div key={r} className="marquee group flex w-max gap-3 py-1.5" data-reverse={r === 1}>
          {[...row, ...row].map((skill, i) => (
            <span
              key={`${skill.name}-${i}`}
              className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300 transition-colors hover:border-violet-400/60 hover:bg-violet-500/10 hover:text-white"
            >
              <span className="text-base [&_*]:!text-inherit" aria-hidden="true">
                {skill.icon}
              </span>
              {skill.name}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
