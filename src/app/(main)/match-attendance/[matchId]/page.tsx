import MatchAttendanceCard from "@/components/MatchAttendance/MatchAttendanceCard";
import { localStorageData } from "@/components/UpcomingMatches/mutation";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

type MetaDataProps = {
  params: Promise<{ matchId: string }>;
};

//Definimos la metadata dinamica de la página
export async function generateMetadata({
  params,
}: MetaDataProps): Promise<Metadata> {
  const matchId = (await params).matchId;

  if (!matchId) {
    notFound();
  }

  const parts = matchId.split("-");
  const date = `${parts[0]}-${parts[1]}`;
  const opponent = parts[3];

  return {
    title: `San Lorenzo vs ${opponent} ${date}`,
    description: `Lista de asistentes del partido de San Lorenzo vs ${opponent} el dia ${date}`,
    openGraph: {
      title: `San Lorenzo vs ${opponent} ${date}`,
      description: `Lista de asistentes del partido de San Lorenzo vs ${opponent} el dia ${date}`,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_URL}/matchAttendance/${matchId}`,
      siteName: "CuervoRed",
    },
  };
}

export default function MatchAttendancepage({
  params,
}: {
  params: { matchId: string };
}) {
  if (!params.matchId) {
    return notFound();
  }

  return <MatchAttendanceCard matchId={params.matchId} />;
}
