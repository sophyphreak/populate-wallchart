import ExcelJS from "exceljs"
import getInputSheet from "./getContactInfoSheetData.js"
import getWallchartSheetData from "./getWallchartSheetData.js"
import mergeContactInfoIntoWallchartSheetData from "./mergeContactInfoIntoWallchartSheetData.js"
import updateWallchartWorkbook from "./updateWallchartWorkbook.js"

const contactInfoWorkbook = new ExcelJS.Workbook()
await contactInfoWorkbook.xlsx.readFile(
  "Ventana Tenants' Union Contact Information.xlsx"
)

const contactInfoSheetData = getInputSheet(contactInfoWorkbook)

let wallchartWorkbook = new ExcelJS.Workbook()
await wallchartWorkbook.xlsx.readFile("Ventana@Midtown Campaign.xlsx")

let wallchartSheetData = getWallchartSheetData(wallchartWorkbook)

wallchartSheetData = mergeContactInfoIntoWallchartSheetData(
  contactInfoSheetData,
  wallchartSheetData
)

wallchartWorkbook = updateWallchartWorkbook(
  wallchartWorkbook,
  wallchartSheetData
)

await wallchartWorkbook.xlsx.writeFile("./created excel file.xlsx")
