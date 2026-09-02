const filterContainer = document.querySelector(".filters");
const imageCanvas = document.querySelector("#image-canvas");
const imageInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
const imagePlaceHolder = document.querySelector(".placeholder");
const resetButton = document.querySelector("#reset-btn");
const downloadButton = document.querySelector("#download-btn");
const presetContainer = document.querySelector(".presets");
let image = null;
let file = null;

// Defined all the filters in a object
let filters = {
  Brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  Contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  Saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  HueRotation: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  Blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
  Grayscale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  Sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  Opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },
  Invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
};

// function to create a filter
function createFilterElement(name, unit = "%", value, min, max) {
  const div = document.createElement("div");
  div.classList.add("filter");

  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;

  const p = document.createElement("p");
  p.innerText = name;

  div.appendChild(p);
  div.appendChild(input);

  input.addEventListener("input", (event) => {
    filters[name].value = input.value;
    applyFilters();
  });

  return div;
}

// creating all the filters
function createFilters() {
  Object.keys(filters).forEach((key) => {
    const filterElement = createFilterElement(
      key,
      filters[key].unit,
      filters[key].value,
      filters[key].min,
      filters[key].max,
    );
    filterContainer.appendChild(filterElement);
  });
}
createFilters();

// showing preview of selected image
imageInput.addEventListener("change",(event)=>{

    file = event.target.files[0];

    imagePlaceHolder.style.display = "none";
    imageCanvas.style.display = "block";

    const reader = new FileReader();

    reader.onload = ()=>{

        sessionStorage.setItem("savedImage", reader.result);

        const img = new Image();

        img.src = reader.result;

        img.onload = ()=>{

            image = img;
            imageCanvas.width = img.width;
            imageCanvas.height = img.height; 

            canvasCtx.drawImage(img,0,0);
        }
    }

    reader.readAsDataURL(file);

})


// Restore image after refresh
window.addEventListener("load",()=>{

    const savedImage = sessionStorage.getItem("savedImage");

    if(savedImage){

        imagePlaceHolder.style.display = "none";
        imageCanvas.style.display = "block";

        const img = new Image();

        img.src = savedImage;

        img.onload = ()=>{

            image = img;
            imageCanvas.width = img.width;
            imageCanvas.height = img.height;

            canvasCtx.drawImage(img,0,0);
        }
    }

})

// Apply filters
function applyFilters() {
  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

  canvasCtx.filter = `
    brightness(${filters.Brightness.value}${filters.Brightness.unit})
    contrast(${filters.Contrast.value}${filters.Contrast.unit})
    saturate(${filters.Saturation.value}${filters.Saturation.unit})
    hue-rotate(${filters.HueRotation.value}${filters.HueRotation.unit})
    blur(${filters.Blur.value}${filters.Blur.unit})
    grayscale(${filters.Grayscale.value}${filters.Grayscale.unit})
    sepia(${filters.Sepia.value}${filters.Sepia.unit})
    opacity(${filters.Opacity.value}${filters.Opacity.unit})
    invert(${filters.Invert.value}${filters.Invert.unit})
  `.trim();

  canvasCtx.drawImage(image, 0, 0);
}

// Reset button logic
resetButton.addEventListener("click", () => {
  filters = {
  Brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  Contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  Saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  HueRotation: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  Blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
  Grayscale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  Sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  Opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },
  Invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
};
  applyFilters();
  filterContainer.innerHTML = "";
  createFilters();
});

// Download button logic
downloadButton.addEventListener("click", () => {
    if(!image){
        alert("Please select an image first.");
        return;
    }
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = imageCanvas.toDataURL();
  link.click();
});

// Preset filters logic
const presets = {

  Vintage: {
    Brightness: 110,
    Contrast: 90,
    Saturation: 80,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 35,
    Opacity: 100,
    Invert: 0,
  },

  Drama: {
    Brightness: 90,
    Contrast: 140,
    Saturation: 120,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 10,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  Cinematic: {
    Brightness: 95,
    Contrast: 120,
    Saturation: 85,
    HueRotation: 5,
    Blur: 0,
    Grayscale: 5,
    Sepia: 10,
    Opacity: 100,
    Invert: 0,
  },

  Warm: {
    Brightness: 105,
    Contrast: 105,
    Saturation: 115,
    HueRotation: 10,
    Blur: 0,
    Grayscale: 0,
    Sepia: 20,
    Opacity: 100,
    Invert: 0,
  },

  Cool: {
    Brightness: 100,
    Contrast: 105,
    Saturation: 95,
    HueRotation: 200,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  BlackAndWhite: {
    Brightness: 105,
    Contrast: 110,
    Saturation: 0,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 100,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  Faded: {
    Brightness: 110,
    Contrast: 80,
    Saturation: 70,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 15,
    Sepia: 10,
    Opacity: 100,
    Invert: 0,
  },

  Vibrant: {
    Brightness: 105,
    Contrast: 115,
    Saturation: 160,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  Soft: {
    Brightness: 105,
    Contrast: 90,
    Saturation: 90,
    HueRotation: 0,
    Blur: 1,
    Grayscale: 5,
    Sepia: 5,
    Opacity: 100,
    Invert: 0,
  },

  Retro: {
    Brightness: 105,
    Contrast: 95,
    Saturation: 85,
    HueRotation: 350,
    Blur: 0,
    Grayscale: 5,
    Sepia: 40,
    Opacity: 100,
    Invert: 0,
  },

  Moody: {
    Brightness: 85,
    Contrast: 130,
    Saturation: 80,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 15,
    Sepia: 5,
    Opacity: 100,
    Invert: 0,
  },

  HighContrast: {
    Brightness: 100,
    Contrast: 180,
    Saturation: 110,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  Noir: {
    Brightness: 90,
    Contrast: 150,
    Saturation: 0,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 100,
    Sepia: 15,
    Opacity: 100,
    Invert: 0,
  },

  Dreamy: {
    Brightness: 115,
    Contrast: 85,
    Saturation: 90,
    HueRotation: 5,
    Blur: 2,
    Grayscale: 0,
    Sepia: 5,
    Opacity: 95,
    Invert: 0,
  },

  Negative: {
    Brightness: 100,
    Contrast: 100,
    Saturation: 100,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 100,
  },

};

Object.keys(presets).forEach((presetName) => {
  const presetButton = document.createElement("button");
  presetButton.classList.add("btn");
  presetButton.innerText = presetName;
  presetContainer.appendChild(presetButton);

  presetButton.addEventListener("click", () => {
    const preset = presets[presetName];
    Object.keys(preset).forEach((filterName) => {
      filters[filterName].value = preset[filterName];
    });
    applyFilters();
    filterContainer.innerHTML = "";
    createFilters();
  });
});
