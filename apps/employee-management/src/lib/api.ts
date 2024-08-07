const API_URL = import.meta.env.VITE_API_URL;

interface SuccessResponse<T> {
  success: true;
  data: T;
}

interface ErrorResponse {
  success: false;
  statusCode: number;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export const apiFetch = async <T>(uri: string, init?: RequestInit): Promise<ApiResponse<T>> => {
  let response: Response;

  try {
    response = await fetch(`${API_URL}${uri}`, init);
  } catch (error) {
    console.error(error);

    return {
      success: false,
      statusCode: 500
    };
  }

  if (!response.ok) {
    return {
      success: false,
      statusCode: response.status
    };
  }

  try {
    const data = (await response.json()) as T;

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      statusCode: 500
    };
  }
};
