import { company } from '../data/company';

/**
 * Returns a complete WhatsApp URL with encoded message
 * @param {string} message - Custom message string
 * @returns {string} Encoded WhatsApp wa.me URL
 */
export const getWhatsAppUrl = (message = "") => {
  const defaultMsg = `Hello ${company.name} team,\n\nI found ${company.name} through your website and would like to discuss a project.`;
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
  let msg = `Hello ${company.name} team,\n\nI am interested in *${serviceTitle}* services from ${company.name}.\n`;
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

/**
 * Generates an email compose URL.
 * Opens Gmail web compose on desktop, or native mail app compose on mobile.
 * @param {string} subject - Email subject line
 * @param {string} body - Email body message
 * @param {string} to - Recipient email address
 * @returns {string} Compose URL
 */
export const getEmailComposeUrl = (
  subject = "Project Inquiry - TechWants Infotech",
  body = "",
  to = company.email
) => {
  const recipient = to || company.email;
  const isMobile = typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const defaultBody = `Hello ${company.name} team,\n\nI would like to discuss a project with TechWants Infotech.`;
  const messageBody = body || defaultBody;

  const encodedTo = encodeURIComponent(recipient);
  const encodedSub = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(messageBody);

  if (isMobile) {
    return `mailto:${recipient}?subject=${encodedSub}&body=${encodedBody}`;
  }

  // Gmail Web Compose: opens directly to compose screen with recipient and subject pre-filled
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedTo}&su=${encodedSub}&body=${encodedBody}`;
};

/**
 * Handles email link clicks smoothly across mobile & desktop
 * @param {MouseEvent} e - Click event
 * @param {string} subject - Email subject
 * @param {string} body - Email body
 * @param {string} to - Recipient email
 */
export const handleEmailClick = (e, subject, body, to) => {
  const url = getEmailComposeUrl(subject, body, to);
  if (url.startsWith('mailto:')) {
    if (e && e.preventDefault) e.preventDefault();
    window.location.href = url;
  }
};

