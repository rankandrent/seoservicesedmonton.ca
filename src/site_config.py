# Replace every value marked with [[ ]] or "yourdomain" before launch.
SITE = {
 'brand': 'BrandName',
 'domain': 'https://seoservicesedmonton.ca',
 'org_description': 'BrandName is an SEO agency serving Edmonton, Alberta, offering local SEO, technical SEO, content, link building, ecommerce SEO, SEO audits and AI search optimization for Edmonton businesses.',
 'footer_blurb': 'SEO for Edmonton businesses that want more calls, bookings and sales from Google.',
 'address_html': '[[Street address]], Edmonton, AB [[Postal code]]',
 'street': '[Street address]', 'postal': '[Postal code]',
 'phone': '[[Phone number]]', 'email': '[[Email address]]',
 'schema_phone': '[Phone number]', 'schema_email': '[Email address]',
 'hours': '[[Business hours]]',
 'form_action': '#',  # replace with your form endpoint (Formspree, Netlify Forms, HubSpot, etc.)
 # Real profile URLs only. They show as footer icons and as sameAs in the business schema; leave empty to hide both.
 # Icons available: facebook, instagram, linkedin, youtube. Example: ('LinkedIn', 'linkedin', 'https://www.linkedin.com/company/your-page/')
 'socials': [],
 'cta_photo': 'https://images.unsplash.com/photo-1617336422396-e1dfc4210ec5?auto=format&fit=crop&w=1200&q=80',
 'cta_photo_alt': 'City skyline at night across the river valley',
 'marquee': ['Free SEO review for Edmonton businesses', 'Local SEO, technical SEO and content under one roof',
             'Monthly reporting in plain language', 'Book a 30 minute strategy call'],
}
