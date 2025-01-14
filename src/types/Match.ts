export interface MatchesData {
  matchesFiltered: {
    LastMatches: [
      {
        date: string | undefined;
        round: string | undefined;
        homeOrAway: string | undefined;
        opponent: string | undefined;
        isPastMatches: boolean | undefined;
        opponentImage: string | undefined;
        result: string | undefined;
      }
    ];
    UpcomingMatches: [
      {
        date: string | undefined;
        round: string | undefined;
        homeOrAway: string | undefined;
        opponent: string | undefined;
        isPastMatches: boolean | undefined;
        opponentImage: string | undefined;
        time: string | undefined;
      }
    ];
  };
}

export interface AllMatchesData {
  AllMatches: {
    LastMatches: [
      {
        date: string | undefined;
        round: string | undefined;
        homeOrAway: string | undefined;
        opponent: string | undefined;
        isPastMatches: boolean | undefined;
        opponentImage: string | undefined;
        result: string | undefined;
      }
    ];
    UpcomingMatches: [
      {
        date: string | undefined;
        round: string | undefined;
        homeOrAway: string | undefined;
        opponent: string | undefined;
        isPastMatches: boolean | undefined;
        opponentImage: string | undefined;
        time: string | undefined;
      }
    ];
  };
}

export interface BasicMatchData {
  date: string | undefined;
  round: string | undefined;
  homeOrAway: string | undefined;
  opponent: string | undefined;
  opponentImage: string | undefined;
  isPastMatches: boolean | undefined;
  result?: string | undefined;
  time?: string | undefined;
}
