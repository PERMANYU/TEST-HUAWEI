// for (var i = 0; i < 5; i++) {
//   setTimeout(() =>  {
//     console.log(new Date, i)
//  }, 1000); 
// }
// console.log(new Date, i); 
// a(); 
// function a() {
//    console.log('a'); 
// }
// // var b = function() {
// //    console.log("b"); 
// // }
// (function a(a, b) {
//  var c = b - a; 
// console.log(c); return (function a(c, a) {
//      console.log(c - a); 
//   })(3, 1)
// })(1, (function (a) {
//   return a })(10))
// function fun(n, o) {
//     console.log(o); 
//     return {
//         fun:function(m) {
//            return fun (m, n); 
//        }
//     }; 
// }
// var a = fun(0); a.fun(1); a.fun(2); a.fun(3)
// var b = fun(0).fun(1).fun(2).fun(3)
// var c = fun(0).fun(1); c.fun(2); c.fun(3); 
// console.log(a, b, c); 
// console.log(1, [2, 3, 4], 5)
// console.log(1, ...[2, 3, 4], 5)
// var array = [1, 2]
// console.log(array.push(...[2, 3, 4]), '#######'); 
// var obj = Math.max(...[14, 3, 77])
// console.log(obj); 
// const [last, ...btLast] = [1, 2, 3, 4, 5, 6]
// console.log(last, btLast); 

// function multiply(x, y) {
//  return x * y; 
// }
// var result = multiply(3, 1); 
// console.log(result);

// var number = [...Array(100).key()]
// console.log(number);



  //  function sort(element){
  //    for(var i =0;i<element.length-1;i++){
  //      for(var j =0;element.length-i-1;j++){
  //        if(element[j]>element[j+1]){
  //          var map = element[j];
  //          element[j] = element[j+1];
  //          element[j+1] = map
  //        }
  //      }
  //    }
  //    return element
  //  }
  //  var element = [12,32,4,24,1,24,124,2,1,5,215,125,321]

  //  console.log(sort(element));
// var str = '1000|2000|3000'
//   console.log(str.split('|'))
  // var newArr = [];
  //   var b = newArr.push('111');
  //   console.log(b,'111111111111111');
//   const  funcs = []
//   for (let  i = 0; i < 10; i++) {
//       funcs.push(function() { console.log(i) })
//   }
//   funcs.forEach(function(func) {
//       func()
//   })
var aa = [
    {id:1, name: '张三', code: '1000'},
	{id:2, name: '李四', code: '1100'},
	{id:3, name: '王五', code: '1000'},
]
 function getnewArr(arr){
   for(let i=0;i<arr.length;i++){
    for(let j =i+1;j<arr.length;){
        if(arr[i].code == arr[j].code){ //通过id属性进行匹配
            arr.splice(j,1) //去除重复对象
        }else{
            j++;
        }
        }
    }   
    return arr
 }
 console.log(getnewArr(aa));