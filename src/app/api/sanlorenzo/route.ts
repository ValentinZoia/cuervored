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

    const matches = await page.$$eval(".fixclub tr", (rows) =>
      rows.slice(1).map((row) => {
        const cells = row.querySelectorAll("td");
        if (cells[4]?.textContent?.trim() === "-") {
          return {
            date: cells[0]?.textContent?.trim(),
            round: cells[1]?.textContent?.trim(),
            homeOrAway: cells[2]?.textContent?.trim(),
            opponent: cells[3]?.textContent?.trim(),
            result: cells[4]?.textContent?.trim(),
          };
        }
        return;
      })
    );

    const matchesFiltered = matches.filter(match => match?.result as string === '-');
    


    await browser.close();

    return NextResponse.json({ matchesFiltered, status: 500 });
  } catch (error) {
    return NextResponse.json({ error: error, status: 500 });
  }
}
