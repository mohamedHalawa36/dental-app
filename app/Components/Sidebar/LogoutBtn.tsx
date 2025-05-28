import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { logoutUser } from "~/API/auth";
import useAuth from "~/hooks/useAuth";
import LoadingOverlay from "../common/LoadingOverlay";
import Logout from "../icons/Logout";

export default function LogoutBtn() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setUser(null);
      navigate("/login");
    },
  });

  return (
    <>
      <button
        onClick={() => mutate()}
        className="mb-3 mt-auto flex gap-2.5 p-4 font-bold text-secondary transition-all hover:bg-secondary/5"
      >
        الخروج
        <Logout />
      </button>
      {isPending && <LoadingOverlay />}
    </>
  );
}
