const { parse } = require("node-html-parser");
module.exports.url =
  "https://wdfw.wa.gov/fishing/reports/stocking/trout-plants/all?lake_stocked=&county=&species=&hatchery=&region=&items_per_page=250&page=";

const keys = {
  fishPerLb:
    'headers="view-fish-per-lb-table-column" class="views-field views-field-fish-per-lb"',
  lakeName:
    'headers="view-lake-stocked-table-column" class="views-field views-field-lake-stocked"',
  stockDate:
    'headers="view-stock-date-table-column" class="views-field views-field-stock-date"',
  species:
    'headers="view-species-table-column" class="views-field views-field-species"',
  number:
    'headers="view-num-fish-table-column" class="views-field views-field-num-fish"',
  hatcher:
    'headers="view-hatchery-table-column" class="views-field views-field-hatchery"',
};

const GetLakeName = (node) => {
  let lakeName = {};
  let lakeParts = [];
  node.childNodes.forEach((child) => {
    child.childNodes.forEach((item) => {
      if (item._rawText && item._rawText !== "") {
        lakeName = item._rawText.trim();
        lakeParts.push(lakeName);
      }
    });
  });
  return { name: lakeParts[0], county: lakeParts[1], region: lakeParts[2] };
};

const GetDoubleNestText = (node) => {
  let text = "";
  node.childNodes.forEach((child) => {
    child.childNodes.forEach((item) => {
      if (item._rawText && item._rawText !== "") {
        text = item._rawText.trim();
      }
    });
  });
  return text;
};

const GetSingleNestText = (node) => {
  let text = "";
  node.childNodes.forEach((child) => {
    if (child._rawText && child._rawText !== "") {
      text = child._rawText.trim();
    }
  });
  return text;
};

module.exports.ConvertFishPerLb = (fishPerLb) => {
  return parseFloat((1 / fishPerLb).toPrecision(2));
};

module.exports.GetLakes = (data) => {
  const root = parse(data);
  const body = root.querySelector("table");
  const trs = body.querySelectorAll("tr");
  const lakes = trs.map((tr) => {
    const lake = {};
    tr.childNodes.forEach((tds) => {
      if (tds.rawAttrs && tds.rawAttrs === keys.fishPerLb) {
        lake.fishPerLb = GetSingleNestText(tds);
      } else if (tds.rawAttrs && tds.rawAttrs === keys.lakeName) {
        lake.name = GetLakeName(tds);
      } else if (tds.rawAttrs && tds.rawAttrs === keys.stockDate) {
        lake.stockDate = GetSingleNestText(tds);
      } else if (tds.rawAttrs && tds.rawAttrs === keys.species) {
        lake.species = GetDoubleNestText(tds);
      } else if (tds.rawAttrs && tds.rawAttrs === keys.number) {
        lake.number = GetSingleNestText(tds);
      } else if (tds.rawAttrs && tds.rawAttrs === keys.hatchery) {
        lake.hatchery = GetDoubleNestText(tds);
      }
    });
    return lake;
  });
  return lakes.filter((l) => Object.keys(l).length > 0);
};
