import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

export default function Formulario({
  citas,
  setCitas,
  setMostrarForm,
  guardarCitasStorage,
}) {
  //ESTADOS PARA CAMPOS
  const [paciente, setPaciente] = useState('');
  const [doctor, setDoctor] = useState('');
  const [telefono, setTelefono] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  //Muestra u oculta Date Picker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = date => {
    var opciones = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    };
    setFecha(date.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
  };

  //Muestra u oculta Time Picker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmarHora = time => {
    var opciones = {
      hour: 'numeric',
      minute: '2-digit',
    };
    setHora(time.toLocaleTimeString('es-ES', opciones));
    hideTimePicker();
  };

  //Nueva cita
  const crearNuevaCita = () => {
    //Validacion
    if (
      paciente.trim() === '' ||
      doctor.trim() === '' ||
      telefono.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === ' ' ||
      sintomas.trim() === ''
    ) {
      //Falla la validacion
      mostrarAlerta();
      return;
    }

    //Crear nueva cita
    const cita = {paciente, doctor, telefono, fecha, hora, sintomas};
    cita.id = shortid.generate();

    //Agregar al estado
    const citasNuevas = [...citas, cita];
    setCitas(citasNuevas);

    //Pasar nuevas citas a storage
    guardarCitasStorage(JSON.stringify(citasNuevas));

    //ocultar formulario
    setMostrarForm(false);

    //Resetear el formulario
    setSintomas('');
    setTelefono('');
    setPaciente('');
    setHora('');
    setFecha('');
  };

  const mostrarAlerta = () => {
    Alert.alert(
      'Error', //Titulo
      'Todos los campos son obligatorios', //Mensaje
      //Arreglo de botones
      [{text: 'OK'}],
    );
  };

  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => setPaciente(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Doctor:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => setDoctor(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Contacto:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => setTelefono(texto)}
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text style={styles.label}>Fecha: </Text>
          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            locale="es_ES"
            headerTextIOS="Elige una fecha"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{fecha}</Text>
        </View>

        <View>
          <Text style={styles.label}>Hora: </Text>

          <Button title="Seleccionar Hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmarHora}
            onCancel={hideTimePicker}
            locale="es_ES"
            headerTextIOS="Elige una hora"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{hora}</Text>
        </View>

        <View>
          <Text style={styles.label}>Síntomas:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => setSintomas(texto)}
            multiline
          />
        </View>
        <View>
          <TouchableHighlight
            onPress={() => crearNuevaCita()}
            style={styles.btnCrear}>
            <Text style={styles.textoCrear}>Crear cita </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 5,
  },
  input: {
    marginTop: 5,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  btnCrear: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginBottom: 20,
  },
  textoCrear: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
