import useSWR from 'swr'

const fetcher = async (
    input: RequestInfo,
    init: RequestInit,
    ...args: any[]
  ) => {
    const res = await fetch(input, init);
    return res.json();
  };

export function useBubbleView () {
    const { data, error } = useSWR('/api/bubbles/view', fetcher)
  
    return {
      bubbles: data,
      isLoading: !error && !data,
      isError: error
    }
  }