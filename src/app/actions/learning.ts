"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  ensureCatalogCourse,
  getCatalogCourse,
  getWatchedSecondsThroughLesson,
} from "@/lib/course-catalog";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

function getPositiveInteger(formData: FormData, name: string) {
  const value = Number(formData.get(name));

  return Number.isInteger(value) && value > 0 ? value : null;
}

async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function startLearningAction(formData: FormData) {
  const courseId = getPositiveInteger(formData, "courseId");
  const catalogCourse = courseId ? getCatalogCourse(courseId) : null;

  if (!courseId || !catalogCourse) {
    redirect("/courses");
  }

  const user = await requireUser();
  const course = await ensureCatalogCourse(courseId);
  const firstVideo = course?.videos[0];

  if (!course || !firstVideo) {
    redirect(`/courses/${courseId}`);
  }

  await prisma.userProgress.upsert({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId,
      },
    },
    create: {
      userId: user.id,
      courseId,
      videoId: firstVideo.id,
      watchedSeconds: 0,
    },
    update: {
      lastWatchedAt: new Date(),
    },
  });

  revalidatePath(`/courses/${courseId}`);
  revalidatePath("/mypage");
  redirect(`/watch/${courseId}`);
}

export async function completeLessonAction(formData: FormData) {
  const courseId = getPositiveInteger(formData, "courseId");
  const lessonId = getPositiveInteger(formData, "lessonId");
  const catalogCourse = courseId ? getCatalogCourse(courseId) : null;
  const lessonIndex =
    catalogCourse && lessonId
      ? catalogCourse.lessons.findIndex((lesson) => lesson.id === lessonId)
      : -1;

  if (!courseId || !lessonId || !catalogCourse || lessonIndex < 0) {
    redirect("/courses");
  }

  const user = await requireUser();
  const course = await ensureCatalogCourse(courseId);
  const currentProgress = await prisma.userProgress.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId,
      },
    },
  });
  const nextLesson = catalogCourse.lessons[lessonIndex + 1];
  const currentVideo = course?.videos[lessonIndex];
  const nextVideo = nextLesson ? course?.videos[lessonIndex + 1] : null;

  if (!course || !currentVideo) {
    redirect(`/courses/${courseId}`);
  }

  const watchedSeconds = Math.max(
    currentProgress?.watchedSeconds ?? 0,
    getWatchedSecondsThroughLesson(catalogCourse, lessonId),
  );
  const completed = currentProgress?.completed || !nextLesson;

  await prisma.userProgress.upsert({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId,
      },
    },
    create: {
      userId: user.id,
      courseId,
      videoId: nextVideo?.id ?? currentVideo.id,
      watchedSeconds,
      completed,
    },
    update: {
      videoId: nextVideo?.id ?? currentVideo.id,
      watchedSeconds,
      completed,
      lastWatchedAt: new Date(),
    },
  });

  revalidatePath(`/courses/${courseId}`);
  revalidatePath(`/watch/${courseId}`);
  revalidatePath("/mypage");

  if (nextLesson) {
    redirect(`/watch/${courseId}?lesson=${nextLesson.id}`);
  }

  redirect(`/watch/${courseId}?lesson=${lessonId}&completed=1`);
}

export async function toggleFavoriteAction(formData: FormData) {
  const courseId = getPositiveInteger(formData, "courseId");

  if (!courseId || !getCatalogCourse(courseId)) {
    redirect("/courses");
  }

  const user = await requireUser();
  const course = await ensureCatalogCourse(courseId);

  if (!course) {
    redirect("/courses");
  }

  const favorite = await prisma.favorite.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId,
      },
    },
    select: { id: true },
  });

  if (favorite) {
    await prisma.favorite.delete({ where: { id: favorite.id } });
  } else {
    await prisma.favorite.create({
      data: {
        userId: user.id,
        courseId,
      },
    });
  }

  revalidatePath(`/courses/${courseId}`);
  revalidatePath("/mypage");
}
