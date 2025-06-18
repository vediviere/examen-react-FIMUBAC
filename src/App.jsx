import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Trash2,
  Save,
  X,
  UserPlus,
  Users,
} from "lucide-react";

// Componente principal de la app
const App = () => {
  // Estado para la lista de usuarios
  const [listaUsuarios, setListaUsuarios] = useState([]);
  // Estado para los datos del formulario
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    edad: "",
  });
  // Estado para los mensajes de error
  const [mensajesError, setMensajesError] = useState({});
  // Estado para saber si se está editando un usuario
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  // Estado para los datos que se están editando
  const [datosEditados, setDatosEditados] = useState({});
  // Estado para mostrar spinner de envío
  const [cargando, setCargando] = useState(false);
  // Estado para mostrar notificaciones
  const [alerta, setAlerta] = useState({
    visible: false,
    mensaje: "",
    tipo: "",
  });

  // Cargar usuarios
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("usuarios") || "[]");
    setListaUsuarios(guardados);
  }, []);

  // Guardar localStorage
  function actualizarUsuarios(nuevaLista) {
    localStorage.setItem("usuarios", JSON.stringify(nuevaLista));
    setListaUsuarios(nuevaLista);
  }

  // Validaciones
  function validarDatos() {
    const errores = {};

    if (!datosFormulario.nombre.trim()) {
      errores.nombre = "El nombre es obligatorio";
    } else if (datosFormulario.nombre.length < 2) {
      errores.nombre = "El nombre debe tener al menos 2 caracteres";
    }

    if (!datosFormulario.correo.trim()) {
      errores.correo = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datosFormulario.correo)) {
      errores.correo = "El formato del email no es válido";
    }

    if (!datosFormulario.telefono.trim()) {
      errores.telefono = "El teléfono es obligatorio";
    } else if (!/^\d{10}$/.test(datosFormulario.telefono.replace(/\D/g, ""))) {
      errores.telefono = "El teléfono debe tener 10 dígitos";
    }

    if (!datosFormulario.direccion.trim()) {
      errores.direccion = "La dirección es obligatoria";
    }

    //no correo doble 
    const yaExiste = listaUsuarios.some(
      (u) => u.correo.toLowerCase() === datosFormulario.correo.toLowerCase()
    );
    if (yaExiste) {
      errores.correo = "Este email ya está registrado";
    }

    setMensajesError(errores);
    return Object.keys(errores).length === 0;
  }

  // Cambios inputs formulario
  function onInputChange(e) {
    const { name, value } = e.target;
    setDatosFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (mensajesError[name]) {
      setMensajesError((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  }

  // Envia el formulario 
  async function onFormSubmit(e) {
    e.preventDefault();

    if (!validarDatos()) return;

    setCargando(true);

    // Simular retardo
    await new Promise((res) => setTimeout(res, 1000));

    const nuevo = {
      id: Date.now().toString(),
      ...datosFormulario,
      creadoEn: new Date().toISOString(),
    };

    const actualizados = [...listaUsuarios, nuevo];
    actualizarUsuarios(actualizados);

    setDatosFormulario({
      nombre: "",
      correo: "",
      telefono: "",
      direccion: "",
      edad: "",
    });

    setCargando(false);
    mostrarAlerta("Usuario registrado", "success");
  }

  // alert
  function mostrarAlerta(mensaje, tipo) {
    setAlerta({ visible: true, mensaje, tipo });
    setTimeout(() => {
      setAlerta({ visible: false, mensaje: "", tipo: "" });
    }, 3000);
  }

  // llama Id de edicion
  function editarUsuario(usuario) {
    setUsuarioEditando(usuario.id);
    setDatosEditados({ ...usuario });
  }

  // cancelar edicion
  function cancelarEdicion() {
    setUsuarioEditando(null);
    setDatosEditados({});
  }

  // Guardar cambios navos
  function guardarCambios() {
    const actualizados = listaUsuarios.map((u) =>
      u.id === usuarioEditando ? datosEditados : u
    );
    actualizarUsuarios(actualizados);
    setUsuarioEditando(null);
    setDatosEditados({});
    mostrarAlerta("Usuario actualizado", "success");
  }

  // Eliminar usuario
  function borrarUsuario(id) {
    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      const actualizados = listaUsuarios.filter((u) => u.id !== id);
      actualizarUsuarios(actualizados);
      mostrarAlerta("Usuario eliminado", "danger");
    }
  }

  // cambios de edición
  function onEditChange(campo, valor) {
    if (campo === "edad" && +valor > 99) return;
    setDatosEditados((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <UserPlus className="text-blue-600" />
            Sistema de Registro de Usuarios
          </h1>
          <p className="text-gray-600">
            Administra usuarios 
          </p>
        </div>

        {alerta.visible && (
          <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
              alerta.tipo === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {alerta.mensaje}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <User className="text-blue-600" />
              Registro de Usuario
            </h2>

            <form className="space-y-6" onSubmit={onFormSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={datosFormulario.nombre}
                    onChange={onInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      mensajesError.nombre
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Ingresa tu nombre"
                  />
                  {mensajesError.nombre && (
                    <p className="text-red-500 text-sm mt-1">{mensajesError.nombre}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Edad
                  </label>
                  <input
                    type="number"
                    name="edad"
                    value={datosFormulario.edad}
                    onChange={onInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      mensajesError.edad
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Edad"
                    min="18"
                    max="99"
                  />
                  {mensajesError.edad && (
                    <p className="text-red-500 text-sm mt-1">{mensajesError.edad}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline w-4 h-4 mr-1" />
                  Email *
                </label>
                <input
                  type="email"
                  name="correo"
                  value={datosFormulario.correo}
                  onChange={onInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    mensajesError.correo
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="usuario@ejemplo.com"
                />
                {mensajesError.correo && (
                  <p className="text-red-500 text-sm mt-1">{mensajesError.correo}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline w-4 h-4 mr-1" />
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={datosFormulario.telefono}
                  onChange={onInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    mensajesError.telefono
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="10 dígitos"
                />
                {mensajesError.telefono && (
                  <p className="text-red-500 text-sm mt-1">{mensajesError.telefono}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  Dirección *
                </label>
                <textarea
                  name="direccion"
                  value={datosFormulario.direccion}
                  onChange={onInputChange}
                  rows="3"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                    mensajesError.direccion
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Dirección completa"
                />
                {mensajesError.direccion && (
                  <p className="text-red-500 text-sm mt-1">{mensajesError.direccion}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={cargando}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {cargando ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Registrando...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    Registrar Usuario
                  </div>
                )}
              </button>
            </form>
          </div>

          {/*Tablass*/}

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Users className="text-purple-600" />
              Usuarios Registrados ({listaUsuarios.length})
            </h2>

            {listaUsuarios.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  No hay usuarios registrados
                </p>
                <p className="text-gray-400">
                  Los usuarios aparecerán aquí una vez registrados
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">
                        Nombre
                      </th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">
                        Email
                      </th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">
                        Teléfono
                      </th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">
                        Edad
                      </th>
                      <th className="text-center py-3 px-2 font-semibold text-gray-700">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listaUsuarios.map((usuario) => (
                      <tr
                        key={usuario.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-2">
                          {usuarioEditando === usuario.id ? (
                            <input
                              type="text"
                              value={datosEditados.nombre}
                              onChange={(e) =>
                                onEditChange("nombre", e.target.value)
                              }
                              className="w-full px-2 py-1 border rounded text-sm"
                            />
                          ) : (
                            <div>
                              <div className="font-medium text-gray-900">
                                {usuario.nombre}
                              </div>
                              <div
                                className="text-sm text-gray-500 truncate max-w-32"
                                title={usuario.direccion}
                              >
                                {usuario.direccion}
                              </div>
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-2">
                          {usuarioEditando === usuario.id ? (
                            <input
                              type="email"
                              value={datosEditados.correo}
                              onChange={(e) =>
                                onEditChange("correo", e.target.value)
                              }
                              className="w-full px-2 py-1 border rounded text-sm"
                            />
                          ) : (
                            <span className="text-gray-900">{usuario.correo}</span>
                          )}
                        </td>

                        <td className="py-3 px-2">
                          {usuarioEditando === usuario.id ? (
                            <input
                              type="tel"
                              value={datosEditados.telefono}
                              onChange={(e) =>
                                onEditChange("telefono", e.target.value)
                              }
                              className="w-full px-2 py-1 border rounded text-sm"
                            />
                          ) : (
                            <span className="text-gray-900">{usuario.telefono}</span>
                          )}
                        </td>

                        <td className="py-3 px-2">
                          {usuarioEditando === usuario.id ? (
                            <input
                              type="number"
                              value={datosEditados.edad ?? ""}
                              onChange={(e) =>
                                onEditChange("edad", e.target.value)
                              }
                              className="w-full px-2 py-1 border rounded text-sm"
                              min="18"
                              max="99"
                            />
                          ) : usuario.edad ? (
                            <span>{usuario.edad} años</span>
                          ) : (
                            <span className="text-gray-400 italic">
                              Sin datos
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-2">
                          <div className="flex justify-center gap-2">
                            {usuarioEditando === usuario.id ? (
                              <>
                                <button
                                  onClick={guardarCambios}
                                  className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-100 transition-colors"
                                  title="Guardar"
                                >
                                  <Save className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={cancelarEdicion}
                                  className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-100 transition-colors"
                                  title="Cancelar"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => editarUsuario(usuario)}
                                  className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100 transition-colors"
                                  title="Editar"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => borrarUsuario(usuario.id)}
                                  className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-100 transition-colors"
                                  title="Eliminar"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {listaUsuarios.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <div className="text-3xl font-bold text-blue-600">
                  {listaUsuarios.length}
                </div>
                <div className="text-gray-600">Usuarios Registrados</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-green-600">
                  {new Date().toLocaleDateString()}
                </div>
                <div className="text-gray-600">Último Registro</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
