export interface MatchesData {
  matchesFiltered: {
    LastMatches: [
      {
        date: string | undefined;
        round: string | undefined;
        homeOrAway: string | undefined;
        opponent: string | undefined;
        result: string | undefined;
      }
    ];
    UpcomingMatches: [
      {
        date: string | undefined;
        round: string | undefined;
        homeOrAway: string | undefined;
        opponent: string | undefined;
        result: string | undefined;
      }
    ];
  };
}

export interface AllMatchesData {
  AllMatches: [
    {
      date: string | undefined;
      round: string | undefined;
      homeOrAway: string | undefined;
      opponent: string | undefined;
      result: string | undefined;
    }
  ];
}

export interface BasicMatchData{
      date: string | undefined;
      round: string | undefined;
      homeOrAway: string | undefined;
      opponent: string | undefined;
      result: string | undefined;
}
