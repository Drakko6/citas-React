import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';

export default function Cita({cita, eliminarPaciente}) {
  const dialogoEliminar = id => {
    eliminarPaciente(id);
  };
  return (
    <View style={styles.cita}>
      <View>
        <Text style={styles.label}>Paciente:</Text>
        <Text style={styles.texto}>{cita.paciente}</Text>
      </View>
      <View>
        <Text style={styles.label}>Doctor:</Text>
        <Text style={styles.texto}>{cita.doctor}</Text>
      </View>
      <View>
        <Text style={styles.label}>Síntomas:</Text>
        <Text style={styles.texto}>{cita.sintomas}</Text>
      </View>
      <View>
        <TouchableHighlight
          onPress={() => dialogoEliminar(cita.id)}
          style={styles.btnEliminar}>
          <Text style={styles.textoEliminar}>Eliminar &times; </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cita: {
    backgroundColor: 'white',
    borderBottomColor: '#e1e1e1',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  texto: {fontSize: 18},
  btnEliminar: {
    padding: 10,
    backgroundColor: 'red',
  },
  textoEliminar: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
