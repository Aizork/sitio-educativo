import React from 'react';
import './Resources.css';

const recursos = [
  { id: 1, title: 'Matemáticas para primaria', description: 'Ejercicios y videos para reforzar conceptos básicos.' },
  { id: 2, title: 'Ciencias para secundaria', description: 'Material didáctico para aprender ciencias naturales.' },
  { id: 3, title: 'Historia para preparatoria', description: 'Recursos para estudiar historia universal y nacional.' }
];

function Resources() {
  return (
    <section className="resources">
      <h2>Recursos Educativos</h2>
      <ul>
        {recursos.map((recurso) => (
          <li key={recurso.id} className="recurso-item">
            <h3>{recurso.title}</h3>
            <p>{recurso.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Resources;
