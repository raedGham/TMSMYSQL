import { useState } from "react";

export default function RatingFeedback({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    onSubmit({ rating, feedback });
    setRating(0);
    setFeedback("");
  };

  return (
    <div className="w-full max-w-md bg-gray-800/60 p-6 rounded-xl shadow-lg space-y-4 text-gray-200">
      <h2 className="text-xl font-semibold">Leave Your Review</h2>

      {/* ⭐ Rating */}
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
            onClick={() => setRating(star)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={(hover || rating) >= star ? "gold" : "#4b5563"}
            className="w-7 h-7 cursor-pointer transition"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* ✍ Feedback */}
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Write your feedback..."
        className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:ring-2 focus:ring-blue-500"
        rows="4"
      ></textarea>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
      >
        Submit Review
      </button>
    </div>
  );
}
