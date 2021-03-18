import { useEffect } from 'react'


console.log("HELLO THERE")
// only for this script, not a component. 
const root = document.documentElement()
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed")
const marqueeContent = document.querySelector(".marquee-content")

root.style.setProperty("--marquee-elements", marqueeContent.children.length)
for (let i=0; i<marqueeElementsDisplayed; i++){
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true))
}

const useScript = url => {
    useEffect(() => {
      const script = document.createElement("script");
      script.src = url
      script.async = true;
      document.body.appendChild(script)
    }, [url])
  }
// script stuff idk what to do with yet

export default useScript