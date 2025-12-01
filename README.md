## Sumanta Mandar – Portfolio Site

React/Framer Motion single‑page portfolio for filmmaker Sumanta Mandar, with hero video background, selected works, what I do, about, showreel and contact (GET IN TOUCH) sections.

---

## 1. Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm start
   ```
3. Open `http://localhost:3000` in your browser.

---

## 2. Email (GET IN TOUCH) Setup

This project uses **EmailJS** to send messages from the contact form.

1. Create an account at `https://www.emailjs.com`.
2. In EmailJS:
   - Create an **Email Service** (e.g. Gmail/SMTP).  
     Note the **Service ID**.
   - Create an **Email Template** (for contact messages).  
     Note the **Template ID**.
   - Go to **Account → API Keys** and copy your **Public Key**.
3. In the template, make sure you use these variables:
   ```txt
   To: {{to_email}}
   Name: {{name}}
   Email: {{email}}
   Subject: {{title}}
   Message:
   {{message}}
   ```
4. Set the “To email” in the template to `{{to_email}}` or directly to your address.
5. In the code, open:
   - `src/utils/emailService.js`
6. Set the EmailJS credentials and destination email:
   ```js
   const EMAILJS_CONFIG = {
     serviceId: 'service_xjfnxpf',       // your Service ID
     templateId: 'template_6dh6l9d',     // your Template ID
     publicKey: 'QUTzogM0692AcTioT'      // your Public Key
   };

   const templateParams = {
     to_email: 'mandarsumanta@gmail.com',
     name: formData.name,
     email: formData.email,
     title: formData.subject,
     message: formData.message,
     reply_to: formData.email,
   };
   ```
7. In EmailJS **Account → Security → Allowed Origins (CORS)** add:
   - `http://localhost:3000`
   - your deployed domain (e.g. `https://sumantamandar.vercel.app`)

If EmailJS fails, the code falls back to opening the user’s email client with a pre‑filled mail to `mandarsumanta@gmail.com`.

---

## 3. Resume & Portfolio PDFs

1. Place your documents in:
   - `public/files/sumanta-mandar-resume.pdf`
   - `public/files/sumanta-mandar-portfolio.pdf`
2. The “Download Full Resume” and “View Full Portfolio” buttons in `ShowreelSection` already point to:
   - `/files/sumanta-mandar-resume.pdf`
   - `/files/sumanta-mandar-portfolio.pdf`

---

## 4. About Photo

1. Place your portrait image at:
   - `public/images/about-portrait.jpg`
2. `AboutSection` reads it via:
   ```jsx
   <img
     src="/images/about-portrait.jpg"
     alt="Sumanta Mandar Portrait"
     className="rounded-full w-full h-full object-cover"
   />
   ```

---

## 5. Build for Production

```bash
npm run build
```

Build output goes to the `build/` folder and can be deployed to any static hosting (e.g. Vercel, Netlify, GitHub Pages). 
