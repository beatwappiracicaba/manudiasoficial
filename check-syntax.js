const fs = require('fs');
const path = require('path');
const files = [
  'src/pages/dashboard/SongsEditor.jsx',
  'src/pages/dashboard/RepertoireEditor.jsx',
  'src/pages/dashboard/TestimonialsEditor.jsx',
  'src/pages/dashboard/PartnersEditor.jsx',
  'src/pages/dashboard/NewsletterEditor.jsx',
  'src/pages/dashboard/ContactEditor.jsx',
  'src/pages/dashboard/SEOEditor.jsx',
  'src/pages/dashboard/SettingsEditor.jsx',
  'src/pages/dashboard/DashboardHome.jsx',
];
for (const f of files) {
  try {
    const content = fs.readFileSync(f, 'utf8');
    new Function(content);
    console.log('OK: ' + f);
  } catch (e) {
    console.error('ERROR in ' + f + ': ' + e.message);
  }
}
