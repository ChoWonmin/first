const analysis = new async function () {

    let result = Format.format();
    const imageList = await Util.loadCsvByD3('/data/image.csv');

    console.log('result' , result);
    console.log('imageList',imageList);

}