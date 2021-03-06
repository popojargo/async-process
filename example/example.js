#!/usr/bin/env node
/*
 * Copyright (C) 2016 Alexis
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var asyncProcess = require("../index.js"); //require("async-process");
var fs = require("fs");
var loadedData = {};
var filesToLoad = ["./example/file1.json", "./example/file2.json", "./example/file3.json"];
var filesCb = function (val, cb) {
    fs.readFile(val, function (err, data) {
            if (!err)
                loadedData[val] = data;
            cb(err,val); //Pass null if not error.
        }
    );
};

new asyncProcess(filesToLoad, filesCb, function () {
    //At this point all the files are loaded
    console.log("All files have been processed");
    console.log("\nFile 3 should fail.");
    this.tasksFails.forEach(function(id){
    	console.warn("Task : "+id+" failed.");
    })
});