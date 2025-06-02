import { Match } from "@prisma/client";

export interface MatchesData {
  matchesFiltered: {
    LastMatches: BasicMatchData[];
    UpcomingMatches: BasicMatchData[];
  };
}

export interface AllMatchesData {
  AllMatches: {
    LastMatches: BasicMatchData[];
    UpcomingMatches: BasicMatchData[];
  };
}
export interface ResponseMatchesData extends AllMatchesData, MatchesData {}

export type BasicMatchData =  Match & {

}
