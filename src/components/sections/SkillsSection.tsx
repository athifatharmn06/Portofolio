import { skillCategories } from '../../data/skills';
import Reveal from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 md:py-36">
      <div className="wrap">
        <SectionHeader
          index="03"
          label="Skills"
          title={
            <>
              The toolbox, <em className="text-muted">grouped by what it's for.</em>
            </>
          }
        />

        <div className="border-t border-line">
          {skillCategories.map((cat, i) => (
            <Reveal key={cat.id}>
              <div className="grid gap-4 border-b border-line py-7 md:grid-cols-12 md:gap-8 md:py-9">
                <div className="flex items-baseline gap-4 md:col-span-4">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-base font-medium text-fg">{cat.name}</h3>
                </div>
                <ul className="flex flex-wrap gap-x-5 gap-y-2.5 md:col-span-8">
                  {cat.skills.map((skill) => (
                    <li key={skill.name} className="text-[0.95rem] text-muted">
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
