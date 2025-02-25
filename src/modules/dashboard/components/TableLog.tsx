import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "./../../../../Celonis_DummyData.json";
import { Checkbox } from "@/components/ui/checkbox";
import {
  PaginationTable,
  TableDrawerDetails,
} from "@/modules/dashboard/router";

const invoices = [
  {
    "Group Pattern": "Similar Value",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000001910 - Acme Corportion",
    "Group Value": 17281.43596,
    "Amount Overbooked": 8613.119279,
    "Group Contains": "All Open",
    "Earliest Due Date": "11-03-2025",
    "Group UUID":
      "dd1d3dd8183f13ece175a6510a820e74ed329955d22a1432f7dc8661e5ce0c1f",
  },
  {
    "Group Pattern": "Similar Value",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000003745 - Destec Office Supplies",
    "Group Value": 14477.75737,
    "Amount Overbooked": 7215.500918,
    "Group Contains": "All Open",
    "Earliest Due Date": "12-03-2025",
    "Group UUID":
      "aa61e1bb21f337e37a6281eccbab741687c7e564991bc4af0f02f4999bf98338",
  },
  {
    "Group Pattern": "Similar Value",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000100128 - Global Business Properties",
    "Group Value": 14250.53154,
    "Amount Overbooked": 7114.410041,
    "Group Contains": "All Cleared",
    "Earliest Due Date": null,
    "Group UUID":
      "2fe2d39a7abda76e4ddfe8a231a280a42887a841a1494f14dd7e300397f59947",
  },
  {
    "Group Pattern": "Similar Reference",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000000300 - AluCast",
    "Group Value": 13652.82429,
    "Amount Overbooked": 6826.412144,
    "Group Contains": "All Open",
    "Earliest Due Date": "26-02-2025",
    "Group UUID":
      "a9eeaef204585c93c03e566eb01a56f5ac031ec8c6652046942959e7aa7c4274",
  },
  {
    "Group Pattern": "Similar Value",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000071201 - Manhattan Corporation",
    "Group Value": 13235.88834,
    "Amount Overbooked": 6604.413433,
    "Group Contains": "All Open",
    "Earliest Due Date": "13-03-2025",
    "Group UUID":
      "177201473d296660a17f3ab1e2937d23f7f19dd5138b1a71119b496e14fabd9a",
  },
  {
    "Group Pattern": "Similar Value",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000100128 - Global Business Properties",
    "Group Value": 13218.69712,
    "Amount Overbooked": 6604.413433,
    "Group Contains": "All Cleared",
    "Earliest Due Date": null,
    "Group UUID":
      "6209990067dc91a734efc8bd55d1083405631a13a8f189933ede7a1b756b4819",
  },
  {
    "Group Pattern": "Similar Reference",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000200016 - State of California",
    "Group Value": 13208.82687,
    "Amount Overbooked": 6604.413433,
    "Group Contains": "All Cleared",
    "Earliest Due Date": null,
    "Group UUID":
      "8a8d5ae602202a32e028382502c105bb9f93b777457ca5734ef2a55402223d3f",
  },
  {
    "Group Pattern": "Exact Match",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000005900 - Enigma",
    "Group Value": 13208.82687,
    "Amount Overbooked": 6604.413433,
    "Group Contains": "All Open",
    "Earliest Due Date": "03-03-2025",
    "Group UUID":
      "9ac62da41201f3036c312a229d9af97b3fa6c9491385ba8791ea6220285d092e",
  },
  {
    "Group Pattern": "Exact Match",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000005560 - IOT Furnitures Inc.",
    "Group Value": 13208.82687,
    "Amount Overbooked": 6604.413433,
    "Group Contains": "All Open",
    "Earliest Due Date": "03-03-2025",
    "Group UUID":
      "9e2baecc878ccb0a96ba4339bcbbf28ae2afa1b81f3764af50acac7f69436065",
  },
  {
    "Group Pattern": "Exact Match",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000003920 - Pyramid Systems",
    "Group Value": 13208.82687,
    "Amount Overbooked": 6604.413433,
    "Group Contains": "All Open",
    "Earliest Due Date": "09-03-2025",
    "Group UUID":
      "a6ba84e296db75afdf3654b716787eb85144093ddc3f2c4d2b50e9565af4337f",
  },
  {
    "Group Pattern": "Exact Match",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000071809 - WCB - Quebec",
    "Group Value": 13208.82687,
    "Amount Overbooked": 6604.413433,
    "Group Contains": "All Open",
    "Earliest Due Date": "02-03-2025",
    "Group UUID":
      "f636db84a8a81db42ce6d33badf61308b14e5143f8356d030ebbda7ba57c090d",
  },
  {
    "Group Pattern": "Similar Date",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000100128 - Global Business Properties",
    "Group Value": 10859.34378,
    "Amount Overbooked": 5429.671888,
    "Group Contains": "All Cleared",
    "Earliest Due Date": null,
    "Group UUID":
      "3ae5b19769e423bfeb23ee24ec288a33e620085b4d02bf9bc1970c13e2c329c7",
  },
  {
    "Group Pattern": "Similar Value",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000010099 - Noe Food Company",
    "Group Value": 10660.88191,
    "Amount Overbooked": 5308.752121,
    "Group Contains": "All Open",
    "Earliest Due Date": "12-03-2025",
    "Group UUID":
      "b829d8c945e7e3f200da8c6aff6b13c9db6f2341527be11b9811b4f98c3111eb",
  },
  {
    "Group Pattern": "Exact Match",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000100128 - Global Business Properties",
    "Group Value": 2574.727759,
    "Amount Overbooked": 1716.485173,
    "Group Contains": "All Cleared",
    "Earliest Due Date": null,
    "Group UUID":
      "58c74386c1489a534c4749300abb1e90be2b577e275b8766e467349cde83bfcf",
  },
  {
    "Group Pattern": "Exact Match",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000100128 - Global Business Properties",
    "Group Value": 1800.0,
    "Amount Overbooked": 1200.0,
    "Group Contains": "All Cleared",
    "Earliest Due Date": null,
    "Group UUID":
      "21dbf894460e0c4aea69dbf77f82fb8027da01b7abd156e8cf2a8daf5ab0a888",
  },
  {
    "Group Pattern": "Exact Match",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000100128 - Global Business Properties",
    "Group Value": 1800.0,
    "Amount Overbooked": 1200.0,
    "Group Contains": "All Cleared",
    "Earliest Due Date": null,
    "Group UUID":
      "31390a51f0ccf3b0102ae3eda6f9543f82883d6219bca3f1f61d8c517f892270",
  },
  {
    "Group Pattern": "Exact Match",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000003458 - Meyers Real Estate AG",
    "Group Value": 1800.0,
    "Amount Overbooked": 1200.0,
    "Group Contains": "All Open",
    "Earliest Due Date": "25-02-2025",
    "Group UUID":
      "339f6269bfc11f79dca65cf3df894ba57e26ab8d68e112a3f411180ef62ec39d",
  },
  {
    "Group Pattern": "Exact Match",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000100128 - Global Business Properties",
    "Group Value": 1800.0,
    "Amount Overbooked": 1200.0,
    "Group Contains": "All Cleared",
    "Earliest Due Date": null,
    "Group UUID":
      "38531ba18c1265e6947f48568676ffbbaeee5cd962fed9369dd21839297e2548",
  },
  {
    "Group Pattern": "Exact Match",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000100128 - Global Business Properties",
    "Group Value": 1800.0,
    "Amount Overbooked": 1200.0,
    "Group Contains": "All Cleared",
    "Earliest Due Date": null,
    "Group UUID":
      "47ad131e3195a426defdf321cdeea5e873737d821bcb3070fda2429cdc8b224d",
  },
  {
    "Group Pattern": "Exact Match",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000100128 - Global Business Properties",
    "Group Value": 1800.0,
    "Amount Overbooked": 1200.0,
    "Group Contains": "All Cleared",
    "Earliest Due Date": null,
    "Group UUID":
      "4d30f06ec11a73d035430015bf1cbbaa22f004f920492f8fe59b9a9e93cffde9",
  },
  {
    "Group Pattern": "Exact Match",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000100128 - Global Business Properties",
    "Group Value": 1800.0,
    "Amount Overbooked": 1200.0,
    "Group Contains": "All Cleared",
    "Earliest Due Date": null,
    "Group UUID":
      "658494f32457f4e830773456728c88f2aca1a36db16462e92536413b54f84b2f",
  },
  {
    "Group Pattern": "Similar Value",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000100128 - Global Business Properties",
    "Group Value": 1720.899041,
    "Amount Overbooked": 1120.899041,
    "Group Contains": "All Cleared",
    "Earliest Due Date": null,
    "Group UUID":
      "4abe333f24db0194aa910430cac7e80c07ad4906768924e5c8fc79c5aa990df1",
  },
  {
    "Group Pattern": "Similar Value",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000100128 - Global Business Properties",
    "Group Value": 1720.899041,
    "Amount Overbooked": 1120.899041,
    "Group Contains": "All Cleared",
    "Earliest Due Date": null,
    "Group UUID":
      "a035f0d3bb5a1873a23c23ccf64aa573e72e4089bf28012f24fe214ecdfd4fad",
  },
  {
    "Group Pattern": "Similar Value",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000100128 - Global Business Properties",
    "Group Value": 1720.899041,
    "Amount Overbooked": 1120.899041,
    "Group Contains": "All Cleared",
    "Earliest Due Date": null,
    "Group UUID":
      "c19e6df1600de0cadaffd8c0b12e0ae754bd5840451a40f838e9ed76939144f0",
  },
  {
    "Group Pattern": "Similar Value",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000100128 - Global Business Properties",
    "Group Value": 1720.899041,
    "Amount Overbooked": 1120.899041,
    "Group Contains": "All Cleared",
    "Earliest Due Date": null,
    "Group UUID":
      "f9cb34abf36f9794f874626b5ba59a41642f403d6780ec53f3f0ed2924d78658",
  },
  {
    "Group Pattern": "Exact Match",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000071810 - WCB - Saskatchewan",
    "Group Value": 1716.485173,
    "Amount Overbooked": 858.2425864,
    "Group Contains": "All Open",
    "Earliest Due Date": "26-02-2025",
    "Group UUID":
      "0b8e27ca54496f2a8893684efe8afb801e6d62cb429e1251cad3bdee7b06bced",
  },
  {
    "Group Pattern": "Exact Match",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000003730 - Aztec Supplies",
    "Group Value": 1716.485173,
    "Amount Overbooked": 858.2425864,
    "Group Contains": "All Open",
    "Earliest Due Date": "15-03-2025",
    "Group UUID":
      "0e5acc6d79a31911f827df483260a20e0284af8e4ebcbee0e97e41b1f10af303",
  },
  {
    "Group Pattern": "Exact Match",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000003020 - World Wide Computer Warehouse",
    "Group Value": 1716.485173,
    "Amount Overbooked": 858.2425864,
    "Group Contains": "All Open",
    "Earliest Due Date": "15-03-2025",
    "Group UUID":
      "110b51d66a02e09cb64815c6710f056c795a557dfc9c6f6db7f7dcbe16ddbdfc",
  },
  {
    "Group Pattern": "Exact Match",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000003035 - CAFS Chemicals & Pharmaceuticals",
    "Group Value": 1716.485173,
    "Amount Overbooked": 858.2425864,
    "Group Contains": "All Open",
    "Earliest Due Date": "03-03-2025",
    "Group UUID":
      "257f9229f0fdc4b0ea0ecd471f3c80500e52751ce9996073dd31f2b779b140b8",
  },
  {
    "Group Pattern": "Exact Match",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000005560 - IOT Furnitures Inc.",
    "Group Value": 1716.485173,
    "Amount Overbooked": 858.2425864,
    "Group Contains": "All Open",
    "Earliest Due Date": "03-03-2025",
    "Group UUID":
      "2dc066b6cfca55ce8c36737830ca537f2cdf6983b52db16b73b327281a35ccbb",
  },
  {
    "Group Pattern": "Exact Match",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000100128 - Global Business Properties",
    "Group Value": 1716.485173,
    "Amount Overbooked": 858.2425864,
    "Group Contains": "All Cleared",
    "Earliest Due Date": null,
    "Group UUID":
      "2ed41e7bafde114df6ff061b43936a110983b56f4427431ae9c3803910909818",
  },
  {
    "Group Pattern": "Exact Match",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000071201 - Manhattan Corporation",
    "Group Value": 1716.485173,
    "Amount Overbooked": 858.2425864,
    "Group Contains": "All Open",
    "Earliest Due Date": "01-03-2025",
    "Group UUID":
      "327d7caebfb85d6a7559bf42731a3127e9f8311f44faff9650f15db699751b20",
  },
  {
    "Group Pattern": "Exact Match",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000003000 - CET New York",
    "Group Value": 1716.485173,
    "Amount Overbooked": 858.2425864,
    "Group Contains": "All Open",
    "Earliest Due Date": "15-03-2025",
    "Group UUID":
      "4b9650685f17f38b83546de673cb67991103f74862355b41e0046fa138bf49ea",
  },
  {
    "Group Pattern": "Exact Match",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000100128 - Global Business Properties",
    "Group Value": 1716.485173,
    "Amount Overbooked": 858.2425864,
    "Group Contains": "All Cleared",
    "Earliest Due Date": null,
    "Group UUID":
      "8cb11f2b5e1bc11e955b0762d18efcc98ddd03d7d7e7277ca5854834ee3372ac",
  },
  {
    "Group Pattern": "Exact Match",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000100128 - Global Business Properties",
    "Group Value": 1716.485173,
    "Amount Overbooked": 858.2425864,
    "Group Contains": "All Cleared",
    "Earliest Due Date": null,
    "Group UUID":
      "bfbf57fe8f94cf97a3aa19efb6950afb682cd1dcbdd40ca960b954871c056f42",
  },
  {
    "Group Pattern": "Exact Match",
    Confidence: "High",
    "Company Code": "3000",
    Vendor: "0000100128 - Global Business Properties",
    "Group Value": 1716.485173,
    "Amount Overbooked": 858.2425864,
    "Group Contains": "All Cleared",
    "Earliest Due Date": null,
    "Group UUID":
      "c162395248839909fb7a70012fb23ef7719605d50ec28a720f8a59b0f492523c",
  },
];

const data_details = [
  [
    {
      groupUUID:
        "dd1d3dd8183f13ece175a6510a820e74ed329955d22a1432f7dc8661e5ce0c1f",
      groupPattern: "Similar Value",
      confidence: "High",
      companyCode: "3000",
      vendor: "Acme Corportion",
      groupValue: 17281.43596,
      amountOverbooked: 8613.119279,
      groupContains: "All Open",
      earliestDueDate: "11-03-2025",
    },
  ],
  [
    {
      groupUUID:
        "dd1d3dd8183f13ece175a6510a820e74ed329955d22a1432f7dc8661e5ce0c1f",
      groupPattern: "Similar Value",
      confidence: "High",
      companyCode: "3000",
      vendor: "Acme Corportion",
      groupValue: 17281.43596,
      amountOverbooked: 8613.119279,
      groupContains: "All Open",
      earliestDueDate: "11-03-2025",
    },
    {
      groupUUID:
        "dd1d3dd8183f13ece175a6510a820e74ed329955d22a1432f7dc8661e5ce0c1f",
      groupPattern: "Similar Value",
      confidence: "High",
      companyCode: "3000",
      vendor: "Acme Corportion",
      groupValue: 17281.43596,
      amountOverbooked: 8613.119279,
      groupContains: "All Open",
      earliestDueDate: "11-03-2025",
    },
    {
      groupUUID:
        "dd1d3dd8183f13ece175a6510a820e74ed329955d22a1432f7dc8661e5ce0c1f",
      groupPattern: "Similar Value",
      confidence: "High",
      companyCode: "3000",
      vendor: "Acme Corportion",
      groupValue: 17281.43596,
      amountOverbooked: 8613.119279,
      groupContains: "All Open",
      earliestDueDate: "11-03-2025",
    },
    {
      groupUUID:
        "dd1d3dd8183f13ece175a6510a820e74ed329955d22a1432f7dc8661e5ce0c1f",
      groupPattern: "Similar Value",
      confidence: "High",
      companyCode: "3000",
      vendor: "Acme Corportion",
      groupValue: 1728143596,
      amountOverbooked: 8613.119279,
      groupContains: "All Open",
      earliestDueDate: "11-03-2025",
    },
  ],
];

export default function TableLog() {
  return (
    <div className="table-container flex flex-col gap-4">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Group UUID</TableHead>
            <TableHead>Group Pattern</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Amount Overbooked</TableHead>
            <TableHead>Group Contains</TableHead>
            <TableHead>Earliest Due Date</TableHead>
            <TableHead>Confidence</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice["Group UUID"]}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <TableDrawerDetails
                  buttonTitle={
                    invoice["Group UUID"].substring(0, 6) +
                    "..." +
                    invoice["Group UUID"].slice(-6)
                  }
                  dataUUID={data_details}
                />
              </TableCell>
              <TableCell>{invoice["Group Pattern"]}</TableCell>
              <TableCell>{invoice["Vendor"].split("-")[1]}</TableCell>
              <TableCell>${invoice["Amount Overbooked"].toFixed(2)}</TableCell>
              <TableCell>{invoice["Group Contains"]}</TableCell>
              <TableCell>{invoice["Earliest Due Date"]}</TableCell>
              <TableCell>{invoice["Confidence"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow></TableRow>
        </TableFooter>
      </Table>
      <PaginationTable />
    </div>
  );
}
