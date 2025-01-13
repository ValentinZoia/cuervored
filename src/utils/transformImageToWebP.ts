import Resizer from "react-image-file-resizer";
import imageCompression from "browser-image-compression";

export const transformImageToWebp = async (file: File): Promise<File | null> => {
    try {
        // Opciones para browser-image-compression
        const options = {
            maxSizeMB: 0.5, // Tamaño máximo en MB
            maxWidthOrHeight: 900, // Máximo ancho/alto
            useWebWorker: true, // Usar Web Workers para mejor rendimiento
        };

        // Comprimir usando browser-image-compression
        const compressedFile = await imageCompression(file, options);

        return new Promise((resolve, reject) => {
            Resizer.imageFileResizer(
                compressedFile,
                900, // Ancho máximo
                900, // Alto máximo
                "WEBP", // Formato de salida
                80, // Calidad (puedes ajustarla según necesidad)
                0, // Rotación
                (uri) => {
                    resolve(new File([uri as Blob], file.name, { type: "image/webp" }));
                },
                "blob"
            );
        });
    } catch (error) {
        console.error("Error al transformar la imagen:", error);
        return null;
    }
};