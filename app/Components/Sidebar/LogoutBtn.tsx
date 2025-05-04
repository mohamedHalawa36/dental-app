import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { logoutUser } from "~/API/auth";
import LoadingOverlay from "../common/LoadingOverlay";
import Logout from "../icons/Logout";

export default function LogoutBtn() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => navigate("/login"),
  });

  return (
    <>
      <button
        onClick={() => mutate()}
        className="text-secondary font-bold flex gap-2.5 hover:bg-secondary/5 p-4 transition-all mt-auto mb-3"
      >
        الخروج
        <Logout />
      </button>
      {isPending && <LoadingOverlay />}
    </>
  );
}
