import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const COLLECTION_NAME = 'leads';

export const getLeads = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const leads = [];
    querySnapshot.forEach((doc) => {
      leads.push({ id: doc.id, ...doc.data() });
    });
    return leads;
  } catch (error) {
    console.error('Error fetching leads:', error);
    return [];
  }
};

export const submitLead = async (leadData) => {
  try {
    const newLead = {
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
      createdAt: new Date().toISOString()
    };
    const docRef = await addDoc(collection(db, COLLECTION_NAME), newLead);
    return { id: docRef.id, ...newLead };
  } catch (error) {
    console.error('Error adding lead:', error);
    throw error;
  }
};

export const updateLeadStatus = async (id, newStatus) => {
  try {
    const leadRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(leadRef, {
      status: newStatus
    });
    return await getLeads();
  } catch (error) {
    console.error('Error updating lead status:', error);
    throw error;
  }
};

export const deleteLead = async (id) => {
  try {
    const leadRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(leadRef);
    return await getLeads();
  } catch (error) {
    console.error('Error deleting lead:', error);
    throw error;
  }
};

export const addManualLead = async (leadData) => {
  return submitLead({
    ...leadData,
    source: "Manual Entry (Admin)"
  });
};
