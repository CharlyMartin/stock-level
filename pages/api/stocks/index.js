// Fake users data
const products = [
  { name: "Womanizer Premium - Black/Gold", sku: "EPI609036" },
  { name: "Womanizer Duo - Bordeaux", sku: "WVWZ07CI9600" },
  { name: "We-Vibe Chorus - Blue", sku: "WVSNW6SG5" },
];

export default async function handler(req, res) {
  // Get data from your database
  res.status(200).json(products);
}
