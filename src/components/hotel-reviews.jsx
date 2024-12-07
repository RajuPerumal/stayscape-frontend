import { Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import {CreateReview} from './add-review'
import { useState } from 'react'
import {useEffect} from 'react';
import axios from 'axios';

export function ReviewList({ hotelId }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/hotels/reviews/${hotelId}`).then((res) => {
      if (res.status === 200) {
        setReviews(res.data);
      }
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    });
  }, [hotelId]);

  if (isError) {
    return <div className="container mx-auto px-4 py-8">Something went wrong while fetching data</div>;
  }

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <CreateReview />
      {reviews.map((review) => (
        <div key={review._id} className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Avatar className="h-10 w-10 mr-4">
              <AvatarImage src={review.avatar} alt={review.author} />
              <AvatarFallback>{review.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{review.author}</h3>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill={i < review.rating ? "currentColor" : "none"}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">{review.date}</span>
              </div>
            </div>
          </div>
          <p className="text-gray-700">{review.content}</p>
        </div>
      ))}
    </div>
  )
}

