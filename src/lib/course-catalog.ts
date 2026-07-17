import "server-only";

import { courses, type Course } from "@/data/courses";
import { prisma } from "@/lib/prisma";

export function getCatalogCourse(courseId: number) {
  return courses.find((course) => course.id === courseId) ?? null;
}

export function getLessonDurationSeconds(duration: string) {
  const minutes = Number.parseInt(duration, 10);

  return Number.isFinite(minutes) ? minutes * 60 : 0;
}

export function getCourseDurationSeconds(course: Course) {
  return course.lessons.reduce(
    (total, lesson) => total + getLessonDurationSeconds(lesson.duration),
    0,
  );
}

export function getWatchedSecondsThroughLesson(
  course: Course,
  lessonId: number,
) {
  const lessonIndex = course.lessons.findIndex(
    (lesson) => lesson.id === lessonId,
  );

  if (lessonIndex < 0) {
    return 0;
  }

  return course.lessons
    .slice(0, lessonIndex + 1)
    .reduce(
      (total, lesson) => total + getLessonDurationSeconds(lesson.duration),
      0,
    );
}

export function getCourseProgressPercent(
  course: Course,
  watchedSeconds: number,
  completed = false,
) {
  if (completed) {
    return 100;
  }

  const totalSeconds = getCourseDurationSeconds(course);

  if (totalSeconds === 0) {
    return 0;
  }

  return Math.min(99, Math.round((watchedSeconds / totalSeconds) * 100));
}

export async function ensureCatalogCourse(courseId: number) {
  const catalogCourse = getCatalogCourse(courseId);

  if (!catalogCourse) {
    return null;
  }

  let university = await prisma.university.findFirst({
    where: { name: catalogCourse.university },
    select: { id: true },
  });

  if (!university) {
    university = await prisma.university.create({
      data: {
        name: catalogCourse.university,
        status: "approved",
      },
      select: { id: true },
    });
  }

  let teacher = await prisma.teacher.findFirst({
    where: {
      name: catalogCourse.teacher,
      universityId: university.id,
    },
    select: { id: true },
  });

  if (!teacher) {
    teacher = await prisma.teacher.create({
      data: {
        name: catalogCourse.teacher,
        universityId: university.id,
      },
      select: { id: true },
    });
  }

  await prisma.course.upsert({
    where: { id: catalogCourse.id },
    create: {
      id: catalogCourse.id,
      universityId: university.id,
      teacherId: teacher.id,
      title: catalogCourse.title,
      category: catalogCourse.category,
      level: catalogCourse.level,
      description: catalogCourse.description,
      status: "published",
    },
    update: {
      universityId: university.id,
      teacherId: teacher.id,
      title: catalogCourse.title,
      category: catalogCourse.category,
      level: catalogCourse.level,
      description: catalogCourse.description,
      status: "published",
    },
  });

  for (const [index, lesson] of catalogCourse.lessons.entries()) {
    const orderNo = index + 1;

    await prisma.video.upsert({
      where: {
        courseId_orderNo: {
          courseId: catalogCourse.id,
          orderNo,
        },
      },
      create: {
        courseId: catalogCourse.id,
        title: lesson.title,
        videoUrl: `/watch/${catalogCourse.id}?lesson=${lesson.id}`,
        duration: getLessonDurationSeconds(lesson.duration),
        orderNo,
      },
      update: {
        title: lesson.title,
        videoUrl: `/watch/${catalogCourse.id}?lesson=${lesson.id}`,
        duration: getLessonDurationSeconds(lesson.duration),
      },
    });
  }

  return prisma.course.findUnique({
    where: { id: catalogCourse.id },
    include: {
      videos: {
        orderBy: { orderNo: "asc" },
      },
    },
  });
}
