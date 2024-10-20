import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import Publications from "./Publications";
import NewPostClient from "./NewPost/NewPostClient";

export default async function PublicationsServer() {
  // Obtén la sesión y el usuario desde el servidor
  const session = await auth();
  const user = await getUserById(session?.user?.id as string);

  // Pasamos NewPost al componente Publications como prop
  return (
    <>
      <Publications newPost={<NewPostClient user={user}/>} />
    </>
  );
}
