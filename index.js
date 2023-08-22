class AnimatedBg {
  constructor(canvas, height, width, bgColor) {
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error("Expected a canvas element as the first argument");
    }
    if (!(typeof height === "number" && typeof width === "number")) {
      throw new Error(
        `Expected typeof height and width: number, got: ${typeof height}, ${typeof height}`
      );
    }
    if (
      !(
        typeof bgColor === "object" &&
        bgColor !== null &&
        "r" in bgColor &&
        "g" in bgColor &&
        "b" in bgColor
      )
    ) {
      throw new Error(`Expected a valid bgColor object with  keys: r, g, b`);
    } else if (
      !(
        Number.isInteger(bgColor.r) &&
        bgColor.r >= 0 &&
        bgColor.r <= 255 &&
        Number.isInteger(bgColor.g) &&
        bgColor.g >= 0 &&
        bgColor.g <= 255 &&
        Number.isInteger(bgColor.b) &&
        bgColor.b >= 0 &&
        bgColor.b <= 255
      )
    ) {
      throw new Error(
        `The keys r, g, b of the bgColor object must have a value between 0 and 255`
      );
    }
    this.canvas = canvas;
    this.canvas.height = height;
    this.canvas.width = width;
    this.bgColor = bgColor;
    this.context;
    this.increment = 0;
    this.frequency;
    this.animate = this.animate.bind(this);
  }
  init() {
    this.context = this.canvas.getContext("2d");
    this.context.fillStyle = `rgb(${this.bgColor.r},${this.bgColor.g},${this.bgColor.b})`;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fill();
  }
  sinWave(
    maxAmplitude = 156,
    wavelength = 200,
    y_position = this.canvas.height / 2,
    frequency = 0.017,
    angle = 0
  ) {
    this.frequency = frequency;
    this.context.strokeStyle = `rgba(0, 100, 100, 0.01)`;
    this.context.beginPath();
    // this.increment = 100;
    for (let x = 0; x < this.canvas.width; x += 30) {
      let coordX =
        Math.sqrt(
          Math.pow(Math.sin(x / wavelength + this.increment), 2) + x * x
        ) *
        Math.cos(
          Math.atan(Math.sin(x / wavelength + this.increment) / x) + angle
        );
      let coordY =
        y_position +
        x * Math.tan(angle) -
        Math.sqrt(
          Math.pow(Math.sin(x / wavelength + this.increment), 2) + x * x
        ) *
          Math.sin(
            Math.atan(Math.sin(x / wavelength + this.increment) / x) + angle
          ) *
          maxAmplitude *
          Math.sin(this.increment);
      // Math.sin((angle * Math.PI) / 180)
      console.log(`increment${this.increment} ,coordY ${coordY}`);
      this.context.lineTo(coordX, coordY);
      this.context.stroke();
    }
    for (let x = this.canvas.width - 25; x < this.canvas.width; x += 1) {
      this.context.lineTo(
        Math.sqrt(
          Math.pow(Math.sin(x / wavelength + this.increment), 2) + x * x
        ) *
          Math.cos(
            Math.atan(Math.sin(x / wavelength + this.increment) / x) + angle
          ),
        y_position +
          x * Math.tan(angle) -
          Math.sqrt(
            Math.pow(Math.sin(x / wavelength + this.increment), 2) + x * x
          ) *
            Math.sin(
              Math.atan(Math.sin(x / wavelength + this.increment) / x) + angle
            ) *
            maxAmplitude *
            Math.sin(this.increment)
        // Math.sin((angle * Math.PI) / 180)
      );
      this.context.stroke();
    }
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.context.fillStyle = `rgba(${this.bgColor.r},${this.bgColor.g},${this.bgColor.b},0.03)`;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.sinWave();
    this.increment += this.frequency;
  }
}
