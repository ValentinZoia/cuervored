
import { Post } from "@/types/Post";
import axios from "axios"



export const getPosts = async () => {
    const {data} = await axios.get<Post[]>("api/posts");
    return data
}
