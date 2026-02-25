"use client";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/js/languages/fa.js";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import axiosInstance from "@/lib/axiosInstance";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

function Editor({ form }) {
  const config = {
    heightMin: 300,
    heightMax: 400,
    theme: "dark",
    direction: "rtl",
    language: "fa",
    imageUploadURL: "http://localhost:3000/api/v1/uploads/froala",
    imageUploadMethod: "POST",
    events: {
      "image.removed": async function (img) {
        const imagePath = img[0].src;
        try {
          await axiosInstance.delete(`/uploads/froala/`, {
            data: { url: imagePath },
          });
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
  return (
    <div className="w-full overflow-hidden my-6">
      <FormField
        name="description"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel> توضیحات کامل محصول را وارد کنید</FormLabel>
            <FormControl>
              <FroalaEditorComponent
                model={field.value || ""}
                onModelChange={(content: string) => field.onChange(content)}
                tag="textarea"
                config={config}
              />
            </FormControl>
            <FormDescription className="text-xs">
              میتوانید برای توضیحات خود عکس ایموجی , ایکون , تغییر سایز و رنگ
              انجام دهید
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default Editor;
