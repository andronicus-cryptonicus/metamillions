import { useState, useEffect } from 'react';

export default function Roulette() {
  function postSizeToParent() {
    console.log(window.innerHeight);
    window.parent.postMessage({
      type: 'window_resize',
      data: {
        width: window.innerWidth,
        height: window.innerHeight + 20,
      }
    }, '*');
  }

  let [query, setQuery] = useState([]);

  useEffect(() => {
    postSizeToParent();

    setQuery(new URLSearchParams(window.location.search));
  }, []);

  const spin = () => {
    fetch('/api/games/roulette', {
      headers: {
        'x-access-token': query.get('SST')
      }
    });
  };

  return <button onClick={spin}>Spin</button>;
}
