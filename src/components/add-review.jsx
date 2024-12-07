"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { useParams } from "react-router";
import axios from "axios";
import {useAuth} from "../ctx/auth";

export function CreateReview() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const params = useParams();
  const {user} = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/hotels/reviews/${params.hotelId}`,
        {
          rating,
          content: review,
          avatar: user.avatar ?? undefined,
          author: user.name,
          date: new Date().toISOString(),
        }
      );
      if (res.status === 201) {
        setRating(0);
        setReview("");
        alert("Review submitted successfully");
      } else {
        console.log(res);

        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-6 mb-6"
    >
      <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
      <div className="flex mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="mr-1"
          >
            <Star
              className={`w-6 h-6 ${
                star <= rating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
      <Textarea
        placeholder="Write your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="mb-4"
      />
      <Button type="submit" disabled={rating === 0 || review.trim() === ""}>
        Submit Review
      </Button>
    </form>
  );
}
