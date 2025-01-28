/*
WEB SCRAPING
*/
// import { BasicMatchData } from "@/types/Match";
// import { NextRequest, NextResponse } from "next/server";
// import chromium from "@sparticuz/chromium-min";
// import puppeteer from "puppeteer-core";

import { BasicMatchData } from "@/types/Match";
import { NextRequest, NextResponse } from "next/server";


  
//   chromium.setGraphicsMode = false;




// export async function GET(req: NextRequest) {
//   try {
   
//     const isLocal = !!process.env.CHROME_EXECUTABLE_PATH;
    
    
//     // Configure browser
//     const browser = await puppeteer.launch({
//       args: isLocal ? puppeteer.defaultArgs() : chromium.args,
//     defaultViewport: chromium.defaultViewport,
//     executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath('https://<Bucket Name>.s3.amazonaws.com/chromium-v126.0.0-pack.tar'),
//     headless: chromium.headless,
//     });
    
    

//     // Create new page
//     const page = await browser.newPage();

//     // Set URL
//     await page.goto("https://www.promiedos.com.ar/team/san-lorenzo/igf");

//     // Wait for buttons
//     await page.waitForSelector(".styles_toggle_button__MNpwf", {
//       timeout: 1000,
//     });

//     // Get all buttons
//     const buttons = await page.$$(".styles_toggle_button__MNpwf");
//     if (!buttons.length) {
//       console.warn("No se encontraron botones");
//     }

//     // Click each button and wait for transformation
//     for (const button of buttons) {
//       try {
//         const isActive = await button.evaluate((el: Element) =>
//           el.classList.contains("styles_active__s3Kv8")
//         );

//         if (!isActive) {
//           await button.click();

//           await page.waitForFunction(
//             (buttonEl: Element) =>
//               buttonEl.classList.contains("styles_active__s3Kv8"),
//             { timeout: 1000 },
//             button
//           );
//         }
//       } catch (err) {
//         console.error("Error al procesar botón:", err);
//         continue;
//       }
//     }

//     // Get upcoming matches
//     const UpcomingMatches: BasicMatchData[] = await page.$$eval(
//       ".tbody_tablebody__cDt0I",
//       (tables) =>
//         Array.from(tables)
//           .slice(0, 1)
//           .flatMap((table) =>
//             Array.from(table.querySelectorAll("tr")).map((row) => {
//               const cells = row.querySelectorAll("td");

//               return {
//                 id: `${cells[0]?.textContent
//                   ?.trim()
//                   .replace(
//                     "/",
//                     "-"
//                   )}-${cells[1]?.textContent?.trim()}-${cells[2]?.textContent
//                   ?.trim()
//                   .replace(/\s/g, "")}`,
//                 date: cells[0]?.textContent?.trim(),
//                 homeOrAway: cells[1]?.textContent?.trim(),
//                 opponent: cells[2]?.textContent?.trim(),
//                 opponentImage: `${cells[2]
//                   ?.querySelector("img")
//                   ?.getAttribute("src")
//                   ?.trim()}`,
//                 time: cells[3]?.textContent?.trim(),
//                 isPastMatches: false,
//               };
//             })
//           )
//     );

//     if (!UpcomingMatches.length) {
//       return NextResponse.json({
//         error: "No se encontraron partidos",
//         status: 500,
//       });
//     }

//     // Get past matches
//     const LastMatches: BasicMatchData[] = await page.$$eval(
//       ".tbody_tablebody__cDt0I",
//       (tables) =>
//         Array.from(tables)
//           .slice(1, 2)
//           .flatMap((table) =>
//             Array.from(table.querySelectorAll("tr")).map((row) => {
//               const cells = row.querySelectorAll("td");

//               return {
//                 id: `${cells[0]?.textContent
//                   ?.trim()
//                   .replace(
//                     "/",
//                     "-"
//                   )}-${cells[1]?.textContent?.trim()}-${cells[2]?.textContent
//                   ?.trim()
//                   .replace(/\s/g, "")}`,
//                 date: cells[0]?.textContent?.trim(),
//                 homeOrAway: cells[1]?.textContent?.trim(),
//                 opponent: cells[2]?.textContent?.trim(),
//                 opponentImage: `${cells[2]
//                   ?.querySelector("img")
//                   ?.getAttribute("src")
//                   ?.trim()}`,
//                 result: cells[3]?.textContent?.trim(),
//                 isPastMatches: true,
//               };
//             })
//           )
//     );

//     if (!LastMatches.length) {
//       return NextResponse.json({
//         error: "No se encontraron partidos",
//         status: 500,
//       });
//     }
    

//     const UpcomingMatchesSlice = UpcomingMatches.slice(0, 3);
//     const LastMatchesSlice = LastMatches.reverse().slice(
//       Math.max(0, LastMatches.length - 3)
//     );

//     await browser.close();

//     return NextResponse.json({
//       AllMatches: {
//         LastMatches: LastMatches.reverse(),
//         UpcomingMatches: UpcomingMatches,
//       },
//       matchesFiltered: {
//         LastMatches: LastMatchesSlice,
//         UpcomingMatches: UpcomingMatchesSlice,
//       },
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Error al obtener datos:", error);
//     return NextResponse.json({ error: error, status: 500 });
//   }
// }

type MatchesDataType = {
  AllMatches: {
    LastMatches: BasicMatchData[];
    UpcomingMatches: BasicMatchData[];
  };
  matchesFiltered: {
    LastMatches: BasicMatchData[];
    UpcomingMatches: BasicMatchData[];
  };
}

const matchesData: MatchesDataType = {
  AllMatches: {
    LastMatches: [
      {
        id: "2024-01-15-Home-Barcelona",
        date: "2024-01-15",
        homeOrAway: "Home",
        opponent: "Barcelona",
        opponentImage: "https://example.com/barcelona.png",
        result: "2-1",
        isPastMatches: true
      },
      {
        id: "2024-01-08-Away-RealMadrid",
        date: "2024-01-08",
        homeOrAway: "Away", 
        opponent: "Real Madrid",
        opponentImage: "https://example.com/real-madrid.png",
        result: "0-3",
        isPastMatches: true
      }
    ],
    UpcomingMatches: [
      {
        id: "2024-02-01-Home-Valencia",
        date: "2024-02-01",
        homeOrAway: "Home",
        opponent: "Valencia",
        opponentImage: "https://example.com/valencia.png",
        result: "VS",
        isPastMatches: false
      },
      {
        id: "2024-02-08-Away-Sevilla",
        date: "2024-02-08",
        homeOrAway: "Away",
        opponent: "Sevilla",
        opponentImage: "https://example.com/sevilla.png", 
        result: "VS",
        isPastMatches: false
      }
    ]
  },
  matchesFiltered: {
    LastMatches: [
      {
        id: "2024-01-15-Home-Barcelona",
        date: "2024-01-15",
        homeOrAway: "Home", 
        opponent: "Barcelona",
        opponentImage: "https://example.com/barcelona.png",
        result: "2-1",
        isPastMatches: true
      }
    ],
    UpcomingMatches: [
      {
        id: "2024-02-08-Away-Sevilla",
        date: "2024-02-01",
        homeOrAway: "Home",
        opponent: "Valencia", 
        opponentImage: "https://example.com/valencia.png",
        result: "VS",
        isPastMatches: false
      }
    ]
  }
}

const LastMatches = matchesData.AllMatches.LastMatches;
const UpcomingMatches = matchesData.AllMatches.UpcomingMatches;
const LastMatchesSlice = matchesData.matchesFiltered.LastMatches;
const UpcomingMatchesSlice = matchesData.matchesFiltered.UpcomingMatches;

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
            AllMatches: {
              LastMatches: LastMatches.reverse(),
              UpcomingMatches: UpcomingMatches,
            },
            matchesFiltered: {
              LastMatches: LastMatchesSlice,
              UpcomingMatches: UpcomingMatchesSlice,
            },
            status: 200,
          });
  } catch (error) {
    return NextResponse.json({ 
      error: "Error al obtener los datos", 
      status: 500 
    });
  }
}