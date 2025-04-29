// components/FimDeJogoModal.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FimDeJogoModal = ({ visible, vencedor, empate, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.titulo}>
            {empate ? 'Empate!' : `Xeque Mate!\n${vencedor === 'w'? 'Branco': 'Preto'} venceu!`}
          </Text>
          <TouchableOpacity style={styles.botao} onPress={onClose}>
            <Text style={styles.textoBotao}>Reiniciar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#FFF',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    gap: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  botao: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default FimDeJogoModal;
