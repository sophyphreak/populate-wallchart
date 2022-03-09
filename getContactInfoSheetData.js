const getContactInfoSheetData = (workbook) => {
  const sheet = {}

  workbook.getWorksheet("Form Responses 1").eachRow((row, index) => {
    // to get rid of header row, index starts at 1 for some reason
    if (index === 1) {
      validateColumnHeaders(row.values)
      return
    }

    // strangely, there's an empty item at the beginning of the array
    const [, , name, unitNumber, phoneNumber, email, canAttendMeeting] =
      row.values

    const [firstName, lastName] = getFirstLastName(name)

    const tenant = {
      firstName,
      lastName,
      unitNumber,
      phoneNumber,
      email: email ? email.toLowerCase() : undefined,
      canAttendMeeting,
      rest: [], // to prevent errors. `rest` refers to all other cells to the right of the main ones
    }
    if (sheet.hasOwnProperty(unitNumber)) {
      sheet[unitNumber].push(tenant)
    } else {
      sheet[unitNumber] = [tenant]
    }
  })
  return sheet
}

const validateColumnHeaders = (columnHeaders) => {
  columnHeaders.forEach((header, index) => {
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
  "Timestamp",
  "Name:",
  "Unit #:",
  "Phone #:",
  "Email:",
  "Can you attend our Zoom meeting, this Monday at 7:30pm?",
]

const getFirstLastName = (name) => {
  const spaceIndex = name.indexOf(" ")
  if (spaceIndex === -1) {
    return [name, ""]
  }
  const firstName = name.slice(0, spaceIndex)
  const lastName = name.slice(spaceIndex + 1)
  return [firstName, lastName]
}

export default getContactInfoSheetData
