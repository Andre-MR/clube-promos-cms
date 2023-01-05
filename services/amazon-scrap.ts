let snsPrice = false;

type Price = {
  value: number;
  sns: boolean;
};

async function getPrice<Price>(page: string) {
  const price = page.match(/(?<=price-data">)(.*?)(?=<\/div>)/);
  const priceOBJ = price ? JSON.parse(price![0]) : null;
  let bestPrice = 0;
  if (priceOBJ) {
    for (let i = 0; i < priceOBJ.length; i++) {
      if (priceOBJ[i].buyingOptionType == "NEW") {
        snsPrice = false;
        bestPrice = priceOBJ[i].priceAmount;
      }
      if (priceOBJ[i].buyingOptionType == "SNS") {
        snsPrice = true;
        bestPrice = priceOBJ[i].priceAmount;
        break;
      }
    }
  }
  const priceDouble = Number.parseFloat(bestPrice.toString());

  return { value: priceDouble, sns: snsPrice };
}

async function getOldPrice(page: string) {
  const price1 = page.match(/(?<=>De:)(.*?)(?=<\/span)/s);
  const price2 = price1 ? price1[0].match(/([0-9]*,[0-9]*)$/) : null;
  // const price2 = price1 ? price1[0].match(/([^R\$ ]*?$)/) : null;
  let priceDouble = 0;
  if (price2 && price2.length > 0) {
    priceDouble = Number.parseFloat(
      price2[0].replace(".", "").replace(",", ".")
    );
  } else {
    const price3 = page.match(/(?<=\>De:<\/span>)(.*?)(?=<\/span>)/);
    const price4 = price3 ? price3[0].match(/([0-9]*,[0-9]*)$/) : null;
    priceDouble = price4
      ? Number.parseFloat(price4[0].replace(".", "").replace(",", "."))
      : priceDouble;
  }

  return priceDouble;
}

async function getDescription(page: string) {
  const desc1 = page.match(/(?<=id="productDescription" )(.*)(?=<\/span)/s);
  const desc2 = desc1 ? desc1[0].match(/(?<=<span>)(.*)(?=<\/span)/) : null;
  let description = desc2 ? desc2[0] : null;
  if (!description) {
    const desc3 = page.match(/(?<=collapse-content"> <span>)(.*?)(?=<\/span>)/);
    description = desc3 ? desc3[0] : null;
  }
  if (description) {
    description = description?.replace(/(<\/(.*?)>)/g, " ");
    description = description?.replace(/(<(.*?)>)/g, "");
  }

  return description;
}

async function getImages(page: string) {
  let images: Array<string> = [];

  let img1 = page.match(/(?<='colorImages': { 'initial': )(.*?)(?<=\}\])/);
  if (!img1) {
    img1 = page.match(/(?<=data-a-dynamic-image=")(.*?)(?=")/);
    if (img1) {
      img1 = img1[0].match(/(?=https:)(.*?)(?<=.jpg)/g);
      if (img1) {
        for (let i = 0; i < img1.length; i++) {
          images.push(img1[i]);
        }
      }
    }
  } else {
    const imgOBJ = img1 ? JSON.parse(img1![0]) : null;

    if (imgOBJ) {
      images.push(imgOBJ[0].hiRes);
      for (let i = 0; i < imgOBJ.length; i++) {
        let repeated = false;
        for (let j = 0; j < images.length; j++) {
          if (imgOBJ[i].hiRes == images[j]) {
            repeated = true;
            break;
          }
        }
        if (!repeated) {
          images.push(imgOBJ[i].hiRes);
        }
      }
    }
  }
  return images;
}

// async function getImage(page: string) {
//   const img1 = page.match(/(?<="hiRes":")(.*?)(?=")/);
//   const imageUrl = img1 ? img1[0] : null;

//   return imageUrl;
// }

async function getTitle(page: string) {
  const desc1 = page.match(/(?<=id="productTitle" )(.*?)(?=\s*<\/span)/s);
  const desc2 = desc1 ? desc1[0].match(/(?<=">)(.*)/) : null;
  const title = desc2 ? desc2[0].replace(/(^\s+)/, "") : null;

  return title;
}

async function scrapAmazonProduct(amazonParameter: string) {
  // const isAsin = amazonParameter.match(/B.{9}/);
  const isAmzn =
    amazonParameter.match("/amzn.") || amazonParameter.match("amazon.com");

  if (isAmzn) {
    const result = await fetch(amazonParameter, {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language":
          "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7,la;q=0.6,es;q=0.5",
        "cache-control": "max-age=0",
        "device-memory": "8",
        downlink: "10",
        dpr: "1.25",
        ect: "4g",
        rtt: "50",
        "sec-ch-device-memory": "8",
        "sec-ch-dpr": "1.25",
        "sec-ch-ua":
          '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-ch-ua-platform-version": '"10.0.0"',
        "sec-ch-viewport-width": "1229",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        "viewport-width": "1229",
        cookie:
          'ubid-acbbr=132-1254773-9631025; sst-acbbr=Sst1|PQESUcCNtwbUP7ZnNVwMfxUOCR5c_LjofEAzuSgi4XmIVdGOd_zGP2VPt0tfDwf0CBo03DO8c1lckgkeEQgkax52ScMK7mDr-iOejMif7LutDsH4QfcrUolH5jkNbopZxF88RzrvDYOhjd-OA3btIlTvQEnYycr8GwdbdIwHPXecVRY0LXEddn3gMcaSEghyo1EQr9C06pnwMEz_AaQaEMPET-AHC4HbfJ5VE_OOwODCHHqYefwiLFml4ZLsVZj-yDN9b22BQ3ueTAFB6yFJOPEsVJMtIqQoAD6YoxtsuTPl5U8; i18n-prefs=BRL; session-id=135-5473086-7169824; x-acbbr=rPJ7ii2Ic8Ac015oUTzIQC0bQbKtmbKg; at-acbbr=Atza|IwEBIAVZ7-hARARR4Kb5MYP4Fm-FyBnr0mA2gO3ruFeGUDBM3Igj4s9zqKL1jTS9Xeg5O31_2HaRWVHsdcfeWxF8rflikc8flNPk4Hphk_bzh9rDKx-pB69xK2HbhrUX__VMbpgjVNhvMBjAs2LwqLbWlWxWxt0Mcg2PGyWyhrsCemQSCX03Vp_rKxDK9-qL1ysuWd7H0P6SOm6SxwKywHQ1a95y; sess-at-acbbr="SK1P7Uc5Pp8QI//n5zLdFm1JYQmwSRalXXbG+VrK7TA="; lc-acbbr=pt_BR; csd-key=eyJ3YXNtVGVzdGVkIjp0cnVlLCJ3YXNtQ29tcGF0aWJsZSI6dHJ1ZSwid2ViQ3J5cHRvVGVzdGVkIjpmYWxzZSwidiI6MSwia2lkIjoiODkyNmIyIiwia2V5IjoiR2gvNEpwaU9pWW43bW1RMkpDWTFwalRwL3NzdFo0bWxsTmEzYlZMUTdubTVVR0IvMk9aR0tkS21CTHIvWngyQkdjY0ZtMTVMd21KNE1iWWFDSXAzS3VXMlZ5cG5LSzUyamttRVNuM3BvVVhiWFlpblc4dm5lZXdMS2VmekJWeGN4R2pxSW54L0EzOFF6TU1IYUNobWIvZ29Yclh5M2svY3NkaGlMTnQ5Mk93cnRlaTlzUVZhLzhRUkc3Z2F3ZWoyazFDM2N6Z1Qzb2kxZDNUNmI2K3gyWUlVVTNJYi8xaHhZOURZSXZ3TldWR2tRSzZqbWRUcWQ2aEZRWU5UR0JmUE1YSG1jbEg4N1VrdFlLaVB6TU96bXA1SjczSUtQU2EzN0lSeElYYkFJUmhlTHhhWmVCMkpoVGlOQkYzOTE5ZnVUMm1QY1JaNDJiNGhZVDRqdTRRR1RnPT0ifQ==; session-token=Vgl51WJga+1QEXO1R9NKOhTLa7+MXJWX6hDgsjlN5oaeXtmz3ShbxVoYsVuINlxPf0byN9f5h6WjCGmLtBIS4XYzGriXqmIao8SFWBcHV8zH88bh9G+re1+wB6p9D097NpuSdjjuMezyH/LyOUjDf7aE6o+OzS16dXXx+J/yGM73JoffV1yuy7Z0fGuA6XS9lVyVGvcEUHr/oE0WQJipYXuT4BAj1wOvSVKG4WkKDi1yzIX70dnfRim3CKsDsgBU; csm-hit=tb:s-7GKP5CJECBF32KF2Z6JC|1671415397901&t:1671415400746&adb:adblk_no; session-id-time=2082787201l',
      },
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
    });
    const resultText = await result.text();
    const title = await getTitle(resultText);
    const description = await getDescription(resultText);
    // const imageUrl = await getImage(resultText);
    const imageUrls = await getImages(resultText);
    const price = await getPrice(resultText);
    const oldPrice = await getOldPrice(resultText);

    return {
      title: title,
      description: description,
      // imageUrl: imageUrl,
      imageUrls: imageUrls,
      price: price,
      oldPrice: oldPrice,
    };
  } else {
    return null;
  }
}

export { scrapAmazonProduct };
