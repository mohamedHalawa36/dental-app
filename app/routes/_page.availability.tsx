import { useQuery } from "@tanstack/react-query";
import { getDoctorAvailabilty } from "~/API/doctors_availability";

export default function AvailabilityPage() {
  const { data } = useQuery({
    queryKey: ["doctor_availability", "5a6cc0f9-cd61-4929-811f-0364fc66074c"],
    queryFn: () => getDoctorAvailabilty("5a6cc0f9-cd61-4929-811f-0364fc66074c"),
  });

  return <div>hhhhh</div>;
}
