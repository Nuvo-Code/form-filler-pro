# Privacy Policy - Form Filler Pro

**Effective Date**: September 2025
**Last Updated**: September 2025

## Overview

Form Filler Pro is a Chrome extension developed by [Nuvo Code](https://nuvocode.com) that helps users autofill web forms using predefined profiles. We are committed to protecting your privacy and ensuring the security of your personal information.

## Information We Collect

### Profile Data
Form Filler Pro stores the following information locally in your browser:
- **Profile Name** (e.g., "Personal", "Work")
- **First Name**
- **Last Name**
- **Email Address**
- **Phone Number** (optional)
- **Username** (optional)
- **Company Name** (optional)

### Technical Data
- **Active Profile ID** - to remember which profile is currently selected
- **Profile Creation/Update Timestamps** - for data management

## How We Store Your Data

### Local Storage Only
- All profile data is stored **locally** in your browser using Chrome's `chrome.storage.sync` API
- **No data is transmitted** to external servers or third parties
- **No analytics or tracking** is performed by the extension
- **No personal data leaves your device** except through Chrome's built-in sync (see below)

### Chrome Sync (Optional)
- If you're signed into Chrome with sync enabled, your profile data may sync across your devices
- This is handled entirely by Google Chrome's built-in sync functionality
- We do not have access to or control over Chrome's sync process
- You can disable sync in Chrome settings if you prefer local-only storage

## How We Use Your Data

Your profile data is used **exclusively** for:
- Autofilling web forms when you click "Fill Form"
- Displaying profile information in the extension popup
- Managing profiles in the options page

**We do NOT:**
- Send your data to any servers
- Share your data with third parties
- Use your data for advertising
- Track your browsing behavior
- Collect usage analytics

## Data Security

### Protection Measures
- Data is stored using Chrome's secure storage APIs
- No network transmission of personal data
- No external dependencies or third-party services
- Open source code available for security review

### Access Control
- Only you have access to your profile data
- Data is tied to your Chrome browser profile
- No remote access or backdoors exist

## Your Rights and Control

### Full Control
You have complete control over your data:
- **View**: See all your profiles in the options page
- **Edit**: Modify any profile information at any time
- **Delete**: Remove individual profiles or all data
- **Export**: Data is stored in standard Chrome storage (can be backed up)

### Data Deletion
To delete your data:
1. **Individual Profiles**: Use the "Delete" button in the options page
2. **All Data**: Uninstall the extension to remove all stored data
3. **Chrome Sync**: Disable Chrome sync to prevent cross-device synchronization

## Third-Party Services

### None Used
Form Filler Pro does **not** use any third-party services:
- No external APIs
- No analytics services (Google Analytics, etc.)
- No advertising networks
- No cloud storage services
- No external dependencies

### Website Integration
The extension only interacts with websites to:
- Detect form fields on the current page
- Fill detected fields with your profile data
- No data is sent back to websites beyond standard form filling

## Children's Privacy

Form Filler Pro does not knowingly collect personal information from children under 13. The extension is designed for general use and does not target children specifically.

## Changes to This Policy

We may update this privacy policy from time to time. Any changes will be:
- Reflected in the "Last Updated" date above
- Communicated through extension updates
- Posted on our website at [nuvocode.com](https://nuvocode.com)

## Contact Information

If you have questions about this privacy policy or the extension:

**Nuvo Code**
Website: [https://nuvocode.com](https://nuvocode.com)
Email: Contact form available on our website

## Technical Details

### Permissions Used
The extension requests these Chrome permissions:
- **storage**: To save your profiles locally
- **activeTab**: To access the current page for form filling

### Data Format
Profile data is stored in JSON format in Chrome's sync storage with the following structure:
```json
{
  "profiles": [
    {
      "id": "unique_id",
      "name": "Profile Name",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "username": "johndoe",
      "company": "Company Name",
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "activeProfileId": "unique_id"
}
```

## Compliance

This extension and privacy policy comply with:
- Chrome Web Store Developer Program Policies
- General Data Protection Regulation (GDPR) principles
- California Consumer Privacy Act (CCPA) principles
- Standard privacy best practices

---

**Summary**: Form Filler Pro stores your profile data locally in your browser only. No data is sent to external servers. You have full control over your information at all times.