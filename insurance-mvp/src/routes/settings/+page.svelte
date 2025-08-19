<script lang="ts">
  import { 
    Save,
    User,
    Bell,
    Shield,
    Palette,
    Globe,
    Database,
    Mail,
    Phone,
    Lock
  } from 'lucide-svelte';

  let settings = {
    profile: {
      name: 'Admin User',
      email: 'admin@insuranceos.com',
      phone: '+1 234 567 8900',
      role: 'System Administrator'
    },
    notifications: {
      emailAlerts: true,
      smsAlerts: false,
      pushNotifications: true,
      weeklyReports: true,
      claimAlerts: true,
      systemMaintenance: true
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginAttempts: 5
    },
    system: {
      theme: 'light',
      language: 'en',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
      currency: 'USD'
    }
  };

  function saveSettings() {
    // In a real app, this would save to API
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  }
</script>

<svelte:head>
  <title>Settings - InsuranceOS</title>
</svelte:head>

<div class="space-y-8">
  <!-- Page header -->
  <div>
    <h1 class="text-3xl font-bold text-gray-900">Settings</h1>
    <p class="mt-2 text-gray-600">Manage your account and system preferences</p>
  </div>

  <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
    <!-- Settings navigation -->
    <div class="lg:col-span-1">
      <nav class="space-y-2">
        <a href="#profile" class="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium bg-primary-50 text-primary-700">
          <User class="h-5 w-5" />
          <span>Profile</span>
        </a>
        <a href="#notifications" class="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
          <Bell class="h-5 w-5" />
          <span>Notifications</span>
        </a>
        <a href="#security" class="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
          <Shield class="h-5 w-5" />
          <span>Security</span>
        </a>
        <a href="#system" class="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
          <Database class="h-5 w-5" />
          <span>System</span>
        </a>
      </nav>
    </div>

    <!-- Settings content -->
    <div class="lg:col-span-2 space-y-8">
      <!-- Profile settings -->
      <div id="profile" class="card">
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center">
            <User class="h-5 w-5 mr-2" />
            Profile Information
          </h3>
          <p class="text-sm text-gray-600">Update your personal information and contact details</p>
        </div>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label class="label">Full Name</label>
            <input type="text" bind:value={settings.profile.name} class="input" />
          </div>
          <div>
            <label class="label">Role</label>
            <input type="text" bind:value={settings.profile.role} class="input" readonly />
          </div>
          <div>
            <label class="label">Email Address</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail class="h-4 w-4 text-gray-400" />
              </div>
              <input type="email" bind:value={settings.profile.email} class="input pl-10" />
            </div>
          </div>
          <div>
            <label class="label">Phone Number</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                <Phone class="h-4 w-4 text-gray-400" />
              </div>
              <input type="tel" bind:value={settings.profile.phone} class="input pl-10" />
            </div>
          </div>
        </div>
      </div>

      <!-- Notification settings -->
      <div id="notifications" class="card">
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center">
            <Bell class="h-5 w-5 mr-2" />
            Notification Preferences
          </h3>
          <p class="text-sm text-gray-600">Choose how you want to be notified about system events</p>
        </div>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium text-gray-900">Email Alerts</div>
              <div class="text-sm text-gray-600">Receive important alerts via email</div>
            </div>
            <input type="checkbox" bind:checked={settings.notifications.emailAlerts} class="h-4 w-4 text-primary-600 rounded" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium text-gray-900">SMS Alerts</div>
              <div class="text-sm text-gray-600">Receive critical alerts via SMS</div>
            </div>
            <input type="checkbox" bind:checked={settings.notifications.smsAlerts} class="h-4 w-4 text-primary-600 rounded" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium text-gray-900">Push Notifications</div>
              <div class="text-sm text-gray-600">Browser push notifications</div>
            </div>
            <input type="checkbox" bind:checked={settings.notifications.pushNotifications} class="h-4 w-4 text-primary-600 rounded" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium text-gray-900">Weekly Reports</div>
              <div class="text-sm text-gray-600">Receive weekly summary reports</div>
            </div>
            <input type="checkbox" bind:checked={settings.notifications.weeklyReports} class="h-4 w-4 text-primary-600 rounded" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium text-gray-900">Claim Alerts</div>
              <div class="text-sm text-gray-600">Notifications for new claims</div>
            </div>
            <input type="checkbox" bind:checked={settings.notifications.claimAlerts} class="h-4 w-4 text-primary-600 rounded" />
          </div>
        </div>
      </div>

      <!-- Security settings -->
      <div id="security" class="card">
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center">
            <Shield class="h-5 w-5 mr-2" />
            Security Settings
          </h3>
          <p class="text-sm text-gray-600">Manage your account security and access controls</p>
        </div>
        
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium text-gray-900">Two-Factor Authentication</div>
              <div class="text-sm text-gray-600">Add an extra layer of security to your account</div>
            </div>
            <input type="checkbox" bind:checked={settings.security.twoFactorAuth} class="h-4 w-4 text-primary-600 rounded" />
          </div>
          
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label class="label">Session Timeout (minutes)</label>
              <input type="number" bind:value={settings.security.sessionTimeout} class="input" />
            </div>
            <div>
              <label class="label">Password Expiry (days)</label>
              <input type="number" bind:value={settings.security.passwordExpiry} class="input" />
            </div>
          </div>
          
          <div>
            <button class="btn btn-outline btn-md">
              <Lock class="mr-2 h-4 w-4" />
              Change Password
            </button>
          </div>
        </div>
      </div>

      <!-- System settings -->
      <div id="system" class="card">
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center">
            <Database class="h-5 w-5 mr-2" />
            System Preferences
          </h3>
          <p class="text-sm text-gray-600">Customize your system appearance and regional settings</p>
        </div>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label class="label">Theme</label>
            <select bind:value={settings.system.theme} class="input">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
          
          <div>
            <label class="label">Language</label>
            <select bind:value={settings.system.language} class="input">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
          
          <div>
            <label class="label">Timezone</label>
            <select bind:value={settings.system.timezone} class="input">
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
            </select>
          </div>
          
          <div>
            <label class="label">Date Format</label>
            <select bind:value={settings.system.dateFormat} class="input">
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          
          <div>
            <label class="label">Currency</label>
            <select bind:value={settings.system.currency} class="input">
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Save button -->
      <div class="flex justify-end">
        <button on:click={saveSettings} class="btn btn-primary btn-lg">
          <Save class="mr-2 h-4 w-4" />
          Save Settings
        </button>
      </div>
    </div>
  </div>
</div>