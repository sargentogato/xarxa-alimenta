export default {
  title: 'Cookie and local storage policy',
  lastUpdated: 'Last updated: September 2026',
  sections: {
    intro: {
      title: '1. What are cookies and similar technologies?',
      text: 'Cookies and browser local storage elements (such as localStorage) are small data files stored in your web browser when visiting a website, enabling the site to remember your preferences for future visits.',
    },
    use: {
      title: '2. What do we use at {orgName}?',
      text: 'This website DOES NOT use advertising cookies, DOES NOT use invasive analytics, and DOES NOT share data with third parties. We exclusively use strictly necessary technical local storage to ensure accessibility and proper site functionality:',
      items: [
        'theme: remembers your visual theme preference (Automatic, Light, or Dark).',
        'palette: remembers the color palette you selected.',
        'locale: remembers your preferred browsing language (Spanish or English).',
        'a11y: saves your configured accessibility settings (text size, contrast, font, spacing, etc.).',
      ],
    },
    consent: {
      title: '3. Consent exemption',
      text: 'Because this storage is purely technical, functional, and non-identifying, current privacy regulations (GDPR and ePrivacy) do not require a prior consent banner for its use.',
    },
    management: {
      title: '4. How to manage or clear this data in your browser',
      text: 'You can clear local storage or disable cookies at any time through your browser security settings:',
      browsers: [
        'Google Chrome: Settings > Privacy and security > Cookies and other site data.',
        'Mozilla Firefox: Settings > Privacy & Security > Cookies and Site Data.',
        'Apple Safari: Preferences > Privacy > Manage Website Data.',
        'Microsoft Edge: Settings > Cookies and site permissions.',
      ],
    },
    legalNotice: {
      title: '5. Legal note for the client',
      text: 'TODO: text pending formal legal review by {orgName}. If privacy-invasive analytics (or third-party embeds) are added in the future, a prior consent banner must be introduced.',
    },
  },
};
