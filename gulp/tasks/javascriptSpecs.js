import gulp from "gulp";
import config from "../config";
import start from "gulp-start-process";
import { watchTask, addFileHandler } from "./watch";
import fs from "fs";


let getJavaScriptFilesIn = function (dir) {
    let results = []
    let files = fs.readdirSync(dir);
    files.forEach(file => {
        var path = dir + '/' + file
        var stat = fs.statSync(path)
        if (stat && stat.isDirectory()) results = results.concat(getJavaScriptFilesIn(path))
        else if (file.startsWith("when_") && file.endsWith(".js")) results.push(path)
    });
    return results
};

export function javaScriptSpecsPipeline(stream) {
    let tempFile = "temp.js";

    console.log("Gather all files and output temp file");

    fs.writeFile(tempFile,"");
    getJavaScriptFilesIn("./Specifications/Master").forEach((file, index) => {
        file = file.substr(2);
        fs.appendFile(tempFile, "require(\""+file+"\")\n");
    });

    console.log("Done - run the specs");

    start("jspmjasmine --jasmine-config jasmine.json", { setsid: true }, () => { });
    return stream;
}


gulp.task("javascriptspecs", cb => {
    //var stream = gulp.src(config.paths.javascriptSpecs, { base: config.paths.specsDir })
    javaScriptSpecsPipeline();
    //return stream;
    addFileHandler(config.paths.javascript, javaScriptSpecsPipeline);
    addFileHandler(config.paths.javascriptSpecs, javaScriptSpecsPipeline);
    watchTask(cb);
});