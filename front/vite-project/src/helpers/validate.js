const fecha = new Date();
export const fechaHoy = fecha.toISOString().slice(0, 10);

fecha.setMonth(fecha.getMonth() + 3);

export const siguienteMes = fecha.toISOString().slice(0, 10);

export const validate = (values) => {
    let errors = {};
  
    if (!values.username.trim()) {
      errors.username = "El nombre de usuario es obligatorio";
    }
  
    if (!values.password.trim()) {
      errors.password = "La contraseña es obligatoria";
    } else if (values.password.length <= 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
    }
  
    return errors;
  };

  export const registerValidate = (values) => {
    let errors = {};

    if (!values.email.trim()) {
        errors.email = "El correo electrónico es obligatorio";
    }

    if (!values.name.trim()) {
        errors.name = "El nombre es obligatorio";
    }

    if (!values.nDni.trim()) {
        errors.nDni = "El número de DNI es obligatorio";
    }

    if (!values.birthdate.trim()) {
        errors.birthdate = "La fecha de nacimiento es obligatoria";
    }

    if (!values.username.trim()) {
        errors.username = "El nombre de usuario es obligatorio";
    }

    if (!values.password.trim()) {
        errors.password = "La contraseña es obligatoria";
    } else if (values.password.length <= 8) {
        errors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    return errors;
};

export const validarTurn = (values) => {
  let errors = {};

  if (!values.date.trim()) {
      errors.date = "La Fecha es obligatoria";
  }

  if (!values.time.trim()) {
      errors.time = "El horario es obligatorio";
  }



  return errors;
};



console.log(fechaHoy, siguienteMes);
