import { AllMatchesData, MatchesData } from "@/types/Match";
import axios from "axios";
const urlProyect = process.env.NEXT_PUBLIC_URL;

const url = `${urlProyect}/api/sanlorenzo`;


export async function getUpcomingMatches(){
    try {
        const response = await axios.get<MatchesData>(url);

        if(!response || !response.data) throw new Error("Error fetching matches");

        
        return{
          matchesFiltered:{
            LastMatches: response.data.matchesFiltered.LastMatches,
            UpcomingMatches: response.data.matchesFiltered.UpcomingMatches
          }
        }

    } catch (error: any) {

        if (axios.isAxiosError(error)) {
          // Si el error es de Axios, revisa si hay una respuesta del servidor
          if (error.response) {
            console.error("Backend error:", error.response.data);
            // Retorna un mensaje específico dependiendo del status o el mensaje en data
            const message = error.response.data?.error || "Unexpected server error";
            throw new Error(message);
          } else if (error.request) {
            // Error en la solicitud pero no hubo respuesta
            console.error("No response received from server");
            throw new Error(
              "No response received from server. Please check your connection."
            );
          } else {
            // Error al configurar la solicitud
            console.error("Request setup error:", error.message);
            throw new Error("Error in request setup: " + error.message);
          }
    
    
    
        } else {
    
          // Error que no está relacionado con Axios (por ejemplo, errores de JavaScript)
          console.error("General error:", error);
          throw new Error(
            "An unexpected error occurred: " + (error.message || "Unknown error")
          );
        }
      }
}

export async function getAllMatches(){
  try {
    const response = await axios.get<AllMatchesData>(url);

    if(!response || !response.data) throw new Error("Error fetching matches");

    

    return response.data.AllMatches;

} catch (error: any) {

    if (axios.isAxiosError(error)) {
      // Si el error es de Axios, revisa si hay una respuesta del servidor
      if (error.response) {
        console.error("Backend error:", error.response.data);
        // Retorna un mensaje específico dependiendo del status o el mensaje en data
        const message = error.response.data?.error || "Unexpected server error";
        throw new Error(message);
      } else if (error.request) {
        // Error en la solicitud pero no hubo respuesta
        console.error("No response received from server");
        throw new Error(
          "No response received from server. Please check your connection."
        );
      } else {
        // Error al configurar la solicitud
        console.error("Request setup error:", error.message);
        throw new Error("Error in request setup: " + error.message);
      }



    } else {

      // Error que no está relacionado con Axios (por ejemplo, errores de JavaScript)
      console.error("General error:", error);
      throw new Error(
        "An unexpected error occurred: " + (error.message || "Unknown error")
      );
    }
  } 
}