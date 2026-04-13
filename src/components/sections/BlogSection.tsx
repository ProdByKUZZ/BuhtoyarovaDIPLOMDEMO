import { Clock, User, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/clinicData";

interface BlogSectionProps {
  onOpenArticle: (postId: number) => void;
}

export function BlogSection({ onOpenArticle }: BlogSectionProps) {
  return (
    <section id="blog" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary section-title mb-8">
            Блог и статьи от врачей
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Экспертные статьи и полезные материалы от наших специалистов
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-card rounded-lg overflow-hidden shadow-soft card-hover group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="medical-badge">{post.category}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-heading font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                
                {/* Author & Meta */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span className="truncate max-w-[120px]">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <button 
                  onClick={() => onOpenArticle(post.id)}
                  className="inline-flex items-center gap-2 text-accent font-semibold group/link"
                >
                  Читать
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
