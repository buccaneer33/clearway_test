export interface Page {
  number: number,
  imageUrl: string
}

export interface PagesResponse {
  name: string;
  pages: Page[]
}
