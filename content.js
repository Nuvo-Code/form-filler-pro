// Content script for form filling
class FormFiller {
  constructor() {
    this.fieldMappings = {
      // First name mappings
      firstName: [
        'input[name*="first" i]',
        'input[name*="fname" i]',
        'input[name*="firstname" i]',
        'input[name*="first_name" i]',
        'input[name*="first-name" i]',
        'input[name*="forename" i]',
        'input[name*="given" i]',
        'input[name*="prenom" i]', // French
        'input[name*="nome" i]', // Portuguese/Italian
        'input[name*="vorname" i]', // German
        'input[id*="first" i]',
        'input[id*="fname" i]',
        'input[id*="firstname" i]',
        'input[id*="first_name" i]',
        'input[id*="first-name" i]',
        'input[id*="forename" i]',
        'input[id*="given" i]',
        'input[placeholder*="first" i]',
        'input[placeholder*="given" i]',
        'input[placeholder*="forename" i]',
        'input[autocomplete="given-name"]',
        'input[autocomplete="fname"]',
        'input[class*="first" i]',
        'input[class*="fname" i]',
        'input[data-field*="first" i]',
        'input[data-name*="first" i]'
      ],

      // Last name mappings
      lastName: [
        'input[name*="last" i]',
        'input[name*="lname" i]',
        'input[name*="lastname" i]',
        'input[name*="last_name" i]',
        'input[name*="last-name" i]',
        'input[name*="surname" i]',
        'input[name*="family" i]',
        'input[name*="apellido" i]', // Spanish
        'input[name*="nom" i]', // French
        'input[name*="sobrenome" i]', // Portuguese
        'input[name*="cognome" i]', // Italian
        'input[name*="nachname" i]', // German
        'input[id*="last" i]',
        'input[id*="lname" i]',
        'input[id*="lastname" i]',
        'input[id*="last_name" i]',
        'input[id*="last-name" i]',
        'input[id*="surname" i]',
        'input[id*="family" i]',
        'input[placeholder*="last" i]',
        'input[placeholder*="surname" i]',
        'input[placeholder*="family" i]',
        'input[autocomplete="family-name"]',
        'input[autocomplete="lname"]',
        'input[class*="last" i]',
        'input[class*="lname" i]',
        'input[class*="surname" i]',
        'input[data-field*="last" i]',
        'input[data-name*="last" i]'
      ],

      // Full name mappings
      fullName: [
        'input[name*="name" i]:not([name*="first" i]):not([name*="last" i]):not([name*="user" i]):not([name*="company" i])',
        'input[name*="fullname" i]',
        'input[name*="full_name" i]',
        'input[name*="full-name" i]',
        'input[name*="complete_name" i]',
        'input[name*="display_name" i]',
        'input[name*="real_name" i]',
        'input[id*="name" i]:not([id*="first" i]):not([id*="last" i]):not([id*="user" i]):not([id*="company" i])',
        'input[id*="fullname" i]',
        'input[id*="full_name" i]',
        'input[id*="full-name" i]',
        'input[placeholder*="full name" i]',
        'input[placeholder*="your name" i]',
        'input[placeholder*="complete name" i]',
        'input[placeholder*="real name" i]',
        'input[autocomplete="name"]',
        'input[class*="fullname" i]',
        'input[class*="full-name" i]',
        'input[data-field*="name" i]:not([data-field*="first" i]):not([data-field*="last" i])'
      ],

      // Email mappings
      email: [
        'input[type="email"]',
        'input[name*="email" i]',
        'input[name*="e-mail" i]',
        'input[name*="e_mail" i]',
        'input[name*="mail" i]:not([name*="gmail" i])',
        'input[name*="correo" i]', // Spanish
        'input[name*="courriel" i]', // French
        'input[name*="correio" i]', // Portuguese
        'input[name*="posta" i]', // Italian
        'input[name*="elektronik" i]', // German
        'input[id*="email" i]',
        'input[id*="e-mail" i]',
        'input[id*="e_mail" i]',
        'input[id*="mail" i]:not([id*="gmail" i])',
        'input[placeholder*="email" i]',
        'input[placeholder*="e-mail" i]',
        'input[placeholder*="mail" i]',
        'input[placeholder*="@" i]',
        'input[autocomplete="email"]',
        'input[class*="email" i]',
        'input[class*="e-mail" i]',
        'input[data-field*="email" i]',
        'input[data-name*="email" i]',
        'input[data-type="email"]'
      ],

      // Phone mappings
      phone: [
        'input[type="tel"]',
        'input[name*="phone" i]',
        'input[name*="tel" i]',
        'input[name*="mobile" i]',
        'input[name*="cell" i]',
        'input[name*="telefono" i]', // Spanish
        'input[name*="telephone" i]',
        'input[name*="telefon" i]', // German
        'input[id*="phone" i]',
        'input[id*="tel" i]',
        'input[id*="mobile" i]',
        'input[id*="cell" i]',
        'input[placeholder*="phone" i]',
        'input[placeholder*="tel" i]',
        'input[placeholder*="mobile" i]',
        'input[placeholder*="cell" i]',
        'input[autocomplete="tel"]',
        'input[class*="phone" i]',
        'input[class*="tel" i]',
        'input[data-field*="phone" i]',
        'input[data-name*="phone" i]'
      ],

      // Username mappings
      username: [
        'input[name*="username" i]',
        'input[name*="user" i]:not([name*="first" i]):not([name*="last" i])',
        'input[name*="login" i]',
        'input[name*="account" i]',
        'input[name*="userid" i]',
        'input[name*="user_id" i]',
        'input[name*="user-id" i]',
        'input[id*="username" i]',
        'input[id*="user" i]:not([id*="first" i]):not([id*="last" i])',
        'input[id*="login" i]',
        'input[id*="account" i]',
        'input[placeholder*="username" i]',
        'input[placeholder*="user" i]',
        'input[placeholder*="login" i]',
        'input[autocomplete="username"]',
        'input[class*="username" i]',
        'input[class*="user" i]',
        'input[data-field*="username" i]',
        'input[data-name*="username" i]'
      ],

      // Company mappings
      company: [
        'input[name*="company" i]',
        'input[name*="organization" i]',
        'input[name*="org" i]',
        'input[name*="business" i]',
        'input[name*="employer" i]',
        'input[name*="workplace" i]',
        'input[name*="empresa" i]', // Spanish
        'input[name*="entreprise" i]', // French
        'input[name*="unternehmen" i]', // German
        'input[id*="company" i]',
        'input[id*="organization" i]',
        'input[id*="org" i]',
        'input[id*="business" i]',
        'input[placeholder*="company" i]',
        'input[placeholder*="organization" i]',
        'input[placeholder*="business" i]',
        'input[autocomplete="organization"]',
        'input[class*="company" i]',
        'input[class*="organization" i]',
        'input[data-field*="company" i]',
        'input[data-name*="company" i]'
      ]
    };
    
    this.init();
  }

  init() {
    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
      if (request.action === 'fillForm') {
        this.fillForm(request.profile);
        sendResponse({ success: true });
      }
    });
  }

  fillForm(profile) {
    try {
      let filledCount = 0;
      
      // Fill first name
      const firstNameFields = this.findFields(this.fieldMappings.firstName);
      firstNameFields.forEach(field => {
        if (this.fillField(field, profile.firstName)) {
          filledCount++;
        }
      });

      // Fill last name
      const lastNameFields = this.findFields(this.fieldMappings.lastName);
      lastNameFields.forEach(field => {
        if (this.fillField(field, profile.lastName)) {
          filledCount++;
        }
      });

      // Fill full name (if no separate first/last name fields were found)
      if (firstNameFields.length === 0 && lastNameFields.length === 0) {
        const fullNameFields = this.findFields(this.fieldMappings.fullName);
        fullNameFields.forEach(field => {
          if (this.fillField(field, `${profile.firstName} ${profile.lastName}`)) {
            filledCount++;
          }
        });
      }

      // Fill email
      const emailFields = this.findFields(this.fieldMappings.email);
      emailFields.forEach(field => {
        if (this.fillField(field, profile.email)) {
          filledCount++;
        }
      });

      // Fill phone (if available)
      if (profile.phone && profile.phone.trim() !== '') {
        const phoneFields = this.findFields(this.fieldMappings.phone);
        phoneFields.forEach(field => {
          if (this.fillField(field, profile.phone)) {
            filledCount++;
          }
        });
      }

      // Fill username (if available)
      if (profile.username && profile.username.trim() !== '') {
        const usernameFields = this.findFields(this.fieldMappings.username);
        usernameFields.forEach(field => {
          if (this.fillField(field, profile.username)) {
            filledCount++;
          }
        });
      }

      // Fill company (if available)
      if (profile.company && profile.company.trim() !== '') {
        const companyFields = this.findFields(this.fieldMappings.company);
        companyFields.forEach(field => {
          if (this.fillField(field, profile.company)) {
            filledCount++;
          }
        });
      }

      // Show visual feedback
      this.showFillFeedback(filledCount);
      
      console.log(`Form Filler Pro: Filled ${filledCount} fields`);
      
    } catch (error) {
      console.error('Error filling form:', error);
      this.showErrorFeedback();
    }
  }

  findFields(selectors) {
    const fields = [];
    
    selectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          // Only add visible, enabled input fields that aren't already filled
          if (this.isValidField(element) && !fields.includes(element)) {
            fields.push(element);
          }
        });
      } catch (error) {
        // Ignore invalid selectors
        console.warn('Invalid selector:', selector);
      }
    });
    
    return fields;
  }

  isValidField(element) {
    // Check if element is an input field
    if (element.tagName.toLowerCase() !== 'input') {
      return false;
    }
    
    // Check if field is visible
    const style = window.getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden' || element.offsetParent === null) {
      return false;
    }
    
    // Check if field is enabled
    if (element.disabled || element.readOnly) {
      return false;
    }
    
    // Check if field type is supported
    const supportedTypes = ['text', 'email', 'search', 'url', 'tel', ''];
    if (!supportedTypes.includes(element.type.toLowerCase())) {
      return false;
    }
    
    return true;
  }

  fillField(field, value) {
    try {
      // Don't fill if field already has content (unless it's placeholder-like)
      if (field.value && field.value.trim() !== '' && !this.isPlaceholderValue(field.value)) {
        return false;
      }

      // Set the value
      field.value = value;
      
      // Trigger events to ensure the form recognizes the change
      this.triggerEvents(field);
      
      // Add visual feedback
      this.addFieldFeedback(field);
      
      return true;
    } catch (error) {
      console.error('Error filling field:', error);
      return false;
    }
  }

  isPlaceholderValue(value) {
    // Check if the value looks like a placeholder
    const placeholderPatterns = [
      /^enter/i,
      /^type/i,
      /^your/i,
      /example/i,
      /placeholder/i
    ];
    
    return placeholderPatterns.some(pattern => pattern.test(value));
  }

  triggerEvents(field) {
    // Create and dispatch events to ensure form validation and handlers work
    const events = ['input', 'change', 'blur'];
    
    events.forEach(eventType => {
      const event = new Event(eventType, { bubbles: true, cancelable: true });
      field.dispatchEvent(event);
    });
  }

  addFieldFeedback(field) {
    // Add temporary visual feedback to show field was filled
    const originalBorder = field.style.border;
    field.style.border = '2px solid #4CAF50';
    field.style.transition = 'border 0.3s ease';
    
    setTimeout(() => {
      field.style.border = originalBorder;
    }, 1000);
  }

  showFillFeedback(filledCount) {
    // Create and show a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 12px 20px;
      border-radius: 4px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      z-index: 10000;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      transition: opacity 0.3s ease;
    `;
    
    notification.textContent = filledCount > 0 
      ? `Form Filler Pro: Filled ${filledCount} field${filledCount !== 1 ? 's' : ''}`
      : 'Form Filler Pro: No fillable fields found';
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  showErrorFeedback() {
    // Show error notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #f44336;
      color: white;
      padding: 12px 20px;
      border-radius: 4px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      z-index: 10000;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      transition: opacity 0.3s ease;
    `;
    
    notification.textContent = 'Form Filler Pro: Error filling form';
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
}

// Initialize the form filler
new FormFiller();
