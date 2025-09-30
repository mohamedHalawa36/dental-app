import { Link } from "react-router";

export default function PatientDetailsLink({
  PatientId,
}: {
  PatientId: string;
}) {
  return (
    <></>
    // Disable patient page link until it's implemented
    // <Link
    //   to={`/patients/${PatientId}`}
    //   className="text-sm font-semibold text-primary transition-all hover:underline hover:underline-offset-4"
    // >
    //   تفاصيل
    // </Link>
  );
}
