/**
 * Module containing common AJAX requests performed by the app.
 */


/*
 * API URL
 */
const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000/";


/*
 * GET /address/
 * See docs for expected response.
 */
const getAddress = async function(address, controller) {
  const url = `${baseUrl}${address}/`;
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    signal: controller.signal,
  });

  return resp;
}


export { baseUrl, getAddress };
