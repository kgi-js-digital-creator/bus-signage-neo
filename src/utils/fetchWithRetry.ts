export default async function fetchWithRetry(url: string, options: RequestInit = {}, retry: number = 3, delay: number = 1000): Promise<Response> {
  try {
    const response = await fetch(url, options);
    if ((response.status === 404 || response.status >= 500) && retry > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retry - 1, delay * 2);
    }
    return response;
  } catch (error) {
    if (retry > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retry - 1, delay * 5);
    }
    throw error;
  }
}