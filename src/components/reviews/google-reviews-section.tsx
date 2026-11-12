"use client";

import { ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { GoogleReview, GoogleReviewsData } from "@/types/google-reviews";

const GOOGLE_REVIEW_POLICY_URL = "https://support.google.com/contributionpolicy/answer/7400114";

function Stars({ rating, label }: { rating: number; label: string }) {
  const roundedRating = Math.round(rating);
  return (
    <span className="review-stars" aria-label={label}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} aria-hidden="true" className={index < roundedRating ? "is-filled" : ""} />
      ))}
    </span>
  );
}

function ReviewAuthor({ review }: { review: GoogleReview }) {
  const content = (
    <>
      {review.author.photoUrl ? (
        // The Google-hosted avatar is displayed directly to preserve the attribution supplied by Places.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={review.author.photoUrl} alt="" width="44" height="44" loading="lazy" referrerPolicy="no-referrer" />
      ) : (
        <span className="review-avatar-fallback" aria-hidden="true">{review.author.name.charAt(0)}</span>
      )}
      <span><strong>{review.author.name}</strong>{review.relativeDate ? <small>{review.relativeDate}</small> : null}</span>
    </>
  );

  return review.author.profileUrl ? (
    <a className="review-author" href={review.author.profileUrl} target="_blank" rel="noreferrer">{content}</a>
  ) : (
    <div className="review-author">{content}</div>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = Boolean(review.text && review.text.length > 260);

  return (
    <article className="google-review-card">
      <ReviewAuthor review={review} />
      <Stars rating={review.rating} label={`${review.rating} stelle su 5`} />
      {review.text ? (
        <p className={expanded ? "review-text is-expanded" : "review-text"}>{review.text}</p>
      ) : (
        <p className="review-text review-text--empty">Recensione senza commento testuale.</p>
      )}
      <div className="review-card-actions">
        {isLong ? (
          <button type="button" onClick={() => setExpanded((current) => !current)} aria-expanded={expanded}>
            {expanded ? "Mostra meno" : "Leggi di più"}
          </button>
        ) : <span />}
        <a href={review.sourceUrl} target="_blank" rel="noreferrer">
          Vedi su Google Maps <ExternalLink aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export function GoogleReviewsSection({ data, fallbackUrl }: { data: GoogleReviewsData | null; fallbackUrl: string }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollReviews = (direction: -1 | 1) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const card = carousel.querySelector<HTMLElement>(".google-review-card");
    carousel.scrollBy({ left: direction * ((card?.offsetWidth ?? carousel.clientWidth) + 16), behavior: "smooth" });
  };

  if (!data) {
    return (
      <section className="section reviews-section" aria-labelledby="reviews-title">
        <Container className="reviews-fallback">
          <div className="google-maps-attribution">
            <Image src="/images/google-maps-logo.png" width="98" height="18" alt="Google Maps" />
          </div>
          <p className="eyebrow">Recensioni dei pazienti</p>
          <h2 id="reviews-title">Le esperienze dei pazienti</h2>
          <p>Leggi le esperienze condivise dai pazienti nella sezione recensioni del mio profilo Google.</p>
          <ButtonLink href={fallbackUrl} target="_blank" rel="noreferrer" variant="primary">
            Leggi le recensioni su Google <ExternalLink size={16} aria-hidden="true" />
          </ButtonLink>
        </Container>
      </section>
    );
  }

  return (
    <section className="section reviews-section" aria-labelledby="reviews-title">
      <Container>
        <div className="reviews-heading">
          <div>
            <div className="google-maps-attribution">
              <Image src="/images/google-maps-logo.png" width="98" height="18" alt="Google Maps" />
            </div>
            <p className="eyebrow">Recensioni dei pazienti</p>
            <h2 id="reviews-title">Le esperienze condivise dai pazienti</h2>
          </div>
          <div className="reviews-summary" aria-label={`Valutazione media ${data.rating} su 5, basata su ${data.totalReviewCount} recensioni`}>
            <strong>{data.rating.toLocaleString("it-IT", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</strong>
            <div><Stars rating={data.rating} label={`${data.rating} stelle su 5`} /><span>{data.totalReviewCount.toLocaleString("it-IT")} recensioni</span></div>
          </div>
        </div>

        {data.reviews.length ? (
          <>
            <div className="reviews-carousel-header">
              <p>Le recensioni sono mostrate nell’ordine di rilevanza restituito da Google Maps.</p>
              <div className="reviews-carousel-controls">
                <button type="button" onClick={() => scrollReviews(-1)} aria-label="Recensioni precedenti"><ChevronLeft aria-hidden="true" /></button>
                <button type="button" onClick={() => scrollReviews(1)} aria-label="Recensioni successive"><ChevronRight aria-hidden="true" /></button>
              </div>
            </div>
            <div className="reviews-carousel" ref={carouselRef} aria-label="Recensioni Google" tabIndex={0}>
              {data.reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
            </div>
          </>
        ) : null}

        <div className="reviews-footer">
          <div className="reviews-buttons">
            <ButtonLink href={data.reviewsUrl} target="_blank" rel="noreferrer">Leggi tutte le recensioni su Google</ButtonLink>
            <ButtonLink href={data.writeReviewUrl} target="_blank" rel="noreferrer" variant="secondary">Scrivi una recensione</ButtonLink>
          </div>
          <p>Contenuti forniti da Google Maps. Google non verifica ogni recensione, ma controlla e rimuove i contenuti falsi quando vengono identificati. <a href={GOOGLE_REVIEW_POLICY_URL} target="_blank" rel="noreferrer">Norme sulle recensioni</a>.</p>
        </div>
      </Container>
    </section>
  );
}
