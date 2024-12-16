// -----------WEB SCRAPPING-------------

import { MatchesData } from "@/types/Match";
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
          result: cells[4]?.textContent?.trim(),
        };
      })
    );

    if (!AllMatches)
      return NextResponse.json({
        error: "No se encontraron partidos",
        status: 500,
      });

    const FindIndexLastMatch = AllMatches.findIndex(
      (match) => match?.result === "-"
    );

    const lastMatchIndex =
      FindIndexLastMatch === -1 ? AllMatches.length - 1 : FindIndexLastMatch;

    const LastMatches = AllMatches.slice(
      Math.max(0, lastMatchIndex - 1),
      lastMatchIndex + 1
    );

    const UpcomingMatches = AllMatches.filter((match) => match?.result === "-");

   

    await browser.close();

    return NextResponse.json({ AllMatches, matchesFiltered: { LastMatches, UpcomingMatches }, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error, status: 500 });
  }
}
