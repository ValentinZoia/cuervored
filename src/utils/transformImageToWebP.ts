import Resizer from "react-image-file-resizer";

export const transformImageToWebp = async (file:File): Promise<File | null> =>{
        return new Promise((resolve, reject)=>{
                Resizer.imageFileResizer(
                    file,
                    800, //width
                    800, //height
                    "WEBP", //format
                    80, // quality
                    0, // rotation
                    (uri) =>{
                        resolve(new File([uri as Blob], file.name,{ type:"image/webp"}))
                    },
                    "blob"
                )
        })
}