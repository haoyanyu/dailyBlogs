const composeStockBySku = (sku) => {
  let descartesData = [];
  skus.forEach((sku, index) => {
    if (!descartesData.length) {
      descartesData = initSkuData(sku, index);
    } else {
      descartesData = appendSkuInfo(descartesData, sku, index);
    }
  });
  return descartesData;
};

const initSkuData = (item, key) => {
  const newDescartes = [];

  item.leaf.forEach(atom => {
    const row = {};

    const keyIndex = key + 1;
    row[`k${keyIndex}Id`] = item.dictId;
    row[`k${keyIndex}`] = item.text;
    row[`v${keyIndex}Id`] = atom.dictId;
    row[`v${keyIndex}`] = atom.text;
    row.kLevel = sku.length;

    newDescartes.push(row);
  });

  return newDescartes;
};

const appendSkuInfo = (descartesData, item, key) => {
  const newDescartes = [];

  descartesData.forEach(baseRow => {
    item.leaf.forEach(atom => {
      const row = {};
      Object.keys(baseRow).forEach(key => {
        row[key] = baseRow[key]
      });

      const keyIndex = key + 1;
      row[`k${keyIndex}Id`] = item.dictId;
      row[`k${keyIndex}`] = item.text;
      row[`v${keyIndex}Id`] = atom.dictId;
      row[`v${keyIndex}`] = atom.text;

      newDescartes.push(row);
    });
  });

  return newDescartes;
};

// function calcRowNumber(stock) {
//   let row1 = 0;
//   let row2 = 0;
//   let s1 = 'v1Id';
//   let s2 = 'v2Id';


//   const newStocks = [].concat(stock);

//   newStocks.forEach((item, index) => {
//     if (item[s1] === newStocks[row1][s1]) {
//       if (row1 !== index) {
//         newStocks[row1].row1num++;
//         item.row1num = 0;
//       } else {
//         item.row1num = 1;
//       }
//     } else {
//       item.row1num = 1;
//       row1 = index;
//       item.isNewRow = true;
//     }

//     if (row1 !== index && item[s2] === newStocks[row2][s2]) {
//       if (row2 !== index) {
//         newStocks[row2].row2num++;
//         item.row2num = 0;
//       } else {
//         item.row2num = 1;
//       }
//     } else {
//       item.row2num = 1;
//       row2 = index;

//       if (newStocks[0].row2num > 1) {
//         item.isNewRow = true;
//       }
//     }

//     item.row3num = 1;
//   });
//   return newStocks;
// };

// function calcRowNumber2(stocks) {

// }

