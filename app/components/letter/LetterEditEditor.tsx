"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Letter } from "@/app/types/letter";
import {
  updateLetterAction,
  deleteLetterAction,
} from "@/app/lib/letter/actions";
import Link from "next/link";

const ICONS = [
  "💕",
  "❤️",
  "💖",
  "💗",
  "💓",
  "💝",
  "💌",
  "💐",
  "🌹",
  "🌷",
  "🌺",
  "🌸",
  "⭐",
  "✨",
  "🎀",
];

const PRESET_COLORS = {
  backgrounds: [
    { name: "Pink Blush", value: "#fff5f7" },
    { name: "Lavender", value: "#f3e8ff" },
    { name: "Peach", value: "#ffedd5" },
    { name: "Mint", value: "#d1fae5" },
    { name: "Sky", value: "#dbeafe" },
    { name: "Rose", value: "#ffe4e6" },
  ],
  text: [
    { name: "Dark Gray", value: "#1f2937" },
    { name: "Deep Rose", value: "#be123c" },
    { name: "Purple", value: "#7c3aed" },
    { name: "Emerald", value: "#059669" },
    { name: "Blue", value: "#2563eb" },
    { name: "Black", value: "#000000" },
  ],
};

interface LetterEditEditorProps {
  letter: Letter;
}

export default function LetterEditEditor({ letter }: LetterEditEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(letter.title || "");
  const [content, setContent] = useState(letter.content);
  const [backgroundColor, setBackgroundColor] = useState(
    letter.background_color,
  );
  const [textColor, setTextColor] = useState(letter.text_color);
  const [selectedIcon, setSelectedIcon] = useState(letter.icon);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("background_color", backgroundColor);
    formData.append("text_color", textColor);
    formData.append("icon", selectedIcon);

    await updateLetterAction(letter.id, formData);
    setIsSubmitting(false);
    router.push("/dashboard");
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteLetterAction(letter.id);
    router.push("/dashboard");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Editor Panel */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-pink-600">Edit Letter</h1>
          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-gray-900 text-sm"
          >
            ← Back
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition text-gray-900 placeholder:text-gray-500"
              placeholder="My Valentine's Letter"
            />
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Message *
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => {
                if (e.target.value.length <= 500) {
                  setContent(e.target.value);
                }
              }}
              required
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition resize-none text-gray-900 placeholder:text-gray-500"
              placeholder="Write your heartfelt message here..."
            />
            <div className="flex justify-end mt-1">
              <span
                className={`text-xs ${content.length >= 450 ? "text-red-500" : "text-gray-400"}`}
              >
                {content.length}/500
              </span>
            </div>
          </div>

          {/* Icon Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Pick a Sticker
            </label>
            <div className="flex flex-wrap justify-center gap-2">
              {ICONS.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setSelectedIcon(icon)}
                  className={`text-3xl p-3 rounded-lg border-2 transition-all hover:scale-110 ${
                    selectedIcon === icon
                      ? "border-pink-500 bg-pink-50 scale-110"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Background Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Background Color
            </label>
            <div className="grid grid-cols-3 gap-3">
              {PRESET_COLORS.backgrounds.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setBackgroundColor(color.value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    backgroundColor === color.value
                      ? "border-pink-500 ring-2 ring-pink-200"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
                  style={{ backgroundColor: color.value }}
                >
                  <span className="text-xs font-medium text-gray-700">
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Text Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Text Color
            </label>
            <div className="grid grid-cols-3 gap-3">
              {PRESET_COLORS.text.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setTextColor(color.value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    textColor === color.value
                      ? "border-pink-500 ring-2 ring-pink-200"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.value }}
                    />
                    <span className="text-xs font-medium text-gray-700">
                      {color.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="flex-1 bg-pink-600 text-white py-4 rounded-lg font-medium hover:bg-pink-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "💾 Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="px-6 py-4 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition duration-200 border border-red-200"
            >
              🗑️
            </button>
          </div>
        </form>

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 shadow-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Delete Letter?
              </h3>
              <p className="text-gray-600 mb-6">
                This action cannot be undone. The letter will be permanently
                deleted.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:bg-gray-400"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preview Panel */}
      <div className="lg:sticky lg:top-8 h-fit">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Preview</h2>

          {/* Closed State */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-3">Closed:</p>
            <div className="relative aspect-[3/4] max-w-xs mx-auto">
              <div
                className="absolute inset-0 rounded-2xl shadow-2xl flex items-center justify-center"
                style={{ backgroundColor: backgroundColor }}
              >
                <div className="text-8xl animate-pulse">{selectedIcon}</div>
              </div>
            </div>
          </div>

          {/* Open State */}
          <div>
            <p className="text-sm text-gray-600 mb-3">Open:</p>
            <div
              className="rounded-2xl shadow-2xl p-8 min-h-[300px]"
              style={{
                backgroundColor: backgroundColor,
                color: textColor,
              }}
            >
              {title && <h3 className="text-2xl font-bold mb-4">{title}</h3>}
              <p className="whitespace-pre-wrap leading-relaxed">
                {content || "Your message will appear here..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
