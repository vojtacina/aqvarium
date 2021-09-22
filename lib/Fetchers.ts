import useSWR from 'swr'

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

export function useBubbleView() {
  const { data, error } = useSWR('/api/bubbles/view', fetcher)

  return {
    bubbles: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useBubble(id:number|string|string[]) {
  const { data, error } = useSWR(`/api/bubbles/find/${id}`, fetcher, {refreshInterval: 1000})

  return {
    story: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useUserDetails() {
  const { data, error } = useSWR('/api/users/get-details', fetcher)


  return {
    userId: data?.id,
    username: data?.username,
    isLoading: !error && !data,
    isError: error
  }
}