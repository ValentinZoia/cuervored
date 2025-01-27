import { BasicMatchData } from "@/types/Match";
import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export async function GET(req: NextRequest) {
  try {
    // Configure browser
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: true,
      ignoreHTTPSErrors: true,
    });

    // Create new page
    const page = await browser.newPage();

    // Set URL
    await page.goto("https://www.promiedos.com.ar/team/san-lorenzo/igf");

    // Wait for buttons
    await page.waitForSelector(".styles_toggle_button__MNpwf", { timeout: 1000 });
    
    // Get all buttons
    const buttons = await page.$$(".styles_toggle_button__MNpwf");

    // Click each button and wait for transformation
    for (const button of buttons) {
      try {
        const isActive = await button.evaluate((el: Element) => 
          el.classList.contains('styles_active__s3Kv8')
        );

        if (!isActive) {
          await button.click();
          
          await page.waitForFunction(
            (buttonEl: Element) => buttonEl.classList.contains('styles_active__s3Kv8'),
            { timeout: 1000 },
            button
          );
        }
      } catch (err) {
        console.error('Error al procesar botón:', err);
        continue;
      }
    }

    // Get upcoming matches
    const UpcomingMatches: BasicMatchData[] = await page.$$eval(
      ".tbody_tablebody__cDt0I",
      (tables) =>
        Array.from(tables)
          .slice(0, 1)
          .flatMap((table) =>
            Array.from(table.querySelectorAll("tr")).map((row) => {
              const cells = row.querySelectorAll("td");

              return {
                id: `${cells[0]?.textContent?.trim().replace('/', '-')}-${cells[1]?.textContent?.trim()}-${cells[2]?.textContent?.trim().replace(/\s/g, '')}`,
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

    if (!UpcomingMatches.length) {
      return NextResponse.json({
        error: "No se encontraron partidos",
        status: 500,
      });
    }

    // Get past matches
    const LastMatches: BasicMatchData[] = await page.$$eval(
      ".tbody_tablebody__cDt0I",
      (tables) =>
        Array.from(tables)
          .slice(1, 2)
          .flatMap((table) =>
            Array.from(table.querySelectorAll("tr")).map((row) => {
              const cells = row.querySelectorAll("td");

              return {
                id: `${cells[0]?.textContent?.trim().replace('/', '-')}-${cells[1]?.textContent?.trim()}-${cells[2]?.textContent?.trim().replace(/\s/g, '')}`,
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

    if (!LastMatches.length) {
      return NextResponse.json({
        error: "No se encontraron partidos",
        status: 500,
      });
    }

    const UpcomingMatchesSlice = UpcomingMatches.slice(0, 3);
    const LastMatchesSlice = LastMatches.reverse().slice(Math.max(0, LastMatches.length - 3));

    await browser.close();

    return NextResponse.json({ 
      AllMatches: { 
        LastMatches: LastMatches.reverse(), 
        UpcomingMatches: UpcomingMatches 
      }, 
      matchesFiltered: { 
        LastMatches: LastMatchesSlice, 
        UpcomingMatches: UpcomingMatchesSlice 
      }, 
      status: 200 
    });
  } catch (error) {
    return NextResponse.json({ error: error, status: 500 });
  }
}