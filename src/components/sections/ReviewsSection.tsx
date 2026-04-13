import { useRef } from "react";
import { Star, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { reviews } from "@/data/clinicData";

export function ReviewsSection() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -380 : 380;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section id="reviews" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary section-title mb-8">
            Отзывы пациентов
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <span className="text-2xl font-bold text-foreground">{avgRating}</span>
            <span className="text-muted-foreground">на основании {reviews.length} отзывов</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Источник: 2ГИС</span>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all hidden md:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-2 py-4 md:px-12"
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0 w-[340px] bg-card rounded-xl p-6 shadow-soft border border-border/50 hover:shadow-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-foreground">{review.author}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/30"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                  {review.text}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <span className="text-xs font-medium text-accent">{review.service}</span>
                  {review.doctor && (
                    <span className="text-xs text-muted-foreground truncate ml-2">
                      {review.doctor.split(" ").slice(0, 2).join(" ")}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Discount Banner */}
        <div className="mt-12 bg-gradient-accent rounded-xl p-8 text-center text-primary-foreground">
          <h3 className="text-2xl font-heading font-bold mb-2">Скидка 10% за отзыв!</h3>
          <p className="opacity-90 mb-4 max-w-xl mx-auto">
            Оставьте отзыв о нашей клинике на 2ГИС и получите персональный промокод на скидку 10% на любую услугу
          </p>
          <div className="inline-flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm rounded-lg px-6 py-3">
            <span className="text-sm opacity-80">Ваш промокод:</span>
            <span className="font-mono font-bold text-lg tracking-wider">
              REVIEW-{Math.random().toString(36).substring(2, 8).toUpperCase()}
            </span>
          </div>
          <p className="text-xs opacity-70 mt-3">Покажите промокод администратору при записи на приём</p>
        </div>
      </div>
    </section>
  );
}
