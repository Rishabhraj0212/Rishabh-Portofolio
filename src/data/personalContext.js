import {
  personal,
  summary,
  stats,
  highlights,
  skillGroups,
  skillTags,
  experience,
  education,
  projects,
  certifications,
  achievements,
} from './resume';

/**
 * Build a rich context string from all resume data so the LLM
 * can answer any question about Rishabh accurately.
 */
export function buildPersonalContext() {
  const lines = [];

  // ── Identity ──
  lines.push(`Name: ${personal.name}`);
  lines.push(`Role: ${personal.role}`);
  lines.push(`Tagline: ${personal.tagline}`);
  lines.push(`Location: ${personal.location}`);
  lines.push(`Email: ${personal.email}`);
  lines.push(`Phone: ${personal.phone}`);
  lines.push(`GitHub: ${personal.github}`);
  lines.push(`LinkedIn: ${personal.linkedin}`);
  lines.push('');

  // ── Summary ──
  lines.push('## Professional Summary');
  lines.push(summary);
  lines.push('');

  // ── Stats ──
  lines.push('## Key Stats');
  stats.forEach((s) => lines.push(`- ${s.label}: ${s.value}`));
  lines.push('');

  // ── Highlights ──
  lines.push('## Core Highlights');
  lines.push(highlights.join(', '));
  lines.push('');

  // ── Skills ──
  lines.push('## Skills');
  skillGroups.forEach((g) => {
    lines.push(`### ${g.title}`);
    g.skills.forEach((s) => lines.push(`- ${s.name} (${s.pct}% proficiency)`));
  });
  lines.push('');
  lines.push('All skill tags: ' + skillTags.join(', '));
  lines.push('');

  // ── Experience ──
  lines.push('## Work Experience');
  experience.forEach((e) => {
    lines.push(`### ${e.role} at ${e.company} (${e.period})${e.current ? ' — Current' : ''}`);
    e.bullets.forEach((b) => lines.push(`- ${b}`));
    lines.push(`Technologies: ${e.tags.join(', ')}`);
    lines.push('');
  });

  // ── Education ──
  lines.push('## Education');
  lines.push(`${education.degree} — ${education.school} (${education.period})`);
  lines.push(education.detail);
  education.bullets.forEach((b) => lines.push(`- ${b}`));
  lines.push(`Tags: ${education.tags.join(', ')}`);
  lines.push('');

  // ── Projects ──
  lines.push('## Projects');
  projects.forEach((p) => {
    lines.push(`### ${p.title} (${p.badge})`);
    lines.push(p.desc);
    lines.push('Features:');
    p.features.forEach((f) => lines.push(`- ${f}`));
    lines.push(`Stack: ${p.stack.join(', ')}`);
    if (p.link) lines.push(`Demo: ${p.link}`);
    lines.push('');
  });

  // ── Certifications ──
  lines.push('## Certifications');
  certifications.forEach((c) => lines.push(`- ${c.name} (${c.issuer})`));
  lines.push('');

  // ── Achievements ──
  lines.push('## Achievements');
  achievements.forEach((a) => lines.push(`- ${a.title}: ${a.detail}`));

  return lines.join('\n');
}
