import { motion } from 'framer-motion';
import VoiceSwitcher from './VoiceSwitcher';
import SoundControl from './SoundControl';

/**
 * Bottom-right control cluster — **[Persona] · [Sound]** (Persona left, Sound
 * right), bottom-aligned. The Sound control expands *upward* (vertically) on
 * hover rather than sideways, so its slider never widens the row and can't push
 * the Persona control left (the old frustration). The theme toggle stays
 * top-right (unchanged).
 */
const ControlCluster = ({ activeId }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 0.6 }}
    className="fixed bottom-5 right-5 z-40 flex items-end gap-3"
  >
    <VoiceSwitcher activeId={activeId} />
    <SoundControl />
  </motion.div>
);

export default ControlCluster;
