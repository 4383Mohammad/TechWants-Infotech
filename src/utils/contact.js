import { company } from '../data/company';

/**
 * Returns a complete WhatsApp URL with encoded message
 * @param {string} message - Custom message string
 * @returns {string} Encoded WhatsApp wa.me URL
 */
export const getWhatsAppUrl = (message = "") => {
  const defaultMsg = `Hello ${company.founder},\n\nI found ${company.name} through your website and would like to discuss a project.`;
  const text = message ? message.trim() : defaultMsg;
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${company.whatsapp}?text=${encoded}`;
};

/**
 * Generates dynamic service-specific WhatsApp URL
 * @param {string} serviceTitle - Name of the service
 * @param {string} requirement - Optional user requirement text
 * @returns {string} WhatsApp URL
 */
export const generateServiceWhatsAppUrl = (serviceTitle, requirement = "") => {
  let msg = `Hello ${company.founder},\n\nI am interested in *${serviceTitle}* services from ${company.name}.\n`;
  if (requirement) {
    msg += `\n*My Requirement:* ${requirement}\n`;
  }
  msg += `\nPlease contact me regarding this project.`;
  return getWhatsAppUrl(msg);
};

/**
 * Generates inquiry form WhatsApp URL
 * @param {Object} formData - Form input values
 * @returns {string} WhatsApp URL
 */
export const generateFormWhatsAppUrl = (formData = {}) => {
  const { name, email, phone, companyName, service, budget, message } = formData;

  const text = `*NEW PROJECT INQUIRY*

*Name:* ${name || 'N/A'}
*Email:* ${email || 'N/A'}
*Phone:* ${phone || 'N/A'}
*Company:* ${companyName || 'N/A'}

*Service Interested:* ${service || 'General Inquiry'}
*Estimated Budget:* ${budget || 'Not specified'}

*Requirement Details:*
${message || 'I would like to discuss a digital solution for my business.'}

---
*Source:* ${company.name} Website`;

  return getWhatsAppUrl(text);
};

/**
 * Generates Project Inquiry Modal WhatsApp URL
 * @param {Object} modalData - Modal input fields
 * @returns {string} WhatsApp URL
 */
export const generateProjectInquiryWhatsAppUrl = (modalData = {}) => {
  const { name, email, phone, companyName, service, projectType, budget, timeline, projectDescription } = modalData;

  const text = `*START A PROJECT INQUIRY*

*Client Name:* ${name || 'N/A'}
*Email:* ${email || 'N/A'}
*Phone:* ${phone || 'N/A'}
*Company:* ${companyName || 'N/A'}

*Service:* ${service || 'Web Development'}
*Project Type:* ${projectType || 'Custom Solution'}
*Budget Range:* ${budget || 'Flexible'}
*Timeline:* ${timeline || 'As soon as possible'}

*Project Summary:*
${projectDescription || 'Looking to discuss requirement details.'}

---
*Source:* ${company.name} Project Portal`;

  return getWhatsAppUrl(text);
};
