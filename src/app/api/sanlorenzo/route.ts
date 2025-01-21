// -----------WEB SCRAPPING-------------

import { BasicMatchData } from "@/types/Match";
import { NextRequest, NextResponse } from "next/server";
import { chromium } from "playwright";
import { late } from "zod";

export async function GET(req: NextRequest) {
  try {
    //abrimos navegador, pero con la config de que no lo haga con la ventana
    const browser = await chromium.launch({ headless: true });

    //creamos nueva pagina
    const page = await browser.newPage();

    //establecemos url
    await page.goto("https://www.promiedos.com.ar/team/san-lorenzo/igf");

    // Esperar a que los botones estén disponibles
    await page.waitForSelector(".styles_toggle_button__MNpwf", { timeout: 1000 });
    
    // Obtener todos los botones
    const buttons = await page.$$(".styles_toggle_button__MNpwf");

    // Hacer clic en cada botón y esperar su transformación
    for (const button of buttons) {
      try {
        // Verificar si el botón ya está activado
        const isActive = await button.evaluate((el) => 
          el.classList.contains('styles_active__s3Kv8')
        );

        if (!isActive) {
          await button.click();
          
          // Esperar a que el botón específico tenga la clase active
          await page.waitForFunction(
            (buttonEl) => buttonEl.classList.contains('styles_active__s3Kv8'),
            button,
            { timeout: 1000 }
          );
        }
      } catch (err) {
        console.error('Error al procesar botón:', err);
        continue; // Continuar con el siguiente botón si hay error
      }
    }

    //obtener los partidos proximos
    const UpcomingMatches:BasicMatchData[] = await page.$$eval(
      ".tbody_tablebody__cDt0I", // Selecciona todas las tablas con la clase
      (tables) =>
        Array.from(tables) // Convierte NodeList a Array para manipulación
          .slice(0, 1) // Solo toma las primeras dos tablas
          .flatMap((table) =>
            Array.from(table.querySelectorAll("tr")).map((row) => {
              const cells = row.querySelectorAll("td");

              return {
                id:`${cells[0]?.textContent?.trim().replace('/', '-')}-${cells[1]?.textContent?.trim()}-${cells[2]?.textContent?.trim()}`,//Ejemplo de un id: 25/01-L-Talleres
                date: cells[0]?.textContent?.trim(),
                homeOrAway: cells[1]?.textContent?.trim(),
                opponent: cells[2]?.textContent?.trim(),
                opponentImage: `${cells[2]
                  ?.querySelector("img")
                  ?.getAttribute("src")
                  ?.trim()}`,
                time: cells[3]?.textContent?.trim(),
                isPastMatches: false,
              };
            })
          )
    );

    //verificamos que haya Proximos partidos
    if (!UpcomingMatches.length)
      return NextResponse.json({
        error: "No se encontraron partidos",
        status: 500,
      });

      //Obtner los partidos pasados
    const LastMatches:BasicMatchData[] = await page.$$eval(
      ".tbody_tablebody__cDt0I", // Selecciona todas las tablas con la clase
      (tables) =>
        Array.from(tables) // Convierte NodeList a Array para manipulación
          .slice(1, 2) // Solo toma las primeras dos tablas
          .flatMap((table) =>
            Array.from(table.querySelectorAll("tr")).map((row) => {
              const cells = row.querySelectorAll("td");

              return {
                id:`${cells[0]?.textContent?.trim().replace('/', '-')}-${cells[1]?.textContent?.trim()}-${cells[2]?.textContent?.trim()}`,//Ejemplo de un id: 25/01-L-Talleres
                date: cells[0]?.textContent?.trim(),
                homeOrAway: cells[1]?.textContent?.trim(),
                opponent: cells[2]?.textContent?.trim(),
                opponentImage: `${cells[2]
                  ?.querySelector("img")
                  ?.getAttribute("src")
                  ?.trim()}`,
                result: cells[3]?.textContent?.trim(),
                isPastMatches: true,
              };
            })
          )
    );

    if(!LastMatches.length)
      return NextResponse.json({
        error: "No se encontraron partidos",
        status: 500,
      });

      

      const UpcomingMatchesSlice = UpcomingMatches.slice(0, 3);

      const LastMatchesSlice = LastMatches.reverse().slice(Math.max(0, LastMatches.length - 3));

    

    await browser.close();

    return NextResponse.json({ AllMatches:{ LastMatches: LastMatches.reverse(), UpcomingMatches: UpcomingMatches }, matchesFiltered: { LastMatches: LastMatchesSlice, UpcomingMatches: UpcomingMatchesSlice }, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error, status: 500 });
  }
}
