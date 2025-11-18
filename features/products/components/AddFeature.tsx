import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { useFieldArray } from "react-hook-form";

function AddFeatures({ form }) {
  const { append, fields, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  return (
    <div className="space-y-4 mt-5">
      {fields.map((field, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-5 lg:flex-row lg:items-center"
        >
          <Input
            placeholder="نام ویژگی"
            {...form.register(`features.${index}.key`)}
          />

          <Input
            placeholder="مقدار ویژگی"
            {...form.register(`features.${index}.value`)}
          />
          <Button
            onClick={() => remove(index)}
            size="icon-sm"
            variant="outline"
          >
            <Trash size="28" className="text-red-500" />
          </Button>
        </div>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => append({ key: "", value: "" })}
      >
        اضافه کردن ویژگی های محصول
      </Button>
    </div>
  );
}

export default AddFeatures;
