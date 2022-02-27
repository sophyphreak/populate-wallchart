const updateWallchartWorkbook = (wallChartWorkbook, wallchartSheetData) => {
  // for every line insert just after and then remove current line
  //  this is to preserve styling
  let wallchartSheet = wallChartWorkbook.getWorksheet("Sheet1")
  wallchartSheetData.forEach((rowData, index) => {
    if (index !== 0) {
      rowData.phoneNumber = standardizePhoneNumber(rowData.phoneNumber)
    }

    // for first two rows, insert below and then remove current row
    //  this is to preserve styling of these rows
    if (index < 2) {
      wallchartSheet = insertRowData({
        targetRow: index + 2, // in ExcelJS, first index is 1
        wallchartSheet,
        rowData,
      })
      wallchartSheet.spliceRows(index + 1, 1) // in ExcelJS, first index is 1
    } else {
      // for all other rows, remove current row and then insert in its plcae
      //  this is also to preserve styling of these rows
      wallchartSheet.spliceRows(index + 1, 1) // in ExcelJS, first index is 1
      wallchartSheet = insertRowData({
        targetRow: index + 1, // in ExcelJS, first index is 1
        wallchartSheet,
        rowData,
      })
    }
  })
  return wallChartWorkbook
}

const standardizePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) {
    return ""
  }
  phoneNumber = phoneNumber.toString()
  phoneNumber = removeNonNumberCharacters(phoneNumber)
  if (phoneNumber.length < 7) {
    return ""
  }
  phoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6)}` // (123) 456-7890 format
  return phoneNumber
}

const removeNonNumberCharacters = (phoneNumber) =>
  phoneNumber.replace(/\D/g, "")

const insertRowData = ({
  wallchartSheet,
  targetRow,
  rowData: {
    firstName,
    lastName,
    floorNumber,
    buildingSide,
    unitNumber,
    relations,
    htu,
    floorCaptain,
    signature,
    phoneNumber,
    email,
    rest,
  },
}) => {
  wallchartSheet.insertRow(
    targetRow,
    [
      ,
      firstName,
      lastName,
      floorNumber,
      buildingSide,
      unitNumber,
      relations,
      htu,
      floorCaptain,
      signature,
      phoneNumber,
      email,
      ...rest,
    ],
    "i+"
  )
  return wallchartSheet
}

export default updateWallchartWorkbook
