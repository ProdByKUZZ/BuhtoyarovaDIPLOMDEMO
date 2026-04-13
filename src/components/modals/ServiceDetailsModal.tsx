import { X, Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { services, doctors, prices, Service, Doctor, PriceItem } from "@/data/clinicData";

interface ServiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: number | null;
  onOpenAppointment: (doctorId?: number) => void;
  onOpenDoctorDetails: (doctorId: number) => void;
}

const serviceCategoryMap: { [key: string]: string } = {
  therapy: "Терапевт",
  cardiology: "Кардиолог",
  neurology: "Невролог",
  pediatrics: "Педиатр",
  dentistry: "Стоматолог",
  diagnostics: "Диагностика",
  gynecology: "Гинеколог",
  telemedicine: "Телемедицина",
};

export function ServiceDetailsModal({
  isOpen,
  onClose,
  serviceId,
  onOpenAppointment,
  onOpenDoctorDetails,
}: ServiceDetailsModalProps) {
  const service = services.find((s) => s.id === serviceId);

  if (!service) return null;

  // Get doctors for this service
  const specialtyName = serviceCategoryMap[service.category];
  const serviceDoctors = doctors.filter((d) => 
    d.specialty === specialtyName || 
    d.services.some(s => s.toLowerCase().includes(service.name.toLowerCase()))
  );

  // Get prices for this service category
  const servicePrices: PriceItem[] = prices[service.category] || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading text-primary">
            {service.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 mt-4">
          {/* Service Image & Description */}
          <div className="grid md:grid-cols-[300px_1fr] gap-6">
            <div className="rounded-lg overflow-hidden shadow-soft">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <p className="text-foreground">{service.details}</p>
            </div>
          </div>

          {/* Services & Prices */}
          {servicePrices.length > 0 && (
            <div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                Услуги и цены
              </h3>
              <div className="bg-light rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-primary text-primary-foreground">
                      <th className="py-3 px-4 text-left">Услуга</th>
                      <th className="py-3 px-4 text-left hidden sm:table-cell">Описание</th>
                      <th className="py-3 px-4 text-right">Цена</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicePrices.map((item, index) => (
                      <tr 
                        key={index} 
                        className={`border-b border-border ${index % 2 === 0 ? "bg-card" : "bg-light"}`}
                      >
                        <td className="py-3 px-4 font-medium">{item.service}</td>
                        <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell">
                          {item.description}
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-primary whitespace-nowrap">
                          {item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Doctors */}
          {serviceDoctors.length > 0 && (
            <div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                Наши специалисты
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {serviceDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="bg-card rounded-lg p-4 shadow-soft card-hover"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <img
                        src={doctor.photo}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground truncate">
                          {doctor.name}
                        </h4>
                        <p className="text-accent text-sm">{doctor.specialty}</p>
                        <p className="text-muted-foreground text-sm">
                          Стаж: {doctor.experience}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          onClose();
                          onOpenDoctorDetails(doctor.id);
                        }}
                      >
                        <User className="w-4 h-4 mr-1" />
                        Профиль
                      </Button>
                      <Button
                        variant="accent"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          onClose();
                          onOpenAppointment(doctor.id);
                        }}
                      >
                        <Calendar className="w-4 h-4 mr-1" />
                        Записаться
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="flex justify-center gap-4 pt-4">
            <Button
              variant="accent"
              size="lg"
              className="gap-2"
              onClick={() => {
                onClose();
                onOpenAppointment();
              }}
            >
              <Calendar className="w-5 h-5" />
              Записаться на приём
            </Button>
            <Button variant="outline" size="lg" onClick={onClose}>
              Закрыть
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
