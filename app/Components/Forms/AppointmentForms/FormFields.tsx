import InputField from "../Fields/InputField";
import SelectField from "../Fields/SelectField";
import { useQuery } from "@tanstack/react-query";
import { getAllDoctors } from "~/API/doctors";
import { useFormikContext } from "formik";
import type { BookAppointmentFormValues } from "./schemas";
import { getDoctorAvailabilty } from "~/API/doctors_availability";
import { useEffect, useMemo } from "react";
import { formatDate } from "~/utils/time";

export default function FormFields({ patientName }: { patientName: string }) {
  const { isFetching: isDoctorsFetching, data: doctors } = useQuery({
    queryKey: ["patients-select"],
    queryFn: () => getAllDoctors(),
    select: (data) => data.data,
  });

  const doctorsOptions =
    doctors?.map((doctor) => ({
      label: doctor.name,
      value: `${doctor.id}`,
    })) ?? [];

  const { values, setFieldValue, setFieldError } =
    useFormikContext<BookAppointmentFormValues>();

  const doctorId = values.doctor_id;

  const {
    data: availabilities,
    refetch: refetchAvailability,
    isFetching: isFetchingAvailabilities,
  } = useQuery({
    queryKey: ["availability", doctorId],
    queryFn: () => getDoctorAvailabilty(doctorId),
    select: (data) => data.data,
    enabled: !!doctorId,
  });

  useEffect(() => {
    if (doctorId) refetchAvailability();
  }, [refetchAvailability, doctorId]);

  const availableDays = useMemo(
    () => availabilities?.map((av) => +av.day),
    [availabilities],
  );

  useEffect(() => {
    setFieldValue("availableDays", availableDays);

    setFieldError("date", undefined);
    setFieldError("time", undefined);
  }, [availableDays, setFieldError, setFieldValue]);

  const isDateTimeDisabled = !!doctorId && availableDays?.length === 0;
  const selectedDate = values.date;

  return (
    <>
      <InputField
        label="اسم المريض"
        name="patientId"
        value={patientName}
        defaultValue={patientName}
        disabled={true}
        className="[&>div>input]:!opacity-100"
      />

      <SelectField
        options={doctorsOptions}
        label="الطبيب"
        name="doctor_id"
        isDisabled={isDoctorsFetching}
        placeholder={isDoctorsFetching ? ". . . جاري التحميل" : "اختر طبيب"}
      />

      <InputField
        label="التاريخ"
        name="date"
        type="date"
        value={selectedDate}
        placeholder="اختر تاريخ"
        disabled={isFetchingAvailabilities || isDateTimeDisabled}
        min={formatDate(new Date())}
      />
      <InputField
        label="الوقت"
        name="time"
        type="time"
        step={900}
        disabled={isFetchingAvailabilities || isDateTimeDisabled}
        optional
      />
    </>
  );
}
