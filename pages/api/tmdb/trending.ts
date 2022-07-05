import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { page } = req.query
  const url = `${process.env.BASE_URL}/trending/all/day?api_key=${process.env.API_KEY}&page=${!isNaN(Number(page)) ? page : 1}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  res.status(response.status).json(await response.json())
}
