const mergeContactInfoIntoWallchartSheetData = (
  contactInfoSheetData,
  wallchartSheetData
) => {
  const newwallchartSheetData = []

  contactInfoSheetData = addTouchedProperty(contactInfoSheetData)

  wallchartSheetData.forEach((wallchartRow, index) => {
    if (isHeaderRow(index)) {
      newwallchartSheetData.push(wallchartRow)
      return
    }

    const { unitNumber } = wallchartRow

    if (noContactInfoFound(unitNumber, contactInfoSheetData)) {
      newwallchartSheetData.push(wallchartRow)
      return
    }
    if (isAlreadyAddedRow(unitNumber, contactInfoSheetData)) {
      return
    }

    let tenants = contactInfoSheetData[unitNumber]
    tenants = addFloorAndSide(tenants, wallchartRow)

    if (rowHasData(wallchartRow)) {
      newwallchartSheetData.push(wallchartRow)
      tenants = removeExtraTenantIfExists(tenants, wallchartRow)
    }

    if (nextIndexSameUnit(wallchartSheetData, index, unitNumber)) {
      return
    }

    newwallchartSheetData.push(...tenants)
  })
  return newwallchartSheetData
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

const rowHasData = ({ firstName, lastName, relations, phoneNumber, email }) => {
  if (firstName || lastName || relations || phoneNumber || email) {
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