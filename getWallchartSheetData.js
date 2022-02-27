const getWallchartSheetData = (workbook) => {
  const sheet = []
  workbook.getWorksheet("Sheet1").eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      validateColumnHeaders(row.values)
    }
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
      signature,
      phoneNumber,
      email,
      ...rest // all cells to the right
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
      signature,
      phoneNumber,
      email,
      rest,
    })
  })
  return sheet
}

const validateColumnHeaders = (columnHeaders) => {
  columnHeaders.forEach((header, index) => {
    if (index >= expectedColumnHeaders.length) {
      return
    }
    const expectedHeader = expectedColumnHeaders[index]
    if (header !== expectedHeader) {
      throw new Error(
        `Unexpected column header. Expected: ${expectedHeader} but instead received: ${header}`
      )
    }
  })
}

const expectedColumnHeaders = [
  ,
  "First Name",
  "Last Name",
  "Floor #",
  "Side of building",
  "Unit #",
  "Relations",
  "HTU",
  "Floor captain",
  "Signature",
  "Phone Number",
  "Email",
]

export default getWallchartSheetData
