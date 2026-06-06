import emailjs from '@emailjs/browser';

const EMAILJS_CONFIG = {
  serviceId: 'service_xjfnxpf',
  templateId: 'template_6dh6l9d',
  publicKey: 'QUTzogM0692AcTioT'
};

export const initEmailJS = () => {
  try {
    emailjs.init(EMAILJS_CONFIG.publicKey);
    console.log('EmailJS initialized successfully');
  } catch (error) {
    console.error('EmailJS initialization failed:', error);
  }
};

export const sendContactEmail = async (formData) => {
  try {
    console.log('Attempting to send email via EmailJS...');
    console.log('Using Service ID:', EMAILJS_CONFIG.serviceId);
    console.log('Using Template ID:', EMAILJS_CONFIG.templateId);

    const templateParams = {
      to_email: 'mandarsumanta@gmail.com',
      name: formData.name,
      email: formData.email,
      title: formData.subject,
      message: formData.message,
      reply_to: formData.email,
    };

    console.log('Template params:', templateParams);

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.log('Email sent successfully:', response);
    
    return {
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
      response
    };
  } catch (error) {
    console.error('EmailJS Error Details:', error);
    console.log('=== EMAILJS DEBUG INFO ===');
    console.log('Service ID:', EMAILJS_CONFIG.serviceId);
    console.log('Template ID:', EMAILJS_CONFIG.templateId);
    console.log('Public Key:', EMAILJS_CONFIG.publicKey.substring(0, 10) + '...');
    console.log('Error Status:', error.status);
    console.log('Error Text:', error.text);
    console.log('Error Message:', error.message);
    console.log('========================');
    
    console.log('=== FORM SUBMISSION DATA ===');
    console.log('To: mandarsumanta@gmail.com');
    console.log('From:', formData.name, '<' + formData.email + '>');
    console.log('Subject:', formData.subject);
    console.log('Message:', formData.message);
    console.log('Timestamp:', new Date().toLocaleString());
    console.log('============================');
    
    try {
      const subject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoLink = `mailto:mandarsumanta@gmail.com?subject=${subject}&body=${body}`;
      
      window.open(mailtoLink);
      
      return {
        success: true,
        message: 'EmailJS failed, but I opened your email client with the message pre-filled. Please send it manually.',
        fallback: true
      };
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
      
      return {
        success: false,
        message: 'Failed to send email. Please check the browser console (F12) for the message details and send manually.',
        error
      };
    }
  }
};

