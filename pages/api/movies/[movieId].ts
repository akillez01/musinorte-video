import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    await serverAuth(req, res);

    const { movieId } = req.query;

    // Verifica se movieId é uma string e não está vazia
    if (!movieId || typeof movieId !== 'string') {
      return res.status(400).json({ error: 'Invalid or Missing Id' });
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId
      }
    });

    // Verifica se um filme foi encontrado
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    return res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
