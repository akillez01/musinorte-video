import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { currentUser } = await serverAuth(req, res);
    const { movieId } = req.body;

    if (!movieId) {
      return res.status(400).json({ error: 'Movie ID is required' });
    }

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      }
    });

    if (!existingMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    switch (req.method) {
      case 'POST':
        const user = await prismadb.user.update({
          where: {
            email: currentUser.email || '',
          },
          data: {
            favoriteIds: {
              push: movieId
            }
          }
        });
        return res.status(200).json(user);

      case 'DELETE':
        const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

        const updatedUser = await prismadb.user.update({
          where: {
            email: currentUser.email || '',
          },
          data: {
            favoriteIds: updatedFavoriteIds,
          }
        });
        return res.status(200).json(updatedUser);

      default:
        return res.status(405).end(); // Método não permitido
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
}
