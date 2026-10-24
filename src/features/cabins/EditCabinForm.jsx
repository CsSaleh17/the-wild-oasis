import Form from "../../ui/Form";
import { useEditCabin } from "./useEditCabin";

function EditCabinForm({ cabin, onCloseModal }) {
  const { mutateEdit, isPending } = useEditCabin();
  function onSubmit(data) {
    if (typeof data.image === "object")
      mutateEdit(
        {
          id: data.id,
          newCabin: { ...data, image: data.image[0] },
        },
        { onSuccess: () => onCloseModal() },
      );
    else
      mutateEdit(
        { id: data.id, newCabin: data },
        { onSuccess: () => onCloseModal() },
      );
  }

  return (
    <Form
      onSubmit={onSubmit}
      isPending={isPending}
      isEditing={true}
      cabin={cabin}
      onCloseModal={onCloseModal}
    />
  );
}

export default EditCabinForm;
