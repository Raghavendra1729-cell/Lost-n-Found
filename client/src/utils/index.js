// Utility Functions

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// Format time
export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString();
};

// Validate email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
