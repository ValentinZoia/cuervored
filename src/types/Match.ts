export interface MatchesData {
  matchesFiltered: {
    LastMatches: [
      {
        id:string;
        date: string | undefined;
       
        homeOrAway: string | undefined;
        opponent: string | undefined;
        isPastMatches: boolean | undefined;
        opponentImage: string | undefined;
        result: string | undefined;
      }
    ];
    UpcomingMatches: [
      {
        id:string;
        date: string | undefined;
    
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
        id:string;
        date: string | undefined;
       
        homeOrAway: string | undefined;
        opponent: string | undefined;
        isPastMatches: boolean | undefined;
        opponentImage: string | undefined;
        result: string | undefined;
      }
    ];
    UpcomingMatches: [
      {
        id:string;
        date: string | undefined;
       
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
  id:string;
  date: string | undefined;

  homeOrAway: string | undefined;
  opponent: string | undefined;
  opponentImage: string | undefined;
  isPastMatches: boolean | undefined;
  result?: string | undefined;
  time?: string | undefined;
}
