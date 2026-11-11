export type GoogleReview = {
  id: string;
  rating: number;
  text: string | null;
  relativeDate: string;
  sourceUrl: string;
  author: {
    name: string;
    profileUrl: string | null;
    photoUrl: string | null;
  };
};

export type GoogleReviewsData = {
  rating: number;
  totalReviewCount: number;
  reviews: GoogleReview[];
  reviewsUrl: string;
  writeReviewUrl: string;
};
