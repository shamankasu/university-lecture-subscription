import CoursesClient from "./CoursesClient";

type CoursesPageProps = {
  searchParams: Promise<{
    q?: string | string[];
    category?: string | string[];
  }>;
};

function getSingleValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value : "";
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const params = await searchParams;

  return (
    <CoursesClient
      initialKeyword={getSingleValue(params.q)}
      initialCategory={getSingleValue(params.category)}
    />
  );
}
