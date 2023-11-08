const Axios = require("axios");
const fs = require("fs");

const posts = [{
  "comments": [],
  "likes": [],
  "_id": "65466e5e1464b348dd28c25b",
  "category": {
    "_id": "654669381464b348dd28c25a",
    "number": 1508000000
  },
  "title": "简明 homebrew",
  "imgUrl": "",
  "old_id": "5e45f8d571a15304166e61ef"
}]

(async function () {

  // "_id": "5e45f8d571a15304166e61ef",
  //   "category": {
  //   "_id": "5b14b89593b30d62504cb6d3",
  //     "number": 1507000000
  // },
  // "title": "简明 homebrew"

  const fetch = (id) => {
    return Axios.get(`https://api.xiaohuochai.cc/posts/${id}`);
  }

  let list = [];
  let errList = [];

  for (let i = 0; i < posts.length; i++) {
    const d = posts[i];
    try {
      const data = await fetch(d.old_id);
      const doc = data.data.result.doc;
      console.log("====doc", i, doc.title)
      list.push({ _id: d._id, title: d.title, category: d.category._id, content: doc.content })
    } catch (error) {
      errList.push(d);
    }
  };

  console.log("=====data", list.length, errList.length)
  fs.writeFileSync("./list.txt", JSON.stringify(list), {flag: "w"});
  fs.writeFileSync("./err.txt", JSON.stringify(errList), { flag: "w" });
})()