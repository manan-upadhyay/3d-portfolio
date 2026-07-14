import { useTranslation } from 'react-i18next';
import { services, stats, chapters } from '../constants';
import { SectionWrapper } from '../hoc';
import { ScrollReveal, ChapterHeading, CountUp, Annotated } from '../components';

// The Craft — rebuilt as an asymmetric editorial spread (v1.1 "deep rebuild").
// Deliberately NOT the AI skeleton it used to be: no 4-tile stat banner, no grid
// of identical glass icon-cards, no glowing-dot "Bold: explanation" list. Proof
// is a typographic stat line; disciplines are a ruled running index; the working
// principles are a quiet mono coda. See docs/chronicle/common-ai-signs.md (L4/L5,
// C3, §5).
const About = () => {
  const { t } = useTranslation();
  const ch = chapters.about;
  const intro = t('about.intro', { returnObjects: true });

  return (
    <>
      <ChapterHeading no={ch.no} eyebrow={t('chapters.about.label')} title={`${t('chapters.about.sub')}.`} />

      {/* Intro — a wide serif lead statement, with the detail paragraphs set into
          a narrower measure offset to the right. Off-grid, not stack-centered. */}
      <div className="mt-12 grid lg:grid-cols-12 gap-x-10 gap-y-8 items-start">
        <ScrollReveal direction="up" className="lg:col-span-7">
          <p className="font-chronicle text-[clamp(26px,3.6vw,46px)] leading-[1.12] tracking-tight" style={{ color: 'var(--color-text)' }}>
            {t('about.pullQuote')}
          </p>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.12} className="lg:col-span-5 lg:pt-2 space-y-4">
          {intro.map((para) => (
            <p key={para.slice(0, 24)} className="text-[15.5px] leading-[27px]" style={{ color: 'var(--color-text-muted)' }}>
              <Annotated text={para} />
            </p>
          ))}
        </ScrollReveal>
      </div>

      {/* Proof — a typographic stat line ruled off above; big serif figures with
          quiet labels. Not a banner of bordered tiles. */}
      <div className="mt-16 pt-8 flex flex-wrap gap-x-12 sm:gap-x-16 gap-y-8" style={{ borderTop: '1px solid var(--color-card-border)' }}>
        {stats.map((stat) => (
          <ScrollReveal key={stat.key} direction="up">
            <div>
              <p className="font-chronicle font-semibold leading-none text-[clamp(40px,5.5vw,64px)]" style={{ color: 'var(--color-text)' }}>
                <CountUp value={stat.value} />
              </p>
              <p className="mt-2 font-mono text-[11px] tracking-[0.12em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
                {t(`about.stats.${stat.key}`)}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Disciplines — a running editorial index (number · title · line), not a
          grid of identical icon-cards. Ruled rows, asymmetric column widths. */}
      <div className="mt-20">
        <h3 className="font-chronicle font-semibold text-[clamp(24px,3vw,34px)] mb-2" style={{ color: 'var(--color-text)' }}>
          {t('about.disciplines')}
        </h3>
        <ul style={{ borderBottom: '1px solid var(--color-card-border)' }}>
          {services.map((service, index) => (
            <ScrollReveal
              key={service.iconKey}
              as="li"
              direction="up"
              delay={index * 0.06}
              className="flex gap-5 md:gap-8 py-6 items-baseline"
              style={{ borderTop: '1px solid var(--color-card-border)' }}
            >
              <span className="font-mono text-[13px] tabular-nums pt-1" style={{ color: 'var(--color-ember)' }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 md:grid md:grid-cols-[14rem_1fr] md:gap-8 md:items-baseline">
                <h4 className="font-chronicle font-semibold text-[clamp(20px,2vw,26px)] leading-tight" style={{ color: 'var(--color-text)' }}>
                  {t(`about.services.${service.iconKey}.title`)}
                </h4>
                <p className="text-[14px] leading-[23px] mt-1.5 md:mt-0" style={{ color: 'var(--color-text-muted)' }}>
                  {t(`about.services.${service.iconKey}.description`)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SectionWrapper(About, 'about');
