
"use client";

import { useState } from "react";
import Image from "next/image";
import InstructorProfile from "@/assets/instructor-profile.png";
import { cn, getArabicPlural, toHindiDigits } from "@/lib/utils";
import type { LandingPageInstructor } from "@/types/entities";

interface InstructorsRowProps {
  instructors: LandingPageInstructor[];
}

export default function InstructorsRow({ instructors }: InstructorsRowProps) {
  // 1. عرض 4 معلمين في البداية
  const [visibleCount, setVisibleCount] = useState(4);

  if (instructors.length <= 0) return null;

  const displayedInstructors = instructors.slice(0, visibleCount);
  const hasMore = visibleCount < instructors.length;

  return (
    <div className="w-full flex flex-col items-center gap-40">
      {/* 
        3. التوزيع الدقيق للأعمدة حسب الشاشات:
        - الموبايل: عمود واحد (grid-cols-1)
        - التابلت: عمودين (tablet:grid-cols-2)
        - اللابتوب / الديسكتوب: 3 أعمدة (laptop:grid-cols-3)
        - الشاشات العملاقة 4K: 4 أعمدة (lg:grid-cols-4)
        5. حل مشكلة ضيق الشاشة بـ w-full وتجاوب كامل
      */}
      <div className="w-full grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 lg:grid-cols-4 gap-20 tablet:gap-40 text-[1.2rem] tablet:text-[1.35rem] laptop:text-[1.5rem] text-gray-600">
        {displayedInstructors.map(({ instructor }) => {
          // 2. استقبال عدد سنوات الخبرة يدوياً كـ Input من الباك إند
          const yearsOfExp = instructor.experience_years ?? 0;

          return (
            <div
              key={instructor.id}
              className="shadow-soft mobile-lg:px-5 relative h-auto min-h-0 bg-[linear-gradient(181deg,#FFF_3.72%,#93A494_180.46%)] px-20 py-12 tablet:px-30 tablet:py-16 desktop-sm:px-50 flex flex-col overflow-hidden"
            >
              {/* 4. صورة المدرب في أعلى الوسط وتأثيرات القطع والمواءمة */}
              <div
                className="relative z-20 flex w-full justify-center overflow-clip tablet:h-64 desktop-sm:h-auto"
                draggable="false"
              >
                <Image
                  src={InstructorProfile}
                  alt={instructor.name + " Picture"}
                  width={662}
                  height={946}
                  draggable="false"
                  className="relative z-20 w-100 tablet:w-120 desktop-sm:w-130 object-cover tablet:object-top"
                />
              </div>

              {/* معلومات المعلم والاسم */}
              <div className="relative z-10 px-4 py-4 tablet:px-8 tablet:py-6">
                <div className="mb-10 tablet:mb-20">
                  <h4 className="text-olive-500 text-[2rem] tablet:text-[2.4rem] desktop-sm:text-[2.8rem] font-bold leading-tight">
                    {instructor.name}
                  </h4>
                  <p className="text-beige-500 text-[1.6rem] tablet:text-[1.8rem] desktop-sm:text-[2rem] mt-2">
                    {instructor.bio}
                  </p>
                </div>

                <ul>
                  <li>
                    <span className="font-bold">
                      {yearsOfExp > 0 && toHindiDigits(yearsOfExp)}
                    </span>{" "}
                    {getArabicPlural(yearsOfExp, {
                      singular: "سنة",
                      twofer: "سنتين",
                      plural: "سنوات",
                    })}{" "}
                    خبرة
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* 1. أزرار التحكم (عرض المزيد / عرض أقل) */}
      {hasMore ? (
        <button
          onClick={() => setVisibleCount((prev) => prev + 4)}
          className="mt-20 px-30 py-15 bg-olive-500 text-white rounded-full text-[1.6rem] font-bold transition-all hover:opacity-90 cursor-pointer"
        >
          عرض المزيد
        </button>
      ) : (
        instructors.length > 4 && (
          <button
            onClick={() => setVisibleCount(4)}
            className="mt-20 px-30 py-15 bg-olive-500 text-white rounded-full text-[1.6rem] font-bold transition-all hover:opacity-90 cursor-pointer"
          >
            عرض أقل
          </button>
        )
      )}
    </div>
  );
}
