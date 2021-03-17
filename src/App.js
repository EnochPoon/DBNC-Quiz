import React, { useState } from 'react';
import './App.css';

function App() {
  const inputRef = React.useRef();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  function onSearch() {
    const val = inputRef.current.value;
    if (val === '') return;
    setLoading(true);
    setResults(null);
    fetch('https://www.metaweather.com/api/location/search/?query=' + val)
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        setResults('ERROR');
        setLoading(false);
      } else {
        const woeid = data[0].woeid;
        fetch(`https://www.metaweather.com/api/location/${woeid}/`)
        .then(res => res.json())
        .then(res => {
          setResults(res);
          setLoading(false);
        })
      }
      
    });
  }

  return (
    <div className="App">
      City <input ref={inputRef}/>
      <button onClick={onSearch}>Search</button>
      <div>{loading && 'loading'}</div>
      <div>{results && (results !== 'ERROR'? (
        <>
        
        <table>
          <caption>{results.title}</caption>
          <tbody>
            <tr>
              {results.consolidated_weather.map(fc => <th key={fc.applicable_date}>{fc.applicable_date}</th>)}
            </tr>
            <tr>
              {results.consolidated_weather.map(fc => (
                <td key={fc.applicable_date}>
                  <div>{fc.weather_state_name}</div>
                  <div>{Math.round(fc.the_temp)}°C</div>
                </td>
              ))}
            </tr>
          </tbody>
          
        </table>
        </>
      ) : 'ERROR')}</div>
    </div>
  );
}

export default App;
