import { useState } from "react";
import { PATIENT_CARD_TYPES, type PatientCardProps } from "~/types/patientCard";
import { Modal } from "../common/Modal";
import BookAppointmentForm from "../Forms/BookAppointmentForm";
import Clock from "../icons/Clock";
import BookAppointmentBtn from "./buttons/BookAppointmentBtn";
import CancelAppointmentBtn from "./buttons/CancelAppointmentBtn";
import ShowMoreBtn from "./buttons/ShowMoreBtn";
import PhoneOptions from "./PhoneOptions";

export default function PatientCard(props: PatientCardProps) {
  const [isBookingAppointment, setIsBookingAppointment] = useState(false);
  const { patient, variant, ...restProps } = props;
  const { name, phone1, phone1_has_whatsapp, phone2, phone2_has_whatsapp } =
    patient;

  const isPatientVariant = variant === PATIENT_CARD_TYPES.PATIENT;

  return (
    <div className="bg-white h-fit group w-full py-4 px-3 rounded-xl flex flex-col gap-5 max-sm:gap-5 hover:shadow-md transition duration-200 hover:scale-[1.015]  ">
      <div className="flex gap-2 max-lg:gap-2 items-start justify-between max-lg:justify-center">
        <div className="flex flex-1 flex-col gap-1 text-foreground group-hover:text-primary">
          <h4 className="font-bold text-sm lg:text-base  h-10 lg:h-12">
            {name}
          </h4>
        </div>
        {!isPatientVariant && (
          <div className="flex items-center gap-1">
            <span
              style={{ direction: "ltr" }}
              className="font-semibold text-sm text-foreground"
            >
              {props.time ? restProps.time : "غير محدد"}
            </span>
            <Clock className="size-6 -me-0.5" />
          </div>
        )}

        {isPatientVariant && (
          <Modal
            title="حجز موعد"
            className="max-w-none lg:w-3/4 xl:w-1/2 w-10/12 max-md:max-h-[90%] md:h-fit overflow-hidden rounded-lg"
            isOpen={isBookingAppointment}
            toggle={(isOpen) => setIsBookingAppointment(isOpen ?? false)}
            trigger={<BookAppointmentBtn />}
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
      <div className="flex items-end max-lg:gap-2 justify-between">
        <div className="flex flex-col gap-4 ">
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
