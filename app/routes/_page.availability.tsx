import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { getDoctorAvailabilty } from "~/API/doctors_availability";
import FormModal from "~/Components/common/Modals/FormModal";
import RenderData from "~/Components/common/RenderData";
import Table from "~/Components/common/Table";
import AvailabilityForm from "~/Components/Forms/Availability/AvailabilityForm";
import { PageContext } from "~/Contexts/PageContext";
import useAuth from "~/hooks/useAuth";
import { getArabicDayName, getFormattedTime } from "~/lib/utils";

export default function AvailabilityPage() {
  const { addNewOpen, setAddNewOpen } = useContext(PageContext);

  const { userId } = useAuth();

  const { data, isFetching } = useQuery({
    queryKey: ["doctor_availability", "5a6cc0f9-cd61-4929-811f-0364fc66074c"],
    queryFn: () => getDoctorAvailabilty(userId!),
  });

  const availabilities = data?.data?.map(({ day, start_time, end_time }) => ({
    day: getArabicDayName(day),
    start_time: getFormattedTime(start_time),
    end_time: getFormattedTime(end_time),
  }));
  const isEmpty = availabilities?.length === 0;
  const columnHead = ["اليوم", "من", "إلى"];

  return (
    <>
      <RenderData {...{ isEmpty, isFetching }}>
        <Table data={availabilities ?? []} columnHead={columnHead} />
        <FormModal
          title="إضافة مواعد"
          isOpen={addNewOpen}
          setIsOpen={setAddNewOpen}
        >
          <AvailabilityForm doctorId={userId!} />
        </FormModal>
      </RenderData>
    </>
  );
}
