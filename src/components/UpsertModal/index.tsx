import React, { useState, useEffect } from 'react';
import { Input } from '@ant-design/react-native';
import { Modal, StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native';
import { themes } from '@src/styles';
import { useTheme } from '@src/hooks/useTheme';

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: (event: string) => void;
  defaultValue?: string;
  search?: string;
}

const UpsertModal: React.FC<Props> = ({ visible, onClose, onConfirm, defaultValue, search = '' }) => {
  const [value, setValue] = useState(defaultValue || search || '');
  const { isDarkMode } = useTheme();
  const theme = themes[isDarkMode ? 'dark' : 'light'];
  const themeReverse = themes[isDarkMode ? 'light' : 'dark'];

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
      backgroundColor: themeReverse.normalBg,
      borderRadius: 8,
      padding: 16,
    },
    modalTitle: {
      color: themeReverse.primaryText,
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      paddingBottom: 4,
      paddingHorizontal: 8,
      textAlign: 'center',
      borderBottomColor: themeReverse.borderColor,
      borderBottomWidth: 4,
    },
    inputContainer: {
      marginHorizontal: 12,
    },
    input: {
      alignItems: 'center',
      color: themeReverse.secondaryText,
      backgroundColor: themeReverse.boxBg,
      height: 32,
      marginBottom: 16,
    },
    modalInputText: {
      color: themeReverse.primaryText,
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
      backgroundColor: theme.boxBg,
    },
    confirmButton: {
      backgroundColor: theme.primary,
    },
    buttonText: {
      color: theme.primaryText,
    },
  });

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
          <View style={styles.inputContainer}>
            <Input
              value={value}
              onChangeText={setValue}
              placeholder={defaultValue ? defaultValue : '事件内容'}
              style={styles.input}
              inputStyle={styles.modalInputText}
            />
          </View>
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
