// Storage utility functions for managing profiles
class ProfileStorage {
  static STORAGE_KEYS = {
    PROFILES: 'profiles',
    ACTIVE_PROFILE_ID: 'activeProfileId'
  };

  // Get all profiles from storage
  static async getProfiles() {
    try {
      const result = await chrome.storage.sync.get([this.STORAGE_KEYS.PROFILES]);
      return result[this.STORAGE_KEYS.PROFILES] || [];
    } catch (error) {
      console.error('Error getting profiles:', error);
      return [];
    }
  }

  // Save profiles to storage
  static async saveProfiles(profiles) {
    try {
      await chrome.storage.sync.set({
        [this.STORAGE_KEYS.PROFILES]: profiles
      });
      return true;
    } catch (error) {
      console.error('Error saving profiles:', error);
      return false;
    }
  }

  // Add a new profile
  static async addProfile(profile) {
    try {
      const profiles = await this.getProfiles();
      const newProfile = {
        id: this.generateId(),
        name: profile.name,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone || '',
        username: profile.username || '',
        company: profile.company || '',
        createdAt: new Date().toISOString()
      };
      
      profiles.push(newProfile);
      await this.saveProfiles(profiles);
      
      // If this is the first profile, make it active
      if (profiles.length === 1) {
        await this.setActiveProfile(newProfile.id);
      }
      
      return newProfile;
    } catch (error) {
      console.error('Error adding profile:', error);
      return null;
    }
  }

  // Update an existing profile
  static async updateProfile(profileId, updatedData) {
    try {
      const profiles = await this.getProfiles();
      const profileIndex = profiles.findIndex(p => p.id === profileId);
      
      if (profileIndex === -1) {
        throw new Error('Profile not found');
      }
      
      profiles[profileIndex] = {
        ...profiles[profileIndex],
        ...updatedData,
        updatedAt: new Date().toISOString()
      };
      
      await this.saveProfiles(profiles);
      return profiles[profileIndex];
    } catch (error) {
      console.error('Error updating profile:', error);
      return null;
    }
  }

  // Delete a profile
  static async deleteProfile(profileId) {
    try {
      const profiles = await this.getProfiles();
      const filteredProfiles = profiles.filter(p => p.id !== profileId);
      
      await this.saveProfiles(filteredProfiles);
      
      // If the deleted profile was active, set a new active profile
      const activeProfileId = await this.getActiveProfileId();
      if (activeProfileId === profileId) {
        const newActiveId = filteredProfiles.length > 0 ? filteredProfiles[0].id : null;
        await this.setActiveProfile(newActiveId);
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting profile:', error);
      return false;
    }
  }

  // Get active profile ID
  static async getActiveProfileId() {
    try {
      const result = await chrome.storage.sync.get([this.STORAGE_KEYS.ACTIVE_PROFILE_ID]);
      return result[this.STORAGE_KEYS.ACTIVE_PROFILE_ID] || null;
    } catch (error) {
      console.error('Error getting active profile ID:', error);
      return null;
    }
  }

  // Set active profile
  static async setActiveProfile(profileId) {
    try {
      await chrome.storage.sync.set({
        [this.STORAGE_KEYS.ACTIVE_PROFILE_ID]: profileId
      });
      return true;
    } catch (error) {
      console.error('Error setting active profile:', error);
      return false;
    }
  }

  // Get active profile data
  static async getActiveProfile() {
    try {
      const activeProfileId = await this.getActiveProfileId();
      if (!activeProfileId) return null;
      
      const profiles = await this.getProfiles();
      return profiles.find(p => p.id === activeProfileId) || null;
    } catch (error) {
      console.error('Error getting active profile:', error);
      return null;
    }
  }

  // Generate unique ID
  static generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  // Validate profile data
  static validateProfile(profile) {
    const errors = [];

    if (!profile.name || profile.name.trim() === '') {
      errors.push('Name is required');
    }

    if (!profile.firstName || profile.firstName.trim() === '') {
      errors.push('First name is required');
    }

    if (!profile.lastName || profile.lastName.trim() === '') {
      errors.push('Last name is required');
    }

    if (!profile.email || profile.email.trim() === '') {
      errors.push('Email is required');
    } else if (!this.isValidEmail(profile.email)) {
      errors.push('Email format is invalid');
    }

    // Optional field validations
    if (profile.phone && profile.phone.trim() !== '' && !this.isValidPhone(profile.phone)) {
      errors.push('Phone format is invalid');
    }

    if (profile.email && profile.email.trim() !== '' && !this.isValidEmail(profile.email)) {
      errors.push('Email format is invalid');
    }

    return errors;
  }

  // Phone validation (basic)
  static isValidPhone(phone) {
    // Allow various phone formats: +1234567890, (123) 456-7890, 123-456-7890, etc.
    const phoneRegex = /^[\+]?[\d\s\-\(\)\.]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  // Email validation
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
