import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { genre, page } = req.query;

  const url =
    `${process.env.BASE_URL}/discover/movie?api_key=${process.env.API_KEY}` +
    `&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&` +
    `with_watch_monetization_types=flatrate&with_genres=${
      !isNaN(Number(genre)) ? genre : ""
    }&page=${!isNaN(Number(page)) ? page : 1}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  res.status(response.status).json(await response.json());
}
