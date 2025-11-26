import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../services/tripService";
import RatingFeedback from "../../components/RatingFeedback/RatingFeedback";

function Feedback({ tripID, userID }) {
  const [reviews, setReviews] = useState([]);

  // Load reviews from backend
  const loadReviews = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/reviews/${tripID}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error loading reviews:", error);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [tripID]);

  // Submit user review
  const handleReview = async (data) => {
    try {
      await axios.post(`${BACKEND_URL}/api/reviews`, {
        tripID,
        userID,
        rating: data.rating,
        comment: data.feedback,
      });

      // reload updated reviews
      await loadReviews();
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-10 space-y-10">
      <RatingFeedback onSubmit={handleReview} />

      {/* Reviews */}

      <div className="w-full max-w-3xl bg-gray-800/60 p-6 rounded-lg space-y-4">
        <h2 className="text-xl font-semibold text-gray-200">Reviews</h2>

        {reviews.length === 0 && (
          <p className="text-gray-400">No reviews yet.</p>
        )}

        {reviews.map((review) => (
          <div key={review._id} className="border-b border-gray-700 pb-4">
            {/* Stars */}
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i}>{i <= review.rating ? "⭐" : "☆"}</span>
              ))}
            </div>

            {/* Comment */}
            <p className="mt-2 text-gray-300">{review.comment}</p>

            {/* User */}
            <p className="mt-1 text-sm text-gray-500">
              — {review.userID?.name || "Anonymous"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feedback;
