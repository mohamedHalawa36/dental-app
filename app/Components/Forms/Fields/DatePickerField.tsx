import { Field, type FieldProps } from "formik";
import type { IFieldProps } from "~/types/components";
import FieldLayout from "./FieldLayout";
import { DateTimePicker } from "~/Components/common/DatePicker";
import { formatDate } from "~/utils/time";
import { cn } from "~/lib/utils";
import type { ComponentProps } from "react";

type DatePickerFieldProps = IFieldProps &
  ComponentProps<typeof DateTimePicker> & { name: string };

export default function DatePickerField({
  id,
  name,
  label,
  className,
  iconClassName,
  ...restProps
}: DatePickerFieldProps) {
  return (
    <Field name={name}>
      {({ field, meta, form }: FieldProps) => {
        const value = field.value;
        const hasError = meta.touched && !!meta.error;
        const { setFieldValue, setFieldTouched } = form;

        return (
          <FieldLayout
            id={id}
            label={label as string}
            error={hasError ? meta.error : undefined}
          >
            <DateTimePicker
              value={value ? new Date(value) : undefined}
              onChange={(date) => {
                const newDate = date ? new Date(date) : undefined;
                setFieldValue(name, date ? formatDate(newDate!) : undefined);
                setFieldTouched(name, true);
              }}
              granularity="day"
              className={cn(
                "z-[999] h-10 items-center rounded-xl border border-primary p-2 text-sm disabled:cursor-not-allowed",
                className,
                {
                  "border-red-500": hasError,
                },
              )}
              iconClassName={cn("!size-5 stroke-black", {
                "stroke-gray-400": !value,
                iconClassName,
              })}
              {...restProps}
            />
          </FieldLayout>
        );
      }}
    </Field>
  );
}
