import { useCallback, useState } from 'react'

type ResponseModel = {
  data: {}
  new_user: boolean
  status: 'success'
  token: string
}

export type BookPlaceRequestModel = {
  name: string;
  phone: string;
  agree: boolean;
  place: 'матрёшка'
}


export function BronePlacePOST() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const clearError = useCallback(() => {
    setIsError(false)
  }, [])

  const request = async (inputData: BookPlaceRequestModel) => {
    clearError()
    try {
      setIsLoading(true);

      const res = await fetch("/api/book_place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok || data.status === "error") {
        throw new Error(JSON.stringify(res));
      }

      console.log('Успешный запрос: ', data)
      return { data, error: false }
    } catch (err) {
      console.error('Ошибка запроса BronePlacePOST: ', err)
      setIsError(true)
      return { data: null, error: true }
    } finally {
      setIsLoading(false);
    }
  }

  return { request, isLoading, isError, clearError }
}
