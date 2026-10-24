import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error("Cabin can't be loaded.");

  return data;
}

async function bucketImage(cabinImage) {
  let image = cabinImage;
  if (typeof cabinImage === "object") {
    const imageName = `${Date.now()}-${cabinImage.name}`;

    const { error: storageError } = await supabase.storage
      .from("cabinsImages")
      .upload(imageName, cabinImage);

    if (storageError) throw new Error("Couldn't upload the image.");

    const {
      data: { publicUrl: imageURL },
    } = supabase.storage.from("cabinsImages").getPublicUrl(imageName);

    image = imageURL;
  }
  return image;
}

export async function createCabin(newCabin) {
  const newImage = await bucketImage(newCabin.image);

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: newImage }]);

  if (error) throw new Error("Couldn't create the new cabin");

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw new Error(error);
}

export async function editCabin(id, newCabin) {
  const image = await bucketImage(newCabin.image);
  const { error } = await supabase
    .from("cabins")
    .update({ ...newCabin, image })
    .eq("id", id);
  if (error) throw new Error(error.message);
}
