const fs = require("fs");

// if(fs.existsSync('hello.txt')) {
//    fs.unlink('hello.txt', (err) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log('File deleted successfully!');
//     });
// }
// else{
//     fs.writeFile('hello.txt', 'Hello World!', (err) => {
//         if (err) {
//             console.log(err);

//         }
//         console.log('File created successfully!');
//     });

// }

if (!fs.existsSync("./public")) {
  fs.mkdir("./public", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Folder Created successfully!");
  });
} else {
  fs.rmdir("./public", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Folder Deleted successfully!");
  });
}
