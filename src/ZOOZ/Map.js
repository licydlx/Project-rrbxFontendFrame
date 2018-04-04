// const map = new Map([
//   ['name', '张三'],
//   ['title', 'Author']
// ]);

// map.size // 2
// map.has('name') // true
// map.get('name') // "张三"
// map.has('title') // true
// map.get('title') //
// console.log(map);

// const map = new Map([
//   [1, 'one'],
//   [2, 'two'],
//   [3, 'three'],
// ]);
// const reporter = {
//   report: function(key, value) {
//     // console.log("Key: %s, Value: %s", key, value);
//     console.log("haha");
//   }
// };
// map.forEach(function(value, key, map) {
//    this.report(key, value);
// }, reporter);

// function strMapToObj(strMap) {
//   let obj = Object.create(null);
//   for (let [k,v] of strMap) {
//     obj[k] = v;
//   }
//   return obj;
// }

// const myMap = new Map()
//   .set('yes', true)
//   .set('no', false);

// strMapToObj(myMap)

// console.log(strMapToObj(myMap));
// const shapeType = {
// 	triangle: Symbol()
// };

// function getArea(shape, options) {
// 	let area = 0;
// 	switch (shape) {
// 		case shapeType.triangle:
// 			area = .5 * options.width * options.height;
// 			break;
// 	}
// 	return area;
// }

// var test = getArea(shapeType.triangle, {
// 	width: 100,
// 	height: 100
// });

// console.log(test);

let size = Symbol('size');

class Collection {
  constructor() {
    this[size] = 0;
  }

  add(item) {
    this[this[size]] = item;
    this[size]++;
  }

  static sizeOf(instance) {
    return instance[size];
  }
}

let x = new Collection();
Collection.sizeOf(x) // 0

x.add('foo');
Collection.sizeOf(x) // 1

Object.keys(x) // ['0']
Object.getOwnPropertyNames(x) // ['0']
Object.getOwnPropertySymbols(x) // [Symbol(size)]