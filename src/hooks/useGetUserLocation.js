export default function useGetUserLocation(e) {
  console.log(e);
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    function successCallback(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }

    function errorCallback(error) {
      console.log(`error: ${error.message}`);
    }
  }
}
