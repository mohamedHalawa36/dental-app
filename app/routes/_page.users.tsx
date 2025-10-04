import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { getAllUsers } from "~/API/users";
import FormModal from "~/Components/common/Modals/FormModal";
import RenderData from "~/Components/common/RenderData";
import Table from "~/Components/common/Table/Table";
import UserForm from "~/Components/Forms/User/UserForm";
import Check from "~/Components/icons/Check";
import X from "~/Components/icons/X";
import ActivateUserModal from "~/Components/Users/ActivateUserModal";
import DeleteUserModal from "~/Components/Users/DeleteUserModal";
import usePageContext from "~/hooks/usePageContext";
import type { UserData } from "~/types/apiData";

export default function UsersPage() {
  const { addNewOpen, setAddNewOpen } = usePageContext();

  const { data, isFetching, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const users = data?.data ?? [];
  const isEmpty = users?.length === 0;
  const columns: ColumnDef<UserData>[] = [
    {
      accessorKey: "email",
      header: "البريد الإلكتروني",
    },
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
      header: "مسؤول",
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
      accessorKey: "is_active",
      header: "تفعيل",
      cell: ({ row }) => {
        const isAdmin = row.getValue("is_admin") as boolean;
        const isActive = row.getValue("is_active") as boolean;
        const userId = row.original.id;

        return (
          <ActivateUserModal
            disabled={isAdmin}
            active={isActive}
            userId={userId}
          />
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
      <RenderData {...{ isEmpty, isFetching, isError }}>
        <Table data={users ?? []} columns={columns} />
      </RenderData>
      <FormModal
        title="إضافة مستخدم"
        isOpen={addNewOpen}
        setIsOpen={setAddNewOpen}
      >
        <UserForm setIsOpen={setAddNewOpen} />
      </FormModal>
    </>
  );
}
