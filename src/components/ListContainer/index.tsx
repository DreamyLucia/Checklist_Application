import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { List } from '@ant-design/react-native';
import { EventItem } from '@src/types/event';
import { themes } from '@src/styles';
import Icon from '@react-native-vector-icons/evil-icons';
import { formatDateTime } from '@src/utils/dateFormatter';
import { useTheme } from '@src/hooks/useTheme';

interface Props {
  list: EventItem[];
  onEdit: (id: number) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const ListContainer: React.FC<Props> = ({ list, onEdit, onToggle, onDelete }) => {
  const { isDarkMode } = useTheme();
  const theme = themes[isDarkMode ? 'dark' : 'light'];

  const styles = StyleSheet.create({
    eventCard: {
      marginVertical: 4,
      backgroundColor: theme.boxBg,
      borderRadius: 12,
      paddingHorizontal: 12,
      marginHorizontal: 8,
      borderWidth: 0,
    },
    eventText: {
      fontSize: 18,
      color: theme.primaryText,
    },
    completedText: {
      fontSize: 18,
      color: theme.secondaryText,
      textDecorationLine: 'line-through',
    },
    timeText: {
      fontSize: 12,
      color: theme.secondaryText,
      marginTop: 4,
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 32,
      padding: 0,
    },
    opacityButton: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      paddingHorizontal: 8,
    },
    checkIcon: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: theme.secondaryText, // 默认未完成颜色
    },
    completedCheckIcon: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: theme.primary, // 完成时颜色
    },
    deleteIcon: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: theme.primaryText,
    },
  });

  return (
    <FlatList
      data={list}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => {
        return (
          <List.Item
            style={styles.eventCard}
            onPress={() => onEdit(item.id)}
            styles={{
              Line: { borderBottomWidth: 0 }, // 移除List.Item的默认边框
            }}
            extra={
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.opacityButton}
                    onPress={() => onToggle(item.id)}
                  >
                    <Icon
                      name="check"
                      size={28}
                      style={item.completed ? styles.completedCheckIcon : styles.checkIcon}
                    />
                  </TouchableOpacity>
                <TouchableOpacity
                  style={styles.opacityButton}
                  onPress={() => onDelete(item.id)}
                >
                  <Icon name="trash" size={28} style={styles.deleteIcon}/>
                </TouchableOpacity>
              </View>
            }
          >
            <Text style={item.completed ? styles.completedText : styles.eventText}>
              {item.event}
            </Text>
            <Text style={styles.timeText}>
              {formatDateTime(item.createdAt)}
            </Text>
          </List.Item>
        );
      }}
    />
  );
};

export default ListContainer;
