let scale = d3.scaleLinear().domain([0, 500]).range([d3.rgb(255,255,0),d3.rgb(0,0,255)])
  .clamp(true)
  .interpolate(d3.interpolateHcl);
let canvas = document.querySelector("#colorscale");
let context = canvas.getContext("2d");
let image = context.getImageData(0, 0, 500, 40);
let pixels = image.data;
for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          pixels[4*(y*canvas.width + x) + 0]= scale(x)
          pixels[4*(y*canvas.width + x) + 1]= scale(x)
          pixels[4*(y*canvas.width + x) + 3] = 255;
//
        }
      }
console.log(pixels)
context.putImageData(image, 0, 0);
