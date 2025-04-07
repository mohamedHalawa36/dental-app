import { Link } from "react-router";
import Phone from "../icons/Phone";
import WhatsApp from "../icons/WhatsApp";
import type { PhoneOptionsProps } from "~/types/patientCard";

export default function PhoneOptions({
  phone,
  hasWhatsapp,
}: PhoneOptionsProps) {
  return (
    <div className="flex items-center gap-2 max-sm:text-sm ">
      {phone ? (
        <>
          <span>{phone}</span>

          <a href={`tel:+2${phone}`}>
            <Phone className="size-6 max-sm:size-5 hover:stroke-secondary transition" />
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
