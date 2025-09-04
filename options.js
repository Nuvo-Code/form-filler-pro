// Options page functionality
class OptionsManager {
  constructor() {
    this.currentEditingId = null;
    this.init();
  }

  async init() {
    this.bindEvents();
    await this.loadProfiles();
  }

  bindEvents() {
    // Form submission
    document.getElementById('profileForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });

    // Cancel button
    document.getElementById('cancelBtn').addEventListener('click', () => {
      this.resetForm();
    });
  }

  async handleFormSubmit() {
    const formData = this.getFormData();
    const errors = ProfileStorage.validateProfile(formData);

    if (errors.length > 0) {
      this.showMessage(errors.join(', '), 'error');
      return;
    }

    try {
      let result;
      if (this.currentEditingId) {
        // Update existing profile
        result = await ProfileStorage.updateProfile(this.currentEditingId, formData);
        this.showMessage('Profile updated successfully!', 'success');
      } else {
        // Add new profile
        result = await ProfileStorage.addProfile(formData);
        this.showMessage('Profile added successfully!', 'success');
      }

      if (result) {
        this.resetForm();
        await this.loadProfiles();
      } else {
        this.showMessage('Failed to save profile. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      this.showMessage('An error occurred. Please try again.', 'error');
    }
  }

  getFormData() {
    return {
      name: document.getElementById('name').value.trim(),
      firstName: document.getElementById('firstName').value.trim(),
      lastName: document.getElementById('lastName').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      username: document.getElementById('username').value.trim(),
      company: document.getElementById('company').value.trim()
    };
  }

  resetForm() {
    document.getElementById('profileForm').reset();
    document.getElementById('saveBtn').textContent = 'Add Profile';
    document.getElementById('cancelBtn').style.display = 'none';
    this.currentEditingId = null;
    this.hideMessage();
  }

  async loadProfiles() {
    try {
      const profiles = await ProfileStorage.getProfiles();
      const activeProfileId = await ProfileStorage.getActiveProfileId();
      
      const profilesList = document.getElementById('profilesList');
      const noProfiles = document.getElementById('noProfiles');

      if (profiles.length === 0) {
        profilesList.innerHTML = '';
        noProfiles.style.display = 'block';
        return;
      }

      noProfiles.style.display = 'none';
      profilesList.innerHTML = profiles.map(profile => 
        this.createProfileCard(profile, profile.id === activeProfileId)
      ).join('');

      // Bind events for profile cards
      this.bindProfileEvents();
    } catch (error) {
      console.error('Error loading profiles:', error);
      this.showMessage('Failed to load profiles.', 'error');
    }
  }

  createProfileCard(profile, isActive) {
    const optionalFields = [];
    if (profile.phone) optionalFields.push(`<p><strong>Phone:</strong> ${this.escapeHtml(profile.phone)}</p>`);
    if (profile.username) optionalFields.push(`<p><strong>Username:</strong> ${this.escapeHtml(profile.username)}</p>`);
    if (profile.company) optionalFields.push(`<p><strong>Company:</strong> ${this.escapeHtml(profile.company)}</p>`);

    return `
      <div class="profile-card ${isActive ? 'active' : ''}" data-id="${profile.id}">
        <div class="profile-info">
          <h3>${this.escapeHtml(profile.name)} ${isActive ? '<span class="active-badge">Active</span>' : ''}</h3>
          <p><strong>Name:</strong> ${this.escapeHtml(profile.firstName)} ${this.escapeHtml(profile.lastName)}</p>
          <p><strong>Email:</strong> ${this.escapeHtml(profile.email)}</p>
          ${optionalFields.join('')}
        </div>
        <div class="profile-actions">
          ${!isActive ? `<button class="btn btn-small btn-primary set-active-btn" data-id="${profile.id}">Set Active</button>` : ''}
          <button class="btn btn-small btn-secondary edit-btn" data-id="${profile.id}">Edit</button>
          <button class="btn btn-small btn-danger delete-btn" data-id="${profile.id}">Delete</button>
        </div>
      </div>
    `;
  }

  bindProfileEvents() {
    // Set active buttons
    document.querySelectorAll('.set-active-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const profileId = e.target.getAttribute('data-id');
        this.setActiveProfile(profileId);
      });
    });

    // Edit buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const profileId = e.target.getAttribute('data-id');
        this.editProfile(profileId);
      });
    });

    // Delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const profileId = e.target.getAttribute('data-id');
        this.deleteProfile(profileId);
      });
    });
  }

  async setActiveProfile(profileId) {
    try {
      const success = await ProfileStorage.setActiveProfile(profileId);
      if (success) {
        this.showMessage('Active profile updated!', 'success');
        await this.loadProfiles();
      } else {
        this.showMessage('Failed to set active profile.', 'error');
      }
    } catch (error) {
      console.error('Error setting active profile:', error);
      this.showMessage('An error occurred.', 'error');
    }
  }

  async editProfile(profileId) {
    try {
      const profiles = await ProfileStorage.getProfiles();
      const profile = profiles.find(p => p.id === profileId);
      
      if (!profile) {
        this.showMessage('Profile not found.', 'error');
        return;
      }

      // Populate form with profile data
      document.getElementById('name').value = profile.name;
      document.getElementById('firstName').value = profile.firstName;
      document.getElementById('lastName').value = profile.lastName;
      document.getElementById('email').value = profile.email;
      document.getElementById('phone').value = profile.phone || '';
      document.getElementById('username').value = profile.username || '';
      document.getElementById('company').value = profile.company || '';

      // Update form state
      this.currentEditingId = profileId;
      document.getElementById('saveBtn').textContent = 'Update Profile';
      document.getElementById('cancelBtn').style.display = 'inline-block';

      // Scroll to form
      document.querySelector('.add-profile-section').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error editing profile:', error);
      this.showMessage('Failed to load profile for editing.', 'error');
    }
  }

  async deleteProfile(profileId) {
    if (!confirm('Are you sure you want to delete this profile? This action cannot be undone.')) {
      return;
    }

    try {
      const success = await ProfileStorage.deleteProfile(profileId);
      if (success) {
        this.showMessage('Profile deleted successfully!', 'success');
        await this.loadProfiles();
      } else {
        this.showMessage('Failed to delete profile.', 'error');
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
      this.showMessage('An error occurred.', 'error');
    }
  }

  showMessage(text, type) {
    const messageEl = document.getElementById('formMessage');
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
    messageEl.style.display = 'block';

    // Auto-hide success messages
    if (type === 'success') {
      setTimeout(() => this.hideMessage(), 3000);
    }
  }

  hideMessage() {
    const messageEl = document.getElementById('formMessage');
    messageEl.style.display = 'none';
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new OptionsManager();
});
