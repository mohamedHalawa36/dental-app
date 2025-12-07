import ChangeUserPasswordModal from "~/Components/Users/ChangeUserPasswordModal";

export default function settingsPage() {
  return (
    <ul className="list-disc py-4 max-sm:px-7">
      <li className="list-inside list-disc">
        <ChangeUserPasswordModal />
      </li>
    </ul>
  );
}
