const { parse } = require("node-html-parser");
// const afterLoad = require("after-load");
const axios = require("axios");
const mysql = require("serverless-mysql");

const dotenv = require("dotenv");
dotenv.config();
dotenv.config({ path: `../.env.local`, override: true });

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
  },
});

const url =
  "https://wdfw.wa.gov/fishing/reports/stocking/trout-plants/all?lake_stocked=&county=&species=&hatchery=&region=&items_per_page=250&page=";

const fishPerLbKey =
  'headers="view-fish-per-lb-table-column" class="views-field views-field-fish-per-lb"';
const lakeNameKey =
  'headers="view-lake-stocked-table-column" class="views-field views-field-lake-stocked"';
const stockDateKey =
  'headers="view-stock-date-table-column" class="views-field views-field-stock-date"';
const speciesKey =
  'headers="view-species-table-column" class="views-field views-field-species"';
const numberKey =
  'headers="view-num-fish-table-column" class="views-field views-field-num-fish"';
const hatcheryKey =
  'headers="view-hatchery-table-column" class="views-field views-field-hatchery"';

const pages = [0, 1, 2, 3, 4];

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

Promise.all(
  pages.map((page) => {
    return axios.get(`${url}${page}`).then((response) => {
      const { data } = response;
      const root = parse(data);
      const body = root.querySelector("table");
      const trs = body.querySelectorAll("tr");
      const lakes = trs.map((tr) => {
        const lake = {};
        tr.childNodes.forEach((tds) => {
          if (tds.rawAttrs && tds.rawAttrs === fishPerLbKey) {
            lake.fishPerLb = GetSingleNestText(tds);
          } else if (tds.rawAttrs && tds.rawAttrs === lakeNameKey) {
            lake.name = GetLakeName(tds);
          } else if (tds.rawAttrs && tds.rawAttrs === stockDateKey) {
            lake.stockDate = GetSingleNestText(tds);
          } else if (tds.rawAttrs && tds.rawAttrs === speciesKey) {
            lake.species = GetDoubleNestText(tds);
          } else if (tds.rawAttrs && tds.rawAttrs === numberKey) {
            lake.number = GetSingleNestText(tds);
          } else if (tds.rawAttrs && tds.rawAttrs === hatcheryKey) {
            lake.hatchery = GetDoubleNestText(tds);
          }
        });
        return lake;
      });
      return lakes;
    });
  })
).then((result) => {
  const allLakes = [
    ...result[0],
    ...result[1],
    ...result[2],
    ...result[3],
    ...result[4],
  ];

  const uniqueLakes = [
    ...new Map(
      allLakes
        .filter((lake) => lake.name)
        .map((item) => [item.name?.name, item])
    ).values(),
  ];

  db.query("SELECT * FROM counties").then((result) => {
    const mappedLakes = uniqueLakes
      .map((lake) => {
        const countyId = result.reduce((acc, cur) => {
          if (cur.name === lake.name.county) {
            acc = cur.id;
          }
          return acc;
        });

        return {
          ...lake,
          countyId: typeof countyId === "number" ? countyId : undefined,
        };
      })
      .filter((lake) => {
        return typeof lake.countyId !== "undefined";
      });

    mappedLakes.forEach((lake) => {
      db.query("INSERT INTO lakes (countyId, name) VALUES (?, ?);", [
        lake.countyId,
        lake.name.name,
      ]);
    });
  });

  db.end();
});

const getCountyId = (counties, lake) => {};

const printLakes = (lakes) => {
  lakes.forEach((lake) => {
    console.log(lake);
  });
};
