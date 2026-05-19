import * as xlsx from 'xlsx';
import path from 'path';
import fs from 'fs';

export const EXCEL_FILE_PATH = path.join(process.cwd(), 'enquiries.xlsx');

export interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  institution?: string;
  sport: string;
  enquiryType: string;
  message: string;
}

export function saveEnquiryToExcel(data: EnquiryData) {
  let workbook: xlsx.WorkBook;
  let worksheet: xlsx.WorkSheet;

  // Check if file exists
  if (fs.existsSync(EXCEL_FILE_PATH)) {
    // Read existing workbook
    workbook = xlsx.readFile(EXCEL_FILE_PATH);
    worksheet = workbook.Sheets[workbook.SheetNames[0]];
    
    // Add new row to existing sheet
    xlsx.utils.sheet_add_json(worksheet, [{
      ...data,
      Date: new Date().toLocaleString()
    }], { skipHeader: true, origin: -1 });
  } else {
    // Create new workbook and worksheet
    workbook = xlsx.utils.book_new();
    worksheet = xlsx.utils.json_to_sheet([{
      ...data,
      Date: new Date().toLocaleString()
    }]);
    
    // Add worksheet to workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Enquiries');
  }

  // Write to file
  try {
    xlsx.writeFile(workbook, EXCEL_FILE_PATH);
  } catch (error) {
    console.warn(`Could not write to ${EXCEL_FILE_PATH}, trying fallback filename. Error:`, error);
    const timestamp = new Date().getTime();
    const fallbackPath = path.join(process.cwd(), `enquiries_${timestamp}.xlsx`);
    xlsx.writeFile(workbook, fallbackPath);
    console.info(`Saved data to fallback file: ${fallbackPath}`);
  }
}
