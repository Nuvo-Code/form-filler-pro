// Popup functionality
class PopupManager {
  constructor() {
    this.activeProfile = null;
    this.allProfiles = [];
    this.init();
  }

  async init() {
    this.bindEvents();
    await this.loadActiveProfile();
    await this.loadAllProfiles();
  }

  bindEvents() {
    // Fill Form button
    document.getElementById('fillFormBtn').addEventListener('click', () => {
      this.fillForm();
    });

    // Manage Profiles button
    document.getElementById('manageProfilesBtn').addEventListener('click', () => {
      this.openOptionsPage();
    });

    // Open Options button (when no active profile)
    document.getElementById('openOptionsBtn').addEventListener('click', () => {
      this.openOptionsPage();
    });

    // Profile selector change
    document.getElementById('profileSelect').addEventListener('change', (e) => {
      this.switchProfile(e.target.value);
    });
  }

  async loadActiveProfile() {
    try {
      this.activeProfile = await ProfileStorage.getActiveProfile();
      this.updateActiveProfileDisplay();
    } catch (error) {
      console.error('Error loading active profile:', error);
      this.showStatus('Failed to load active profile', 'error');
    }
  }

  async loadAllProfiles() {
    try {
      this.allProfiles = await ProfileStorage.getProfiles();
      this.updateProfileSelector();
    } catch (error) {
      console.error('Error loading profiles:', error);
    }
  }

  updateActiveProfileDisplay() {
    const activeProfileDisplay = document.getElementById('activeProfileDisplay');
    const noActiveProfile = document.getElementById('noActiveProfile');
    const fillFormBtn = document.getElementById('fillFormBtn');

    if (this.activeProfile) {
      // Build optional details
      const optionalDetails = [];
      if (this.activeProfile.phone) {
        optionalDetails.push(`<div class="profile-phone">📞 ${this.escapeHtml(this.activeProfile.phone)}</div>`);
      }
      if (this.activeProfile.company) {
        optionalDetails.push(`<div class="profile-company">🏢 ${this.escapeHtml(this.activeProfile.company)}</div>`);
      }

      // Show active profile info
      activeProfileDisplay.innerHTML = `
        <div class="profile-info">
          <div class="profile-name">${this.escapeHtml(this.activeProfile.name)}</div>
          <div class="profile-details">
            ${this.escapeHtml(this.activeProfile.firstName)} ${this.escapeHtml(this.activeProfile.lastName)}
          </div>
          <div class="profile-email">${this.escapeHtml(this.activeProfile.email)}</div>
          ${optionalDetails.join('')}
        </div>
      `;
      
      activeProfileDisplay.style.display = 'block';
      noActiveProfile.style.display = 'none';
      fillFormBtn.disabled = false;
    } else {
      // Show no active profile message
      activeProfileDisplay.style.display = 'none';
      noActiveProfile.style.display = 'block';
      fillFormBtn.disabled = true;
    }
  }

  updateProfileSelector() {
    const profileSelect = document.getElementById('profileSelect');
    const profileSwitcherSection = document.getElementById('profileSwitcherSection');

    if (this.allProfiles.length > 1) {
      // Show profile switcher if there are multiple profiles
      profileSwitcherSection.style.display = 'block';
      
      // Clear and populate options
      profileSelect.innerHTML = '<option value="">Select a profile...</option>';
      
      this.allProfiles.forEach(profile => {
        const option = document.createElement('option');
        option.value = profile.id;
        option.textContent = `${profile.name} (${profile.email})`;
        option.selected = this.activeProfile && profile.id === this.activeProfile.id;
        profileSelect.appendChild(option);
      });
    } else {
      // Hide profile switcher if there's only one or no profiles
      profileSwitcherSection.style.display = 'none';
    }
  }

  async switchProfile(profileId) {
    if (!profileId) return;

    try {
      const success = await ProfileStorage.setActiveProfile(profileId);
      if (success) {
        // Reload both active profile and update the selector
        await this.loadActiveProfile();
        await this.loadAllProfiles(); // This ensures the selector is updated
        this.showStatus('Profile switched successfully!', 'success');
      } else {
        this.showStatus('Failed to switch profile', 'error');
      }
    } catch (error) {
      console.error('Error switching profile:', error);
      this.showStatus('Error switching profile', 'error');
    }
  }

  async fillForm() {
    if (!this.activeProfile) {
      this.showStatus('No active profile selected', 'error');
      return;
    }

    try {
      // Get the current active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab) {
        this.showStatus('No active tab found', 'error');
        return;
      }

      // Send message to content script to fill the form
      await chrome.tabs.sendMessage(tab.id, {
        action: 'fillForm',
        profile: this.activeProfile
      });

      this.showStatus('Form filled successfully!', 'success');
      
      // Close popup after a short delay
      setTimeout(() => {
        window.close();
      }, 1000);

    } catch (error) {
      console.error('Error filling form:', error);
      
      if (error.message.includes('Could not establish connection')) {
        this.showStatus('Please refresh the page and try again', 'error');
      } else {
        this.showStatus('Failed to fill form', 'error');
      }
    }
  }

  openOptionsPage() {
    chrome.runtime.openOptionsPage();
    window.close();
  }

  showStatus(message, type) {
    const statusEl = document.getElementById('statusMessage');
    statusEl.textContent = message;
    statusEl.className = `status-message ${type}`;
    statusEl.style.display = 'block';

    // Auto-hide after 3 seconds
    setTimeout(() => {
      statusEl.style.display = 'none';
    }, 3000);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PopupManager();
});
