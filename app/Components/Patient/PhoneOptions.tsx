import Phone from "../icons/Phone";
import WhatsApp from "../icons/WhatsApp";

type PhoneOptionsProps = {
  phone: string | null;
  hasWhatsapp: boolean | null;
  className?: string;
};

export default function PhoneOptions({
  phone,
  hasWhatsapp,
  className,
}: PhoneOptionsProps) {
  if (!phone) return null;

  return (
    <div className="flex items-center gap-2 max-sm:text-sm">
      {phone ? (
        <>
          <span className={className}>{phone}</span>

          <a href={`tel:${phone}`}>
            <Phone className="size-6 transition hover:stroke-secondary max-sm:size-5" />
          </a>

          {hasWhatsapp && (
            <a
              href={`https://wa.me/2${phone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsApp className="size-6 max-sm:size-5" />
            </a>
          )}
        </>
      ) : (
        <span className="text-secondary">لا يوجد رقم آخر</span>
      )}
    </div>
  );
}
