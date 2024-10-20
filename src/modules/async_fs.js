const fs = require('fs')
const { promisify } = require('util')
module.exports = {
    // readFileAsync: promisify(fs.readFile),
    // writeFileAsync: promisify(fs.writeFile),
    // accessAsync: promisify(fs.access),
    // readDirAsync: promisify(fs.readdir)
    accessAsync: (path) =>{
        return new Promise((resolve, reject) =>
            fs.access(path, (err) => {
                if (err){reject(err)};
                resolve(true);
            })
        );
    },
    readFileAsync: (path) => {
        return new Promise((resolve, reject) =>
            fs.readFile(path, 'utf8', function (err, data) {
                if (!err) {
                    // Assign user data to request and continue
                    // req.userdata = JSON.parse(data)
                    // next()
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        );
    },
    writeFileAsync: (path, filedata) => {
        return new Promise((resolve, reject) =>
            fs.writeFile(path, filedata, function (err, data) {
                if (!err) {
                    // Assign user data to request and continue
                    // req.userdata = JSON.parse(data)
                    // next()
                    resolve(true);
                } else {
                    reject(err);
                }
            })
        );
    },
    readDirAsync: (directory) => {
        return new Promise((resolve, reject) =>
            fs.readdir(directory, function (err, data) {
                if (!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        );
    },
    deleteFileAsync: (file) => {
        return new Promise((resolve, reject) => {
            fs.unlink(file, err => {
                if (err) {
                    // throw err
                    reject(err);
                }
            })
        })
    },
    mkdirAsync: (folder)=>{
        return new Promise((resolve, reject)=>{
            // ${groupfolder}/${group_folder_str}
            fs.mkdir(folder, (error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(true)
                }
            });
        })
    },
    renameAsync: (oldpath, newpath)=>{
        return new Promise((resolve, reject) => {
            fs.rename(oldpath, newpath, function (err) {
                if (err){ reject(err) }
                resolve('Successfully renamed - AKA moved!')
            })
        });
    },
    // emptyDirAsync: (directory) => {
    //     return new Promise((resolve, reject) => {
    //         fs.emptyDir(directory, function (err) {
    //             if (err) { reject(err) }
    //             resolve(true)
    //         })
    //     });
    // },
    copyFileAsync: (src, dest) => {
        return new Promise((resolve, reject) => {
            fs.copyFile(src, dest, (err) => {
                if (err) {
                    reject();
                }
                else {
                    resolve();
                    // Get the current filenames
                    // after the function
                    // getCurrentFilenames();
                    //     fs.readFileSync("copied_file.txt", "utf8"));
                }
            });
        })
    },
    rmFileAsync: (path) =>{
        return new Promise((resolve, reject)=>{
            fs.rm(path, { recursive: true }, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            }); 
        })
    },
    fileExists: (filePath) => {
        return new Promise((resolve, reject)=>{

            fs.access(filePath, fs.constants.F_OK, (err) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                    resolve(false); // File does not exist
                    } else {
                    reject(err); // Other error occurred
                    }
                } else {
                    resolve(true); // File exists
                }
            });

            
        })
    }
}