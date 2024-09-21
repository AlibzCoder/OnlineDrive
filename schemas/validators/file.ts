import vine from "@vinejs/vine";

export const CreateDirSchema = vine.object({
  name: vine.string()
});
