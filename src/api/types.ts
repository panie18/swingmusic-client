export type User = {
  id?: string;
  username?: string;
  email?: string;
};

export type Artist = {
  name: string;
  artistHash?: string;
  image?: string;
};

export type Album = {
  albumHash?: string;
  title?: string;
  image?: string;
  year?: number;
};

export type Track = {
  trackHash: string;
  title: string;
  duration: number; // ms
  bitrate?: number;
  filepath: string;
  image?: string;
  album?: Album;
  trackArtists: Artist[];
};

export type FavoritesSummary = {
  tracks: Track[];
  albums: any[];
  artists: any[];
};

export type LogInResult = {
  accessToken: string;
  refreshToken: string;
  maxAge: number;
};

export type Lyrics = {
  synced: boolean;
  lines: { timeMs: number; text: string }[];
  raw?: string;
};