const getWallchartSheetData = (workbook) => {
  const sheet = []
  workbook.getWorksheet("Sheet1").eachRow((row) => {
    const [
      ,
      firstName,
      lastName,
      floorNumber,
      buildingSide,
      unitNumber,
      relations,
      htu,
      floorCaptain,
      phoneNumber,
      email,
    ] = row.values
    sheet.push({
      firstName,
      lastName,
      floorNumber,
      buildingSide,
      unitNumber,
      relations,
      htu,
      floorCaptain,
      phoneNumber,
      email,
    })
  })
  return sheet
}

export default getWallchartSheetData
