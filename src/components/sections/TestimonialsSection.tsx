import type { SiteData } from "@/content/types";
import { Carousel } from "../behaviour/Carousel";
import { Icon } from "../ui/Icon";

const initials = (n: string) => n.split(/\s+/).map((w) => w.charAt(0)).join("").slice(0, 2).toUpperCase();

/** Rating summary and swipeable reviews that advance every 6s. Initials avatars, never stock faces. */
export function TestimonialsSection({ data: d }: { data: SiteData }) {
  return (
    <section className="bs-section" id="reviews" aria-labelledby="bs-rev-h">
      <div className="bs-wrap">
        <div className="bs-head">
          <h2 className="bs-h2" id="bs-rev-h">What clients say</h2>
          <p className="bs-rating">
            <span className="bs-stars" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" />)}
            </span>
            <span>{d.rating.score} from {d.rating.count} client reviews</span>
          </p>
        </div>
        <Carousel className="bs-reviews" label="Client reviews, swipe for more" autoplay wrapClassName="bs-reviews-wrap">
          {d.testimonials.map((t) => (
            <li key={t.name} className="bs-review">
              <blockquote><p className="bs-quote">“{t.text}”</p></blockquote>
              <div className="bs-person">
                <span className="bs-avatar" aria-hidden="true">{initials(t.name)}</span>
                <div>
                  <p className="bs-person__name">{t.name}</p>
                  <p className="bs-person__ctx">{t.ctx}</p>
                </div>
              </div>
            </li>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
