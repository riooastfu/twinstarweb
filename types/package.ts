// types/package.ts

// Base package types
export interface MasterPackageBase {
  packageTitle: string;
  duration: string;
  price: number;
  description: string;
  image: string;
  location?: string;
  minGroupSize?: number;
  maxGroupSize?: number;
}

export interface MasterPackage extends MasterPackageBase {
  id: string;
  gallery?: PackageGallery[];
  highlights?: PackageHighlight[];
  itinerary?: PackageItinerary[];
  inclusions?: PackageInclusion[];
  exclusions?: PackageExclusion[];
  availableDates?: PackageDate[];
  reviews?: PackageReview[];
  faqs?: PackageFAQ[];
}

// Gallery
export interface PackageGalleryBase {
  imageUrl: string;
  packageId: string;
}

export interface PackageGallery extends PackageGalleryBase {
  id: string;
}

// Highlight
export interface PackageHighlightBase {
  description: string;
  packageId: string;
}

export interface PackageHighlight extends PackageHighlightBase {
  id: string;
}

// Itinerary
export interface PackageItineraryBase {
  day: number;
  title: string;
  description: string;
  accommodation?: string;
  packageId: string;
}

export interface PackageItinerary extends PackageItineraryBase {
  id: string;
  activities?: ItineraryActivity[];
  meals?: ItineraryMeal[];
}

// Itinerary Activity
export interface ItineraryActivityBase {
  name: string;
  itineraryId: string;
}

export interface ItineraryActivity extends ItineraryActivityBase {
  id: string;
}

// Itinerary Meal
export interface ItineraryMealBase {
  name: string;
  itineraryId: string;
}

export interface ItineraryMeal extends ItineraryMealBase {
  id: string;
}

// Inclusion
export interface PackageInclusionBase {
  description: string;
  packageId: string;
}

export interface PackageInclusion extends PackageInclusionBase {
  id: string;
}

// Exclusion
export interface PackageExclusionBase {
  description: string;
  packageId: string;
}

export interface PackageExclusion extends PackageExclusionBase {
  id: string;
}

// Package Date
export interface PackageDateBase {
  date: Date;
  spots: number;
  packageId: string;
}

export interface PackageDate extends PackageDateBase {
  id: string;
}

// Review
export interface PackageReviewBase {
  name: string;
  rating: number;
  comment: string;
  date: Date;
  packageId: string;
}

export interface PackageReview extends PackageReviewBase {
  id: string;
}

// FAQ
export interface PackageFAQBase {
  question: string;
  answer: string;
  packageId: string;
}

export interface PackageFAQ extends PackageFAQBase {
  id: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Create types
export interface CreatePackageRequest extends MasterPackageBase { }
export interface CreateGalleryRequest extends PackageGalleryBase { }
export interface CreateHighlightRequest extends PackageHighlightBase { }
export interface CreateItineraryRequest extends PackageItineraryBase { }
export interface CreateActivityRequest extends ItineraryActivityBase { }
export interface CreateMealRequest extends ItineraryMealBase { }
export interface CreateInclusionRequest extends PackageInclusionBase { }
export interface CreateExclusionRequest extends PackageExclusionBase { }
export interface CreateDateRequest extends PackageDateBase { }
export interface CreateReviewRequest extends PackageReviewBase { }
export interface CreateFAQRequest extends PackageFAQBase { }

// Update types
export interface UpdatePackageRequest extends Partial<MasterPackageBase> { }
export interface UpdateGalleryRequest extends Partial<PackageGalleryBase> { }
export interface UpdateHighlightRequest extends Partial<PackageHighlightBase> { }
export interface UpdateItineraryRequest extends Partial<PackageItineraryBase> { }
export interface UpdateActivityRequest extends Partial<ItineraryActivityBase> { }
export interface UpdateMealRequest extends Partial<ItineraryMealBase> { }
export interface UpdateInclusionRequest extends Partial<PackageInclusionBase> { }
export interface UpdateExclusionRequest extends Partial<PackageExclusionBase> { }
export interface UpdateDateRequest extends Partial<PackageDateBase> { }
export interface UpdateReviewRequest extends Partial<PackageReviewBase> { }
export interface UpdateFAQRequest extends Partial<PackageFAQBase> { }