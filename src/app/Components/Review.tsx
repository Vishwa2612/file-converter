import { Avatar, AvatarFallback, AvatarImage, } from "@/app/ui/avatar";
import { Card, CardContent } from "@/app/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/app/ui/carousel";
import { Textarea } from "@/app/ui/textarea";
import * as React from 'react';
interface ReviewProps {
  reviews: Array<{
    id: number;
    content: string;
    author: string;
    avatar: string; 
  }>;
}

const ReviewCarousel: React.FC<ReviewProps> = ({ reviews }) => {
  return (
    <Carousel opts={{align: "start",}} className="w-full p-16">
      <CarouselContent>
        {reviews.map((review) => (
          <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3 ">
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-8 h-48">
                  <div className='flex items-start'>
                    <Avatar>
                      <AvatarImage src={review.avatar} alt={`Avatar of ${review.author}`} />
                      <AvatarFallback>{review.author[0]}</AvatarFallback>
                    </Avatar>
                    <blockquote className="ml-4">
                      <p className="text-lg">{review.content}</p>
                      <footer className="mt-4 text-base font-semibold">
                        — {review.author}
                      </footer>
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

const Review: React.FC  = () => {
  const reviews = [
    { id: 1, content: "Absolutely fantastic! Converts files seamlessly without any hassle. This is an amazing app, very easy to use and reliable!", author: "Smith", avatar: "https://randomuser.me/api/portraits/men/31.jpg" },
    { id: 2, content: "Great results every time. Highly recommend this tool for all your file conversion needs.", author: "Bharath", avatar: "https://randomuser.me/api/portraits/men/30.jpg" },
    { id: 3, content: "This is an amazing app, very easy to use and reliable!. Absolutely fantastic! Converts files seamlessly without any hassle..", author: "Sai", avatar: "https://randomuser.me/api/portraits/men/29.jpg" },
    { id: 4, content: "Absolutely fantastic! Converts files seamlessly without any hassle. Great results every time. Highly recommend this tool for all your file conversion needs.", author: "Vijay", avatar: "https://randomuser.me/api/portraits/men/28.jpg" },
    { id: 5, content: "Great results every time. Highly recommend this tool for all your file conversion needs.", author: "Dhoni", avatar: "https://randomuser.me/api/portraits/men/27.jpg" },
    { id: 6, content: "This is an amazing app, very easy to use and reliable!. Great results every time. Highly recommend this tool for all your file conversion needs.", author: "Kumar", avatar: "https://randomuser.me/api/portraits/men/26.jpg" },
  ];

  return (
    <div className="mx-auto px-4 flex flex-col items-center justify-center bg-black max-w-full">
      <h1 className="text-4xl font-bold text-center m-8 text-green-500">What Our Users Say</h1>
      <ReviewCarousel reviews={reviews}/>
      <div className='w-full p-16'>
        <h2 className='text-green-500 text-2xl font-bold my-8'>Your Commands</h2>
        <Textarea placeholder="Type your message here." className="w-[70%] h-[200px]"/>
      </div>
    </div>
  );
};

export default Review;
