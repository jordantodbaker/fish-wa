const { parse } = require("node-html-parser");
const afterLoad = require("after-load");

const url =
  "https://wdfw.wa.gov/fishing/reports/stocking/trout-plants/all?lake_stocked=&county=&species=&hatchery=&region=&items_per_page=250&page=0";

const html = afterLoad("https://wdfw.wa.gov");
console.log(html);

// afterLoad("https://www.google.com", (html) => {
//   console.log("IN HERE");
//   console.log("HTML: ", html);
// });

//console.log(root.firstChild.structure);
// ul#list
//   li
//     #text

//console.log(root.querySelector("#list"));
// { tagName: 'ul',
//   rawAttrs: 'id="list"',
//   childNodes:
//    [ { tagName: 'li',
//        rawAttrs: '',
//        childNodes: [Object],
//        classNames: [] } ],
//   id: 'list',
//   classNames: [] }
//console.log(root.toString());
// <ul id="list"><li>Hello World</li></ul>
//root.set_content("<li>Hello World</li>");
//root.toString(); // <li>Hello World</li>
