"use client";

import { toggleSidebar } from "@/app/shared/core";
import ROUTES from "@/app/shared/routes";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";

type LogoProps = {
  variant?: "default" | "white";
  width?: number;
  height?: number;
};

export default function Logo({
  variant = "default",
  width = 32,
  height = 32,
}: LogoProps) {
  const pathname = usePathname();
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const el = wrapperRef.current;
    if (el) {
      el.classList.remove("shine-anim");
      void el.offsetWidth;
      el.classList.add("shine-anim");
    }

    if (pathname === ROUTES.DASHBOARD.USERS.ROOT) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        toggleSidebar(false);
      }, 1000);
    } else {
      router.push(ROUTES.DASHBOARD.USERS.ROOT);
    }
  };

  const src = variant === "white" ? "/dashboardLogo.png" : "/dashboardLogo.png";

  return (
    <div
      ref={wrapperRef}
      onClick={handleClick}
      className="shine-wrapper"
      style={{
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        width,
        height,
      }}
    >
      <Image src={src} alt="dashboard Logo" width={width} height={height} />
      <style jsx>{`
        .shine-wrapper::after {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 150%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255, 255, 255, 0.6) 50%,
            transparent 100%
          );
          pointer-events: none;
          transform: skewX(-20deg);
          opacity: 0;
        }

        .shine-anim::after {
          animation: shine 0.8s ease-in-out forwards;
        }

        @keyframes shine {
          0% {
            left: -75%;
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
