# Installation and Testing Guide

## Quick Start

### 1. Generate Icons (Required)
Before installing the extension, you need to create the icon files:

1. Open `create-icons.html` in your browser
2. Click "Download Icons" button
3. Save the three PNG files (icon16.png, icon48.png, icon128.png) to the `icons/` folder

### 2. Install the Extension

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the `form-filler` folder (this directory)
6. The extension should now appear in your extensions list

### 3. Set Up Your First Profile

1. Click the Form Filler Pro icon in your Chrome toolbar
2. Click "Manage Profiles" to open the options page
3. Fill out the profile form:
   - **Profile Name**: "Personal" (or any name you prefer)
   - **First Name**: Your first name
   - **Last Name**: Your last name  
   - **Email**: Your email address
4. Click "Add Profile"
5. The profile will automatically be set as active

### 4. Test the Extension

1. Open `test-form.html` in your browser (double-click the file)
2. Click the Form Filler Pro extension icon
3. Verify your profile information is displayed
4. Click "Fill Form"
5. Watch as the form fields get automatically filled!

## Testing Checklist

### ✅ Profile Management
- [ ] Can create new profiles
- [ ] Can edit existing profiles
- [ ] Can delete profiles (with confirmation)
- [ ] Can set active profile
- [ ] Profiles persist after browser restart

### ✅ Popup Functionality
- [ ] Shows active profile information
- [ ] "Fill Form" button works
- [ ] "Manage Profiles" opens options page
- [ ] Profile switcher dropdown appears when multiple profiles exist
- [ ] Can switch active profile from popup

### ✅ Form Filling
- [ ] Fills standard name fields (firstName, lastName)
- [ ] Fills alternative name fields (fname, lname)
- [ ] Fills email fields
- [ ] Fills full name field when separate first/last not available
- [ ] Ignores password fields
- [ ] Ignores hidden fields
- [ ] Shows visual feedback when filling
- [ ] Shows notification with count of filled fields

### ✅ Storage
- [ ] Profiles save correctly
- [ ] Active profile persists
- [ ] Data syncs across browser instances (if signed into Chrome)

## Troubleshooting

### Extension Not Loading
- Make sure all files are in the correct directory
- Check that manifest.json is valid
- Ensure icons are present in the icons/ folder

### Form Filling Not Working
- Refresh the page and try again
- Check browser console for errors (F12 → Console)
- Verify the page has compatible form fields

### Profiles Not Saving
- Check if Chrome storage permissions are granted
- Try disabling and re-enabling the extension
- Check for browser console errors

## File Structure Verification

Your directory should look like this:
```
form-filler/
├── manifest.json
├── popup.html
├── popup.js
├── options.html
├── options.js
├── content.js
├── storage.js
├── styles.css
├── test-form.html
├── create-icons.html
├── README.md
├── INSTALLATION.md
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## Next Steps

Once you've verified everything works:

1. **Customize**: Add more profiles for different use cases
2. **Extend**: The code is modular and easy to extend with new field types
3. **Deploy**: Package the extension for distribution if needed

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify all files are present and correctly named
3. Try reloading the extension in chrome://extensions/
4. Test with the provided test-form.html first
