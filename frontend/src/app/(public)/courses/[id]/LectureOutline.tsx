"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { parseISO } from "date-fns";
import { cn, formatDate, formatTime, toHindiDigits } from "@/lib/utils";
import type { LectureOutlineItem } from "@/types/entities/courses";

const LECTURE_STATUS_BADGES: Record<string, string> = {
  completed: "bg-green-500/10 text-green-700",
  cancelled: "bg-red-500/10 text-red-700",
};

interface LectureOutlineProps {
  lectures: LectureOutlineItem[];
}

export default function LectureOutline({ lectures }: LectureOutlineProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(lectures.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLectures = lectures.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      <ol className="divide-y divide-gray-100 overflow-hidden rounded-3xl border border-gray-100">
        {currentLectures.map((lecture) => {
          const badge = LECTURE_STATUS_BADGES[lecture.status];
          const isMuted =
            lecture.status === "completed" || lecture.status === "cancelled";

          return (
            <li
              key={lecture.id}
              className={cn(
                "flex items-center gap-4 bg-white px-5 py-4",
                isMuted && "bg-gray-50",
              )}
            >
              <span className="bg-olive-500/10 text-olive-700 grid h-11 w-11 shrink-0 place-items-center rounded-xl text-lg font-black">
                {toHindiDigits(lecture.lecture_number)}
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "truncate text-xl font-bold text-gray-900",
                    lecture.status === "cancelled" && "line-through",
                  )}
                >
                  {lecture.title ||
                    `المحاضرة رقم ${toHindiDigits(lecture.lecture_number)}`}
                </p>
                <p className="text-base text-gray-500">
                  {formatDate(parseISO(lecture.day))}
                  {lecture.start_time && (
                    <>
                      {" · "}
                      <span dir="rtl">
                        {formatTime(lecture.start_time)} –{" "}
                        {formatTime(lecture.end_time)}
                      </span>
                    </>
                  )}
                </p>
              </div>
              {badge && (
                <span
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1 text-sm font-bold",
                    badge,
                  )}
                >
                  {lecture.status_display}
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-lg font-bold transition ${
                  currentPage === page
                    ? "bg-gray-300 text-gray-900 shadow-xs"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {toHindiDigits(page)}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}
