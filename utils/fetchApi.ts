export async function fetchApi(latitude: number, longitude:number){
    const apiKey = process.env.W_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        console.log(data);
        return data; // Temperature in Celsius
      } else {
        throw new Error(data.message || 'Unable to fetch weather data');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }

  };