export type Movie = {
  id: number,
  title: string,
  poster?: string | null,
  year?: number | null,
  genres?: { name: string }[]
}