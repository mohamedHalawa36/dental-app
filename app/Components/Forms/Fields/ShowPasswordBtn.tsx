import EyeClose from "~/Components/icons/EyeClose";
import EyeOpen from "~/Components/icons/EyeOpen";
import { cn } from "~/lib/utils";

type ShowPassBtnProps = {
  isShown: boolean;
  handleClick: () => void;
  disabled?: boolean;
};

const ShowPasswordBtn = ({
  isShown,
  handleClick,
  disabled = false,
}: ShowPassBtnProps) => {
  const Icon = isShown ? EyeClose : EyeOpen;

  return (
    <button
      type="button"
      className="show-pass-btn order-2"
      onClick={handleClick}
      disabled={disabled}
    >
      <Icon className={cn("h-5 w-6 stroke-primary")} />
    </button>
  );
};

export default ShowPasswordBtn;
