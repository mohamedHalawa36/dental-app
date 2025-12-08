import Button from "~/Components/common/Button";
import CardsList from "~/Components/common/CardsList";
import FormModal from "~/Components/common/Modals/FormModal";
import RenderData from "~/Components/common/RenderData";
import Spinner from "~/Components/common/Spinner";
import PatientForm from "~/Components/Forms/PatientForms/PatientForm";
import PatientCard from "~/Components/Patient/PatientCard";
import useInfinitePatients from "~/hooks/useInfinitePatients";
import usePageContext from "~/hooks/usePageContext";
import { PATIENT_CARD_TYPES } from "~/types/patientCard";

export default function Patients() {
  const { addNewOpen, setAddNewOpen } = usePageContext();

  const {
    isPending,
    data,
    refetch,
    isError,
    hasNextPage,
    fetchNextPage,
    setPage,
    isFetchingNextPage,
  } = useInfinitePatients({
    pageSize: 15,
  });

  const patients = data?.pages.flatMap((page) => page.data);
  const isEmpty = patients?.length === 0;

  return (
    <>
      <RenderData {...{ isEmpty, isFetching: isPending, isError }}>
        <div className="flex h-full flex-col gap-3 overflow-auto max-sm:pb-3.5">
          <CardsList className="flex-1">
            {patients?.map((patient) => (
              <PatientCard
                key={patient?.id}
                variant={PATIENT_CARD_TYPES.PATIENT}
                patient={patient!}
              />
            ))}
            {hasNextPage && (
              <Button
                variant="secondary"
                className="col-span-full mx-auto my-1 flex w-full items-center justify-center rounded-lg border-slate-300 p-1.5 text-sm text-slate-600 shadow-md hover:text-primary hover:shadow-sm disabled:bg-background disabled:hover:bg-transparent sm:w-1/3"
                onClick={() => {
                  setPage((page) => page + 1);
                  fetchNextPage();
                }}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage ? (
                  <Spinner className="size-6" />
                ) : (
                  "تحميل المزيد"
                )}
              </Button>
            )}
          </CardsList>
        </div>
      </RenderData>

      <FormModal
        title="إضافة مريض"
        isOpen={addNewOpen}
        setIsOpen={setAddNewOpen}
        className=""
      >
        <PatientForm {...{ setIsOpen: setAddNewOpen, refetch }} />
      </FormModal>
    </>
  );
}
