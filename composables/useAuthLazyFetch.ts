/* eslint-disable  @typescript-eslint/no-unused-vars */



// import { useUserStore } from "~~/stores/User";



// Custom Auth Fetch Composable
export const useAuthLazyFetch = (
    request: any,
    options: any | undefined | null
  ) => {
    // Get Token from store or local storage
    // let token = useUserStore().token;
    // if (!token) token = useCookie("token").value || "";
    // Use the useFetch hook to make a request with some additional options
    return useLazyFetch(request, {
      // Define an onRequest callback that will be called before making the request
      onRequest({ request, options }) {
        // Set the request headers
        options.headers = {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1IjoiYzI4OGRlNzBjYWYyNDUxODk4ZDRhMGM2N2U0ZmVkZDIiLCJkIjoiMTY4MDA4OSIsInIiOiJzYSIsInAiOiJmcmVlIiwiYSI6ImZpbmRlci5pbyIsImwiOiJ1czEiLCJleHAiOjE2ODMyODExOTV9.gl7Z_P_zA3fGoIH9mulaZF4tcA2vvln4x_dremExFIo`,
        };
      },
  
  
      // Define an onRequestError callback that will be called if an error occurs before making the request
      onRequestError({ request, options, error }) {
        // Handle the request errors
          },
  
  
      // Define an onResponse callback that will be called if the request succeeds
      onResponse({ request, response, options }) {
        // Process the response data
        if (response.status === 200) {
          return response._data;
        } else {
          throw new Error(`Unexpected response status: ${response.status}`);
        }
      },
  
  
      // Define an onResponseError callback that will be called if an error occurs after the request has completed
      onResponseError({ request, response, options }) {
        // Handle the response errors
        console.error("Error in response:", response);
        throw new Error("Error processing response");
      },
  
  
      // Spread any additional options passed into the useAuthFetch function
      ...options,
    });
  };
  
  
  /* NOT TESTED */
  export const useAuthLazyFetchPut = (
    request: any,
    options: any | undefined | null
  ) => {
    return useAuthLazyFetch(request, { ...options, method: "put" });
  };
  export const useAuthLazyFetchPost = (
    request: any,
    options: any | undefined | null
  ) => {
    return useAuthLazyFetch(request, { ...options, method: "post" });
  };
  export const useAuthLazyFetchDelete = (
    request: any,
    options: any | undefined | null
  ) => {
    return useAuthLazyFetch(request, { ...options, method: "delete" });
  };