import { spicedData } from '@/lib/spicedData';
import { useRef } from 'react';

export default function useRandomElement() {
  const elementRef = useRef(null);

  function getRandomItem(items) {
    const randomNumber = Math.floor(Math.random() * items.length);
    return items[randomNumber];
  }
  
  const image = getRandomItem(spicedData.artPieces);
  const joke = getRandomItem(spicedData.jokes);
  const emoji = getRandomItem(spicedData.weather);

  const randomElement = (() => {
    return (
      <div ref={elementRef} style={{position:'relative'}}>
        <div style={{position:'absolute', inset:'0px', display:'flex', justifyContent:'center', alignItems:'center', padding:'2rem'}}>
          <div style={{textAlign:'center', backgroundColor:'#000', color:'#fff', fontSize:'2rem', padding:'0.1rem 1rem 0.5rem 1rem'}}>{joke}</div>
        </div>
        <div style={{position:'absolute', top:'0', right:'1rem', fontSize:'5rem', zIndex:'10'}}>{emoji}</div>
        <div style={{position:'absolute', bottom:'0', left:'1rem', fontSize:'5rem', zIndex:'10', transform:'rotate(180deg)'}}>{emoji}</div>
        <img src={image.url} className='' alt=""/>
      </div>
    );
  })();

  return {randomElement};
}