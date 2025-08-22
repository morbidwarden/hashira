const fs = require("fs");

const raw = fs.readFileSync("data.json", "utf8");
const data = JSON.parse(raw);

const n = data.keys.n;
const k = data.keys.k; 

let xs = [];
let ys = [];

for (let key in data) {
  if (key === "keys") continue;

  const x = parseInt(key);
  const base = parseInt(data[key].base);
  const value = data[key].value;
  const y = parseInt(value, base); 

  xs.push(x);
  ys.push(y);
}

console.log("Points:");
for (let i = 0; i < xs.length; i++) {
  console.log(`(${xs[i]}, ${ys[i]})`);
}

function lagrange(xs, ys) {
  const m = xs.length;
  return function (x) {
    let result = 0;
    for (let i = 0; i < m; i++) {
      let term = ys[i];
      for (let j = 0; j < m; j++) {
        if (i !== j) {
          term *= (x - xs[j]) / (xs[i] - xs[j]);
        }
      }
      result += term;
    }
    return result;
  };
}

const P = lagrange(xs, ys);

console.log("\nCheck interpolation:");
for (let i = 0; i < xs.length; i++) {
  console.log(`P(${xs[i]}) = ${P(xs[i])} (expected ${ys[i]})`);
}
console.log("Constant term c =", P(0));
