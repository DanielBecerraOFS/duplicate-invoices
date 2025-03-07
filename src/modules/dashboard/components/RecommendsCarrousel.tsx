import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import HeadChatbotOFIA from "@/assets/ofia-chatbot-head.png";
import { Button } from "@/components/ui/button";

export default function RecommendsCarrousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 10000, stopOnInteraction: true })
  );
  return (
    <div className="recommend-carrusel-content mb-4 w-full max-w-[100vw]">
      <div className="carrusel-wrapper flex flex-row justify-start  items-start gap-2">
        <div className="rounded-full h-12 w-12 shadow-lg p-1 bg-amber-400 ease-[cubic-bezier(0.95,0.05,0.795,0.035)] duration-500 mt-3 hidden md:block">
          <div className="ring-spacer h-full w-full rounded-full bg-zinc-50 flex justify-center items-center">
            <picture className="floating-button-img-concept">
              <source src={HeadChatbotOFIA} />
              <img
                src={HeadChatbotOFIA}
                alt="ofia-chatbot-concept"
                width={50}
                height={50}
              />
            </picture>
          </div>
        </div>
        <Card className="carrusel-card border-red-800 p-0 max-w-[350px] md:max-w-[600px] mx-auto md:mx-0">
          <CardContent className="flex flex-col justify-start items-start gap-3">
            <Carousel
              plugins={[plugin.current]}
              className="max-w-[100%] h-[auto]"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              orientation="horizontal"
            >
              <CarouselContent className="">
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className="p-7">
                    <div className="flex flex-col justify-start items-start p-0 gap-3">
                      <h3 className="card-title">
                        We have detected an anomaly in recents invoices
                      </h3>
                      <div className="flex flex-col justify-start items-start ">
                        <p>
                          <strong>New Invoices today: </strong> 26
                        </p>
                        <p>
                          <strong>Possible duplicate invoices:</strong> 15
                        </p>
                      </div>
                      <Button variant="default">✨Review with sOfIA✨</Button>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
