/** Global demo shipments: Admin, Hub, Branch Inventory. No Prisma/DB. */

export type ServiceModeLabel = "Local" | "Nationwide" | "Import" | "Export";

export type DemoShipment = {
  id: string;
  trackingId: string;
  merchant: string;
  origin: string;
  destination: string;
  weightKg: number;
  /** Selling price (carrier cost + markup). Shown as "Selling Price" in Financial Pulse. */
  amount: number;
  /** Carrier cost from rate sheet (Cost Price). Hidden for Admin auditing. Net Profit = amount - partnerCost. */
  partnerCost: number;
  status: string;
  /** Service mode for Admin dashboard display. */
  serviceMode?: ServiceModeLabel;
};

/** Carrier cost from rate sheet. Selling = Cost * (1 + 20% markup), so Cost = Selling / 1.20. */
function carrierCost(sellingPrice: number) {
  return Math.round(sellingPrice / 1.20);
}

/** 35 shipments for Admin Shipments page - varied origins, merchants, statuses. serviceMode for dashboard. */
export const ADMIN_DEMO_SHIPMENTS: DemoShipment[] = [
  { id: "1", trackingId: "Shipco-1001", merchant: "Mubarak", origin: "Lagos Hub", destination: "Abuja", weightKg: 4, amount: 4500, partnerCost: carrierCost(4500), status: "In transit", serviceMode: "Nationwide" },
  { id: "2", trackingId: "Shipco-1002", merchant: "Greenlife Pharma", origin: "Abuja Hub", destination: "Kano", weightKg: 6, amount: 8200, partnerCost: carrierCost(8200), status: "Delivered", serviceMode: "Nationwide" },
  { id: "3", trackingId: "Shipco-1003", merchant: "Alpha Step", origin: "Port Harcourt Hub", destination: "Lagos", weightKg: 2, amount: 2500, partnerCost: carrierCost(2500), status: "Pending", serviceMode: "Nationwide" },
  { id: "4", trackingId: "Shipco-1004", merchant: "Mubarak", origin: "Lagos Hub", destination: "Port Harcourt", weightKg: 5, amount: 6000, partnerCost: carrierCost(6000), status: "Out for delivery", serviceMode: "Nationwide" },
  { id: "5", trackingId: "Shipco-1005", merchant: "Greenlife Pharma", origin: "Abuja Hub", destination: "Enugu", weightKg: 3, amount: 5200, partnerCost: carrierCost(5200), status: "In transit", serviceMode: "Nationwide" },
  { id: "6", trackingId: "Shipco-1006", merchant: "Alpha Step", origin: "Lagos Hub", destination: "Ibadan", weightKg: 1.5, amount: 3500, partnerCost: carrierCost(3500), status: "Delivered", serviceMode: "Nationwide" },
  { id: "7", trackingId: "Shipco-1007", merchant: "Mubarak", origin: "Port Harcourt Hub", destination: "Abuja", weightKg: 8, amount: 12000, partnerCost: carrierCost(12000), status: "Picked up", serviceMode: "Nationwide" },
  { id: "8", trackingId: "Shipco-1008", merchant: "Greenlife Pharma", origin: "Lagos Hub", destination: "Kaduna", weightKg: 2.5, amount: 3800, partnerCost: carrierCost(3800), status: "In transit", serviceMode: "Nationwide" },
  { id: "9", trackingId: "Shipco-1009", merchant: "Alpha Step", origin: "Abuja Hub", destination: "Lagos", weightKg: 4, amount: 4500, partnerCost: carrierCost(4500), status: "Delivered", serviceMode: "Nationwide" },
  { id: "10", trackingId: "Shipco-1010", merchant: "Mubarak", origin: "Lagos Hub", destination: "Benin City", weightKg: 3, amount: 4200, partnerCost: carrierCost(4200), status: "Pending", serviceMode: "Nationwide" },
  { id: "11", trackingId: "Shipco-1011", merchant: "Greenlife Pharma", origin: "Port Harcourt Hub", destination: "Warri", weightKg: 5, amount: 5500, partnerCost: carrierCost(5500), status: "In transit", serviceMode: "Nationwide" },
  { id: "12", trackingId: "Shipco-1012", merchant: "Alpha Step", origin: "Abuja Hub", destination: "Jos", weightKg: 6, amount: 7100, partnerCost: carrierCost(7100), status: "Out for delivery", serviceMode: "Nationwide" },
  { id: "13", trackingId: "Shipco-1013", merchant: "Mubarak", origin: "Lagos Hub", destination: "Kano", weightKg: 2, amount: 6200, partnerCost: carrierCost(6200), status: "Delivered", serviceMode: "Nationwide" },
  { id: "14", trackingId: "Shipco-1014", merchant: "Greenlife Pharma", origin: "Lagos Hub", destination: "Port Harcourt", weightKg: 7, amount: 9000, partnerCost: carrierCost(9000), status: "Picked up", serviceMode: "Nationwide" },
  { id: "15", trackingId: "Shipco-1015", merchant: "Alpha Step", origin: "Abuja Hub", destination: "Enugu", weightKg: 4.5, amount: 5800, partnerCost: carrierCost(5800), status: "In transit", serviceMode: "Nationwide" },
  { id: "16", trackingId: "Shipco-1016", merchant: "Mubarak", origin: "Port Harcourt Hub", destination: "Lagos", weightKg: 3, amount: 4100, partnerCost: carrierCost(4100), status: "Pending", serviceMode: "Nationwide" },
  { id: "17", trackingId: "Shipco-1017", merchant: "Greenlife Pharma", origin: "Lagos Hub", destination: "Abuja", weightKg: 5, amount: 4800, partnerCost: carrierCost(4800), status: "Delivered", serviceMode: "Nationwide" },
  { id: "18", trackingId: "Shipco-1018", merchant: "Alpha Step", origin: "Abuja Hub", destination: "Ibadan", weightKg: 2, amount: 3300, partnerCost: carrierCost(3300), status: "In transit", serviceMode: "Nationwide" },
  { id: "19", trackingId: "Shipco-1019", merchant: "Mubarak", origin: "Lagos Hub", destination: "Kaduna", weightKg: 6, amount: 7500, partnerCost: carrierCost(7500), status: "Out for delivery", serviceMode: "Nationwide" },
  { id: "20", trackingId: "Shipco-1020", merchant: "Greenlife Pharma", origin: "Port Harcourt Hub", destination: "Abuja", weightKg: 4, amount: 6400, partnerCost: carrierCost(6400), status: "Delivered", serviceMode: "Nationwide" },
  { id: "21", trackingId: "Shipco-1021", merchant: "Alpha Step", origin: "Lagos Hub", destination: "Enugu", weightKg: 3.5, amount: 5100, partnerCost: carrierCost(5100), status: "Picked up", serviceMode: "Nationwide" },
  { id: "22", trackingId: "Shipco-1022", merchant: "Mubarak", origin: "Abuja Hub", destination: "Lagos", weightKg: 1.5, amount: 2900, partnerCost: carrierCost(2900), status: "Pending", serviceMode: "Nationwide" },
  { id: "23", trackingId: "Shipco-1023", merchant: "Greenlife Pharma", origin: "Lagos Hub", destination: "Kano", weightKg: 8, amount: 9800, partnerCost: carrierCost(9800), status: "In transit", serviceMode: "Nationwide" },
  { id: "24", trackingId: "Shipco-1024", merchant: "Alpha Step", origin: "Port Harcourt Hub", destination: "Benin City", weightKg: 2.5, amount: 3600, partnerCost: carrierCost(3600), status: "Delivered", serviceMode: "Nationwide" },
  { id: "25", trackingId: "Shipco-1025", merchant: "Mubarak", origin: "Lagos Hub", destination: "Warri", weightKg: 4, amount: 5400, partnerCost: carrierCost(5400), status: "In transit", serviceMode: "Nationwide" },
  { id: "26", trackingId: "Shipco-1026", merchant: "Greenlife Pharma", origin: "Abuja Hub", destination: "Kaduna", weightKg: 3.5, amount: 4900, partnerCost: carrierCost(4900), status: "Delivered", serviceMode: "Nationwide" },
  { id: "27", trackingId: "Shipco-1027", merchant: "Alpha Step", origin: "Lagos Hub", destination: "Onitsha", weightKg: 2, amount: 3200, partnerCost: carrierCost(3200), status: "Pending", serviceMode: "Nationwide" },
  { id: "28", trackingId: "Shipco-1028", merchant: "Mubarak", origin: "Port Harcourt Hub", destination: "Calabar", weightKg: 5.5, amount: 6700, partnerCost: carrierCost(6700), status: "Out for delivery", serviceMode: "Nationwide" },
  { id: "29", trackingId: "Shipco-1029", merchant: "Greenlife Pharma", origin: "Lagos Hub", destination: "Ilorin", weightKg: 3, amount: 4100, partnerCost: carrierCost(4100), status: "Picked up", serviceMode: "Nationwide" },
  { id: "30", trackingId: "Shipco-1030", merchant: "Alpha Step", origin: "Abuja Hub", destination: "Port Harcourt", weightKg: 6, amount: 7200, partnerCost: carrierCost(7200), status: "In transit", serviceMode: "Nationwide" },
  { id: "31", trackingId: "Shipco-1031", merchant: "Mubarak", origin: "Lagos Hub", destination: "Uyo", weightKg: 2.5, amount: 3800, partnerCost: carrierCost(3800), status: "Delivered", serviceMode: "Nationwide" },
  { id: "32", trackingId: "Shipco-1032", merchant: "Greenlife Pharma", origin: "Port Harcourt Hub", destination: "Lagos", weightKg: 7, amount: 8500, partnerCost: carrierCost(8500), status: "In transit", serviceMode: "Nationwide" },
  { id: "33", trackingId: "Shipco-1033", merchant: "Mubarak", origin: "Kano Branch", destination: "Lagos", weightKg: 3, amount: 5200, partnerCost: carrierCost(5200), status: "In transit", serviceMode: "Nationwide" },
  { id: "34", trackingId: "Shipco-1034", merchant: "Alpha Step", origin: "Kano Branch", destination: "Abuja", weightKg: 2, amount: 3800, partnerCost: carrierCost(3800), status: "Delivered", serviceMode: "Nationwide" },
  { id: "35", trackingId: "Shipco-1035", merchant: "Greenlife Pharma", origin: "Kano Branch", destination: "Kaduna", weightKg: 4, amount: 4100, partnerCost: carrierCost(4100), status: "Pending", serviceMode: "Nationwide" },
  { id: "36", trackingId: "Shipco-1036", merchant: "Mubarak", origin: "Ikeja", destination: "Lekki", weightKg: 2, amount: 1740, partnerCost: carrierCost(1740), status: "Delivered", serviceMode: "Local" },
  { id: "37", trackingId: "Shipco-1037", merchant: "Alpha Step", origin: "Surulere", destination: "Victoria Island", weightKg: 1, amount: 1620, partnerCost: carrierCost(1620), status: "In transit", serviceMode: "Local" },
];

/** 20 packages "Sitting at Hub" for Branch Inventory (Lagos Hub) */
export const HUB_INVENTORY_DEMO_SHIPMENTS: DemoShipment[] = [
  { id: "hi-1", trackingId: "Shipco-2001", merchant: "Mubarak", origin: "Lagos Hub", destination: "Abuja", weightKg: 4, amount: 4500, partnerCost: carrierCost(4500), status: "Sitting at Hub" },
  { id: "hi-2", trackingId: "Shipco-2002", merchant: "Greenlife Pharma", origin: "Lagos Hub", destination: "Kano", weightKg: 6, amount: 8200, partnerCost: carrierCost(8200), status: "Sitting at Hub" },
  { id: "hi-3", trackingId: "Shipco-2003", merchant: "Alpha Step", origin: "Abuja Hub", destination: "Lagos", weightKg: 2, amount: 2500, partnerCost: carrierCost(2500), status: "Sitting at Hub" },
  { id: "hi-4", trackingId: "Shipco-2004", merchant: "Mubarak", origin: "Abuja Hub", destination: "Port Harcourt", weightKg: 5, amount: 6000, partnerCost: carrierCost(6000), status: "Sitting at Hub" },
  { id: "hi-5", trackingId: "Shipco-2005", merchant: "Greenlife Pharma", origin: "Port Harcourt Hub", destination: "Enugu", weightKg: 3, amount: 5200, partnerCost: carrierCost(5200), status: "Sitting at Hub" },
  { id: "hi-6", trackingId: "Shipco-2006", merchant: "Alpha Step", origin: "Lagos Hub", destination: "Ibadan", weightKg: 1.5, amount: 3500, partnerCost: carrierCost(3500), status: "Sitting at Hub" },
  { id: "hi-7", trackingId: "Shipco-2007", merchant: "Mubarak", origin: "Lagos Hub", destination: "Kaduna", weightKg: 2.5, amount: 3800, partnerCost: carrierCost(3800), status: "Sitting at Hub" },
  { id: "hi-8", trackingId: "Shipco-2008", merchant: "Greenlife Pharma", origin: "Abuja Hub", destination: "Benin City", weightKg: 4, amount: 4500, partnerCost: carrierCost(4500), status: "Sitting at Hub" },
  { id: "hi-9", trackingId: "Shipco-2009", merchant: "Alpha Step", origin: "Port Harcourt Hub", destination: "Warri", weightKg: 3.5, amount: 4200, partnerCost: carrierCost(4200), status: "Sitting at Hub" },
  { id: "hi-10", trackingId: "Shipco-2010", merchant: "Mubarak", origin: "Lagos Hub", destination: "Jos", weightKg: 6, amount: 7100, partnerCost: carrierCost(7100), status: "Sitting at Hub" },
  { id: "hi-11", trackingId: "Shipco-2011", merchant: "Greenlife Pharma", origin: "Abuja Hub", destination: "Lagos", weightKg: 2, amount: 2900, partnerCost: carrierCost(2900), status: "Sitting at Hub" },
  { id: "hi-12", trackingId: "Shipco-2012", merchant: "Alpha Step", origin: "Lagos Hub", destination: "Enugu", weightKg: 5, amount: 5800, partnerCost: carrierCost(5800), status: "Sitting at Hub" },
  { id: "hi-13", trackingId: "Shipco-2013", merchant: "Mubarak", origin: "Lagos Hub", destination: "Warri", weightKg: 4, amount: 5400, partnerCost: carrierCost(5400), status: "Sitting at Hub" },
  { id: "hi-14", trackingId: "Shipco-2014", merchant: "Greenlife Pharma", origin: "Lagos Hub", destination: "Kaduna", weightKg: 3.5, amount: 4900, partnerCost: carrierCost(4900), status: "Sitting at Hub" },
  { id: "hi-15", trackingId: "Shipco-2015", merchant: "Alpha Step", origin: "Lagos Hub", destination: "Onitsha", weightKg: 2, amount: 3200, partnerCost: carrierCost(3200), status: "Sitting at Hub" },
  { id: "hi-16", trackingId: "Shipco-2016", merchant: "Mubarak", origin: "Lagos Hub", destination: "Calabar", weightKg: 5.5, amount: 6700, partnerCost: carrierCost(6700), status: "Sitting at Hub" },
  { id: "hi-17", trackingId: "Shipco-2017", merchant: "Greenlife Pharma", origin: "Lagos Hub", destination: "Ilorin", weightKg: 3, amount: 4100, partnerCost: carrierCost(4100), status: "Sitting at Hub" },
  { id: "hi-18", trackingId: "Shipco-2018", merchant: "Alpha Step", origin: "Lagos Hub", destination: "Jos", weightKg: 4.5, amount: 5900, partnerCost: carrierCost(5900), status: "Sitting at Hub" },
  { id: "hi-19", trackingId: "Shipco-2019", merchant: "Mubarak", origin: "Lagos Hub", destination: "Uyo", weightKg: 2.5, amount: 3800, partnerCost: carrierCost(3800), status: "Sitting at Hub" },
  { id: "hi-20", trackingId: "Shipco-2020", merchant: "Greenlife Pharma", origin: "Lagos Hub", destination: "Benin City", weightKg: 5, amount: 5200, partnerCost: carrierCost(5200), status: "Sitting at Hub" },
];
