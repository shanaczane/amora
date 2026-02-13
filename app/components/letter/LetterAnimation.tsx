"use client";

import { useState } from "react";
import Link from "next/link";
import { Letter } from "@/app/types/letter";

interface LetterAnimationProps {
  letter: Letter;
}

export default function LetterAnimation({ letter }: LetterAnimationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Delay showing content to allow animation to play
    setTimeout(() => {
      setShowContent(true);
    }, 600);
  };

  if (!isOpen) {
    return (
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            You&apos;ve received a letter! 💌
          </h2>
          <p className="text-gray-600">Tap the sticker to open</p>
        </div>

        <button
          onClick={handleOpen}
          className="relative w-full aspect-[3/4] rounded-3xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-pink-300"
          style={{ backgroundColor: letter.background_color }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-9xl animate-bounce">{letter.icon}</div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-4 right-4 w-16 h-16 bg-white/20 rounded-full blur-xl"></div>
        </button>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
             Tap to reveal your message 
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-2xl transition-all duration-700 ${
        showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      <div
        className="rounded-3xl shadow-2xl p-8 md:p-12 min-h-[500px] relative overflow-hidden"
        style={{
          backgroundColor: letter.background_color,
          color: letter.text_color,
        }}
      >
        {/* Decorative icon in corner */}
        <div className="absolute top-4 right-4 text-4xl opacity-30">
          {letter.icon}
        </div>

        {/* Content */}
        <div className="relative z-10">
          {letter.title && (
            <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {letter.title}
            </h1>
          )}

          <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-wrap leading-relaxed text-lg">
              {letter.content}
            </p>
          </div>

          {/* Date */}
          <div className="mt-8 pt-6 border-t border-current/20">
            <p className="text-sm opacity-60">
              Sent on{" "}
              {new Date(letter.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Create your own CTA */}
      <div className="mt-8 text-center">
        <p className="text-gray-700 mb-4">Want to send your own letter?</p>
        <Link
          href="/"
          className="inline-block bg-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-pink-700 transition duration-200 shadow-lg"
        >
          Create Your Letter!
        </Link>
      </div>
    </div>
  );
}
