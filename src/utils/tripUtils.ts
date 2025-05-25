
export const deleteTripFromHistory = (tripId: string) => {
  const existingTrips = JSON.parse(localStorage.getItem('tripHistory') || '[]');
  const updatedTrips = existingTrips.filter((trip: any) => trip.id !== tripId);
  localStorage.setItem('tripHistory', JSON.stringify(updatedTrips));
  console.log('Trip deleted from history:', tripId);
  return updatedTrips;
};

export const getTripHistory = () => {
  return JSON.parse(localStorage.getItem('tripHistory') || '[]');
};
