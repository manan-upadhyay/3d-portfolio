import { motion } from 'framer-motion';

/**
 * ChapterHeading — the shared section header.
 *
 * As of v1.1 the "Chapter NN · Label" eyebrow is GONE: it duplicated the SideRail
 * (which already carries the chapter number + name) and added clutter above every
 * title. The big serif title now stands on its own, under a short map-line rule.
 * (`no` / `eyebrow` props are still accepted from callers but intentionally unused.)
 */
const ChapterHeading = ({ title, align = 'left', className = '' }) => {
  const isCenter = align === 'center';

  return (
    <div className={`${isCenter ? 'text-center flex flex-col items-center' : ''} ${className}`}>
      <motion.h2
        className="font-chronicle font-semibold leading-[0.95] text-[clamp(40px,7vw,76px)]"
        style={{ color: 'var(--color-text)' }}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>

      <motion.div
        className="map-line mt-5 rounded-full"
        style={{ transformOrigin: isCenter ? 'center' : 'left', width: isCenter ? '160px' : '104px' }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.7 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
      />
    </div>
  );
};

export default ChapterHeading;
