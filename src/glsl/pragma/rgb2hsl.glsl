vec3 rgb2hsl(vec3 color) {
  float r = color.r, g = color.g, b = color.b;
  float maxColor = max(max(r, g), b);
  float minColor = min(min(r, g), b);
  float delta = maxColor - minColor;

  float h = 0.0;  // Hue
  float s = 0.0;  // Saturation
  float l = (maxColor + minColor) / 2.0;  // Lightness

  if (delta > 0.0) {
    s = (l < 0.5) ? (delta / (maxColor + minColor)) : (delta / (2.0 - maxColor - minColor));

    if (maxColor == r) {
      h = (g - b) / delta + (g < b ? 6.0 : 0.0);
    } else if (maxColor == g) {
      h = (b - r) / delta + 2.0;
    } else {
        h = (r - g) / delta + 4.0;
    }
    h /= 6.0;
  }

  return vec3(h, s, l);
}

#pragma glslify: export(rgb2hsl)
