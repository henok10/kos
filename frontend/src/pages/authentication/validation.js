export function Validation({ user }) {
    const errors = {};
  
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  
    if (user.username === "") {
      errors.username = "Name is required!";
    }

    if (user.tc === 'false') {
      errors.tc = "You must agree to the terms and conditions to proceed with registration.";
    }
  
    if (user.email === "") {
      errors.email = "Email is required!";
    } else if (!email_pattern.test(user.email)) {
      errors.email = "Email doesn't match the required pattern";
    }
  
    if (user.password === "") {
      errors.password = "Password is required";
    } else if (!password_pattern.test(user.password)) {
      errors.password = "Password doesn't match the required pattern";
    }
  
    if (user.password2 === "") {
      errors.password2 = "Confirm Password is required";
    } else if (!password_pattern.test(user.password2)) {
      errors.password2 = "Confirm Password doesn't match the required pattern";
    }
  
    if (user.password !== user.password2) {
      errors.password2 = "Passwords do not match";
    }
    
    return errors;
  }
  export function Validation2({ formData }) {
    const errors = {};

    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (formData.password === "") {
      errors.password = "Password is required";
    } else if (!password_pattern.test(formData.password)) {
      errors.password = "Password doesn't match the required pattern";
    }
  
    if (formData.password2 === "") {
      errors.password2 = "Confirm Password is required";
    } else if (!password_pattern.test(formData.password2)) {
      errors.password2 = "Confirm Password doesn't match the required pattern";
    }
  return errors;
  }
  