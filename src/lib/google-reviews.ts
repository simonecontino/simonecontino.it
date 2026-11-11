import "server-only";

import type { GoogleReview, GoogleReviewsData } from "@/types/google-reviews";

const GOOGLE_PLACES_ENDPOINT = "https://places.googleapis.com/v1/places";
const REVIEW_CACHE_SECONDS = 60 * 60 * 24;

type PlacesReview = {
  name?: string;
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  googleMapsUri?: string;
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: PlacesReview[];
  googleMapsLinks?: {
    reviewsUri?: string;
    writeAReviewUri?: string;
  };
};

function normalizeReview(review: PlacesReview, index: number): GoogleReview | null {
  const name = review.authorAttribution?.displayName?.trim();
  const sourceUrl = review.googleMapsUri;
  const rating = review.rating;
  if (!name || !sourceUrl || typeof rating !== "number") return null;

  return {
    id: review.name ?? `${sourceUrl}-${index}`,
    rating: Math.min(5, Math.max(1, rating)),
    text: review.text?.text?.trim() || null,
    relativeDate: review.relativePublishTimeDescription?.trim() || "",
    sourceUrl,
    author: {
      name,
      profileUrl: review.authorAttribution?.uri ?? null,
      photoUrl: review.authorAttribution?.photoUri ?? null,
    },
  };
}

export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_BUSINESS_PLACE_ID;
  if (!apiKey || !placeId) return null;

  try {
    const response = await fetch(
      `${GOOGLE_PLACES_ENDPOINT}/${encodeURIComponent(placeId)}?languageCode=it&regionCode=IT`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": [
            "rating",
            "userRatingCount",
            "reviews",
            "googleMapsLinks.reviewsUri",
            "googleMapsLinks.writeAReviewUri",
          ].join(","),
        },
        next: { revalidate: REVIEW_CACHE_SECONDS, tags: ["google-reviews"] },
        signal: AbortSignal.timeout(8_000),
      },
    );

    if (!response.ok) {
      console.error(`Google Places reviews request failed with status ${response.status}.`);
      return null;
    }

    const place = (await response.json()) as PlacesResponse;
    const reviewsUrl = place.googleMapsLinks?.reviewsUri;
    const writeReviewUrl = place.googleMapsLinks?.writeAReviewUri;
    if (
      typeof place.rating !== "number" ||
      typeof place.userRatingCount !== "number" ||
      !reviewsUrl ||
      !writeReviewUrl
    ) {
      console.error("Google Places reviews response is missing required fields.");
      return null;
    }

    const reviews = (place.reviews ?? [])
      .map(normalizeReview)
      .filter((review): review is GoogleReview => review !== null);

    return {
      rating: place.rating,
      totalReviewCount: place.userRatingCount,
      reviews,
      reviewsUrl,
      writeReviewUrl,
    };
  } catch (error) {
    console.error("Google Places reviews request failed.", error instanceof Error ? error.message : error);
    return null;
  }
}
