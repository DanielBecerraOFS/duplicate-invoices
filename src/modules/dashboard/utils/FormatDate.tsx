import { DateTime } from "luxon"

interface FormatInvoiceDateProps {
    date: string;
}

const FormatInvoiceDate = (date: FormatInvoiceDateProps['date']): string => {    
    return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);
}

export default FormatInvoiceDate;