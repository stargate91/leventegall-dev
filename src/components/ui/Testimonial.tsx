import React from "react";
import { StarFilled } from "@carbon/icons-react";
import styles from "./Testimonial.module.css";
import Text from "./Text";
import Avatar from "./Avatar";

export interface RatingStarsProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number | undefined;
  size?: number | undefined;
  fillColor?: string | undefined;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
}

export function RatingStars({
  count = 5,
  size = 13,
  fillColor = "var(--color-accent-core)",
  className = "",
  style,
  ...props
}: RatingStarsProps) {
  return (
    <div className={`${styles.starsRow} ${className}`} style={style} {...props}>
      {Array.from({ length: count }, (_, i) => `star-${i + 1}`).map((starKey) => (
        <StarFilled key={starKey} size={size} fill={fillColor} />
      ))}
    </div>
  );
}

export interface TestimonialProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string;
  author: string;
  role?: string | undefined;
  location?: string | undefined;
  initials?: string | undefined;
  avatarSrc?: string | undefined;
  stars?: number | undefined;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
}

function Testimonial({
  quote,
  author,
  role,
  location,
  initials,
  avatarSrc,
  stars = 5,
  className = "",
  style,
  ...props
}: TestimonialProps) {
  return (
    <div className={`${styles.testimonialCard} ${className}`} style={style} {...props}>
      <div className={styles.body}>
        <RatingStars count={stars} />
        <Text as="p" size="sm" tone="primary" italic leading="relaxed" className={styles.quote}>
          &ldquo;{quote}&rdquo;
        </Text>
      </div>

      <div className={styles.authorRow}>
        <Avatar
          src={avatarSrc}
          alt={author}
          initials={initials || author.slice(0, 2).toUpperCase()}
          size="md"
          variant="bordered"
          shape="rounded"
          className={styles.avatar}
        />
        <div className={styles.authorInfo}>
          <Text font="mono" size="xs" weight="semibold" tone="primary" className={styles.authorName}>
            {author}
          </Text>
          {(role || location) && (
            <Text font="mono" size="2xs" tone="secondary" className={styles.authorMeta}>
              {role}{role && location ? " • " : ""}{location}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
