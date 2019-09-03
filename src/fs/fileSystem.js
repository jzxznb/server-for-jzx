/* eslint-disable no-console */
const fs = require('fs');

const defaultPath = './../';
const defaultDir = 'webFile';
const suffix = 'web';

class FileSystem {
    constructor(dirName) {
        this.path = dirName ? `${defaultPath}${dirName}` : `${defaultPath}${defaultDir}`;
        this.initDir();
    }

    initDir() {
        try {
            fs.readdirSync(this.path);
        } catch (e) {
            fs.mkdirSync(this.path);
        }
    }

    readFile(fileName) {
        try {
            const fc = fs.readFileSync(`${this.path}/${fileName}.${suffix}`);
            return fc.toString();
        } catch (e) {
            return '-1';
        }
    }

    updateFile(fileName, info) {
        try {
            fs.writeFileSync(`${this.path}/${fileName}.${suffix}`, info);
            return this;
        } catch (e) {
            return '-1';
        }
    }

    deleteFile(fileName) {
        try {
            fs.unlinkSync(`${this.path}/${fileName}.${suffix}`);
            return this;
        } catch (e) {
            return this;
        }
    }
}

module.exports = FileSystem;
