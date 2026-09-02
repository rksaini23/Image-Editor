# 🖼️ Image Editor

A simple and responsive **browser-based image editor** built using **HTML, CSS, and JavaScript**. It allows users to upload an image, apply different filters and presets, and download the edited image directly from the browser.

## ✨ Features

* 📤 Upload and preview images
* 🎨 Adjust image filters:

  * Brightness
  * Contrast
  * Saturation
  * Hue Rotation
  * Blur
  * Grayscale
  * Sepia
  * Opacity
  * Invert
* 🎭 Built-in presets:

  * Vintage
  * Drama
  * Cinematic
  * Warm
  * Cool
  * Black & White
  * Faded
  * Vibrant
  * Soft
  * Retro
  * Moody
  * High Contrast
  * Noir
  * Dreamy
  * Negative
* 🔄 Image remains available after page refresh using `sessionStorage`
* 📥 Download the edited image as PNG
* 💻 Runs completely in the browser
* 📱 Responsive user interface

## 🛠️ Technologies Used

* **HTML5**
* **CSS3**
* **JavaScript**
* **Canvas API**
* **Session Storage**

## 📂 Project Structure

```text
Image-Editor/
│
├── assets/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🚀 How to Run

1. Clone the repository:

```bash
git clone https://github.com/rksaini23/Image-Editor.git
```

2. Open the project folder.

3. Open `index.html` in your browser.

That's it! No backend or installation is required.

## 🎯 How It Works

1. Select an image from your device.
2. The image is displayed on an HTML Canvas.
3. Adjust the available filters using the controls.
4. Choose a preset to apply a predefined filter combination.
5. The selected image is temporarily stored using `sessionStorage`, allowing it to remain available after refreshing the page.
6. Download the final edited image as a PNG.

## 📌 Note

The uploaded image is stored in the browser's `sessionStorage` and is not uploaded to any server. The image data is intended to persist during the current browser session.

## 🔮 Future Improvements

* Image cropping and rotation
* Undo and redo functionality
* Multiple image support
* Custom filter presets
* Image resizing
* Text and drawing tools
* Improved mobile controls

## 👨‍💻 Author

**Rohit Kumar**

If you found this project useful, consider giving it a ⭐ on GitHub.
