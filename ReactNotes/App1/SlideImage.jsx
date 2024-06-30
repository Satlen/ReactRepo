import { useState } from "react";
import { flushSync } from "react-dom";

export default function SlideImage() {

    const [index, setIndex] = useState(0)

    const hasnext = index < images.length - 1 
    
    let image = images[index] 

    const handleNextImage = () => hasnext ? setIndex(index + 1) : setIndex(0)



    return (
        <div>
            <button onClick={handleNextImage}>Next</button>
            <h3>Image {index + 1} of {images.length} </h3>
            <img key={image.src} src={image.src} className="slideImage"
            style={{
                width: '300px',
                borderRadius:'10px'
            }}/>
            <h3>Place : {image.place} </h3>
        </div>
    )
}



let images = [{
    place: 'Penang, Malaysia',
    src: 'https://i.imgur.com/FJeJR8M.jpg'
  }, {
    place: 'Lisbon, Portugal',
    src: 'https://i.imgur.com/dB2LRbj.jpg'
  }, {
    place: 'Bilbao, Spain',
    src: 'https://i.imgur.com/z08o2TS.jpg'
  }, {
    place: 'Valparaíso, Chile',
    src: 'https://i.imgur.com/Y3utgTi.jpg'
  }, {
    place: 'Schwyz, Switzerland',
    src: 'https://i.imgur.com/JBbMpWY.jpg'
  }, {
    place: 'Prague, Czechia',
    src: 'https://i.imgur.com/QwUKKmF.jpg'
  }, {
    place: 'Ljubljana, Slovenia',
    src: 'https://i.imgur.com/3aIiwfm.jpg'
  }];