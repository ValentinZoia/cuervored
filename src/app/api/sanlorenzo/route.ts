// -----------WEB SCRAPPING-------------


import { NextRequest, NextResponse } from "next/server";
import { chromium } from "playwright";

export async function GET(req: NextRequest) {
  try {
    //abrimos navegador, pero con la config de que no lo haga con la ventana
    const browser = await chromium.launch({ headless: true });

    //creamos nueva pagina
    const page = await browser.newPage();

    //establecemos url
    await page.goto("https://www.promiedos.com.ar/club=19");

    const AllMatches = await page.$$eval(".fixclub tr", (rows) =>
      rows.slice(1).map((row) => {
        const cells = row.querySelectorAll("td");

        return {
          date: cells[0]?.textContent?.trim(),
          round: cells[1]?.textContent?.trim(),
          homeOrAway: cells[2]?.textContent?.trim(),
          opponent: cells[3]?.textContent?.trim(),
          opponentImage: `https://www.promiedos.com.ar/${cells[3]?.querySelector("img")?.getAttribute("src")?.trim()}`,
          result: cells[4]?.textContent?.trim(),
        };
      })
    );

    //verificamos que haya partidos
    if (!AllMatches)
      return NextResponse.json({
        error: "No se encontraron partidos",
        status: 500,
      });

    // buscamos el indice del proximo partido a jugar.
    const FindIndexLastMatch = AllMatches.findIndex(
      (match) => match?.result === "-"
    );

    //si no hay proximo partido a jugar, tomamos el ultimo partido
    const lastMatchIndex =
      FindIndexLastMatch === -1 ? AllMatches.length - 1 : FindIndexLastMatch;

    //tomamos solo los ultimos dos partidos que se jugaron
    const LastMatches = AllMatches.slice(
      Math.max(0, lastMatchIndex - 1),
      lastMatchIndex + 1
    );

    //tomamos solo los proximos partidos que no se jugaron aun.
    const UpcomingMatches = AllMatches.filter((match) => match?.result === "-");

   

    await browser.close();

    return NextResponse.json({ AllMatches, matchesFiltered: { LastMatches, UpcomingMatches }, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error, status: 500 });
  }
}
