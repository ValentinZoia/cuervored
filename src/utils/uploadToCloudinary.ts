export async function uploadToCloudinary(file: File){
    const preset_name = "cphziwff";

    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", preset_name);
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        )

        if (!response.ok) {
            throw new Error("Failed to upload image");
        }

        const data = await response.json();
          // Asegurarse de usar HTTPS en la URL
          const secureUrl = data.url.replace(/^http:\/\//i, "https://");

          
          return { data: secureUrl, error: null };
        
    } catch (error) {
        return {data: null, error: "Failed to upload image"}
    }
}