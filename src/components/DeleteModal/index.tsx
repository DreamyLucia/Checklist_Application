import React from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { themes } from '@src/styles';

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  eventName: string;
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    backgroundColor: themes.light.bodyBg,
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    color: themes.light.primaryText,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalText: {
    color: themes.light.primaryText,
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 12,
  },
  cancelButton: {
    backgroundColor: themes.light.boxBg,
  },
  confirmButton: {
    backgroundColor: themes.dark.primary,
  },
  buttonText: {
    color: themes.light.primaryText,
    fontWeight: 'bold',
  },
});

const DeleteModal: React.FC<Props> = ({ visible, onClose, onConfirm, eventName }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>删除事件</Text>
          <Text style={styles.modalText}>是否删除「{eventName}」？</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}
            >
              <Text style={styles.buttonText}>确认删除</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
