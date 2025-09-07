# Form Filler Pro

A Chrome extension that autofills forms using predefined user profiles. Unlike random data generators, this extension uses your real profile information to quickly fill out forms.

## Features

- **Multiple Profiles**: Create and manage multiple user profiles
- **Smart Form Detection**: Automatically detects and fills common form fields
- **Quick Profile Switching**: Switch between profiles directly from the popup
- **Secure Storage**: All data is stored locally using Chrome's sync storage
- **Visual Feedback**: See which fields were filled with visual indicators

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The Form Filler Pro icon should appear in your extensions toolbar

## Usage

### Setting Up Profiles

1. Click the Form Filler Pro icon in your toolbar
2. Click "Manage Profiles" to open the options page
3. Fill out the form with your profile information:
   - Profile Name (e.g., "Personal", "Work")
   - First Name
   - Last Name
   - Email Address
4. Click "Add Profile"
5. The first profile you create will automatically be set as active

### Filling Forms

1. Navigate to any webpage with a form
2. Click the Form Filler Pro icon
3. Verify the correct profile is selected
4. Click "Fill Form"
5. The extension will automatically detect and fill compatible form fields

### Managing Profiles

- **Edit Profile**: Click the "Edit" button on any profile card
- **Set Active**: Click "Set Active" to make a profile the default
- **Delete Profile**: Click "Delete" to remove a profile (with confirmation)
- **Quick Switch**: Use the dropdown in the popup to quickly switch between profiles

## Supported Form Fields

The extension automatically detects and fills the following types of form fields:

- **First Name**: `firstName`, `fname`, `first-name`, etc.
- **Last Name**: `lastName`, `lname`, `last-name`, `surname`, etc.
- **Full Name**: `name`, `fullName`, etc. (when separate first/last fields aren't found)
- **Email**: `email`, `email-address`, etc.

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**:
  - `storage` - for saving profiles
  - `activeTab` - for accessing the current page
- **Storage**: Uses `chrome.storage.sync` for cross-device synchronization

## File Structure

```
form-filler/
├── manifest.json          # Extension configuration
├── popup.html             # Popup interface
├── popup.js               # Popup functionality
├── options.html           # Options page interface
├── options.js             # Options page functionality
├── content.js             # Form filling logic
├── storage.js             # Profile storage utilities
├── styles.css             # Styling for all pages
├── icons/                 # Extension icons
└── README.md              # This file
```

## Privacy & Security

- All profile data is stored locally in your browser
- No data is sent to external servers
- Uses Chrome's built-in sync storage for cross-device functionality
- You have full control over your data

## Future Enhancements

Potential features for future versions:
- Additional field types (phone, address, etc.)
- Custom field mapping
- Import/export profiles
- Form templates
- Auto-detection improvements

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the extension.

## License

This project is open source and available under the MIT License.
