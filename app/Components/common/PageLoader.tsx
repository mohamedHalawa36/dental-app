import Tooth from "../icons/Tooth";

export default function PageLoader() {
  return (
    <div className="w-full flex flex-col gap-2 items-center  mt-10">
      <Tooth className="size-20 animate-wiggle" />
      <p className="font-semibold text-foreground">جاري التحميل</p>
    </div>
  );
}
