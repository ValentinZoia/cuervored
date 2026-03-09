"use server";
/**
 * Script de scraping para obtener partidos de San Lorenzo
 * Uso: npx tsx scripts/scrape-matches.ts
 *
 * Este script se ejecuta desde GitHub Actions una vez por semana
 */

import prisma from "@/lib/prisma";
import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";

interface BasicMatchData {
    customId: string;
    date?: string;
    homeOrAway?: string;
    opponent?: string;
    opponentImage: string;
    time?: string;
    result?: string;
    isPastMatches: boolean;
}

async function scrapeMatches() {
    console.log("🚀 Iniciando scraping de partidos...");

    const isLocal = !!process.env.CHROME_EXECUTABLE_PATH;

    // Configure browser
    const browser = await puppeteer.launch({
        args: isLocal ? puppeteer.defaultArgs() : chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: isLocal
            ? process.env.CHROME_EXECUTABLE_PATH
            : await chromium.executablePath(),
        headless: chromium.headless,
    });

    try {
        // Create new page
        const page = await browser.newPage();

        // Set URL
        await page.goto("https://www.promiedos.com.ar/team/san-lorenzo/igf");

        // Wait for buttons
        await page.waitForSelector(".styles_toggle_button__MNpwf", {
            timeout: 1000,
        });

        // Get all buttons
        const buttons = await page.$$(".styles_toggle_button__MNpwf");
        if (!buttons.length) {
            console.warn("No se encontraron botones");
        }

        // Click each button and wait for transformation
        for (const button of buttons) {
            try {
                const isActive = await button.evaluate((el: Element) =>
                    el.classList.contains("styles_active__s3Kv8"),
                );

                if (!isActive) {
                    await button.click();

                    await page.waitForFunction(
                        (buttonEl: Element) =>
                            buttonEl.classList.contains("styles_active__s3Kv8"),
                        { timeout: 1000 },
                        button,
                    );
                }
            } catch (err) {
                console.error("Error al procesar botón:", err);
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
                                customId: `${cells[0]?.textContent
                                    ?.trim()
                                    .replace(
                                        "/",
                                        "-",
                                    )}-${cells[1]?.textContent?.trim()}-${cells[2]?.textContent
                                    ?.trim()
                                    .replace(/\s/g, "")}`,
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
                        }),
                    ),
        );

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
                                customId: `${cells[0]?.textContent
                                    ?.trim()
                                    .replace(
                                        "/",
                                        "-",
                                    )}-${cells[1]?.textContent?.trim()}-${cells[2]?.textContent
                                    ?.trim()
                                    .replace(/\s/g, "")}`,
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
                        }),
                    ),
        );

        await browser.close();

        const AllMatches: BasicMatchData[] = [
            ...LastMatches.reverse(),
            ...UpcomingMatches,
        ];

        console.log(
            `✅ Scraping completado: ${AllMatches.length} partidos obtenidos`,
        );

        // Save matches to database using upsert to avoid duplicates
        let savedCount = 0;
        let createdCount = 0;

        for (const match of AllMatches) {
            try {
                const existingMatch = await prisma.match.findUnique({
                    where: { customId: match.customId },
                });

                if (existingMatch) {
                    await prisma.match.update({
                        where: { customId: match.customId },
                        data: {
                            date: match.date,
                            homeOrAway: match.homeOrAway,
                            opponent: match.opponent,
                            opponentImage: match.opponentImage,
                            isPastMatches: match.isPastMatches,
                            result: match.result,
                            time: match.time,
                        },
                    });
                    savedCount++;
                } else {
                    await prisma.match.create({
                        data: {
                            customId: match.customId,
                            date: match.date,
                            homeOrAway: match.homeOrAway,
                            opponent: match.opponent,
                            opponentImage: match.opponentImage,
                            isPastMatches: match.isPastMatches,
                            result: match.result,
                            time: match.time,
                        },
                    });
                    createdCount++;
                }
            } catch (error) {
                console.error(
                    `❌ Error al guardar partido ${match.customId}:`,
                    error,
                );
            }
        }

        console.log(`✅ Base de datos actualizada:`);
        console.log(`   - Nuevos partidos: ${createdCount}`);
        console.log(`   - Partidos actualizados: ${savedCount}`);
        console.log(`   - Total: ${createdCount + savedCount}`);
    } catch (error) {
        console.error("❌ Error durante el scraping:", error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Execute if run directly
scrapeMatches()
    .then(() => {
        console.log("🎉 Scraping finalizado exitosamente");
        process.exit(0);
    })
    .catch((error) => {
        console.error("💥 Error fatal:", error);
        process.exit(1);
    });
