import React, { useState, useEffect } from 'react';
import { Input } from '@ant-design/react-native';
import { Modal, StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native';
import { themes } from '@src/styles';

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: (event: string) => void;
  defaultValue?: string;
  search?: string;
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
  input: {
    alignItems: 'center',
    color: themes.light.secondaryText,
    height: 32,
    marginVertical: 8,
  },
  modalInputText: {
    color: themes.light.primaryText,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
});

const UpsertModal: React.FC<Props> = ({ visible, onClose, onConfirm, defaultValue, search = '' }) => {
  const [value, setValue] = useState(defaultValue || search || '');

  useEffect(() => {
    if (visible) {
      // 每次打开弹窗时重置 value
      setValue(defaultValue || search || '');
    }
  }, [visible, defaultValue, search]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      style={styles.modal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {defaultValue ? '编辑事件' : '新建事件'}
          </Text>
          <Input
            value={value}
            onChangeText={setValue}
            placeholder={defaultValue ? defaultValue : '事件内容'}
            style={styles.input}
            inputStyle={styles.modalInputText}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={() => {
                if (!value.trim()) {
                  ToastAndroid.show('请输入事件', ToastAndroid.SHORT);
                  return;
                }
                onConfirm(value.trim());
                setValue('');
              }}
            >
              <Text style={styles.buttonText}>确认</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UpsertModal;
