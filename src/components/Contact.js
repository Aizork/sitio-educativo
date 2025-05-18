import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.email.trim()) newErrors.email = 'El correo es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Correo inválido';
    if (!formData.message.trim()) newErrors.message = 'El mensaje es obligatorio';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } else {
      setErrors(validationErrors);
      setSubmitted(false);
    }
  };

  return (
    <section className="contact">
      <h2>Contacto</h2>
      {submitted && <p className="success-message">¡Mensaje enviado con éxito!</p>}
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Nombre:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
        <label>
          Correo electrónico:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
        <label>
          Mensaje:
          <textarea name="message" value={formData.message} onChange={handleChange}></textarea>
          {errors.message && <span className="error">{errors.message}</span>}
        </label>
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}

export default Contact;
