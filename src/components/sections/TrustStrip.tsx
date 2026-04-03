"use client";

import { Clock, TrendingUp, Building2, Zap } from "lucide-react";
import { trustPoints } from "@/data/content";

const icons: Record<string, React.FC<{ className?: string }>> = {
  Clock,
  TrendingUp,
  Building2,
  Zap,
};

// Triplicate so animating -33.333% = exactly one full set = seamless loop
const track = [...trustPoints, ...trustPoints, ...trustPoints];

export default function TrustStrip() {
  return (
    <section className="border-y border-gray-200 bg-gray-50 overflow-hidden">
      <div className="flex animate-marquee">
        {track.map((point, i) => {
          const Icon = icons[point.icon];
          return (
            <div
              key={i}
              className="flex items-center gap-2.5 px-10 py-3.5 shrink-0"
            >
              <Icon className="w-3.5 h-3.5 text-fuchsia-500 shrink-0" />
              <span className="text-xs font-semibold text-gray-600 tracking-wide whitespace-nowrap">
                {point.label}
              </span>
              {/* Separator dot */}
              <span className="ml-8 text-gray-300 text-xs">◆</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
