import Resizer from "react-image-file-resizer";
import imageCompression from "browser-image-compression";

type ImageType = "profileSmall" | "profileLarge" | "post";

export const transformImageToWebp = async (
    file: File,
    type: ImageType
): Promise<File | null> => {
    try {
        // Configurar dimensiones según el tipo de imagen
        const dimensions = {
            profileSmall: { width: 40, height: 40 },    // Para imagen de perfil en publicaciones
            profileLarge: { width: 100, height: 100 },  // Para imagen en página de perfil
            post: { width: 500, height: 900 }          // Para publicaciones
        };

        const { width: maxWidth, height: maxHeight } = dimensions[type];

        // Opciones para browser-image-compression
        const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: maxWidth,
            useWebWorker: true,
        };

        // Comprimir usando browser-image-compression
        const compressedFile = await imageCompression(file, options);

        return new Promise((resolve, reject) => {
            Resizer.imageFileResizer(
                compressedFile,
                maxWidth,
                maxHeight,
                "WEBP",
                80, // Calidad
                0, // Rotación
                (uri) => {
                    resolve(new File([uri as Blob], file.name, { type: "image/webp" }));
                },
                "blob",
                maxWidth, // Ancho fijo
                maxHeight // Alto fijo
            );
        });
    } catch (error) {
        console.error("Error al transformar la imagen:", error);
        return null;
    }
};