import supabase from "./supabase";

export async function signup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user;
}

export async function updateUserInfo({ password, fullName, avatar }) {
  if (avatar) {
    const avatarName = `avatar-${Math.random() * Date.now()}`;
    const { error } = await supabase.storage
      .from("avatars")
      .upload(avatarName, avatar);
    if (error) throw new Error(error.message);

    const {
      data: { publicUrl: avatarBucket },
    } = supabase.storage.from("avatars").getPublicUrl(avatarName);

    avatar = avatarBucket;
  }

  let updatedUser;
  if (password) updatedUser = { password };
  if (fullName) updatedUser = { data: { fullName, avatar } };

  const { data, error } = await supabase.auth.updateUser(updatedUser);

  if (error) throw new Error(error.message);

  return data;
}
