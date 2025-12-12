<template>
  <div class="container">
    <header>
      <h1>🎬 Malleon Replay SDK - Vue Example</h1>
      <p class="subtitle">Demonstrate how to integrate the Malleon Replay SDK into your Vue application</p>
    </header>

    <div v-if="statusMessage" :class="['status-message', statusMessage.type]">
      {{ statusMessage.text }}
    </div>

    <section class="card">
      <h2>📝 User Data Configuration</h2>
      <p class="description">Update user metadata that will be associated with this replay session.</p>
      
      <div class="form-group">
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Enter username"
        />
      </div>

      <div class="form-group">
        <label for="tenantId">Tenant ID:</label>
        <input
          type="text"
          id="tenantId"
          v-model="tenantId"
          placeholder="Enter tenant ID"
        />
      </div>

      <div class="form-group">
        <label for="userEmail">User Email:</label>
        <input
          type="email"
          id="userEmail"
          v-model="userEmail"
          placeholder="Enter email"
        />
      </div>

      <div class="form-group">
        <label for="userRole">User Role:</label>
        <input
          type="text"
          id="userRole"
          v-model="userRole"
          placeholder="Enter role"
        />
      </div>

      <button class="btn btn-primary" @click="updateUserData">
        Update User Data
      </button>
    </section>

    <section class="card">
      <h2>🐛 Console Events</h2>
      <p class="description">Generate console events that will be captured by the Replay SDK.</p>
      
      <div class="button-group">
        <button class="btn btn-error e2e-error-btn" @click="generateError">
          Generate Error
        </button>
        <button class="btn btn-warning e2e-warn-btn" @click="generateWarning">
          Generate Warning
        </button>
        <button class="btn btn-info e2e-log-btn" @click="generateLog">
          Generate Log
        </button>
        <button class="btn btn-error e2e-stacktrace-btn" @click="generateErrorWithStackTrace">
          Generate Error with Stack Trace
        </button>
      </div>
      <p class="description" style="margin-top: 10px; font-size: 0.9em; color: #666;">
        💡 <strong>Tip:</strong> Use "Generate Error with Stack Trace" to test source map functionality. Make sure you've uploaded source maps first!
      </p>
    </section>

    <section class="card">
      <h2>🌐 API Calls</h2>
      <p class="description">Make HTTP requests that will be captured by the Replay SDK.</p>
      
      <div class="button-group">
        <button class="btn btn-primary e2e-api-btn" @click="makeApiCall">
          Make Successful API Call
        </button>
        <button class="btn btn-error" @click="makeFailedApiCall">
          Make Failed API Call
        </button>
      </div>
    </section>

    <section class="card">
      <h2>🏷️ Custom Tags</h2>
      <p class="description">Add custom tags and metadata to the replay session.</p>
      
      <div class="button-group">
        <button class="btn btn-primary" @click="addCustomTag">
          Add Single Tag
        </button>
        <button class="btn btn-primary" @click="addMultipleTags">
          Add Multiple Tags
        </button>
        <button class="btn btn-primary" @click="trackState">
          Track State Transition
        </button>
      </div>
    </section>

    <section class="card">
      <h2>🎯 Hover Test</h2>
      <p class="description">Test hover interactions for replay verification.</p>
      
      <div class="hover-container">
        <button
          class="btn btn-primary e2e-hover-target"
          @mouseenter="showHoverPopup = true"
          @mouseleave="showHoverPopup = false"
        >
          Hover Over Me
        </button>
        <div v-if="showHoverPopup" class="hover-popup e2e-hover-popup">
          This popup appears on hover!
        </div>
      </div>
    </section>

    <footer>
      <p>💡 <strong>Tip:</strong> After interacting with this page, check your Malleon account dashboard to see the captured replay data!</p>
      <p>Make sure you've set your <code>replayAppId</code> in <code>src/config.js</code></p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { replayService } from './replayService';

// User data form fields
const username = ref('demo-user');
const tenantId = ref('tenant-123');
const userEmail = ref('demo@example.com');
const userRole = ref('admin');

// Status messages
interface StatusMessage {
  text: string;
  type: 'success' | 'error' | 'info';
}
const statusMessage = ref<StatusMessage | null>(null);

// Hover state for e2e testing
const showHoverPopup = ref(false);

onMounted(() => {
  // Initialize user data when component loads
  updateUserData();
});

/**
 * Update user data in the replay session
 */
const updateUserData = async (): Promise<void> => {
  await replayService.updateUserData({
    username: username.value,
    tenantId: tenantId.value,
    userEmail: userEmail.value,
    userRole: userRole.value,
    environment: 'development'
  });
  showStatus('User data updated successfully!', 'success');
};

/**
 * Generate a console error
 */
const generateError = (): void => {
  console.error('This is a test error message from the Malleon Replay SDK example');
  showStatus('Error logged to console', 'info');
};

/**
 * Generate an error with a stack trace (for source map testing)
 */
const generateErrorWithStackTrace = (): void => {
  try {
    // Create a nested function call to generate a meaningful stack trace
    function innerFunction() {
      function deepFunction() {
        function deepestFunction() {
          throw new Error('This is a test error with stack trace for source map testing');
        }
        deepestFunction();
      }
      deepFunction();
    }
    innerFunction();
  } catch (error) {
    console.error('Error with stack trace:', error);
    showStatus('Error with stack trace logged - check Error Analytics!', 'info');
  }
};

/**
 * Generate a console warning
 */
const generateWarning = (): void => {
  console.warn('This is a test warning message from the Malleon Replay SDK example');
  showStatus('Warning logged to console', 'info');
};

/**
 * Generate a console log
 */
const generateLog = (): void => {
  console.log('This is a test log message from the Malleon Replay SDK example');
  showStatus('Log message logged to console', 'info');
};

/**
 * Make a simple API call
 */
const makeApiCall = async (): Promise<void> => {
  try {
    // Make a call to a public API
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    console.log('API call successful:', data);
    showStatus('API call completed successfully!', 'success');
  } catch (error) {
    console.error('API call failed:', error);
    showStatus('API call failed - check console', 'error');
  }
};

/**
 * Make an API call that fails
 */
const makeFailedApiCall = async (): Promise<void> => {
  try {
    // Intentionally make a call to a non-existent endpoint
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/999999999');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Failed API call:', error);
    showStatus('Failed API call logged', 'info');
  }
};

/**
 * Add a custom tag to the replay
 */
const addCustomTag = async (): Promise<void> => {
  await replayService.addTag(
    'customEvent',
    'button-clicked',
    'STR'
  );
  showStatus('Custom tag added!', 'success');
};

/**
 * Add multiple tags at once
 */
const addMultipleTags = async (): Promise<void> => {
  await replayService.addTags([
    { name: 'feature', value: 'demo', type: 'STR' },
    { name: 'version', value: '1.0.0', type: 'STR' },
    { name: 'score', value: 95, type: 'NUM' },
    { name: 'isActive', value: true, type: 'BOOL' },
    { name: 'timestamp', value: new Date(), type: 'DATETIME' }
  ]);
  showStatus('Multiple tags added!', 'success');
};

/**
 * Track a state transition
 */
const trackState = async (): Promise<void> => {
  await replayService.trackStateTransition('demo-page-viewed');
  showStatus('State transition tracked!', 'success');
};

/**
 * Show a status message
 */
const showStatus = (message: string, type: 'success' | 'error' | 'info'): void => {
  statusMessage.value = { text: message, type };
  setTimeout(() => {
    statusMessage.value = null;
  }, 3000);
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  color: white;
  margin-bottom: 30px;
}

header h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.subtitle {
  font-size: 1.1em;
  opacity: 0.9;
}

.status-message {
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-weight: 500;
  animation: slideIn 0.3s ease-out;
}

.status-message.success {
  background-color: #10b981;
  color: white;
}

.status-message.error {
  background-color: #ef4444;
  color: white;
}

.status-message.info {
  background-color: #3b82f6;
  color: white;
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card h2 {
  color: #1f2937;
  margin-bottom: 10px;
  font-size: 1.5em;
}

.description {
  color: #6b7280;
  margin-bottom: 20px;
  font-size: 0.95em;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #374151;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 1em;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.button-group {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.btn:active {
  transform: translateY(0);
}

.btn-primary {
  background-color: #667eea;
  color: white;
}

.btn-primary:hover {
  background-color: #5568d3;
}

.btn-error {
  background-color: #ef4444;
  color: white;
}

.btn-error:hover {
  background-color: #dc2626;
}

.btn-warning {
  background-color: #f59e0b;
  color: white;
}

.btn-warning:hover {
  background-color: #d97706;
}

.btn-info {
  background-color: #3b82f6;
  color: white;
}

.btn-info:hover {
  background-color: #2563eb;
}

/* Hover Test Container */
.hover-container {
  position: relative;
  display: inline-block;
}

.hover-popup {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 10px;
  padding: 12px 20px;
  background: #1f2937;
  color: white;
  border-radius: 8px;
  white-space: nowrap;
  animation: fadeIn 0.2s ease-out;
  z-index: 10;
}

.hover-popup::before {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 8px solid transparent;
  border-bottom-color: #1f2937;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

footer {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
  color: #6b7280;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

footer p {
  margin-bottom: 10px;
}

footer code {
  background-color: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  color: #667eea;
}

@media (max-width: 768px) {
  .card {
    padding: 20px;
  }

  .button-group {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  header h1 {
    font-size: 2em;
  }
}
</style>

