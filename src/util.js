const Util = new function () {
    this.loadCsv = async (url) => await $.get(url);

    this.loadCsvByD3 = async (url) => new Promise(function (resolve, reject) {
        d3.csv(url, resolve);
        /*
        d3.csv(url, function(csv){
            // receive csv
            resolve(csv);
        });
        */
    });

    this.loadJson = async(url) => await $.get(url);

    // Promise
};
