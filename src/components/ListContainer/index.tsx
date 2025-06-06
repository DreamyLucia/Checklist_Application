import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox, List } from '@ant-design/react-native';
import { EventItem } from '@src/types/event';
import { themes } from '@src/styles';
import Icon from '@react-native-vector-icons/evil-icons';

interface Props {
  list: EventItem[];
  onEdit: (id: number) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const styles = StyleSheet.create({
  eventCard: {
    marginVertical: 4,
    backgroundColor: themes.dark.boxBg,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginHorizontal: 8,
    borderWidth: 0,
  },
  eventText: {
    fontSize: 18,
    color: themes.dark.primaryText,
  },
  completedText: {
    fontSize: 18,
    color: themes.dark.secondaryText,
    textDecorationLine: 'line-through',
  },
  timeText: {
    fontSize: 12,
    color: themes.dark.secondaryText,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
  },
  checkbox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    color: themes.dark.primary,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    transform: [{ translateY: -2 }],
    paddingHorizontal: 8,
  },
  deleteIcon: {
    color: themes.dark.primaryText,
  },
});

const ListContainer: React.FC<Props> = ({ list, onEdit, onToggle, onDelete }) => (
  <FlatList
    data={list}
    keyExtractor={item => item.id.toString()}
    renderItem={({ item }) => (
      <List.Item
        style={styles.eventCard}
        onPress={() => onEdit(item.id)}
        styles={{
          Line: { borderBottomWidth: 0 }, // 移除List.Item的默认边框
        }}
        extra={
          <View style={styles.buttonContainer}>
            <Checkbox
              checked={item.completed}
              onChange={() => onToggle(item.id)}
              style={styles.checkbox}
            />
            <TouchableOpacity
              style={styles.deleteButton}
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
          {item.createdAt.toLocaleString()}
        </Text>
      </List.Item>
    )}
  />
);

export default ListContainer;
