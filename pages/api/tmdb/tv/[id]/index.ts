import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  const url = `${process.env.BASE_URL}/tv/${id}?api_key=${process.env.API_KEY}&language=en-US`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  res.status(response.status).json(await response.json());
}
