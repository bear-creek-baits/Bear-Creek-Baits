import styles from './PhotoComingSoon.module.css';

/** The color chart's "Photo coming soon" box, for colors and profiles that haven't been photographed yet. */
export function PhotoComingSoon({ label, className }: { label?: string; className?: string }) {
  return (
    <span className={`${styles.box} ${className ?? ''}`} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      Photo coming soon
    </span>
  );
}
