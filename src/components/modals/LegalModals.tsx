import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: LegalModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-heading text-primary">
            Политика конфиденциальности
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p className="text-foreground font-medium">Дата последнего обновления: 30 марта 2026 г.</p>
            
            <h3 className="text-foreground font-semibold text-base">1. Общие положения</h3>
            <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пациентов и посетителей сайта ООО «Медикал Плюс» (далее — Клиника). Клиника обеспечивает защиту персональных данных в соответствии с Федеральным законом №152-ФЗ «О персональных данных».</p>
            
            <h3 className="text-foreground font-semibold text-base">2. Сбор персональных данных</h3>
            <p>Мы собираем следующие данные: ФИО, контактный телефон, адрес электронной почты, дата рождения, данные о состоянии здоровья (при записи на приём). Данные собираются с явного согласия пользователя при заполнении форм на сайте.</p>
            
            <h3 className="text-foreground font-semibold text-base">3. Цели обработки данных</h3>
            <p>Персональные данные обрабатываются для: записи на приём и оказания медицинских услуг, связи с пациентом для подтверждения записи, отправки SMS-напоминаний о визите, информирования о новых услугах (при согласии), улучшения качества обслуживания.</p>
            
            <h3 className="text-foreground font-semibold text-base">4. Хранение и защита данных</h3>
            <p>Все персональные данные хранятся на защищённых серверах на территории Российской Федерации. Доступ к данным имеют только уполномоченные сотрудники Клиники. Применяются организационные и технические меры защиты информации.</p>
            
            <h3 className="text-foreground font-semibold text-base">5. Передача данных третьим лицам</h3>
            <p>Клиника не передаёт персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством РФ, а также при привлечении подрядчиков для обработки данных (SMS-рассылка, email-уведомления) на основании договоров о неразглашении.</p>
            
            <h3 className="text-foreground font-semibold text-base">6. Файлы cookie</h3>
            <p>Сайт использует файлы cookie для: обеспечения корректной работы сайта, анализа трафика и поведения пользователей, персонализации контента. Вы можете отключить cookie в настройках браузера.</p>
            
            <h3 className="text-foreground font-semibold text-base">7. Права пользователя</h3>
            <p>Вы имеете право: запросить информацию об обработке ваших данных, потребовать исправления или удаления данных, отозвать согласие на обработку данных. Для реализации ваших прав обращайтесь по email: privacy@medical-plus.ru</p>
            
            <h3 className="text-foreground font-semibold text-base">8. Контактная информация</h3>
            <p>ООО «Медикал Плюс»<br />Адрес: г. Москва, ул. Тверская, д. 15<br />Телефон: +7 (495) 123-45-67<br />Email: privacy@medical-plus.ru</p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function TermsModal({ isOpen, onClose }: LegalModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-heading text-primary">
            Пользовательское соглашение
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p className="text-foreground font-medium">Дата последнего обновления: 30 марта 2026 г.</p>
            
            <h3 className="text-foreground font-semibold text-base">1. Предмет соглашения</h3>
            <p>Настоящее Пользовательское соглашение (далее — Соглашение) регулирует отношения между ООО «Медикал Плюс» (далее — Клиника) и пользователем сайта (далее — Пользователь). Использование сайта означает согласие с условиями настоящего Соглашения.</p>
            
            <h3 className="text-foreground font-semibold text-base">2. Услуги сайта</h3>
            <p>Сайт предоставляет: информацию о медицинских услугах Клиники, возможность онлайн-записи на приём, информацию о врачах и ценах, доступ к медицинским статьям и материалам, консультацию с онлайн-помощником.</p>
            
            <h3 className="text-foreground font-semibold text-base">3. Онлайн-запись</h3>
            <p>Онлайн-запись является предварительной и требует подтверждения администратором Клиники. Клиника оставляет за собой право изменить время приёма по согласованию с пациентом. Отмена или перенос записи возможны не позднее чем за 2 часа до назначенного времени.</p>
            
            <h3 className="text-foreground font-semibold text-base">4. Ответственность</h3>
            <p>Информация на сайте носит ознакомительный характер и не является медицинской рекомендацией. Онлайн-помощник (чат-бот) не заменяет консультацию врача. Результаты «Подбора врача по симптомам» носят рекомендательный характер.</p>
            
            <h3 className="text-foreground font-semibold text-base">5. Интеллектуальная собственность</h3>
            <p>Все материалы сайта (тексты, изображения, дизайн, программный код) являются интеллектуальной собственностью Клиники. Копирование материалов без письменного согласия запрещено.</p>
            
            <h3 className="text-foreground font-semibold text-base">6. Обязанности пользователя</h3>
            <p>Пользователь обязуется: предоставлять достоверную информацию при записи на приём, не использовать сайт в противоправных целях, не нарушать работу сайта техническими средствами.</p>
            
            <h3 className="text-foreground font-semibold text-base">7. Порядок оплаты</h3>
            <p>Стоимость услуг указана на сайте и может быть изменена Клиникой. Актуальные цены уточняйте у администратора. Оплата производится в кассе Клиники или онлайн (при наличии такой возможности).</p>
            
            <h3 className="text-foreground font-semibold text-base">8. Программа лояльности</h3>
            <p>Клиника предоставляет бонусную программу лояльности. Бонусы начисляются за оплату услуг (до 5%), на праздники (500 бонусов) и в день рождения (1000 бонусов). 1 бонус = 1 рубль. Бонусами можно оплатить до 20% стоимости услуг. Бонусы не подлежат обмену на наличные.</p>
            
            <h3 className="text-foreground font-semibold text-base">9. Заключительные положения</h3>
            <p>Клиника оставляет за собой право вносить изменения в настоящее Соглашение без предварительного уведомления. Актуальная версия всегда доступна на сайте. Все споры разрешаются в соответствии с законодательством Российской Федерации.</p>
            
            <h3 className="text-foreground font-semibold text-base">10. Контактная информация</h3>
            <p>ООО «Медикал Плюс»<br />ОГРН: 1234567890123<br />ИНН: 7700000000<br />Адрес: г. Москва, ул. Тверская, д. 15<br />Телефон: +7 (495) 123-45-67<br />Email: info@medical-plus.ru</p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function PersonalDataConsentModal({ isOpen, onClose }: LegalModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-heading text-primary">
            Согласие на обработку персональных данных
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p className="text-foreground font-medium">Дата последнего обновления: 30 марта 2026 г.</p>
            
            <p>Я, субъект персональных данных, в соответствии с Федеральным законом от 27 июля 2006 года №152-ФЗ «О персональных данных» предоставляю ООО «Медикал Плюс» (ОГРН 1234567890123, ИНН 7700000000, юридический адрес: г. Москва, ул. Тверская, д. 15) согласие на обработку моих персональных данных.</p>
            
            <h3 className="text-foreground font-semibold text-base">Перечень обрабатываемых данных:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Фамилия, имя, отчество</li>
              <li>Контактный телефон</li>
              <li>Адрес электронной почты</li>
              <li>Дата рождения</li>
              <li>Сведения о состоянии здоровья (при записи на приём)</li>
            </ul>
            
            <h3 className="text-foreground font-semibold text-base">Цели обработки:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Запись на приём и оказание медицинских услуг</li>
              <li>Связь для подтверждения и напоминания о записи</li>
              <li>Ведение медицинской документации</li>
              <li>Начисление бонусов по программе лояльности</li>
              <li>Информирование о новых услугах и акциях (при согласии)</li>
            </ul>
            
            <h3 className="text-foreground font-semibold text-base">Действия с данными:</h3>
            <p>Сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передача (предоставление, доступ), обезличивание, блокирование, удаление, уничтожение.</p>
            
            <h3 className="text-foreground font-semibold text-base">Срок действия согласия:</h3>
            <p>Настоящее согласие действует до момента его отзыва. Отзыв согласия осуществляется путём направления письменного заявления на адрес Клиники или по email: privacy@medical-plus.ru.</p>
            
            <p className="text-foreground font-medium mt-6">Нажимая кнопку «Отправить заявку» на формах сайта, я подтверждаю, что ознакомлен(а) с данным согласием и предоставляю свои персональные данные добровольно.</p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
