// Lead Service with LocalStorage persistence

const STORAGE_KEY = 'techwants_leads_store';

const initialLeads = [
  {
    id: "lead-101",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 9876543210",
    company: "Apex Retail Solutions",
    service: "Web Development",
    budget: "₹50,000 - ₹1,00,000",
    timeline: "1 Month",
    message: "Need a custom React e-commerce website with fast WhatsApp order booking.",
    source: "Website Form",
    status: "New",
    createdAt: "2026-10-01"
  },
  {
    id: "lead-102",
    name: "Sanjay Patel",
    email: "sanjay@logistics.in",
    phone: "+91 9825012345",
    company: "Patel Logistics",
    service: "ERP & Software Solutions",
    budget: "₹1,00,000+",
    timeline: "2 Months",
    message: "Require a multi-branch inventory tracking ERP with billing software.",
    source: "Services Quote",
    status: "In Discussion",
    createdAt: "2026-09-28"
  },
  {
    id: "lead-103",
    name: "Priya Sharma",
    email: "priya@sharmadesigns.com",
    phone: "+91 9712345678",
    company: "Sharma Designs",
    service: "SEO & Digital Marketing",
    budget: "₹25,000 - ₹50,000",
    timeline: "Ongoing",
    message: "Looking for local Google Business Profile rank optimization and SEO.",
    source: "WhatsApp Direct",
    status: "Converted",
    createdAt: "2026-09-20"
  }
];

const loadFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error loading leads from storage:', err);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialLeads));
  return [...initialLeads];
};

const saveToStorage = (leads) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  } catch (err) {
    console.error('Error saving leads to storage:', err);
  }
};

export const getLeads = async () => {
  return loadFromStorage();
};

export const submitLead = async (leadData) => {
  const currentLeads = loadFromStorage();
  const newLead = {
    id: `lead-${Date.now()}`,
    name: leadData.name || "Anonymous",
    email: leadData.email || "",
    phone: leadData.phone || "",
    company: leadData.companyName || leadData.company || "N/A",
    service: leadData.service || "General Inquiry",
    budget: leadData.budget || "Not specified",
    timeline: leadData.timeline || "Immediate",
    message: leadData.message || leadData.projectDescription || "",
    source: leadData.source || "Website Inquiry",
    status: "New",
    createdAt: new Date().toISOString().split('T')[0]
  };

  const updated = [newLead, ...currentLeads];
  saveToStorage(updated);
  return newLead;
};

export const updateLeadStatus = async (id, newStatus) => {
  const currentLeads = loadFromStorage();
  const updated = currentLeads.map(lead =>
    lead.id === id ? { ...lead, status: newStatus } : lead
  );
  saveToStorage(updated);
  return updated;
};

export const deleteLead = async (id) => {
  const currentLeads = loadFromStorage();
  const updated = currentLeads.filter(lead => lead.id !== id);
  saveToStorage(updated);
  return updated;
};

export const addManualLead = async (leadData) => {
  return submitLead({
    ...leadData,
    source: "Manual Entry (Admin)"
  });
};
