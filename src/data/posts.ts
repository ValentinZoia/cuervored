
import { Post } from "@/types/Post";
import axios from "axios"



export const getPosts = async () => {
    try {
        const {data} = await axios.get<Post[]>("api/posts");
        
        if(!data) throw new Error("Error fetching posts")
        return data
    } catch (error) {
        throw new Error("Error fetching posts")
    }

    
}
