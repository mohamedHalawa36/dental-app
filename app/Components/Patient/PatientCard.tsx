import { useState } from "react";
import { isBeforeToday } from "~/lib/utils";
import { PATIENT_CARD_TYPES, type PatientCardProps } from "~/types/patientCard";
import FormModal from "../common/Modals/FormModal";
import AppointmentForm from "../Forms/AppointmentForms/AppointmentForm";
import Clock from "../icons/Clock";
import BookAppointmentBtn from "./buttons/BookAppointmentBtn";
import CancelAppointmentBtn from "./buttons/CancelAppointmentBtn";
import PatientOptions from "./PatientOptions";
import PhoneOptions from "./PhoneOptions";
import useAuth from "~/hooks/useAuth";
import PatientDetailsLink from "./PatientDetailsLink";
import Doctor from "../icons/Doctor";

export default function PatientCard(props: PatientCardProps) {
  const [isBookingAppointment, setIsBookingAppointment] = useState(false);
  const { patient, variant } = props;
  const { name, phone, phone_has_whatsapp } = patient;

  const isPatientVariant = variant === PATIENT_CARD_TYPES.PATIENT;
  const { isAdmin, isNurse } = useAuth();
  const canUpdatePatient = isNurse || isAdmin;
  const showPatientControls = isPatientVariant && canUpdatePatient;

  return (
    <div className="group flex h-fit w-full flex-col gap-5 rounded-xl bg-white px-3 py-4 transition duration-200 hover:shadow-md max-sm:gap-5">
      <div className="flex items-start justify-between gap-2 max-lg:justify-center max-lg:gap-2">
        <div className="flex flex-1 flex-col gap-1 text-foreground group-hover:text-primary">
          <h4 className="h-10 text-sm font-bold lg:h-12 lg:text-base">
            {name}
          </h4>
        </div>
        {!isPatientVariant && (
          <div className="flex flex-col items-end gap-0.5">
            <div className="flex items-center gap-0.5 text-xs font-semibold">
              {props.doctor.name}
              <Doctor className="size-5" />
            </div>
            <div className="flex items-center gap-1.5">
              {canUpdatePatient ? (
                !isBeforeToday(new Date(props.date)) ? (
                  <FormModal
                    title="تعديل موعد"
                    isOpen={isBookingAppointment}
                    setIsOpen={setIsBookingAppointment}
                    trigger={
                      <span className="inline-flex w-full self-start text-xs font-semibold text-primary transition-all hover:text-secondary hover:underline max-sm:text-xs">
                        تغيير
                      </span>
                    }
                  >
                    <AppointmentForm
                      {...{
                        setIsOpen: setIsBookingAppointment,
                        appointmentId: props.appointmentId,
                      }}
                    />
                  </FormModal>
                ) : null
              ) : null}
              <div className="-mb-1 flex items-center gap-1">
                <span
                  style={{ direction: "ltr" }}
                  className="text-sm font-medium text-foreground"
                >
                  {!isPatientVariant && props.time ? props.time : "--:--"}
                </span>
                <Clock className="-me-0.5 size-5" />
              </div>
            </div>
          </div>
        )}

        {showPatientControls && <PatientOptions patient={patient} />}
      </div>
      <div className="flex items-end justify-between max-lg:gap-2">
        <PhoneOptions phone={phone} hasWhatsapp={phone_has_whatsapp} />

        {!isPatientVariant ? (
          canUpdatePatient ? (
            !isBeforeToday(new Date(props.date)) ? (
              <CancelAppointmentBtn
                appointmentId={props.appointmentId}
                patientName={patient.name}
              />
            ) : null
          ) : (
            <PatientDetailsLink PatientId={patient.id} />
          )
        ) : null}
        {isPatientVariant ? (
          canUpdatePatient ? (
            <FormModal
              title="حجز موعد"
              isOpen={isBookingAppointment}
              setIsOpen={setIsBookingAppointment}
              trigger={<BookAppointmentBtn onClick={() => {}} />}
            >
              <AppointmentForm
                {...{
                  setIsOpen: setIsBookingAppointment,
                  patientData: patient,
                }}
              />
            </FormModal>
          ) : (
            <PatientDetailsLink PatientId={patient.id} />
          )
        ) : null}
      </div>
    </div>
  );
}
