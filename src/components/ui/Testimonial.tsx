import React from "react";
import { Star } from "lucide-react";
import styles from "./Testimonial.module.css";
import Text from "./Text";

export interface RatingStarsProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  size?: number;
  fillColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function RatingStars({
  count = 5,
  size = 14,
  fillColor = "var(--cyan-tron)",
  className = "",
  style,
  ...props
}: RatingStarsProps) {
  return (
    <div className={`${styles.starsRow} ${className}`} style={style} {...props}>
      {Array.from({ length: count }).map((_, s) => (
        <Star key={s} size={size} fill={fillColor} color={fillColor} />
      ))}
    </div>
  );
}

export interface TestimonialProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string;
  author: string;
  badge?: string;
  stars?: number;
  className?: string;
  style?: React.CSSProperties;
}

function Testimonial({
  quote,
  author,
  badge = "VERIFIED REVIEW",
  stars = 5,
  className = "",
  style,
  ...props
}: TestimonialProps) {
  return (
    <div className={`${styles.testimonialCard} ${className}`} style={style} {...props}>
      <div>
        <RatingStars count={stars} />
        <Text as="p" size="sm" tone="primary" italic leading="relaxed" className={styles.quote}>
          &ldquo;{quote}&rdquo;
        </Text>
      </div>
      <div className={styles.footer}>
        <Text font="mono" size="xs" weight="semibold" tone="primary">
          {author}
        </Text>
        {badge && (
          <Text font="mono" size="2xs" tone="cyan" className={styles.badge}>
            {badge}
          </Text>
        )}
      </div>
    </div>
  );
}

export default Testimonial;
