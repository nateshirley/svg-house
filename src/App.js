import './App.css';
import React from 'react';
import { useEffect, useRef } from 'react';
import { Buffer } from 'buffer';

/*
some stuff i need
- circle (size based on 0-100)
*/

function App() {


  const stringGradients = () => {
    return `
    <g>
      <radialGradient id="paint0_radial_37_1537" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(158.4 162) rotate(47.0826) scale(93.3998)">
        <stop stop-color="white" />
        <stop offset="1" stop-color="#969696" />
      </radialGradient>
      <radialGradient id="paint1_radial_37_1537" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(225.4 129) rotate(43.8563) scale(11.1341)">
        <stop stop-color="white" />
        <stop offset="1" stop-color="#CECECE" />
      </radialGradient>
    </g>`;
  }

  const stringFilters = (size, orbRadius, earthCenterX, earthCenterY, earthRadius) => {
    // let shadowOffsetX = 4;
    let orbShadowBlur = 8;
    let orbShadowDimension = orbRadius * 2 + (orbShadowBlur * 2);
    let orbShadowX = (squareCenter - orbRadiusMin) - (size / 100 * 16);
    return (
      `
      <g>
        <filter id="filter0_d_37_1537" x=${orbShadowX} y=${orbShadowX} width=${orbShadowDimension} height=${orbShadowDimension} filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="4" dy="8" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_37_1537" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_37_1537" result="shape" />
        </filter>
        <filter id="filter1_d_37_1537" x="${earthCenterX - earthRadius}" y="${earthCenterY - earthRadius}" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="4" dy="8" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_37_1537" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_37_1537" result="shape" />
        </filter>
      </g>
      `
    );
  }
  let orbRadiusMin = 44;
  let squareCenter = 174;
  //i can't use this jsx on server
  const makeSv = (size, followerId) => {
    let orbRadius = orbRadiusMin + (size / 100 * 16);
    let orbitRadius = 69;
    let earthRadius = 8;
    let earthAngle = 38;
    let height = orbitRadius * Math.sin(earthAngle * (Math.PI / 180));
    let length = orbitRadius * Math.cos(earthAngle * (Math.PI / 180));
    let earthX = squareCenter + length;
    let earthY = squareCenter - height;
    let denominatorX = 45 + denominatorPush(followerId);
    console.log(earthX, earthY);
    let raw = `
    <svg width="348" height="348" viewBox="0 0 348 348" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="348" height="348" fill="black" />
    <image x="16" y="16" width="43" height="43" xlink:href="https://i.imgur.com/eZPLAdc.jpeg" style="clip-path: url(#clipPath); "/>
    <rect x="15" y="15" width="45" height="45" rx="22.5" stroke="#F2F2F2" stroke-opacity="0.25" stroke-width="2"/>
    <defs>
    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
    <use xlink:href="#image0_27_35" transform="scale(0.0025)"/>
    </pattern>
    <clipPath id="clipPath">
      <circle cx="37" cy="37" r="22" />
    </clipPath>
    <linearGradient id="rainbow" x1="0" x2="100%" y1="50%" y2="50%" gradientUnits="objectBoundingBox" >
      <stop stop-color="#FF7245" offset="0%"/>
      <stop stop-color="#D154A7" offset="20%"/>
      <stop stop-color="#1882FF" offset="100%"/>
    </linearGradient>
    </defs>
    <circle cx="${squareCenter}" cy="${squareCenter}" r="${orbitRadius}" fill="white" fill-opacity="0.1" stroke="white" stroke-width="1.5" stroke-dasharray="4 4" />
      <g filter="url(#filter0_d_37_1537)">
        <circle cx="${squareCenter}" cy="${squareCenter}" r="${orbRadius}" fill="url(#paint0_radial_37_1537)" />
      </g>
      <g filter="url(#filter1_d_37_1537)">
      <circle cx="${earthX}" cy="${earthY}" r="${earthRadius}" fill="url(#paint1_radial_37_1537)" />
      </g>
      <text x="20" y="295" class="username" fill="url(#rainbow)">Melvv</text>
      <text x="20" y="330" class="followerId">${followerId}</text>
      <text x="${denominatorX}" y="328" class="denominator">/ ${followerId}</text>
      <style>
      .username { font: bold 28px Inter; }
      .followerId { font: bold 28px Inter; fill: white; }
      .denominator { font: medium 20px Inter; fill: #CCCCCC; }
      </style>
    `;
    //need to figure out how to do the numbers when they get really big

    //
    raw = raw + stringFilters(size, orbRadius, earthX, earthY, earthRadius);
    raw = raw + stringGradients();
    raw = raw + '</svg>';
    //let prepend = "data:image/svg+xml;base64,";
    // raw = prepend + raw;
    let buffer = Buffer.from(raw);
    let base64 = buffer.toString('base64');
    return base64
  }
  const denominatorPush = (followerId) => {
    if (followerId < 10) {
      return 0
    } else if (followerId < 100) {
      return 15
    } else if (followerId < 1000) {
      return 33
    } else if (followerId < 10000) {
      return 54
    }
  }

  let base64String = Buffer.from(makeSv(20, 1800), "base64").toString();
  // console.log(base64String);

  //so i think this is the approach that makes sense? i thnk 


  return (
    <div className="App">

      {/* {getTopSquare(100)} */}
      <div dangerouslySetInnerHTML={{ __html: base64String }} />
    </div>
  );

}

export default App;


{/* <div ref={svg} /> */ }


  //        <rect x="328" y="20" width="20" height="20" fill="red" />
  //        <rect width="27" height="2" fill="#FF6262" />
  //        <image href="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png" height="20" width="20" />


/* <svg width="300" height="300" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="55" height="55" fill="#C4C4C4" />
        <rect width="27" height="2" fill="#FF6262" />
        <rect y="4" width="27" height="2" fill="#7AB1E4" />
        <image href="https://i.imgur.com/kRv3r0W.jpeg" height="20" width="20" />
      </svg> */
/* <svg width="200" height="200"
        xmlns="http://www.w3.org/2000/svg">
        <image
          href=
          "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190710102234/download3.png"
          height="200" width="200" />
      </svg> */
/* <header className="App-header">
        <img src={box} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */



/*


  const filters = (size, orbRadius) => {
    //dimension is base indie of size
    //add to it based on smallest dimension possible
    //    let shadowDimension = circleRadius * 2 + 16;
    //i could fit all of these to a square that is agnostic to dimension
    //so assume it's a square, calc it as a portion of the side
    let shadowBlur = 8;
    let shadowDimension = orbRadius * 2 + (shadowBlur * 2);
    let shadowX = 134 - (size / 100 * 16);
    return (
      <g>
        <filter id="filter0_d_37_1537" x={shadowX} y={shadowX} width={shadowDimension} height={shadowDimension} filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="4" dy="8" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_37_1537" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_37_1537" result="shape" />
        </filter>
        <filter id="filter1_d_37_1537" x="216" y="123" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="4" dy="8" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_37_1537" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_37_1537" result="shape" />
        </filter>
      </g>
    );
  }
  const gradients = () => {
    return (<g>
      <radialGradient id="paint0_radial_37_1537" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(158.4 162) rotate(47.0826) scale(93.3998)">
        <stop stop-color="white" />
        <stop offset="1" stop-color="#969696" />
      </radialGradient>
      <radialGradient id="paint1_radial_37_1537" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(225.4 129) rotate(43.8563) scale(11.1341)">
        <stop stop-color="white" />
        <stop offset="1" stop-color="#CECECE" />
      </radialGradient>
    </g>);
  }





  //so i'm gonna have to translate this to the 
  //and then this one would be 
  //or i can do the library
  //i know that i can spit it back to the thing
  //calculate the 69 dashed radius
  const getTopSquare = (size) => {
    //range from 40-56
    let orbRadius = 40 + (size / 100 * 16)
    return <svg width="348" height="348" viewBox="0 0 348 348" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="348" height="348" fill="black" />
      <circle cx="174" cy="174" r="69" fill="white" fill-opacity="0.1" stroke="white" stroke-width="2" stroke-dasharray="4 4" />
      <g filter="url(#filter0_d_37_1537)">
        <circle cx="174" cy="174" r={orbRadius} fill="url(#paint0_radial_37_1537)" />
      </g>
      <g filter="url(#filter1_d_37_1537)">
        <circle cx="228" cy="131" r="8" fill="url(#paint1_radial_37_1537)" />
      </g>
      {filters(size, orbRadius)}
      {gradients()}
    </svg>
  }






//vanilla js vs library
// const generateSvg = () => {
//   var ns = 'http://www.w3.org/2000/svg'
//   //var div = document.getElementById('drawing')
//   var svg = document.createElementNS(ns, 'svg')
//   svg.setAttributeNS(null, 'width', '100%')
//   svg.setAttributeNS(null, 'height', '100%')
//   //div.appendChild(svg)
//   var rect = document.createElementNS(ns, 'rect')
//   rect.setAttributeNS(null, 'width', 200)
//   rect.setAttributeNS(null, 'height', 100)
//   rect.setAttributeNS(null, 'fill', '#f06')

//   var second = document.createElementNS(ns, 'rect');
//   second.setAttributeNS(null, 'width', 50);
//   second.setAttributeNS(null, 'height', 100)
//   second.setAttributeNS(null, 'fill', '#f06')

//   svg.appendChild(second);
//   svg.appendChild(rect)

//   return svg
// }
// const icon = generateSvg();
// console.log(icon)
// let svg = useRef(null);

// useEffect(() => {
//   if (svg.current.children.length > 0) {
//     svg.current.removeChild(svg.current.children[0]);
//   }
//   if (svg.current) {
//     svg.current.appendChild(icon)
//   }
// }, [icon]);
*/