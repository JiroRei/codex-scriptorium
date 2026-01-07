import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function useArtwork() {
  return useQuery<any[]>({
    queryKey: ['artwork'],
    queryFn: async () => {
      const res = await fetch('/api/artwork');
      
      if (!res.ok) {
        throw new Error('Failed to fetch artwork');
      }
      
      return res.json();
    },
  });
}

export function useArtworkById(id: string) {
  return useQuery<any>({
    queryKey: ['artwork', id],
    queryFn: async () => {
      const res = await fetch(`/api/artwork/${id}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch artwork');
      }
      
      return res.json();
    },
  });
}