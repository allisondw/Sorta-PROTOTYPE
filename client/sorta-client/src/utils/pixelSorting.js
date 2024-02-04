


export const sortPixels = (pixels, sortingThreshold, colorChannel, direction, imageDataWidth) => {
    const rowLength = imageDataWidth * 4;

    if (direction === 'horizontal') {
      for (let rowStart = 0; rowStart < pixels.length; rowStart += rowLength) {
        let rowEnd = rowStart + rowLength;
        let rowPixels = [];

        for (let i = rowStart; i < rowEnd; i += 4) {
          rowPixels.push([pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]]);
        }

        rowPixels.sort((a, b) => {
          if (colorChannel) {
            let valueA = getValueByColorChannel(a, colorChannel);
            let valueB = getValueByColorChannel(b, colorChannel);
            if (valueA > sortingThreshold && valueB > sortingThreshold) {
              return valueA - valueB;
            }
          } else {
            let brightnessA = calculateBrightness(a);
            let brightnessB = calculateBrightness(b);
            if (brightnessA > sortingThreshold && brightnessB > sortingThreshold) {
              return compareBrightness(a, b);
            }
          }
          return 0;
        });


        for (let i = rowStart, j = 0; i < rowEnd; i += 4, j++) {
          pixels[i] = rowPixels[j][0];
          pixels[i + 1] = rowPixels[j][1];
          pixels[i + 2] = rowPixels[j][2];
          pixels[i + 3] = rowPixels[j][3];
        }
      }
    } else if (direction === 'vertical') {
      for (let colStart = 0; colStart < rowLength; colStart += 4) {
        let colPixels = [];


        for (let i = colStart; i < pixels.length; i += rowLength) {
          colPixels.push([pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]]);
        }

  
        colPixels.sort((a, b) => {
          if (colorChannel) {

            let valueA = getValueByColorChannel(a, colorChannel);
            let valueB = getValueByColorChannel(b, colorChannel);
            if (valueA > sortingThreshold && valueB > sortingThreshold) {
              return valueA - valueB;
            }
          } else {

            let brightnessA = calculateBrightness(a);
            let brightnessB = calculateBrightness(b);
            if (brightnessA > sortingThreshold && brightnessB > sortingThreshold) {
              return compareBrightness(a, b);
            }
          }
          return 0;
        });

        for (let i = colStart, j = 0; i < pixels.length; i += rowLength, j++) {
          pixels[i] = colPixels[j][0];
          pixels[i + 1] = colPixels[j][1];
          pixels[i + 2] = colPixels[j][2];
          pixels[i + 3] = colPixels[j][3];
        }
      }
    }
};

export const getValueByColorChannel = (pixel, channel) => {
    const channelMap = { 'red': 0, 'green': 1, 'blue': 2 };
    return pixel[channelMap[channel]];
};

export const calculateBrightness = (pixel) => {
    return 0.299 * pixel[0] + 0.587 * pixel[1] + 0.114 * pixel[2];
};

export const compareBrightness = (a, b) => {
    let brightnessA = 0.299 * a[0] + 0.587 * a[1] + 0.114 * a[2];
    let brightnessB = 0.299 * b[0] + 0.587 * b[1] + 0.114 * b[2];
    return brightnessA - brightnessB;
};
