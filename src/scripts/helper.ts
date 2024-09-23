export function formatDate(timestamp:string) {
  const dateTime = new Date(timestamp);
  
  // Format date
    const options:object = { month: '2-digit', day: '2-digit', year: 'numeric' };
    return dateTime.toLocaleDateString(undefined, options);
}

export function formatTime(timestamp:string) {
  const dateTime = new Date(timestamp);

  //Format time
  const options:object = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
  return dateTime.toLocaleTimeString(undefined, options);
}