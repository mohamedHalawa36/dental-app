import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { useContext } from "react";
import { getDoctorAvailabilty } from "~/API/doctors_availability";
import DeleteAvailabilityModal from "~/Components/Availabilities/DeleteAvailabilityModal";
import UpdateAvailabilityModal from "~/Components/Availabilities/UpdateAvailabilityModal";
import FormModal from "~/Components/common/Modals/FormModal";
import RenderData from "~/Components/common/RenderData";
import Table from "~/Components/common/Table/Table";
import AvailabilityForm from "~/Components/Forms/Availability/AvailabilityForm";
import { PageContext } from "~/Contexts/PageContext";
import useAuth from "~/hooks/useAuth";
import { getArabicDayName, getFormattedTime } from "~/lib/utils";
import type { AvailabilityData } from "~/types/apiData";

export default function AvailabilityPage() {
  const { addNewOpen, setAddNewOpen } = useContext(PageContext);
  console.log(addNewOpen);

  const { userId } = useAuth();

  const { data, isFetching } = useQuery({
    queryKey: ["doctor_availability", "5a6cc0f9-cd61-4929-811f-0364fc66074c"],
    queryFn: () => getDoctorAvailabilty(userId!),
  });

  const availabilities = data?.data ?? [];
  const isEmpty = availabilities?.length === 0;
  const columns: ColumnDef<AvailabilityData>[] = [
    {
      accessorKey: "day",
      header: "اليوم",
      cell: ({ row }) => {
        const value = row.getValue("day") as string;
        return getArabicDayName(value);
      },
    },
    {
      accessorKey: "start_time",
      header: "من",
      cell: ({ row }) => {
        const value = row.getValue("start_time") as string;
        return getFormattedTime(value);
      },
    },
    {
      accessorKey: "end_time",
      header: "إلى",
      cell: ({ row }) => {
        const value = row.getValue("end_time") as string;
        return getFormattedTime(value);
      },
    },
    {
      header: "تعديل",
      cell: ({ row }) => {
        const recordId = row.original.id;

        return (
          <div className="flex items-center gap-1">
            <UpdateAvailabilityModal
              recordId={recordId}
              currAvailabilities={availabilities}
            />
            <DeleteAvailabilityModal availabilityId={recordId} />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <RenderData {...{ isEmpty, isFetching }}>
        <Table data={availabilities ?? []} columns={columns} />
      </RenderData>
      <FormModal
        title="إضافة مواعد"
        isOpen={addNewOpen}
        setIsOpen={setAddNewOpen}
      >
        <AvailabilityForm
          setIsOpen={setAddNewOpen}
          currAvailabilities={availabilities}
        />
      </FormModal>
    </>
  );
}
