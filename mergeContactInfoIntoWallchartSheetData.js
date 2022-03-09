const mergeContactInfoIntoWallchartSheetData = (
  contactInfoSheetData,
  wallchartSheetData
) => {
  const newWallchartSheetData = []

  contactInfoSheetData = addTouchedProperty(contactInfoSheetData)

  wallchartSheetData.forEach((wallchartRow, index) => {
    if (isHeaderRow(index)) {
      newWallchartSheetData.push(wallchartRow)
      return
    }

    const { unitNumber } = wallchartRow

    if (noContactInfoFound(unitNumber, contactInfoSheetData)) {
      newWallchartSheetData.push(wallchartRow)
      return
    }
    if (isAlreadyAddedRow(unitNumber, contactInfoSheetData)) {
      return
    }

    let tenants = contactInfoSheetData[unitNumber]
    tenants = addFloorAndSide(tenants, wallchartRow)

    if (rowHasData(wallchartRow)) {
      newWallchartSheetData.push(wallchartRow)
      tenants = removeExtraTenantIfExists(tenants, wallchartRow)
    }

    if (nextIndexSameUnit(wallchartSheetData, index, unitNumber)) {
      return
    }

    newWallchartSheetData.push(...tenants)
    contactInfoSheetData[unitNumber].touched = true
  })
  return newWallchartSheetData
}

// make sure we don't add a unit's inhabitants more than once
const addTouchedProperty = (contactInfoSheetData) => {
  for (let key of Object.keys(contactInfoSheetData)) {
    contactInfoSheetData[key].touched = false
  }
  return contactInfoSheetData
}

const isHeaderRow = (index) => {
  if (index === 0) {
    return true
  }
  return false
}

const noContactInfoFound = (unitNumber, contactInfoSheetData) => {
  if (!contactInfoSheetData.hasOwnProperty(unitNumber)) {
    return true
  }
  return false
}

const isAlreadyAddedRow = (unitNumber, contactInfoSheetData) => {
  if (contactInfoSheetData[unitNumber].touched) {
    return true
  }
  return false
}

const addFloorAndSide = (tenants, wallchartRow) => {
  return tenants.map((tenant) => {
    tenant.floorNumber = wallchartRow.floorNumber
    tenant.buildingSide = wallchartRow.buildingSide
    return tenant
  })
}

const rowHasData = ({
  firstName,
  lastName,
  relations,
  phoneNumber,
  email,
  rest,
}) => {
  if (
    firstName ||
    lastName ||
    relations ||
    phoneNumber ||
    email ||
    rest.length
  ) {
    return true
  }
  return false
}

const removeExtraTenantIfExists = (tenants, wallchartRow) => {
  return tenants.filter((tenant) => {
    for (let key of Object.keys(tenants)) {
      if (key === "touched" || key === "canAttendMeeting") {
        continue
      }
      if (tenant[key] === wallchartRow[key]) {
        return false
      }
    }
    return true
  })
}

const nextIndexSameUnit = (wallchartSheetData, index, currentUnitNumber) => {
  if (wallchartSheetData.length - 1 === index) {
    // end of array
    return false
  }
  if (wallchartSheetData[index + 1] === currentUnitNumber) {
    return true
  }
  return false
}

export default mergeContactInfoIntoWallchartSheetData
