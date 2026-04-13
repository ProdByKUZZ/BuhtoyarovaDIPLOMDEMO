import { useState } from "react";
import { prices } from "@/data/clinicData";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const categories = [
  { id: "therapy", name: "Терапия" },
  { id: "cardiology", name: "Кардиология" },
  { id: "neurology", name: "Неврология" },
  { id: "pediatrics", name: "Педиатрия" },
  { id: "dentistry", name: "Стоматология" },
  { id: "diagnostics", name: "Диагностика" },
  { id: "gynecology", name: "Гинекология" },
  { id: "analyses", name: "Лаб. анализы" },
  { id: "rehabilitation", name: "Реабилитация и ЛФК" },
  { id: "psychology", name: "Психотерапия" },
  { id: "vaccination", name: "Вакцинация" },
];

export function PricesSection() {
  const [activeCategory, setActiveCategory] = useState("therapy");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPrices = searchQuery.trim()
    ? Object.values(prices).flat().filter(item =>
        item.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : prices[activeCategory] || [];

  return (
    <section id="prices" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary section-title mb-8">
            Наши цены
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Прозрачное ценообразование — мы ценим ваше доверие
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Поиск услуги..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          {!searchQuery && (
            <div className="bg-card rounded-lg p-5 shadow-soft h-fit lg:sticky lg:top-28">
              <h3 className="text-sm font-heading font-bold text-primary mb-4 uppercase tracking-wider">
                Категории
              </h3>
              <ul className="space-y-1">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                        activeCategory === category.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-primary-light hover:text-primary"
                      }`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={`overflow-x-auto rounded-lg shadow-soft ${searchQuery ? "lg:col-span-2" : ""}`}>
            <table className="w-full bg-card">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left p-4 font-semibold text-sm">Услуга</th>
                  <th className="text-left p-4 font-semibold text-sm hidden sm:table-cell">Описание</th>
                  <th className="text-right p-4 font-semibold text-sm">Стоимость</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrices.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-light-gray hover:bg-primary-light/50 transition-colors duration-200"
                  >
                    <td className="p-4">
                      <div className="font-medium text-foreground text-sm">{item.service}</div>
                      <div className="text-xs text-muted-foreground sm:hidden mt-1">{item.description}</div>
                    </td>
                    <td className="p-4 text-muted-foreground text-sm hidden sm:table-cell">{item.description}</td>
                    <td className="p-4 text-right">
                      <span className="font-bold text-primary whitespace-nowrap">{item.price}</span>
                    </td>
                  </tr>
                ))}
                {filteredPrices.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-muted-foreground">
                      Услуги не найдены. Попробуйте другой запрос.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
