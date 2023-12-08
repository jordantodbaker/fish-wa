const axios = require("axios");
const ps = require("@planetscale/database");

const { url, GetLakes } = require("./utils/lake-scraping");

const dotenv = require("dotenv");
dotenv.config({ path: `../.env.local`, override: true });

const config = {
  host: process.env.PLANETSCALE_DB_HOST,
  username: process.env.PLANETSCALE_DB_USERNAME,
  password: process.env.PLANETSCALE_DB_PASSWORD,
};

const db = ps.connect(config);

const pages = [0, 1, 2, 3, 4];

Promise.all(
  pages.map((page) => {
    return axios.get(`${url}${page}`).then((response) => {
      const { data } = response;
      return GetLakes(data);
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

  db.execute("SELECT * FROM counties").then((result) => {
    const mappedLakes = uniqueLakes
      .map((lake) => {
        const countyId = result.rows.reduce((acc, cur) => {
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
      db.execute("INSERT INTO lakes (countyId, name) VALUES (?, ?);", [
        lake.countyId,
        lake.name.name,
      ]);
    });
  });
});

const getCountyId = (counties, lake) => {};

const printLakes = (lakes) => {
  lakes.forEach((lake) => {
    console.log(lake);
  });
};
