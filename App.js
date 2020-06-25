import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  //Estado para mostrar u ocultar el formulario
  const [mostrarForm, setMostrarForm] = useState(false);

  //Estados de citas
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const obtenerCitasStorage = async () => {
      try {
        const citasStorage = await AsyncStorage.getItem('citas');
        if (citasStorage) {
          setCitas(JSON.parse(citasStorage));
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCitasStorage();
  }, []);

  //Elimina las citas
  const eliminarPaciente = id => {
    const citasFiltradas = citas.filter(cita => cita.id !== id);
    setCitas(citasFiltradas);
    guardarCitasStorage(JSON.stringify(citasFiltradas));
  };

  //Muestra u oculta el formulario
  const mostrarFormulario = () => {
    setMostrarForm(!mostrarForm);
  };

  //Cerrar teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };

  //Almacenar citas en storage
  const guardarCitasStorage = async citasJSON => {
    try {
      await AsyncStorage.setItem('citas', citasJSON);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador citas </Text>
        <View>
          <TouchableHighlight
            onPress={() => mostrarFormulario()}
            style={styles.btnMostrarForm}>
            <Text style={styles.textoMostrarForm}>
              {mostrarForm ? 'Cancelar crear cita' : 'Crear cita'}
            </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.contenido}>
          {mostrarForm ? (
            <>
              <Text style={styles.titulo}>Crear nueva cita</Text>
              <Formulario
                citas={citas}
                setCitas={setCitas}
                setMostrarForm={setMostrarForm}
                guardarCitasStorage={guardarCitasStorage}
              />
            </>
          ) : (
            <>
              <Text style={styles.titulo}>
                {citas.length > 0
                  ? 'Administra tus citas'
                  : 'No hay citas, agrega una'}
              </Text>
              <FlatList
                style={styles.listado}
                data={citas}
                //Se sacó el item con desctructuring, porque ese objeto da FlatList
                renderItem={({item}) => (
                  <Cita cita={item} eliminarPaciente={eliminarPaciente} />
                )}
                keyExtractor={cita => cita.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default App;

const styles = StyleSheet.create({
  contenido: {
    flex: 1,
  },
  titulo: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1,
    //marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1,
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#7d024e',
  },
  textoMostrarForm: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
