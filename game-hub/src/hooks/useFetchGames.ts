import { useEffect, useState } from "react";
import { Game } from "../models/game";
import apiClient from "../services/api-client";
import { FetchGamesResponse } from "../models/fetchGamesRespose";
import { CanceledError } from "axios";

export const useFetchGames = (initialValue: Game[]) => {
  const [games, setGames] = useState<Game[]>(initialValue);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  const controller = new AbortController();

  useEffect(() => {
    apiClient
      .get<FetchGamesResponse>("/games", { signal: controller.signal })
      .then((res) => {
        setGames(res.data.results);
      })
      .catch((err) => {
        if (err instanceof CanceledError) {
          return;
        }
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => controller.abort();
  }, []);

  return { games, error, isLoading };
};
