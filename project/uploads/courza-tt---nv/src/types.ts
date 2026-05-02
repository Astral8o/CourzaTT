/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Course {
  id: string;
  title: string;
  institutionId: string;
  institutionName: string;
  summary: string;
  type: string; // e.g., "Degree", "Certificate", "Workshop"
  category: string;
  cost: string;
  startDate: string;
  deadline: string;
  delivery: "Online" | "In-Person" | "Blended";
  location: string;
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  image: string;
  date: string;
  readTime: string;
}

export interface Institution {
  id: string;
  name: string;
  summary: string;
  type: "Public" | "Private" | "NGO" | "Technical" | "Other";
  website: string;
  courseCount: number;
  logo?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQCategory {
  title: string;
  questions: FAQ[];
}

export const CATEGORIES = [
  "Agriculture & Environment",
  "Business & Entrepreneurship",
  "Communication & Media",
  "Creative Arts & Design",
  "Engineering & Construction",
  "Finance & Accounting",
  "Health & Medical",
  "Hospitality & Culinary",
  "Law & Governance",
  "Personal Development",
  "Professional Development",
  "Soft Skills",
  "Technical Trades",
  "Technology & Digital",
];
