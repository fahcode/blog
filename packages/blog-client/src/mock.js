
// 引入mockjs
const pathRegexp = require('path-to-regexp');
const Mock = require('mockjs')

function normalizeResult(keys, matches) {
    let res = {};
    keys.forEach(function (item, index) {
        res[item.name] = matches[index + 1];
    });
    return res;
}
function Chain() {
    this._routes = [];
}
Chain.prototype.add = function (pattern, cb) {
    let keys = [];
    let re = pathRegexp(pattern, keys);
    this._routes.push({
        re,
        keys,
        cb
    });
};

Chain.prototype.exec = function (req, fn) {
    let len = this._routes.length;
    for (let i = 0; i < len; i++) {
        let route = this._routes[i];
        let matches = route.re.exec(req.params[0]);
        if (!matches) {
            continue;
        } else {
            return fn(route.cb(req, normalizeResult(route.keys, matches)));
        }
    }
};

let chain = new Chain();

// 使用mockjs模拟数据
chain.add('auth/signup', (req, res) => Mock.mock({
    "code": 0,
    "message": "获取类别成功",
    "result": {
        "docs": [{
            "posts": [], "_id": "5a8fc4452de6163e107db8fb", "number": 1000000000, "name": "HTML", "description": "",
            "index": 0,
            "name": "语法",
            "number": 1001000000,
            "posts": [{ _id: "5a7eef1a1453972fd0a53eea", title: "HTML基础语法" }],
            "recommend": false,
            "_id": "5a8fc4872de6163e107db8fc",
        }]
    }
}))
//Mock.mock('/auth/signin_by_username', (req, res) => ({
chain.add('auth/signin_by_username', (req, res) => Mock.mock({
    "code": 0,
    "message": "获取类别成功",
    "result": {
        "docs": [{
            "posts": [], "_id": "5a8fc4452de6163e107db8fb", "number": 1000000000, "name": "HTML", "description": "",
            "index": 0,
            "name": "语法",
            "number": 1001000000,
            "posts": [{ _id: "5a7eef1a1453972fd0a53eea", title: "HTML基础语法" }],
            "recommend": false,
            "_id": "5a8fc4872de6163e107db8fc",
        }]
    }
}))
chain.add('auth/signin_by_phonenumber', (req, res) => Mock.mock({
//Mock.mock('/auth/signin_by_phonenumber', (req, res) => ({
    "code": 0,
    "message": "获取类别成功",
    "result": {
        "docs": [{
            "posts": [], "_id": "5a8fc4452de6163e107db8fb", "number": 1000000000, "name": "HTML", "description": "",
            "index": 0,
            "name": "语法",
            "number": 1001000000,
            "posts": [{ _id: "5a7eef1a1453972fd0a53eea", title: "HTML基础语法" }],
            "recommend": false,
            "_id": "5a8fc4872de6163e107db8fc",
        }]
    }
}))
chain.add('auth/verificate', (req, res) => Mock.mock({
//Mock.mock('/auth/verificate', (req, res) => ({
    "code": 0,
    "message": "获取类别成功",
    "result": {
        "docs": [{
            "posts": [], "_id": "5a8fc4452de6163e107db8fb", "number": 1000000000, "name": "HTML", "description": "",
            "index": 0,
            "name": "语法",
            "number": 1001000000,
            "posts": [{ _id: "5a7eef1a1453972fd0a53eea", title: "HTML基础语法" }],
            "recommend": false,
            "_id": "5a8fc4872de6163e107db8fc",
        }]
    }
}))
chain.add('users', (req, res) => Mock.mock({
//Mock.mock('/users', (req, res) => ({
    "code": 0,
    "message": "获取类别成功",
    "result": {
        "docs": [{
            "posts": [], "_id": "5a8fc4452de6163e107db8fb", "number": 1000000000, "name": "HTML", "description": "",
            "index": 0,
            "name": "语法",
            "number": 1001000000,
            "posts": [{ _id: "5a7eef1a1453972fd0a53eea", title: "HTML基础语法" }],
            "recommend": false,
            "_id": "5a8fc4872de6163e107db8fc",
        }]
    }
}))
chain.add('posts', (req, res) => Mock.mock({
//Mock.mock('/posts', (req, res) => ({
    "code": 0,
    "message": "获取类别成功",
    "result": {
        "docs": [{
            "posts": [], "_id": "5a8fc4452de6163e107db8fb", "number": 1000000000, "name": "HTML", "description": "",
            "index": 0,
            "name": "语法",
            "number": 1001000000,
            "posts": [{ _id: "5a7eef1a1453972fd0a53eea", title: "HTML基础语法" }],
            "recommend": false,
            "_id": "5a8fc4872de6163e107db8fc",
        }]
    }
}))
chain.add('topics', (req, res) => Mock.mock({
//Mock.mock('/topics', 'get', (req, res) => ({
    "code": 0,
    "message": "获取类别成功",
    "result": {
        "docs": [{
            "posts": [], "_id": "5a8fc4452de6163e107db8fb", "number": 1000000000, "name": "HTML", "description": "",
            "index": 0,
            "name": "语法",
            "number": 1001000000,
            "posts": [{ _id: "5a7eef1a1453972fd0a53eea", title: "HTML基础语法" }],
            "recommend": false,
            "_id": "5a8fc4872de6163e107db8fc",
        }]
    }
}))
chain.add('categories', (req, res) => Mock.mock({
//Mock.mock('/categories', 'get', (req, res) => ({
    "code": 0,
    "message": "获取类别成功",
    "result": {
        "docs": [{
            "posts": [], "_id": "5a8fc4452de6163e107db8fb", "number": 1000000000, "name": "HTML", "description": "",
            "index": 0,
            "name": "语法",
            "number": 1001000000,
            "posts": [{ _id: "5a7eef1a1453972fd0a53eea", title: "HTML基础语法" }],
            "recommend": false,
            "_id": "5a8fc4872de6163e107db8fc",
        }]
    }
}))
chain.add('likes', (req, res) => Mock.mock({
//Mock.mock('/likes', (req, res) => ({
    "code": 0,
    "message": "获取类别成功",
    "result": {
        "docs": [{
            "posts": [], "_id": "5a8fc4452de6163e107db8fb", "number": 1000000000, "name": "HTML", "description": "",
            "index": 0,
            "name": "语法",
            "number": 1001000000,
            "posts": [{ _id: "5a7eef1a1453972fd0a53eea", title: "HTML基础语法" }],
            "recommend": false,
            "_id": "5a8fc4872de6163e107db8fc",
        }]
    }
}))
chain.add('comments', (req, res) => Mock.mock({
//Mock.mock('/comments', (req, res) => ({
    "code": 0,
    "message": "获取类别成功",
    "result": {
        "docs": [{
            "posts": [], "_id": "5a8fc4452de6163e107db8fb", "number": 1000000000, "name": "HTML", "description": "",
            "index": 0,
            "name": "语法",
            "number": 1001000000,
            "posts": [{ _id: "5a7eef1a1453972fd0a53eea", title: "HTML基础语法" }],
            "recommend": false,
            "_id": "5a8fc4872de6163e107db8fc",
        }]
    }
}))


//export default function (req, res, next) {
module.exports =  function (req, res, next) {
    console.log(1,req)
    console.log(2, res)
    console.log(3, next)
    chain.exec(req, function (result) {
        if (req.query.jsonpCallback) {
            res.send(`${req.query.jsonpCallback}(${JSON.stringify(result)})`);
        } else {
            res.json(result);
        }
        next();
    })
}