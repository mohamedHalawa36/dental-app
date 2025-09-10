import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { useContext } from "react";
import { getAllUsers } from "~/API/users";
import RenderData from "~/Components/common/RenderData";
import Table from "~/Components/common/Table/Table";
import Check from "~/Components/icons/Check";
import X from "~/Components/icons/X";
import DeleteUserModal from "~/Components/Users/DeleteUserModal";
import { PageContext } from "~/Contexts/PageContext";
import useAuth from "~/hooks/useAuth";
import type { UserData } from "~/types/apiData";

export default function UsersPage() {
  const { addNewOpen, setAddNewOpen } = useContext(PageContext);

  const { userId } = useAuth();

  const { data, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const users = data?.data ?? [];
  const isEmpty = users?.length === 0;
  const columns: ColumnDef<UserData>[] = [
    {
      accessorKey: "name",
      header: "الاسم",
    },
    {
      accessorKey: "role",
      header: "الوظيفة",
      cell: ({ row }) => {
        const value = row.getValue("role") as string;
        const label = value === "doctor" ? "طبيب" : "ممرض";
        return label;
      },
    },
    {
      accessorKey: "is_admin",
      header: "Admin",
      cell: ({ row }) => {
        const isAdmin = row.getValue("is_admin") as string;

        return isAdmin ? (
          <Check className="stroke-green-600" />
        ) : (
          <X className="fill-red-600" />
        );
      },
    },
    {
      header: "تعديل",
      cell: ({ row }) => {
        const recordId = row.original.id;
        const isAdmin = row.original.is_admin;

        return (
          <div className="flex items-center gap-1">
            {/* <UpdateAvailabilityModal
              recordId={recordId}
              currAvailabilities={availabilities}
            /> */}
            {!isAdmin && <DeleteUserModal userId={recordId} />}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <RenderData {...{ isEmpty, isFetching }}>
        <Table data={users ?? []} columns={columns} />
      </RenderData>
      {/* <FormModal
        title="إضافة موعد"
        isOpen={addNewOpen}
        setIsOpen={setAddNewOpen}
      >
        <AvailabilityForm
          setIsOpen={setAddNewOpen}
          currAvailabilities={availabilities}
        />
      </FormModal> */}
    </>
  );
}
