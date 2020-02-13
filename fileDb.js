const fs = require('fs');

const fileName = './db.json';

let data = [];

module.exports = {
    init() {
        try {
            const content = fs.readFileSync(fileName);
            data = JSON.parse(content.toString());
        } catch (e) {
            data = [];
        }
    },
    getItems() {
        return data;
    },
    addItem(item) {
        data.push(item);
        this.save();
    },
    save() {
        const content = JSON.stringify(data, null, 2);
        fs.writeFileSync(fileName, content);
    }
};