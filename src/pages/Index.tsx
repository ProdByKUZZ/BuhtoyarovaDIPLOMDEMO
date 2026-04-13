import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { DoctorsSection } from "@/components/sections/DoctorsSection";
import { PricesSection } from "@/components/sections/PricesSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { AppointmentSection } from "@/components/sections/AppointmentSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { LoyaltySection } from "@/components/sections/LoyaltySection";
import { SymptomChecker } from "@/components/SymptomChecker";
import { CheckupPrograms } from "@/components/CheckupPrograms";
import { ChatBot } from "@/components/ChatBot";
import { CookieConsent } from "@/components/CookieConsent";
import { AppointmentModal } from "@/components/modals/AppointmentModal";
import { LoginModal } from "@/components/modals/LoginModal";
import { DoctorDetailsModal } from "@/components/modals/DoctorDetailsModal";
import { ServiceDetailsModal } from "@/components/modals/ServiceDetailsModal";
import { BlogArticleModal } from "@/components/modals/BlogArticleModal";
import { HomeVisitModal } from "@/components/modals/HomeVisitModal";
import { AmbulanceModal } from "@/components/modals/AmbulanceModal";
import { CareerModal } from "@/components/modals/CareerModal";
import { PrivacyPolicyModal, TermsModal, PersonalDataConsentModal } from "@/components/modals/LegalModals";

const Index = () => {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDoctorDetailsOpen, setIsDoctorDetailsOpen] = useState(false);
  const [isServiceDetailsOpen, setIsServiceDetailsOpen] = useState(false);
  const [isBlogArticleOpen, setIsBlogArticleOpen] = useState(false);
  const [isHomeVisitOpen, setIsHomeVisitOpen] = useState(false);
  const [isAmbulanceOpen, setIsAmbulanceOpen] = useState(false);
  const [isCareerOpen, setIsCareerOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isConsentOpen, setIsConsentOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const [appointmentType, setAppointmentType] = useState<"clinic" | "online">("clinic");

  const handleOpenAppointment = (doctorId?: number, type: "clinic" | "online" = "clinic") => {
    if (doctorId) setSelectedDoctorId(doctorId);
    setAppointmentType(type);
    setIsAppointmentOpen(true);
  };

  const handleOpenDoctorDetails = (doctorId: number) => {
    setSelectedDoctorId(doctorId);
    setIsDoctorDetailsOpen(true);
  };

  const handleOpenServiceDetails = (serviceId: number) => {
    setSelectedServiceId(serviceId);
    setIsServiceDetailsOpen(true);
  };

  const handleOpenArticle = (articleId: number) => {
    setSelectedArticleId(articleId);
    setIsBlogArticleOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header
        onOpenAppointment={() => handleOpenAppointment()}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenHomeVisit={() => setIsHomeVisitOpen(true)}
        onOpenAmbulance={() => setIsAmbulanceOpen(true)}
        onOpenCareer={() => setIsCareerOpen(true)}
      />

      <main className="pt-20">
        {/* 1. Hero - первое впечатление и CTA */}
        <HeroSection onOpenAppointment={() => handleOpenAppointment()} />
        
        {/* 2. О клинике - доверие */}
        <AboutSection />
        
        {/* 3. Почему выбирают нас - преимущества */}
        <FeaturesSection />
        
        {/* 4. Наши услуги - что предлагаем */}
        <ServicesSection onOpenServiceDetails={handleOpenServiceDetails} />
        
        {/* 5. Наши врачи - кто лечит */}
        <DoctorsSection
          onOpenDoctorDetails={handleOpenDoctorDetails}
          onOpenAppointment={handleOpenAppointment}
        />
        
        {/* 6. Подбор врача по симптомам - интерактив */}
        <SymptomChecker onOpenAppointment={handleOpenAppointment} />
        
        {/* 7. Цены - стоимость */}
        <PricesSection />
        
        {/* 8. Программы чек-апов */}
        <CheckupPrograms onOpenAppointment={() => handleOpenAppointment()} />
        
        {/* 9. Программа лояльности + скидки */}
        <LoyaltySection />
        
        {/* 10. Отзывы (включая баннер скидки 10%) */}
        <ReviewsSection />
        
        {/* 11. Блог - экспертный контент */}
        <BlogSection onOpenArticle={handleOpenArticle} />
        
        {/* 12. FAQ - ответы на оставшиеся вопросы */}
        <FAQSection />
        
        {/* 13. Запись - финальный CTA */}
        <AppointmentSection onOpenAppointment={() => handleOpenAppointment()} />
      </main>

      <Footer
        onOpenHomeVisit={() => setIsHomeVisitOpen(true)}
        onOpenAmbulance={() => setIsAmbulanceOpen(true)}
        onOpenCareer={() => setIsCareerOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenTerms={() => setIsTermsOpen(true)}
      />

      <ChatBot onOpenAppointment={() => handleOpenAppointment()} />
      <CookieConsent />

      {/* Modals */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => {
          setIsAppointmentOpen(false);
          setSelectedDoctorId(null);
          setAppointmentType("clinic");
        }}
        selectedDoctorId={selectedDoctorId || undefined}
        appointmentType={appointmentType}
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <DoctorDetailsModal
        isOpen={isDoctorDetailsOpen}
        onClose={() => {
          setIsDoctorDetailsOpen(false);
          setSelectedDoctorId(null);
        }}
        doctorId={selectedDoctorId}
        onOpenAppointment={handleOpenAppointment}
      />
      <ServiceDetailsModal
        isOpen={isServiceDetailsOpen}
        onClose={() => {
          setIsServiceDetailsOpen(false);
          setSelectedServiceId(null);
        }}
        serviceId={selectedServiceId}
        onOpenAppointment={handleOpenAppointment}
        onOpenDoctorDetails={handleOpenDoctorDetails}
      />
      <BlogArticleModal
        isOpen={isBlogArticleOpen}
        onClose={() => {
          setIsBlogArticleOpen(false);
          setSelectedArticleId(null);
        }}
        postId={selectedArticleId}
      />
      <HomeVisitModal
        isOpen={isHomeVisitOpen}
        onClose={() => setIsHomeVisitOpen(false)}
      />
      <AmbulanceModal
        isOpen={isAmbulanceOpen}
        onClose={() => setIsAmbulanceOpen(false)}
      />
      <CareerModal
        isOpen={isCareerOpen}
        onClose={() => setIsCareerOpen(false)}
      />
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />
      <PersonalDataConsentModal
        isOpen={isConsentOpen}
        onClose={() => setIsConsentOpen(false)}
      />
    </div>
  );
};

export default Index;
