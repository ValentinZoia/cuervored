/*
WEB SCRAPING
*/





import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { AllMatchesData, MatchesData, ResponseMatchesData } from "@/types/Match";


  // import chromium from "@sparticuz/chromium-min";
  // import puppeteer from "puppeteer-core";
  // import { BasicMatchData } from "@/types/Match";
  // import { Match } from "@prisma/client";
  // chromium.setGraphicsMode = false;




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
//                 date: cells[0]?.textContent?.trim() ,
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
//     await browser.close();
//     const AllMatches:BasicMatchData[] = [...LastMatches.reverse(), ...UpcomingMatches];

//     // Save matches to database using upsert to avoid duplicates
//     const savedMatches = [];

//     for(const match of AllMatches){
//       try {
//         const savedMatch = await prisma.match.upsert({
//           where: { 
//             customId:match.id 
//           },
//           update: {
//             date: match.date,
//             homeOrAway: match.homeOrAway,
//             opponent: match.opponent,
//             opponentImage: match.opponentImage,
//             isPastMatches: match.isPastMatches,
//             result: match.result,
//             time: match.time,
//           },
//           create: {
//             customId: match.id,
//             date: match.date,
//             homeOrAway: match.homeOrAway,
//             opponent: match.opponent,
//             opponentImage: match.opponentImage,
//             isPastMatches: match.isPastMatches,
//             result: match.result,
//             time: match.time,
//           },
//         });
//         savedMatches.push(savedMatch);
//       } catch (error) {
//         throw new Error(`Error al guardar partidos: ${error}`);
//       }
//     }


//     // Fetch all matches from database for response
//     const dbLastMatches = await prisma.match.findMany({
//       where: { isPastMatches: true },
//       orderBy: { createdAt: 'desc' }
//     });

//     const dbUpcomingMatches = await prisma.match.findMany({
//       where: { isPastMatches: false },
//       orderBy: { createdAt: 'asc' }
//     });

//     // Create filtered slices
//     const UpcomingMatchesSlice = dbUpcomingMatches.slice(0, 3);
//     const LastMatchesSlice = dbLastMatches.slice(0, 3).reverse();


    

//     return NextResponse.json({
//       AllMatches: {
//         LastMatches: LastMatches,
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
//   } finally{
//     await prisma.$disconnect();
//   }
// }


export async function GET(request: NextRequest) {
  try {
    // Fetch all matches from database for response
    const dbLastMatches = await prisma.match.findMany({
      where: { isPastMatches: true },
      orderBy: { createdAt: 'desc' }
    });

    const dbUpcomingMatches = await prisma.match.findMany({
      where: { isPastMatches: false },
      orderBy: { createdAt: 'asc' }
    });

    // Create filtered slices
    const UpcomingMatchesSlice = dbUpcomingMatches.slice(0, 3);
    const LastMatchesSlice = dbLastMatches.slice(0, 3).reverse();

    const dataResponse: ResponseMatchesData ={
      AllMatches: {
        LastMatches: dbLastMatches,
        UpcomingMatches: dbUpcomingMatches,
      },
      matchesFiltered: {
        LastMatches: LastMatchesSlice,
        UpcomingMatches: UpcomingMatchesSlice,
      },
    }
    

    return NextResponse.json(dataResponse);
  } catch (error) {
    return NextResponse.json({ 
      error: "Error al obtener los datos", 
      status: 500 
    });
  } finally{
    await prisma.$disconnect();
  }
}