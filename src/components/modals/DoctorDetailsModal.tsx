import { Star, Calendar, Award, GraduationCap, Briefcase, BookOpen, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { doctors } from "@/data/clinicData";

interface DoctorDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorId: number | null;
  onOpenAppointment: (doctorId: number) => void;
}

export function DoctorDetailsModal({
  isOpen,
  onClose,
  doctorId,
  onOpenAppointment,
}: DoctorDetailsModalProps) {
  const doctor = doctors.find((d) => d.id === doctorId);

  if (!doctor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{doctor.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-[280px_1fr] gap-8">
          {/* Photo */}
          <div>
            <div className="rounded-lg overflow-hidden shadow-soft mb-4">
              <img src={doctor.photo} alt={doctor.name} className="w-full h-auto" />
            </div>
            <div className="flex items-center justify-center gap-1 mb-4">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-lg">{doctor.rating}/5</span>
            </div>
          </div>

          {/* Info */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-1">{doctor.name}</h2>
            <p className="text-xl text-accent font-semibold mb-2">{doctor.specialty}</p>
            <p className="text-muted-foreground mb-6">{doctor.description}</p>

            {/* Quick Info */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Квалификация</p>
                  <p className="font-semibold">{doctor.qualification}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Стаж работы</p>
                  <p className="font-semibold">{doctor.experience}</p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                Образование
              </h4>
              <div className="space-y-2 text-sm pl-7">
                <p className="text-foreground">{doctor.educationDetails.university}</p>
                {doctor.educationDetails.residency && (
                  <p className="text-muted-foreground">{doctor.educationDetails.residency}</p>
                )}
                {doctor.educationDetails.courses && doctor.educationDetails.courses.length > 0 && (
                  <div>
                    <p className="text-muted-foreground font-medium mb-1">Повышение квалификации:</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                      {doctor.educationDetails.courses.map((course, i) => (
                        <li key={i}>{course}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Work History */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Опыт работы
              </h4>
              <div className="space-y-3 pl-7">
                {doctor.workHistory.map((work, i) => (
                  <div key={i} className="text-sm">
                    <p className="font-medium text-foreground">{work.place}</p>
                    <p className="text-muted-foreground">{work.role} ({work.period})</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Publications */}
            {doctor.publications && doctor.publications.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Научные публикации
                </h4>
                <div className="space-y-2 pl-7">
                  {doctor.publications.map((pub, i) => (
                    <div key={i} className="text-sm">
                      <p className="text-foreground">«{pub.title}»</p>
                      <p className="text-muted-foreground">{pub.journal}, {pub.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specializations */}
            {doctor.specializations && (
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Специализации:</h4>
                <div className="flex flex-wrap gap-2">
                  {doctor.specializations.map((spec, index) => (
                    <span key={index} className="medical-badge">{spec}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="accent"
                className="gap-2 flex-1"
                onClick={() => {
                  onClose();
                  onOpenAppointment(doctor.id);
                }}
              >
                <Calendar className="w-4 h-4" />
                Записаться на приём
              </Button>
              <Button variant="outline" onClick={onClose}>
                Закрыть
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
