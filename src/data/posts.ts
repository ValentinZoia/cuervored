
import { Post } from "@/types/Post";
import axios from "axios"



export const getPosts = async () => {
    try {
        const {data} = await axios.get<Post[]>("api/posts");
        console.log("tengo la data, hice el fetch")
        return data
    } catch (error) {
        throw new Error("Error fetching posts")
    }

    
}
