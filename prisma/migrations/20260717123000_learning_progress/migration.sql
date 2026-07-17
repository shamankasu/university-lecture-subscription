-- One progress record per course and user keeps resume state deterministic.
CREATE UNIQUE INDEX "UserProgress_userId_courseId_key"
ON "UserProgress"("userId", "courseId");

-- Catalog lessons are synchronized by their order within a course.
CREATE UNIQUE INDEX "Video_courseId_orderNo_key"
ON "Video"("courseId", "orderNo");
