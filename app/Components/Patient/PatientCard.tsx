import { useState } from "react";
import {
  PATIENT_CARD_TYPES,
  type PatientCardProps,
  type PhoneOptionsProps,
} from "~/types/patientCard";
import { Modal } from "../common/Modal";
import BookAppointmentForm from "../Forms/BookAppointmentForm";
import Clock from "../icons/Clock";
import Phone from "../icons/Phone";
import WhatsApp from "../icons/WhatsApp";
import BookAppointmentBtn from "./buttons/BookAppointmentBtn";
import CancelAppointmentBtn from "./buttons/CancelAppointmentBtn";
import ShowMoreBtn from "./buttons/ShowMoreBtn";

export default function PatientCard(props: PatientCardProps) {
  const [isBookingAppointment, setIsBookingAppointment] = useState(false);
  const { patient, variant, ...restProps } = props;
  const { name, phone1, phone1_has_whatsapp, phone2, phone2_has_whatsapp } =
    patient;

  const isPatientVariant = variant === PATIENT_CARD_TYPES.PATIENT;

  return (
    <div className="bg-white group max-lg:w-[12.85rem] w-[19rem] max-sm:w-48 shadow py-4 px-3 max-sm:px-3 rounded-xl flex flex-col gap-6 max-sm:gap-5 hover:shadow-md transition duration-300 hover:scale-[1.015]">
      <div className="flex gap-2 items-center max-lg:gap-2 lg:items-start justify-between max-lg:flex-col max-lg:justify-center">
        <div className="flex flex-1 flex-col gap-1 max-lg:items-center text-foreground group-hover:text-primary">
          <h4 className="font-bold text-sm lg:text-lg max-lg:text-center h-10 lg:h-14">
            {name}
          </h4>
        </div>
        {!isPatientVariant && (
          <div className="flex items-center gap-1">
            <span
              style={{ direction: "ltr" }}
              className="font-semibold text-sm text-foreground group-hover:text-primary"
            >
              {props.time ? restProps.time : "غير محدد"}
            </span>
            <Clock className="stroke-foreground group-hover:stroke-primary" />
          </div>
        )}

        {isPatientVariant && (
          <Modal
            title="حجز موعد"
            className="max-w-none lg:w-3/4 xl:w-1/2 w-10/12 max-md:max-h-[90%] md:h-fit overflow-hidden rounded-lg"
            isOpen={isBookingAppointment}
            toggle={(isOpen) => setIsBookingAppointment(isOpen ?? false)}
            trigger={
              <div>
                <BookAppointmentBtn />
              </div>
            }
          >
            <BookAppointmentForm
              {...{
                setIsOpen: setIsBookingAppointment,
                patientId: `${patient.id}`,
              }}
            />
          </Modal>
        )}
      </div>
      <div className="flex lg:items-end max-lg:gap-4 max-lg:flex-col justify-between">
        <div className="flex flex-col gap-5">
          <PhoneOptions phone={phone1} hasWhatsapp={phone1_has_whatsapp} />
          <PhoneOptions phone={phone2} hasWhatsapp={!!phone2_has_whatsapp} />
        </div>

        {!isPatientVariant && (
          <CancelAppointmentBtn
            appointmentId={props.appointmentId}
            patientName={patient.name}
          />
        )}
        {isPatientVariant && <ShowMoreBtn />}
      </div>
    </div>
  );
}

function PhoneOptions({ phone, hasWhatsapp }: PhoneOptionsProps) {
  return (
    <div className="flex items-center gap-2.5 max-sm:text-sm ">
      {phone ? (
        <>
          <span>{phone}</span>

          <a href={`tel:+2${phone}`}>
            <Phone className="size-6 -scale-x-[1] max-sm:size-5 hover:stroke-secondary transition max-sm:animate-wiggle" />
          </a>

          {hasWhatsapp && (
            <a
              href={`https://wa.me/2${phone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsApp className="size-6 max-sm:size-5 animate-scaleUpDown" />
            </a>
          )}
        </>
      ) : (
        <span className="text-secondary">لا يوجد رقم آخر</span>
      )}
    </div>
  );
}
