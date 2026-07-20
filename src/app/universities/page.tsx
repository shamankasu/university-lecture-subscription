import type { Metadata } from "next";

import UniversitiesClient from "./UniversitiesClient";

export const metadata: Metadata = {
  title: "大学から探す | UniLecture",
  description: "掲載大学の特徴や公開講義を大学別に探せます。",
};

export default function UniversitiesPage() {
  return <UniversitiesClient />;
}
